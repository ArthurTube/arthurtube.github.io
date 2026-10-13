<!--

function turnOn(imageName){
	if(document.images){
	document.images[imageName].src=eval(imageName + "over.src")
	}
}
function turnOff(imageName){
	if(document.images){
	document.images[imageName].src=eval(imageName + "off.src")
	}
}
//preload script for top navigation --
if(document.images){
	img1over = new Image();
	img1over.src = "images/degrees-over.jpg";
	img1off = new Image();
	img1off.src = "images/degrees.jpg";
	img2over = new Image();
	img2over.src = "images/how-over.jpg";
	img2off = new Image();
	img2off.src = "images/how.jpg";
	img3over = new Image();
	img3over.src = "images/teaches-over.jpg";
	img3off = new Image();
	img3off.src = "images/teaches.jpg";
	img4over = new Image();
	img4over.src = "images/attends-over.jpg";
	img4off = new Image();
	img4off.src = "images/attends.jpg";
	img5over = new Image();
	img5over.src = "images/catalog-over.gif";
	img5off = new Image();
	img5off.src = "images/catalog.gif";
	close1over = new Image();
	close1over.src = "images/close-over1.gif";
	close1off = new Image();
	close1off.src = "images/close1.gif";
	// red site
	img1Rover = new Image();
	img1Rover.src = "images/degrees-over_red.jpg";
	img1Roff = new Image();
	img1Roff.src = "images/degrees_red.jpg";
	img2Rover = new Image();
	img2Rover.src = "images/how-over_red.jpg";
	img2Roff = new Image();
	img2Roff.src = "images/how_red.jpg";
	img3Rover = new Image();
	img3Rover.src = "images/teaches-over_red.jpg";
	img3Roff = new Image();
	img3Roff.src = "images/teaches_red.jpg";
	img4Rover = new Image();
	img4Rover.src = "images/attends-over_red.jpg";
	img4Roff = new Image();
	img4Roff.src = "images/attends_red.jpg";
	close1Rover = new Image();
	close1Rover.src = "images/close.gif";
	close1Roff = new Image();
	close1Roff.src = "images/close-over1.gif";
	// brown site
	img1Bover = new Image();
	img1Bover.src = "images/degrees-over_brown.jpg";
	img1Boff = new Image();
	img1Boff.src = "images/degrees_red.jpg";
	img2Bover = new Image();
	img2Bover.src = "images/how-over_brown.jpg";
	img2Boff = new Image();
	img2Boff.src = "images/how_red.jpg";
	img3Bover = new Image();
	img3Bover.src = "images/teaches-over_brown.jpg";
	img3Boff = new Image();
	img3Boff.src = "images/teaches_red.jpg";
	img4Bover = new Image();
	img4Bover.src = "images/attends-over_brown.jpg";
	img4Boff = new Image();
	img4Boff.src = "images/attends_red.jpg";
	close1Bover = new Image();
	close1Bover.src = "images/close.gif";
	close1Boff = new Image();
	close1Boff.src = "images/close-over1.gif";
}
//zip form
function checkVal(zipValue) {
	if (document.formZip.zip.value.length < 3) {
		alert("Please enter a valid zip code.");
	} else {
		document.formZip.zip.value = document.formZip.zip.value.replace(/ /gi,'');
		document.formZip.zip.value = document.formZip.zip.value.replace(/\./gi,'');
		document.formZip.action = "ZipLookUp.aspx?" + zipValue;
		document.formZip.submit();
	}
}

//locations form
function getLocation(newlocation) {
		document.frmLocations.action = "location.aspx?p=campusLocations&location=" + newlocation;
		document.frmLocations.method = "POST";
		document.frmLocations.submit();
	}

function openprivacy(){
var n=open("Static.aspx?p=privacy","PrivacyWin","width=350,height=350,location=no,menubar=no,directories=no,toolbar=no,scrollbars=yes,resizable=no,status=no");
n.focus();
}
// :::::: !!!CHANGE WIDTH & HEIGHT HERE!!! ::::::
var globalHeight = "500"
var globalWidth = "494"

//-- pop up function for the form
function index_pop(myDegree) {
    popWin = window.open("form.aspx?p=form",'formPage','toolbar=no,location=0,directories=0,status=0,menubar=no,scrollbars=yes,resizable=no,width=' + globalWidth + ',height=' + globalHeight);
    popWin.focus();
}

//degree pop window
function degreePopup(degree) {
   	degreeWin = window.open('default.aspx?p=degreePop&degree=' + degree,'degree','left=0,top=180,screenX=0,screenY=180,location=0,toolbar=no,directories=0,status=no,menubar=no,scrollbars=yes,resizable=no,width=402,height=300');
	degreeWin.focus()
}

//international popup
function intlPopup() {
	try{
   	intlWin = window.open('international.asp','intl','left=0,top=180,screenX=0,screenY=180,toolbar=no,location=0,directories=0,status=no,menubar=no,scrollbars=no,resizable=no,width=600,height=335');
	intlWin.focus()
	}catch ( e){}
}

// check for india or pakistan
function intl2Popup() {
   	intl2Win = window.open('default.aspx?p=unable','intl2','left=0,top=180,screenX=0,screenY=180,toolbar=no,location=0,directories=0,status=no,menubar=no,scrollbars=no,resizable=no,width=300,height=300');
	intl2Win.focus()
}

//under 23
 function under21Popup(showAAGS) {
	try{
   	under21Win = window.open('under21.asp','onlUnder21','left=0,top=180,screenX=0,screenY=180,location=0,toolbar=no,directories=0,status=no,menubar=no,scrollbars=no,resizable=no,width=300,height=300');
	under21Win.focus();
	}catch ( e){}
   }

 function under3YearsPopup() {
   	under3YearsWin = window.open('/under_3_years.asp','onlUnder3years','left=0,top=180,screenX=0,screenY=180,location=0,toolbar=no,directories=0,status=no,menubar=no,scrollbars=no,resizable=no,width=510,height=360');
	under3YearsWin.focus();
   }
  function PopWin() {
	detailWin = window.open('default.aspx?p=privacy',"myPopWin","directories=no,height=350,left=0,top=180,screenX=0,screenY=180,location=no,menubar=no,resizable=no,scrollbars=yes,status=no,toolbar=no,width=350,top=0,left=0");
	detailWin.focus();
	}
  function intAdmissions() {
	detailWin = window.open('default.aspx?p=intAdmissions',"myPopWin","directories=no,height=350,left=0,top=180,screenX=0,screenY=180,location=no,menubar=no,resizable=no,scrollbars=yes,status=no,toolbar=no,width=600,top=0,left=0");
	detailWin.focus();
	}
  function tuition() {
	detailWin = window.open('default.aspx?p=tuition',"myPopWin","directories=no,height=350,left=0,top=180,screenX=0,screenY=180,location=no,menubar=no,resizable=no,scrollbars=yes,status=no,toolbar=no,width=600,top=0,left=0");
	detailWin.focus();
	}
// -->