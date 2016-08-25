function convertTime(epoch) {
	var date = +epoch * 1000;

	var dateObj = new Date(date);

	return dateObj;
}

function convertDate(date) {

	return moment(date).format('DD-MMM-YY')
}

function getRange(arr) {
	var lowTime = Number.POSITIVE_INFINITY;
	var highTime = Number.NEGATIVE_INFINITY;

	var lowVal = Number.POSITIVE_INFINITY;
  var highVal = Number.NEGATIVE_INFINITY;
	
	var tmpTime;
	var tmpVal;

  var lowT;

	for (var i = 0; i < arr.length; i++) {
	    
	tmpTime = Number(arr[i].time);
	tmpVal = Number(arr[i].value);

		if(tmpTime < lowTime) {
      lowTime = tmpTime;
    }
    if(tmpTime > highTime) {
      highTime = tmpTime;
    }

    if(tmpVal < lowVal) {
      lowVal = tmpVal;
    }
    if(tmpVal > highVal) {
      highVal = tmpVal;
    }

	}
 
	return {
		minTime:lowTime,
		maxTime:highTime,
		minVal:lowVal,
		maxVal:highVal
	}
}

module.exports = {
	convertTime:convertTime,
	convertDate:convertDate,
	getRange:getRange
}