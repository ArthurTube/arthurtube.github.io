<!--//

function PromptDefaultHomePage(){
	var c_strHomeURL1 = "http://www.bonzi.com/bonzibuddy/home.asp";
	var c_strHomeURL2 = "http://bonzibuddy.nbci.com/bonzibuddy/home.asp";
	var c_strHomeURL3 = "http://www.bonzi.com/";
	var c_strHomeURL4 = "http://www.bonzi.com/bonzibuddy/startpage.asp";
	var c_strHomeURL5 = "http://www.bonzi.com/myhome.asp";
	var blnVerifyHome1 = false;
	var blnVerifyHome2 = false;
	var blnVerifyHome3 = false;
	var blnVerifyHome4 = false;
	var blnVerifyHome5 = false;
	var blnAnswer;	
	
	//See if they already have the homepage set as default
	blnVerifyHome1 = oHomePage.isHomePage(c_strHomeURL1);
	blnVerifyHome2 = oHomePage.isHomePage(c_strHomeURL2);
	blnVerifyHome3 = oHomePage.isHomePage(c_strHomeURL3);
	blnVerifyHome4 = oHomePage.isHomePage(c_strHomeURL4);
	blnVerifyHome5 = oHomePage.isHomePage(c_strHomeURL5);

	//If they have any home pages currently set
	if (blnVerifyHome1 == false && blnVerifyHome2 == false && blnVerifyHome3 == false && blnVerifyHome4 == false && blnVerifyHome5 == false) {	
		//blnAnswer = confirm("Thank you for visiting BONZI.COM!  As a token of our appreciation, we would like to offer you the ability to make our home, your home now -- FREE! You will get the latest news, weather, stocks, horoscopes, games, etc.. at your new home -- FREE!  Plus, you will be entitled to the BonziBUDDY Web Compass Software -- FREE! You will never feel lost on the Internet again!");	
		//if (blnAnswer){
			SetStartPage();	
		//}
	}
	//return blnAnswer;	
}

function SetStartPage(){	
	var c_strHomeURL = "http://www.bonzi.com/myhome.asp";
	var blnVerifyHome;		
	
	oHomePage.setHomePage(c_strHomeURL);
	blnVerifyHome = oHomePage.isHomePage(c_strHomeURL);
	if (blnVerifyHome == true) {
		window.open("http://www.bonzi.com/myhome.asp?myhometrue=true");	
	}
}

//--> 