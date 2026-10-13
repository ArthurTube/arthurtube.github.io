<!--//

var m_clsClient = "";
var mc_strClientDataStore = "BonziPortalUserData";
var m_strUserZip = "";
var m_strUserEmail = "";

function fixDate(date) {
	// date - any instance of the Date object
	// * you should hand all instances of the
	// Date object to this function for "repairs"
	var base = new Date(0);
	var skew = base.getTime();
	if (skew > 0)
	   date.setTime(date.getTime() - skew);
}  	
		
function ReturnDate(DaysToAdd){
	var d, s = "";
	d = new Date();
			
	//prepare the date object
	fixDate(d);
	d.setTime;
					
	//If adding 0 days to date (return today's date)
	if (!DaysToAdd) {
		d.setTime(d.getTime());			
		}
	else {	//Adding given number of days
		d.setTime(d.getTime() + DaysToAdd * 24 * 60 * 60 * 1000);
		}			
	return(d);		
}
	
function setCookie(name, value, expires, path, domain, secure) {   
	// name - name of the cookie
	// value - value of the cookie
	// [expires] - expiration date of the cookie (defaults to end of current session)
	// [path] - path for which the cookie is valid (defaults to path of calling document)
	// [domain] - domain for which the cookie is valid (defaults to domain of calling document) 	
	// [secure] - Boolean value indicating if the cookie transmission requires a secure transmission
	// * an argument defaults when it is assigned null as a placeholder
	// * a null placeholder is not required for trailing omitted arguments 
		 	
	var curCookie = name + "=" + escape(value) +
					((expires) ? "; expires=" + expires.toGMTString() : "") +
					((path) ? "; path=" + path : "") +
					((domain) ? "; domain=" + domain : "") +
					((secure) ? "; secure" : "");   
	document.cookie = curCookie;
}

function getCookie(name) {
	// name - name of the cookie
	// * return string containing value
	// of specified cookie or null if cookie
	// does not exist

	var prefix = name + "=";
	var cookieStartIndex = document.cookie.indexOf(prefix);
   
	if (cookieStartIndex == -1) {
		return null;
	}      
	
	var cookieEndIndex = document.cookie.indexOf(";", cookieStartIndex + prefix.length);
	
	if (cookieEndIndex == -1) {
		cookieEndIndex = document.cookie.length;
	}   
	
	return unescape(document.cookie.substring(cookieStartIndex + prefix.length, cookieEndIndex));
}

function deleteCookie(name, path, domain) {
	// name - name of the cookie
	// [path] - path of the cookie
	// (must be same as path used to create cookie)
	// [domain] - domain of the cookie
	// (must be same as domain used to create cookie)
	// * path and domain default if not assigned
	// null or omitted if no explicit argument proceeds	
	
	if (getCookie(name)) {
	   document.cookie = name + "=" +
	   ((path) ? "; path=" + path : "") +
	   ((domain) ? "; domain=" + domain : "") +
	   "; expires=Thu, 01-Jan-70 00:00:01 GMT";
	}
}

function PersistData(objForm) {			
	if ((objForm.inputZip.value != "null") && (objForm.inputZip.value != "")) {			
		//if (setCookie(mc_strClientDataStore, objForm.inputZip.value, "Fri, 01-Jan-2010 00:00:01 GMT")) {
		if (setCookie(mc_strClientDataStore, objForm.inputZip.value, ReturnDate(999), "/", ".bonzi.com")) {		
			m_strUserZip = objForm.inputZip.value;
		}
	}
}
	
function GetFieldValue(strFieldName) {	
	if (strFieldName == "zipcode") {			
		return m_clsClient.zipcode;
	}
}

function clsUserData() {
	this.zipcode = getCookie("BonziPortalUserData");	
}
	
function LoadData() {					
	m_clsClient = new clsUserData();
	//m_clsClient.zipcode = getCookie("BonziPortalUserData");	
	//return 0;
} 

//-->