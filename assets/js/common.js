/**
 * 날짜 '-' 붙이기
 * @param value
 * @returns
 */
export function createDatebar(obj) {
	return obj.substring(0, 4) + '-' + obj.substring(4, 6) + '-'
			+ obj.substring(6, 8);
}


/* 날자 '-' 없애기 */
export function removeDatebar(obj) {
	if(obj){
		return obj.split("-").join('');
	}else{
		return;
	}
}
	
/**
 * URL QueryString 값 파싱작업
 *
 * @returns params
 */
export function getUrlParams() {
	var params = {};
	window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str, key, value) {
		params[key] = value;
	});
	return params;
}	
	
	
/* 숫자천단위 , 추가 */
Number.prototype.format = function() {
	if (this == 0)
		return 0;

	var reg = /(^[+-]?\d+)(\d{3})/;
	var n = (this + '');

	while (reg.test(n))
		n = n.replace(reg, '$1' + ',' + '$2');

	return n;
};


export function convertDateToYYYY(data){
	return data.getFullYear();
}

export function convertDateToMM(data){
	var mm = data.getMonth()+1;
	if(mm<10) {
	    mm='0'+mm
	}
	return mm;
}
export function convertDateToDD(data){
	var dd = data.getDate();
	if(dd<10) {
	    dd='0'+dd
	}
	return dd;
}

export function convertDateToHH(data){
	var hh = data.getHours();
	if(hh<10) {
	    hh='0'+hh
	}
	return String(hh);
}
export function convertDateToMI(data){
	var mi = data.getMinutes();
	if(mi<10) {
		mi='0'+mi
	}
	return String(mi);
}

export function convertDateYYYYMMDD(data){
	return convertDateToYYYY(data)+'-'+convertDateToMM(data)+'-'+convertDateToDD(data);
}

export function convertDate(data){
	return convertDateToYYYY(data)+'-'+convertDateToMM(data)+'-'+convertDateToDD(data)+' '+convertDateToHH(data)+':'+convertDateToMI(data);
}

export function dateDiffDay(_date1, _date2, ischeck) {
    var diffDate_1 = _date1 instanceof Date ? _date1 : new Date(_date1);
    var diffDate_2 = _date2 instanceof Date ? _date2 : new Date(_date2);

    var diff = diffDate_2.getTime() - diffDate_1.getTime();
    if(ischeck != false){
    	diff = Math.abs(diff);
    }

    diff = Math.ceil(diff / (1000 * 3600 * 24));

    return diff;
}


export function getYYYYMMDD(value){
	var settingDate = new Date();

	if(typeof value == 'string'){
		if(value == "M") settingDate.setMonth(settingDate.getMonth()-1);
		if(value == "Y") settingDate.setYear(settingDate.getFullYear()-1);
	}else if(typeof value == 'number'){
		settingDate.setDate(settingDate.getDate()+value);
	}

	return convertDateYYYYMMDD(settingDate);
}
/**
 * 한글, 영문, 숫자, 특문(소수점제외) 제거 정규식
 * @param value
 * @param typeObj
 * @returns
 */
export function isRegex(value, typeObj ){
    var arr = typeObj.split(",");
    var str = String(value);
    
    if(str){
	    arr.forEach(function(ref, idx){
	    	//영문 제거
	        if(ref === "E") {
	            str = str.replace(/[a-zA-Z]/g, '');
	        }
	        //한글 제거
	        if(ref === "K"){
	            str = str.replace(/[\ㄱ-ㅎㅏ-ㅣ가-힣]/g, '');
	        }
	        //특문 제거
	        if(ref === "S"){
	        	str = str.replace(/[~!@#$%\`^&*()'"\/\-,\s_+|<>?:{}]/g, '');
	        }
	        //숫자만
	        if(ref === "N"){
	        	str = str.replace(/[^0-9]/g, ""); 
	        }
	    });
    }
    return str;    
}

export function dateDiff(date1, date2){
	date1= createDatebar(isRegex(date1,'N'))
	date2= createDatebar(isRegex(date2,'N'))
	var dateArray1 = date1.split("-"); 
	var dateObj1 = new Date(dateArray1[0], Number(dateArray1[1])-1, dateArray1[2]);

	var dateArray2 = date2.split("-"); 
	var dateObj2 = new Date(dateArray2[0], Number(dateArray2[1])-1, dateArray2[2]);

	return (dateObj1.getTime() - dateObj2.getTime())/1000/60/60/24;  
}


export function differenceDay(maxYmd, minYmd){
	var maxDate = new Date(createDatebar(isRegex(maxYmd, 'N')));
	var minDate = new Date(createDatebar(isRegex(minYmd, 'N')));
	var diffDate = 0;
	
	//날짜체크
	if(maxDate.getDate() && minDate.getDate()){
		diffDate = (((maxDate.getTime() - minDate.getTime())/1000)/60/60)/24;
		return diffDate;
	}else{
		return false;
	}
}

export function clone(obj) {
	var copy;
	if(Array.isArray(obj)){
		copy = obj.slice().map((v) => {
					return clone(v);
				});
	}else{
		if (obj === null || typeof(obj) !== 'object')
		return obj;
	
		copy = obj.constructor();
	
		for (var attr in obj) {
			if (Object.prototype.hasOwnProperty.call(obj, attr)) {
				copy[attr] = obj[attr];
			}
		}
	}
	return copy;
}

export function numberPad(n, width) {
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}
/**
 * 날짜 몇일 전 계산
 * @param date "2021-02-15"
 * @param days "+7 , -7"
 * @returns
 */
export function getDateCalculator(date, days) {
	var dt = new Date(date);
	dt.setDate(dt.getDate() + days)
	return dt.toISOString().substr(0, 10)
  }