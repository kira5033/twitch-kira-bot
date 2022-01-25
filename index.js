require('dotenv').config();
const tmi = require('tmi.js');
const fs = require('fs')
const MyTools = require('./module/tools.js');
const { simpleResponse, kiraResponses } = require('./module/response.js')

const twitchBot = [ 'streamelements', 'nightbot', 'streamlabs' ]

let midaPaint = null
let voteList = []

let rawdata = fs.readFileSync('channel.json');
const joinChannelList = JSON.parse(rawdata);

const textFilter = (msg) => {
	var _msg = msg
	_msg = _msg.replace(/！/g, '!')
	return _msg
}

const isAd = (msg) => {
	var _msg = msg.toLowerCase()
	return _msg.indexOf('buy') !== -1 && ( _msg.indexOf('follower') !== -1 || _msg.indexOf('viewer') !== -1 )
}

const giveMeTime = (hour) => {
	var text
	if(hour >= 5 && hour <= 10){
		text = 'breakfast'
	}else if(hour > 10 && hour <= 14){
		text = 'lunch'
	}else if(hour > 14 && hour <= 16){
		text = 'tea'
	}else if(hour > 16 && hour <= 21){
		text = 'dinner'
	}else{
		text = 'lightmeal'
	}
	return text
}

const client = new tmi.Client({
	options: { debug: true, messagesLogLevel: "info" },
	connection: {
		reconnect: true,
		secure: true
	},
	identity: {
		username: process.env.TWITCH_ACCOUNT,
		password: process.env.TWITCH_OAUTH
	},
	channels: joinChannelList
});

client.connect().catch(console.error);

// message
client.on('message', (channel, tags, messages, self) => {
	let _channel = channel.replace('#','')
	if(_channel === 'kira5033'){
		console.log(tags)	
	}
	let isBroadcaster = _channel === tags['username']
	let isMod = tags['mod']
	// console.log(`${channel} | ${tags['display-name']} - ${message}`)
	let message = textFilter(messages)

	if(self || twitchBot.indexOf(tags['username'].toLowerCase()) !== -1) return;

	if(isAd(message)){
		console.log('Is Ad.');
		// client.ban(channel, tags['username']);
	}else{
		console.log('Not Ad.');
	}

	const [ _command, argument, argument2 ] = message.split(' ')
	const whatTimeIsNow = giveMeTime(MyTools.getTime('H'))

	const command = _command.toLowerCase()
	let executeCommand = simpleResponse[command] || {}
	if(executeCommand && executeCommand.status && executeCommand.whiteList.indexOf(_channel) !== -1){
		var commandRespone = executeCommand.text(tags['display-name'])
		if(commandRespone){
			executeCommand.status = false
			client.say(channel,commandRespone)
			setTimeout(function(){
				executeCommand.status = true
			}, executeCommand.cooldown * 1000)
			return 
		}
	}

	let excuteKiraCommand = kiraResponses[command] || {}
	if(excuteKiraCommand && excuteKiraCommand.status && excuteKiraCommand.whiteList.indexOf(_channel) !== -1){
		excuteKiraCommand.status = false
		client.say(channel, excuteKiraCommand.text(tags['display-name'], whatTimeIsNow))
		setTimeout(function(){
			excuteKiraCommand.status = true
		}, excuteKiraCommand.cooldown * 1000)
		return 
	}

	if(command === '!脫' && _channel === 'vu84mida'){
		if(midaPaint === null || midaPaint === true){
			midaPaint = false
			client.say(channel, `米達，@${tags['display-name']}，叫你脫就快脫!`);
		}else{
			client.say(channel, `@${tags['display-name']} 呀，米達還沒穿就要人家脫，你很急唷~ Kappa `);
		}
	}
	if(command === '!穿' && _channel === 'vu84mida'){
		if(midaPaint === null || midaPaint === false){
			midaPaint = true
			client.say(channel, `米達，@${tags['display-name']} 提醒你，海水退了記得穿上褲子`);
		}else{
			client.say(channel, `@${tags['display-name']} 呀，你想要米達熱死嗎~ LUL `);
		}
	}

	if(command === '!7d' && parseInt(argument) > 0) {
		var answer = Math.ceil(parseInt(argument) / 7) * 7 
		setTimeout(function(){
			client.say(channel, `下一個七日是 ${answer} >> ${tags['display-name']}`)
		}, 500)
	}

	/* Vote System - Start */
	if(command === '!vt' && argument !== undefined && argument2 !== undefined){
		var voteWhiteList = [ 'vu84mida', 'death9999999', 'kira5033', 'eretria036' ]
		if(voteWhiteList.indexOf(_channel) === -1 || (!isBroadcaster && !isMod)) return
		if(voteList[_channel] === undefined){
			voteList[_channel] = {
				"voteStatus" : false,
				"voteMember" : [],
				"voteY": 0,
				"voteN": 0
			}
		}
		if(voteList[_channel].voteStatus === false){
			var executeTime = (parseInt(argument2) > 0) ? parseInt(argument2) : 60
			// if(executeTime < 30) executeTime = 30
			voteList[_channel].voteStatus = true
			setTimeout(() => {
				client.say(channel, `投票結果，同意：${voteList[_channel].voteY}，不同意：${voteList[_channel].voteN}`)
				voteList[_channel].voteStatus = false
				voteList[_channel].voteN = 0
				voteList[_channel].voteY = 0
				voteList[_channel].voteMember = []
			}, 1000 * executeTime)
			client.say(channel, `發起一項投票「${argument}」，同意請打Y，不同意請打N，投票時間 ${executeTime} 秒`)
		}
		return
	}

	if(voteList[_channel] !== undefined && voteList[_channel].voteStatus === true){
		var _message = message.toLowerCase()
		if(voteList[_channel].voteMember.indexOf(tags['username']) === -1){
			if(_message.indexOf('y') !== -1){
				voteList[_channel].voteY ++
				voteList[_channel].voteMember.push(tags['username'])
			}else if(_message.indexOf('n') !== -1){
				voteList[_channel].voteN ++
				voteList[_channel].voteMember.push(tags['username'])
			}
		}
	}

	/* Vote System - End */

});

// 揪團
client.on("raided", (channel, username, viewers) => {
	console.log('Listen raided')
	console.log(username)
	console.log(viewers)
});

// 訂閱
client.on("subscription", (channel, username, method, message, userstate) => {
	console.log('Listen subscription')
	console.log(username)
	console.log(method)
	console.log(message)
	console.log(userstate)
});

client.on("redeem", (channel, username, rewardtype, tags, msg) => {
	console.log('Listen redeem')
	console.log(channel);
	console.log(username);
	console.log(rewardtype);
	console.log(tags);
	console.log(msg);
});
