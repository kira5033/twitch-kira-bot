const moment = require('moment');

/*
  Use moment to get time simply.
  moment()
  .add(8, 'hours')              > Need to plus 8 hours when timezoe is not Asia/Taipei
  .format('YYYY-MM-DD h:mm:ss') > 2021-11-13 00:00:00
  */
module.exports.getTime = (dateFormat) => moment().format(dateFormat)
/*
  Pick a radom number between the min and max number
  */
module.exports.getRandom = (min,max) => Math.floor(Math.random() * (max-min+1)) + min
/*
  Pick a radom value by array
  */
module.exports.getRandomArray = (array) => Math.floor(Math.random() * array.length)
/*
  Resort the array by radnom
 */
module.exports.shuffleArray = (array) => {
	for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}