const MyTools = require('./tools.js')

const emojiText = [
	'(́◉◞౪◟◉‵)',
	'(́◕◞౪◟◕‵)',
	'σ ﾟ∀ ﾟ) ﾟ∀ﾟ)σ ',
	'(*´∀`)~♥',
	'_(:3 」∠ )_',
	'ヽ(∀ﾟ )人(ﾟ∀ﾟ)人( ﾟ∀)人(∀ﾟ )人(ﾟ∀ﾟ)人( ﾟ∀)ﾉ',
	'。･ﾟ･(つд`ﾟ)･ﾟ･',
	'(／‵Д′)／~ ╧╧',
	'(´・ω・`)',
	'(∩^o^)⊃━☆ﾟ.*･｡',
	'(ง๑ •̀_•́)ง',
	'ʅ（´◔౪◔）ʃ',
	'(*´д`)',
]

const foodDB = {
	'breakfast': ['火腿蛋餅','肉鬆蛋餅','玉米蛋餅','原味蛋餅','高麗菜蛋餅','豬排蛋餅','培根蛋餅','卡拉雞腿蛋餅','起司蛋餅','薯餅蛋餅','熱狗蛋餅','鮪魚蛋餅','燻雞蛋餅','香雞蛋餅','乳酪蛋餅','杏鮑菇蛋餅','奶油吐司/厚片','花生吐司/厚片','草莓吐司/厚片','巧克力吐司/厚片','香蒜吐司/厚片','椰香吐司/厚片','奶酥吐司/厚片','豬肉漢堡','香雞漢堡','鮪魚漢堡','豬排漢堡','卡拉雞漢堡','蘑菇鐵板麵','油條蛋餅','薯泥蛋餅','九層塔蛋餅','皮蛋蛋餅','泡菜蛋餅','火腿蛋餅','咖喱蛋餅','打拋豬蛋餅','蘿蔔糕','肉蛋吐司','原味貝果'],
	'other' : ['土魠魚羹飯','土魠魚羹麵','土魠魚羹米粉','土魠魚羹冬粉','肉羹飯','肉羹麵','肉羹米粉','肉羹冬粉','滷肉飯','雞肉飯','爌肉飯','肉絲炒飯','蝦仁炒飯','排骨飯','雞腿飯','鍋燒意麵','鍋燒烏龍麵','牛肉丼飯','雞肉丼飯','豬肉丼飯','紐約客牛排','肋眼牛排','菲力牛排','沙朗牛排','雞腿排','鐵板麵','清麵線','蚵仔麵線','大腸麵線','椒麻雞腿便當','紅酒燉牛肉','米酒泡香腸','炸臭豆腐','豬排咖哩飯','火雞肉飯','三寶飯','燒臘便當','生牛肉河粉','羊肉羹','酸菜白肉鍋','海鮮鍋','臭臭鍋','韓式泡菜鍋','南瓜牛奶鍋','起司牛奶鍋','原味鍋','涼麵','豚骨拉麵','醬油拉麵','炒烏龍麵','清炒蛤蠣義大利麵','白醬義大利麵','番茄義大利麵','焗烤義大利麵','火車便當','炒泡麵','焗烤海鮮白醬燉飯','橘醬義大利麵','青醬義大利麵','牛肉麵','半筋半肉牛肉麵','水餃','生菜沙拉','陽春麵','手扒雞','夏威夷披薩','水煮雞肉','土窯雞'],
	'snack': ['油條','豆漿','飯糰','臭豆腐','鹹酥雞','蔥油餅','韭菜盒子','羊肉串','滷味','肯德基','麥當勞','玉米湯','綠豆湯','洋芋片','肥宅快樂水','泡麵','串燒','頂呱呱','鹽水雞','煎餃','壽司','一般雞排','惡魔雞排','木子炸物','派克雞排','巧克力雞排','嵐町雞排','虱目魚肚粥','廣東粥','皮蛋瘦肉粥','關東煮','冰淇淋','月餅','紅豆年糕','乳酪蛋糕','草莓大福','牛奶','泡芙','奶油蛋糕','奶油草莓蛋糕','黑糖珍奶','高蛋白乳清','鱈魚香絲','紅豆湯圓','咖哩蛋炒麵','芝麻湯圓','花生湯','紅豆車輪餅','香草冰淇淋','香芋冰淇淋','奶油車輪餅'],
	'none': ['醒醒吧 你沒錢','你口袋有灰塵 還想吃','旁邊有土 去吃吧','不是要減肥麻 沒東西給你','你要想想，空氣不用錢','你要不要看一下你的體脂，還敢吃啊','西北風很香的喔','樹皮炒草根，隨便吃','低頭看看你的腳趾，你還看得到嗎','你不胖只是長的比較擋路','你今天量體重了嗎','你先低頭看看你那團結的腹肌','不能吃太胖喔 會被殺掉的！']
}

module.exports.simpleResponse = {
	"!抽" : {
		cooldown : 1,
		status : true,
		text : (name) => {
			return emojiText[MyTools.getRandomArray(emojiText)]
		},
		whiteList : [ 'vu84mida', 'kira5033' ]
	},
	"!喘" : {
		cooldown : 20,
		status : true,
		text : (name) => {
			var result = '米達喘！ https://clips.twitch.tv/AgreeableAlluringSnakeBloodTrail-xNm0YEFbu640N7nw'
			return result
		},
		whiteList : [ 'vu84mida' ]
	},
	"!581" : {
		cooldown : 1,
		status : true,
		text : (name) => {
			var _result = `{{name}}：「今晚我想來點......{{random}}」`
			var stringDB = ['米達','子如','跑跑','Kira','狐尼','啾滴','二二','MOMO','大叔','米亞','匈奴奴','肥羊','懶懶','阿伯','花花公子','倒灰','飛飛','美美','佑佑','紅香腸','奪命']
			MyTools.shuffleArray(stringDB)
			return _result
							.replace('{{random}}', stringDB[MyTools.getRandomArray(stringDB)])
							.replace('{{name}}', name)
		},
		whiteList : [ 'vu84mida', 'kira5033' ]
	},
	"!邊貓" : {
		cooldown : 5,
		status : true,
		text : (name) => {
			var stringDB = [
				'!隱藏著邊貓力量的鑰匙啊，在我面前顯示你搞事的力量！現在以你的主人 {{name}} 之名命令你－封印解除！',
				'!邊貓教主，賜我力量，降伏群魔，迎來曙光。 {{name}} 左手 所封百鬼，尊我號令 即在此刻！',
				'!一天又平安的過去了，這都要感謝搞事小邊貓的努力。',
				'!{{name}} 召喚你回來，重生吧，邊貓，遵從我命，袪除邪惡解除，解開束縛，搞事吧，邊貓，我還你原形'
			]
			MyTools.shuffleArray(stringDB)
			return stringDB[MyTools.getRandomArray(stringDB)].replace('{{name}}', name)
		},
		whiteList : [ 'vu84mida', 'death9999999', 'kira5033', 'eretria036', 'touckay86542' ]
	},
	"!啾滴" : {
		cooldown : 1,
		status : true,
		text : (name) => {
			var megami = [ '震妹', '症妹', '正妹', '仙女']
			var stringDB = [
				'{{name}}說，{{nickname}}啾滴安安，妳昨天又比今天更有魅力了',
				'{{name}}說，{{nickname}}啾滴安安，妳今天又比昨天更有霉力了',
				'{{name}}說，{{nickname}}啾滴安安，妳今天又比昨天更有魅力了',
				'零距離靈魂射手 GlitchCat GlitchCat',
				'{{name}} 你今天迷路了嗎? '
			]
			return stringDB[MyTools.getRandomArray(stringDB)]
							.replace('{{name}}', name)
							.replace('{{nickname}}', megami[MyTools.getRandomArray(megami)])
		},
		whiteList : [ 'vu84mida', 'kira5033', 'eretria036' ]
	},
	"!滑手機" : {
		cooldown : 1,
		status : true,
		text : (name) => {
			var stringDB = [
				'月上柳梢頭，啾滴滑手機',
				'人生在世不稱意，不如低頭滑手機',
				'舉頭望明月，啾滴滑手機',
				'採菊東籬下，悠然滑手機',
				'唧唧復唧唧，啾滴滑手機',
				'垂死病中驚坐起，又見啾滴滑手機',
				'春眠不覺曉，啾滴滑手機',
				'楊家有女初長成，一看竟在滑手機',
				'明日復明日，啾滴滑手機',
				'啾滴扮妝坐車遊，回眸只見滑手機',
				'啾滴滑手機，不如高臥且加餐',
			]
			MyTools.shuffleArray(stringDB)
			return stringDB[MyTools.getRandomArray(stringDB)]
		},
		whiteList : [ 'vu84mida', 'kira5033' ]
	},
	"!小u" : {
		cooldown : 1,
		status : true,
		text : (name) => {
			var stringDB = [
				'{{name}} 你說的是「人見人愛，花見花開，聰明伶俐，活潑可愛」的小U嗎'
			]
			MyTools.shuffleArray(stringDB)
			return stringDB[MyTools.getRandomArray(stringDB)]
						.replace('{{name}}', name)
		},
		whiteList : [ 'vu84mida', 'kira5033' ]
	}
}

module.exports.kiraResponses = {
	"!吃" : {
		cooldown : 1,
		status : true,
		text : (name, whattime) => {
			var selectFood, message;
			var failed = [1,1,1,1,1,0,1,1,1,1]
			var result = failed[MyTools.getRandomArray(failed)]
			if(result){
				var stringDB = [
					'{{name}} 餓了嗎? 要不要ㄘㄘ {{food}} 這個很好ㄘ喔',
				]
				switch(whattime){
					case 'breakfast': selectFood = [...foodDB['breakfast']] ; break;
					case 'lunch':
					case 'tea':
					case 'dinner': selectFood = [...foodDB['other']] ; break;
					default: selectFood = [...foodDB['snack']] ;
				}
				MyTools.shuffleArray(selectFood)
				message = stringDB[MyTools.getRandomArray(stringDB)]
										.replace('{{name}}', name)
										.replace('{{food}}', selectFood[MyTools.getRandomArray(selectFood)])
			}else{
				selectFood = foodDB['none'] ;
				message = selectFood[MyTools.getRandomArray(selectFood)]
			}
			return message
		},
		whiteList : [ 'vu84mida', 'death9999999', 'kira5033', 'eretria036', 'touckay86542' ]
	},
	"!kira" : {
		cooldown : 1,
		status : true,
		text : (name, whattime) => {
			var stringDB = [
				'{{name}}，您好',
				// '(」・ω・)」召喚！(／・ω・)／Kira！',
			]
			return stringDB[MyTools.getRandomArray(stringDB)].replace('{{name}}', name)
		},
		whiteList : [ 'vu84mida', 'kira5033', 'eretria036' ]
	}
}