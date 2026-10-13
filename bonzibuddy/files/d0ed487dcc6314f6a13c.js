<!--//

function SetCookie_Advert2(NameOfCookie, value, expirehours) { 
	var ExpireDate = new Date (); 
	ExpireDate.setTime(ExpireDate.getTime() + (expirehours * 3600 * 1000)); 
	document.cookie = NameOfCookie + "=" + escape(value) + ((expirehours == null) ? "" : "; expires=" + ExpireDate.toGMTString()) + 	"; path=/;" ; 
}

function DisplayAd_BidClix() {
	var c_BCCookie = "AdBidClixPop_Entertain";
	var lngrem = new Number((Math.floor(99999999 * Math.random())+1) % 3);
	
	// split deciscion on popups		
	if (lngrem>>0){			//Entertainment-Optimized(O)#4434:				
		document.write('<SCR'+'IPT SRC="http://bidclix.net/js/pop.jsp?nl=5&pID=4434&cat=31&pop=1&excID=&templateID=62&h=600&w=750&opt=1&gId=11" LANGUAGE="JavaScript1.1"');
		document.write('></SCRIPT>');
	}else{							//Entertainment-Unoptimized(U) #4452:			
		document.write('<SCR'+'IPT SRC="http://bidclix.net/js/pop.jsp?nl=5&pID=4452&cat=31&pop=1&excID=&templateID=62&h=600&w=750" LANGUAGE="JavaScript1.1"');
		document.write('></SCRIPT>');		
	}	
}

function DisplayAd_N2P() {
	var doc=document;  var url=escape(doc.location.href); var date_ob=new Date();
	doc.cookie='h2=o; path=/;';var bust=date_ob.getSeconds();
	if(doc.cookie.indexOf('e=llo') <= 0 && doc.cookie.indexOf('2=o') > 0){
	doc.write('<scr'+'ipt language="javascript" src="http://media.fastclick.net');
	doc.write('/w/pop.cgi?sid=5819&m=2&v=1.7e&u='+url+'&c='+bust+'"></scr'+'ipt>');
	date_ob.setTime(date_ob.getTime()+43200000);
	doc.cookie='he=llo; path=/; expires='+ date_ob.toGMTString();}
}

function DisplayAd_AdServer() {	
	var date_ob=new Date();
	if(document.cookie.indexOf('_16_2')<=0){ 
	 document.write('<scr'+'ipt language="javascript" src="http://z1.adserver.com/w/cp.x;rid=32;tid=2;ev=1;dt=1;ac=16;c=598;"></scr'+'ipt>');
	 date_ob.setTime(date_ob.getTime()+(1000*60*60*720));
	 document.cookie='p_16_2=1; path=/; expires='+ date_ob.toGMTString();
	}
}

function DisplayAd_Advert2() {
	if (document.cookie.indexOf('AdComPop72284')==-1) 
	{ 
		SetCookie_Advert2("AdComPop72284","yes",24);
		var bnum=new Number(Math.floor(99999999 * Math.random())+1);
		document.write('<SCR'+'IPT LANGUAGE="JavaScript" '); 
		document.write(' SRC="http://servedby.advertising.com/pops=6/site=72284/bnum='+bnum+'"></SCR'+'IPT>'); 
	} 
}

function DisplayAd_Advert(intDaysOfFrequency, cookieName) {
	var cookieExpiration = new Date()
	var cookieValue = getCookie(cookieName)
	
	if (intDaysOfFrequency != 0)
		cookieExpiration = ReturnDate(intDaysOfFrequency);
	else
		cookieExpiration = null;		
	if (!cookieValue) {	
		// Advertising.com
		var bnum=new Number(Math.floor(99999999 * Math.random())+1); 
		document.write('<SCR'+'IPT LANGUAGE="JavaScript" '); 
		document.write('SRC="http://servedby.advertising.com/site=72284/bnum='+bnum+'/pops=6"></SCR'+'IPT>');
		// ***************			
		cookieValue = "http://www.bonzi.com/bonziportal/";
		setCookie(cookieName, cookieValue, cookieExpiration);
	}
}

function DisplayAd(strAd, intDaysOfFrequency, intGiveFocus, cookieName, intW, intH, intScroll){
	var cookieExpiration = new Date()
	var adWindow
	var cookieValue = getCookie(cookieName)
	var strSize1
	var strWidth
	var strHeight
	var strTitle = "Special Offer"
	
	if (intDaysOfFrequency != 0)
		cookieExpiration = ReturnDate(intDaysOfFrequency);
	else
		cookieExpiration = null;
		
	if ((intW == 0) || (intH == 0)) {
		strWidth = "width=240";
		strHeight = "height=240";
	}
	else {
		strWidth = "width=" + intW;
		strHeight = "height=" + intH;
	}
			
	//If cookie doesn't exist or has expired, show ad, and create and set cookie.
	if (!cookieValue) {
	
		//If using scrolling ads
		if (intScroll == 1) {
			adWindow = ScrollAd(strAd, strTitle, intGiveFocus, intW, intH);
		}
		else {
			adWindow = window.open(strAd,"",strWidth + "," + strHeight + ",scrollbars=no,status=no,menubar=no,toolbar=no,resizable=no");	
			if (intGiveFocus == 1) {
				adWindow.focus();
				self.blur();
				}
			else {
				adWindow.blur();
				self.focus();
			}
		}	// End If (intScroll == 1)
		
		cookieValue = strAd
		setCookie(cookieName, cookieValue, cookieExpiration)
		
	}	// End If (!cookieValue)
}	//End DisplayAd()


function DisplayAd2(strAd, intDaysOfFrequency, intGiveFocus, cookieName, intW, intH, intScroll){
	var cookieExpiration = new Date()
	var adWindow
	var cookieValue = getCookie(cookieName)
	var strSize1
	var strWidth
	var strHeight
	var strTitle = "Special Offer"
	
	if (intDaysOfFrequency != 0)
		cookieExpiration = ReturnDate(intDaysOfFrequency);
	else
		cookieExpiration = null;
		
	if ((intW == 0) || (intH == 0)) {
		strWidth = "width=240";
		strHeight = "height=240";
	}
	else {
		strWidth = "width=" + intW;
		strHeight = "height=" + intH;
	}
			
	//If cookie doesn't exist or has expired, show ad, and create and set cookie.
	if (!cookieValue) {
	
		//If using scrolling ads
		if (intScroll == 1) {
			adWindow = ScrollAd(strAd, strTitle, intGiveFocus, intW, intH);
		}
		else {
			adWindow = window.open(strAd,"",strWidth + "," + strHeight + ",scrollbars=yes,status=yes,menubar=no,toolbar=no,resizable=yes");	
			if (intGiveFocus == 1) {
				adWindow.focus();
				self.blur();
				}
			else {
				adWindow.blur();
				self.focus();
			}
		}	// End If (intScroll == 1)
		
		cookieValue = strAd
		setCookie(cookieName, cookieValue, cookieExpiration)
		
	}	// End If (!cookieValue)
}	//End DisplayAd2()


//******************************************************
// SCROLL-UP FRAMELESS WINDOW CODE
//******************************************************

//PAGE SCOPE VARS
// set horizontal and vertical offsets from screen edge (in pixles)
var Xoffset=0;
var Yoffset=0;
var Xmode="right";
var moveStep=3;
var moveSpeed=1;
var windowX = 0;
var windowY = 0;		
var windowYnow = 0;
var windowYstop = 0;	
var beIE;
var PFW;
//******************************************************

function ScrollAd(strAd, strTitle, intGiveFocus, intW, intH){
	
	//DECLARE & INIT LOCAL VARS	
	var strIEArgs = "width=0,height=0";
	var strNotIEArgs = "width="+intW+",height="+intH;
	var blnAutoClose = true;
	var intGiveFocus = 0;
	
	
	//INIT PAGE LEVEL VARS
	windowX = screen.width-intW;
	windowY = screen.height;
	if (Xmode=="left") windowX=Xoffset;
	if (Xmode=="right") windowX=screen.availWidth-intW;	
	windowYnow = screen.availHeight;
	windowYstop = windowYnow-(intH + Yoffset);	
	beIE = document.all?true:false;	
	
  if (beIE){
    PFW = window.open("","popFrameless","fullscreen,"+strIEArgs);
    PFW.blur();
    window.focus();
	PFW.resizeTo(intW,intH);
	PFW.moveTo(windowX,windowY); 
	 
	var frameString=""+
		"<html>"+
		"<head>"+
		"<title>"+strTitle+"</title>"+
		"</head>"+
		"<frameset rows='*,0' framespacing=0 border=0 frameborder=0>"+
		"<frame name='top' src='"+strAd+"' scrolling='no' MARGINWIDTH='0' MARGINHEIGHT='0'>"+		
		"</frameset>"+
		"</html>";		
		//"<frame name='bottom' src='' scrolling='no'>"+
    PFW.document.open();
    PFW.document.write(frameString);
    PFW.document.close();
  } else {
    PFW=window.open(strAd,"popFrameless","scrollbars,"+strNotIEArgs);
    PFW.blur();
    window.focus();
    PFW.moveTo(windowX,windowY);
    PFW.resizeTo(intW,intH);
  }
  PFW.focus();
  if (blnAutoClose){
    window.onunload = function(){PFW.close()};
  }
  //scroll into view
  movePFW();
  return PFW;
}
//******************************************************

function movePFW(){
  if (document.all){
    if (windowYnow>windowYstop){
      PFW.moveTo(windowX,windowYnow);
      PFW.focus();
      windowYnow=windowYnow-moveStep;
      timer=setTimeout("movePFW()",moveSpeed);
    }else{
      clearTimeout(timer);
      //ScrollAd("http://images.bonzi.com/internetalert/ia9pop.asp", "InternetALERT", 1, 610, 2200);
      //PFW.moveTo(windowX,windowYstop);
      //PFW.focus();
    }
  }else{
    PFW.moveTo(windowX,windowYstop);
  }
}
 
	var strCookieName = "bonziportalpop"
	var strCookie = "bonziiasnew"	
	//change the following value to change the frequency of the popups in days.
	var intPopupFrequencyDays = 1	//Set to 0 to have ad popup every visit
	//change following to determine ad placement in front or behind.
	var intGiveFocus = 0  //1 for in front, 0 for behind
	//change following to change the ad or html page that is displayed
	var strAd = "http://images.bonzi.com/images/partners/memturbo/720x300speedbar.htm"
	var intWidth = 720
	var intHeight = 300
	var intScrollingAd = 0	//1 for windowless scroll-up, 0 for normal popup
	
	//DisplayAd(strAd, intPopupFrequencyDays, intGiveFocus, strCookieName, intWidth, intHeight, intScrollingAd);	
	//DisplayAd_AdServer();
	
		
//-->