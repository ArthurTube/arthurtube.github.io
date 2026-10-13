var showAAGS = 1;

//programs update function
function updatePrograms() {
removeMMI();
var NS4 = (navigator.appName == "Netscape" && parseInt(navigator.appVersion) < 5);
var NSX = (navigator.appName == "Netscape");
var IE4 = (document.all) ? true : false;

if(document.request_info.country[document.request_info.country.selectedIndex].value != "US" && document.request_info.country[document.request_info.country.selectedIndex].value != ""){
			var newOption;
			if (NSX){			
				var newOpt  = new Option("Masters of Management - International", "MM-I");
				document.request_info.degree.options[13] = newOpt;
				if (NS4) history.go(0);
			}else{
				newOption = document.createElement("option") ;
		        newOption.value = "MM-I" ;
		        newOption.text = "Masters of Management - International";
		        document.request_info.degree.add(newOption, 13) ;
			}
		}
 
}
//end programs function

function removeMMI(){
		//alert(document.request_info.degree.options[1].value);
		//var i = document.request_info.degree.length;
		var NS4 = (navigator.appName == "Netscape" && parseInt(navigator.appVersion) < 5);
		var NSX = (navigator.appName == "Netscape");
		var IE4 = (document.all) ? true : false;
		
		for (var i=0; i < document.request_info.degree.length; i++)
			if (document.request_info.degree.options[i].value == "MM-I"){
				if (NSX){
					document.request_info.degree.options[i]=null;
				if (NS4) history.go(0);
				}else{
					document.request_info.degree.remove(i);
					}
				break;
				}
		}

function checkDegree(degree){
	if(degree == "BSN" || degree == "CONT-ED" || degree == "MAED/ADM" || degree == "MAED/AEDL" || degree == "MAED/CI" || degree == "MAED/CT" || degree == "MAED/TED-E" || degree == "MAED/TED-S" || degree == "MHA" || degree == "MSN" || degree == "MSN/MBA/HC" || degree == "MAED/SPE" || degree == "MAED/ECH" || degree == "DM" || degree == "DHA" || degree == "DBA" || degree == "EDD" ) {
		degreePopup(degree);
	}
}

// international check
function checkCountry(country){
	if(country == "CA" || country == "US" || country==""){
		//do nothing
	//} else if(country == "PK" || country == "IN"){
		//intl2Popup();
	} else {
		intlPopup(); }
}
function age23check(){
	if(document.request_info.degree.value == "AAGS" && document.request_info.military_branch[document.request_info.military_branch.selectedIndex].value != ''){
		//do nothing
	} else {
		under21Popup(showAAGS);
	}
}
//dialing codes update
var DialingCodes = new Array();

function updateDialingCode() {
	for (var i=0; i < DialingCodes.length; i+=2) {
		if (DialingCodes[i] == document.request_info.country[document.request_info.country.selectedIndex].value) {
			document.request_info.w_country_code.value = DialingCodes[i+1];
			document.request_info.h_country_code.value = DialingCodes[i+1];
			return;
		}
	}
}


function getStateCodeIndex(str) {
	for (var i=0; i < document.request_info.state.options.length; i++) 
	{	
		
		if (document.request_info.state.options[i].value == str)
		{
			return i;
		}
	}
}



function updateState() {
	if(document.request_info.country[document.request_info.country.selectedIndex].value == "CA" || document.request_info.country[document.request_info.country.selectedIndex].value == "US"|| document.request_info.country[document.request_info.country.selectedIndex].value == "MX" || document.request_info.country[document.request_info.country.selectedIndex].value==""){
		document.request_info.state.value = "";
		document.request_info.state.disabled = false; 
		document.request_info.province.value = "";
		document.request_info.province.disabled = true;
	} else if(document.request_info.country[document.request_info.country.selectedIndex].value == "AS" ||
		document.request_info.country[document.request_info.country.selectedIndex].value == "GU" ||
		document.request_info.country[document.request_info.country.selectedIndex].value == "FM" ||
		document.request_info.country[document.request_info.country.selectedIndex].value == "MP" ||
		document.request_info.country[document.request_info.country.selectedIndex].value == "PR")
	{
		document.request_info.state.options[getStateCodeIndex(document.request_info.country[document.request_info.country.selectedIndex].value)].selected = true;
		document.request_info.state.disabled = true;
		document.request_info.province.disabled = true;
	} else {
		document.request_info.state.value = "OT";   
		document.request_info.state.disabled = true;
		document.request_info.province.disabled = false;
	}
}

function updateCountryCode() {
if(document.request_info.country[document.request_info.country.selectedIndex].value == "CA" || document.request_info.country[document.request_info.country.selectedIndex].value == "US" || document.request_info.country[document.request_info.country.selectedIndex].value==""){
		document.request_info.w_country_code.disabled = true; 
		document.request_info.h_country_code.disabled = true;
	} else {
		document.request_info.w_country_code.disabled = false; 
		document.request_info.h_country_code.disabled = false;
	}
}
// make sure PR country code matches PR state code
function updatePR(){
	var cCode;
	cCode = document.request_info.state[document.request_info.state.selectedIndex].value;
	cCode = cCode.replace(/ /gi,'');
	if(cCode == "PR")
	{
	document.request_info.country[document.request_info.country.selectedIndex].value = "PR";
	updateDialingCode();
	updateCountryCode();
	}
}

/*
//use this to test -- it avoids all js validation

function VerifyAndSubmit(){
var frm = document.request_info
	frm.submit();
}
*/

function VerifyAndSubmit(){
	var frm = document.request_info
	var v = new Validator();
	// check for India or pakistan
	//if (frm.country[frm.country.selectedIndex].value == 'PK' || frm.country[frm.country.selectedIndex].value == 'IN' || frm.province.value.toLowerCase() == "india" || frm.province.value.toLowerCase() == "pakistan")
	//{
		//if (v.isValid)
		//{
			//v.raiseError("Regrettably, we are unable to extend applications to residents of your country at this time. If you'd like more information, please call us at 1-800-366-9699.");
			//frm.country.focus();
		//}
	//}
	
	if (frm.degree[frm.degree.selectedIndex].value == '')
	{
		if (v.isValid)
		{
			v.raiseError('Please select a degree.');
			frm.degree.focus();
		}
	}
	
	if (frm.country[frm.country.selectedIndex].value == '')
	{
		if (v.isValid)
		{
			v.raiseError('Please select a country.');
			frm.country.focus();
		}
	}
	if (frm.age21orover[0].checked != true && frm.age21orover[1].checked != true)
	{
		if (v.isValid)
		{
			v.raiseError('Please indicate your age upon enrollment.');
			frm.age21orover[0].focus();
		}
	}
	
	//fix for nursing and cte
	if (frm.age21orover[1].checked==true && showAAGS==0)
	{
		if (v.isValid)
		{
			under21Popup(showAAGS);
			v.isValid = false;
		}
	}
	
// check for AAGS degree and Military
	if (frm.age21orover[1].checked==true && showAAGS==1)
	{
		if (frm.degree[frm.degree.selectedIndex].value != 'AAGS' && frm.military_branch[frm.military_branch.selectedIndex].value == '')
			{
				if (v.isValid)
				{
					under21Popup(showAAGS);
					v.isValid = false;
				}
			}	
		if (frm.degree[frm.degree.selectedIndex].value == 'AAGS' && frm.military_branch[frm.military_branch.selectedIndex].value == '')
			{
				if (v.isValid)
				{
					under21Popup(showAAGS);
					v.isValid = false;
				}
			}	
		if (frm.degree[frm.degree.selectedIndex].value != 'AAGS' && frm.military_branch[frm.military_branch.selectedIndex].value != '')
			{
				if (v.isValid)
				{
					under21Popup(showAAGS);
					v.isValid = false;
				}
			}
	}

	v.validateTextChars(frm.first_name, 'First Name');
	v.validateTextChars(frm.last_name, 'Last Name');
	v.validateTextCharsLength(frm.last_name, 'Last Name');
	v.validateText(frm.street, 'Street Address');
	// verify address type is selected
	if (frm.address_type[0].checked != true && frm.address_type[1].checked != true)
	{
		if (v.isValid)
		{
			v.raiseError('Please enter your address type.');
			frm.address_type[0].focus();
		}
	}
	if (v.containsProfanity(frm.street.value))
	{
		if (v.isValid)
		{
			v.raiseError('Street Address must not contain profane content');
			frm.street.focus();
		}
	}
	v.validateText(frm.city, 'City');
	if (frm.state[frm.state.selectedIndex].value == '' && frm.province.value == '')
	{
		if (v.isValid)
		{
			v.raiseError('Please indicate your State or Province.');
			frm.state.focus();
		}
	}
	if (v.containsProfanity(frm.province.value))
	{
		if (v.isValid)
		{
			v.raiseError('State/Province must not contain profane content');
			frm.province.select();
		}
	}
	// other... 
	// note the next line excuses several from validation
	if (document.request_info.country[document.request_info.country.selectedIndex].value != "AS" && 
		document.request_info.country[document.request_info.country.selectedIndex].value != "GU" &&
		document.request_info.country[document.request_info.country.selectedIndex].value != "FM" && 
		document.request_info.country[document.request_info.country.selectedIndex].value != "MP" && 
		document.request_info.country[document.request_info.country.selectedIndex].value != "PR") {
		if (frm.state[frm.state.selectedIndex].value == 'OT' && frm.province.value.replace(/ /gi,'')== '')  // checks for blank spaces to be sure something is actually in there 
		{
			if (v.isValid)
			{
				v.raiseError('Please indicate your State or Province.');
				frm.province.focus();
			}
		}
	}
	v.validateZip(frm.postalcode, 'Zip or Postal Code');
	v.validateEmail(frm.email, 'Email Address');
	v.validateText(frm.employer, 'Employer');
	if (v.containsProfanity(frm.employer.value))
	{
		if (v.isValid)
		{
			v.raiseError('Employer must not contain profane content');
			frm.employer.select();
		}
	}
	// work country code
	v.validateCountryCode(frm.w_country_code, 'Work', frm.country[frm.country.selectedIndex].value);
	v.validatePhone(frm.w_country_code, frm.w_area, frm.w_phone, 'Work');
	// home country code
	v.validateCountryCode(frm.h_country_code, 'Home', frm.country[frm.country.selectedIndex].value);
	v.validatePhone(frm.h_country_code, frm.h_area, frm.h_phone, 'Home');
	if (v.isValid) 
	{
		for (var i=0; i<document.links.length; i++)
		{
			if (document.links[i].href.toLowerCase() == 'javascript:verifyandsubmit();')
			{
				document.links[i].href = '#';
				break;
			}
		}
		document.request_info.state.disabled = false;
		document.request_info.w_country_code.disabled = false; 
		document.request_info.h_country_code.disabled = false;
		frm.submit();
	}
	
}

// Validator Object code
//___________________________________________
 
function Validator()
{
	this.isValid = true;
	this.fullMatchProfanity = new Array('shit','piss','cunt','tits','ass');
	this.partialMatchProfanity = new Array('fuck','cocksucker','motherfucker','asshole');
	this.validNumbers = '0123456789';
	this.validPhoneCharacters = '0123456789-.';
	this.validZipCharacters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789- ';
	this.validTextCharacters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ- ';
}

new Validator();

function V_raiseError(message)
{
	if (this.isValid) alert(message);
	this.isValid = false;
}

function V_containsProfanity(field)
{
	for (var i=0; i<this.fullMatchProfanity.length; i++)
	{
		if (field.toLowerCase() == this.fullMatchProfanity[i]) return true;
	}
	for (var i=0; i<this.partialMatchProfanity.length; i++)
	{
		if (field.toLowerCase().indexOf(this.partialMatchProfanity[i]) > -1) return true;
	}
	return false;
}

function V_validateText(text, label)
{
	if (!this.isValid) return;
	if (text.value == '' || text.value.replace(/ /gi,'')=='')
	{
		this.raiseError('Please enter your ' + label);
		text.value='';
		text.focus();
	}
	else if (text.value.length < 2 || text.value.replace(/ /gi,'').length < 2)
	{
		this.raiseError(label + ' must contain two or more characters.');
		text.select();
	}
	else if (!this.isZipValid(text.value))
	{
		this.raiseError(label + ' contains invalid characters.');
		text.select();
	}
	else if (this.containsProfanity(text.value))
	{
		this.raiseError(label + ' must not contain profane content.');
		text.select();
	}
}
// for text only like first and last name
function V_validateTextChars(text, label)
{
	if (!this.isValid) return;
	if (text.value == '' || text.value.replace(/ /gi,'')=='')
	{
		this.raiseError('Please enter your ' + label);
		text.value='';
		text.focus();
	}
	else if (this.containsProfanity(text.value))
	{
		this.raiseError(label + ' must not contain profane content.');
		text.select();
	}
	else if (!this.isTextValid(text.value))
	{
		this.raiseError(label + ' contains invalid characters.');
		text.select();
	}
}

// for last name
function V_validateTextCharsLength(text, label)
{
	if (!this.isValid) return;
	if (this.isTwoCharsLong(text.value))
	{
		this.raiseError(label + ' must contain two or more characters.');
		text.select();
	}
}

// country code length
function V_validateCountryCode(countryCode, label, country)
{
	if (!this.isValid) return;
	if (country != 'US' && country != 'CA')
	{	
		if (countryCode.value.length < 2 || countryCode.value.length > 4 )
		{
			this.raiseError('Country code should have between 2 and 4 numbers.');
			countryCode.focus();
		}
	}
}

function V_validatePhone(countryCode, areaCode, phone, label)
{	
	if (!this.isValid) return;
	if (countryCode != null && countryCode.value == '')
	{
		this.raiseError(label + ' country code must not be blank.');
		countryCode.focus();
	}
	else if (areaCode.value == '' && countryCode.value == '1')
	{
		this.raiseError(label + ' area code must not be blank.');
		areaCode.focus();
	}
	else if (phone.value == '')
	{
		this.raiseError(label + ' phone number must not be blank.');
		phone.focus();
	} 
	else if (areaCode.value.length < 3 && countryCode.value == '1')
	{
		this.raiseError(label + ' area code should have at least three numbers.');
		areaCode.focus();
	}
	else if (phone.value.length < 7)
	{
		this.raiseError(label + ' phone number should have at least seven numbers.');
		phone.focus();
	}
	else if (countryCode!=null && !this.isNumeric(countryCode.value))
	{
		this.raiseError(label + ' country code should have only numbers.');
		countryCode.focus();
	}
	else if (areaCode.value == '111' || areaCode.value == '123' || areaCode.value == '222' || areaCode.value == '333' || areaCode.value == '444' || areaCode.value == '555' || areaCode.value == '666' || areaCode.value == '777' || areaCode.value == '888' || areaCode.value == '999' || areaCode.value == '911' || areaCode.value == '000')
	{
		this.raiseError(label + ' area code apears to be invalid.');
		areaCode.focus();
	}
	else if (!this.isNumeric(areaCode.value))
	{
		this.raiseError(label + ' area code should have only numbers.');
		areaCode.focus();
	}
	else if (phone.value.replace(/-/gi,'')=='1111111' || phone.value.replace(/-/gi,'')=='1234567' || phone.value.replace(/-/gi,'')=='4567890' || phone.value.replace(/-/gi,'')=='0000000' || phone.value.replace(/-/gi,'')=='2222222' || phone.value.replace(/-/gi,'')=='3333333' || phone.value.replace(/-/gi,'')=='4444444' || phone.value.replace(/-/gi,'')=='5555555' || phone.value.replace(/-/gi,'')=='6666666' || phone.value.replace(/-/gi,'')=='7777777' || phone.value.replace(/-/gi,'')=='8888888' || phone.value.replace(/-/gi,'')=='9999999' || phone.value.replace(/-/gi,'')=='00000000' || phone.value.replace(/-/gi,'')=='000000')
	{
		this.raiseError(label + ' phone number appears to be invalid.');
		phone.focus();
	}
	else if (phone.value.substring(0,3)=='111' || phone.value.substring(0,3)=='911' || phone.value.substring(0,3)=='555' || phone.value.substring(0,3)=='000')
	{
		this.raiseError(label + ' phone number appears to be invalid.');
		phone.focus();
	}
	else if (!this.isPhoneNumeric(phone.value))
	{
		this.raiseError(label + ' phone number should have only numbers.');
		phone.focus();
	}
}

function V_validateZip(zip, label)
{
	if (!this.isValid) return;
	if (zip.value == '')
	{
		this.raiseError(label + ' must not be blank.');
		zip.focus();
	}
	else if (zip.value.length < 5)
	{
		this.raiseError(label + ' must be at least five characters.');
		zip.focus();
	}
	else if (!this.isZipValid(zip.value.toLowerCase()))
	{
		this.raiseError(label + ' contains invalid characters.');
		zip.select();
	}
}

function V_validateEmail(email, label)
{
	if (!this.isValid) return;
	if (email.value == '')
	{
		this.raiseError(label + ' must not be blank.');
		email.focus();
	}
	if (email.value == 'noemail@aol.com' || email.value == 'noemail@yahoo.com' || email.value == 'noemail@hotmail.com' || email.value == 'noemail@netzero.com' || email.value == 'noemail@juno.com' || email.value == 'noemail@netscape.com' || email.value == 'noemail@prodegy.net' || email.value == 'noemail@msn.net')
	{
		this.raiseError('Please enter a valid ' + label);
		email.focus();
	}
	else if (email.value.length < 6)
	{
		this.raiseError(label + ' must be at least six characters.');
		email.focus();
	}
	// Email validation code stolen from somewhere...
	if (email.value != '')
	{
		var str = email.value;
		var instancecounter = 0;

		str += '';
		intAt = str.indexOf( '@', 1 );							// the "@"
		intDot = str.lastIndexOf( '.' );						// the last "."
		namestr = str.substring( 0, intAt );  					// everything before the "@"
		domainstr = str.substring( intAt +1, str.length ); 		// everything after the "@"

		if ((str.indexOf(" ")!=-1) || (intAt == -1) || (intDot == -1 ) || (namestr.length == 0) || (domainstr.length == 0) || (intAt > intDot) || (domainstr.indexOf(".") <= 0))
		{
			this.raiseError(label + ' appears to be invalid.');
			email.select();
		} else {
			// iterate through email address checking for
			// more than 1 @ sysmbol, or none at all
			for ( i = 0; i < str.length; i++ ) {
				if ((str.substring(i,i+1)) == "@" ) {
					instancecounter = instancecounter + 1;
				}
			}

			// Check to see if we have none, or more than one @ symbol
			if ((instancecounter > 1) || (instancecounter == 0 )) {
				this.raiseError(label + ' appears to be invalid.');
				email.select();
			}
		}
	}
}

function V_isNumeric(field)
{
	for (var i=0; i<field.length; i++)
	{
		if (this.validNumbers.indexOf(field.charAt(i),0) == -1) return false;
	}
	return true;
}

function V_isPhoneNumeric(field)
{
	for (var i=0; i<field.length; i++)
	{
		if (this.validPhoneCharacters.indexOf(field.charAt(i),0) == -1) return false;
	}
	return true;
}

function V_isZipValid(field)
{
	for (var i=0; i<field.length; i++)
	{
		if (this.validZipCharacters.indexOf(field.charAt(i),0) == -1) return false;
	}
	return true;
}

function V_isTextValid(field)
{
	for (var i=0; i<field.length; i++)
	{
		if (this.validTextCharacters.indexOf(field.charAt(i),0) == -1) return false;
	}
	return true;
}

function V_isTwoCharsLong(field)
{
	for (var i=0; i<field.length; i++)
	{
		if (i>0) return false;
	}
	return true;
}

Validator.prototype.raiseError = V_raiseError;
Validator.prototype.validateText = V_validateText;
Validator.prototype.validateTextChars = V_validateTextChars;
Validator.prototype.validateTextCharsLength = V_validateTextCharsLength;
Validator.prototype.validateCountryCode = V_validateCountryCode;
Validator.prototype.validatePhone = V_validatePhone;
Validator.prototype.validateZip = V_validateZip;
Validator.prototype.isNumeric = V_isNumeric;
Validator.prototype.isZipValid = V_isZipValid;
Validator.prototype.isTextValid = V_isTextValid;
Validator.prototype.isTwoCharsLong = V_isTwoCharsLong;
Validator.prototype.isPhoneNumeric = V_isPhoneNumeric;
Validator.prototype.validateEmail = V_validateEmail;
Validator.prototype.containsProfanity = V_containsProfanity;


/* :::::: FORM FUNCTIONALITY :::::: */
// auto tab phone number fields
function autoTab(from, to) {
	var fromField = from
	var toField = to
	var fieldLength = eval('document.request_info.' + fromField + '.value.length');
	if (fieldLength == 3) {
		eval('document.request_info.' + toField + '.focus();');
	}	
}