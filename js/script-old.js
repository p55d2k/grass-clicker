var root = document.documentElement;

var clickamt = 1;
var efclick = 1;

var antautoclickers = 0;
var humanautoclickers = 0;
var alienautoclickers = 0;

var auntydiscountamt = 0;
var amtefauto = 0;
var amtefclick = 0;
var evbet = 0;
var evevbet = 0;
var mosteff = 0;

var grasscount = 0;
var persecond = 0;
var pricemultiplier = 1.1;

var grasscountelement = document.getElementById("grasscount");
var persecondcountelement = document.getElementById("persecondcount");

var antautoclickelement = document.getElementById("antautodesc");
var humanautoclickelement = document.getElementById("humanautodesc");
var alienautoclickelement = document.getElementById("alienautodesc");

var auntydiscountelement = document.getElementById("auntydiscamt");
var moreclickelement = document.getElementById("moredesc");
var efficientautoelement = document.getElementById("efauto");
var efficientclickelement = document.getElementById("efclick");
var everythingbetterelement = document.getElementById("geneff");
var everythingevenbetterelement = document.getElementById("effteff");
var mostefficientelement = document.getElementById("effteff");

var antautoclickpriceelement = document.getElementById("antautoclickerprice");
var humanautoclickpriceelement = document.getElementById("humanautoclickerprice");
var alienautoclickpriceelement = document.getElementById("alienautoclickerprice");

var auntydiscountpriceelement = document.getElementById("auntydiscountprice");
var moreclickpriceelement = document.getElementById("moreclickerprice");
var efficientautopriceelement = document.getElementById("efficiantautosprice");
var efficientclickpriceelement = document.getElementById("efficiantclicksprice");
var everythingbetterpriceelement = document.getElementById("everythingbetterprice");
var everythingevenbetterpriceelement = document.getElementById("everythingevenbetterprice");
var mostefficientpriceelement = document.getElementById("mostefficientprice");

var errormessageelement = document.getElementById("error");

var audio = new Audio("https://cdn.pixabay.com/download/audio/2022/03/10/audio_49a54d836e.mp3?filename=item-pick-up-38258.mp3");

var antautoclickprice = 30;
var humanautoclickprice = 150;
var alienautoclickprice = 7500;

var auntydiscountprice = 75;
var moreclickprice = 100;
var efficientautoprice = 500;
var efficientclickprice = 1000;
var everythingbetterprice = 5000;
var everythingevenbetterprice = 15000;
var mostefficientprice = 1000000;

var previousInterval;

function auntydiscountfunc() {
    if (grasscount > auntydiscountprice) {
        grasscountelement -= auntydiscountprice;

        antautoclickprice *= 0.95;
        antautoclickprice = Math.floor(antautoclickprice);

        humanautoclickprice *= 0.95;
        humanautoclickprice = Math.floor(humanautoclickprice);

        alienautoclickprice *= 0.95;
        alienautoclickprice = Math.floor(alienautoclickprice);

        moreclickprice *= 0.95;
        moreclickprice = Math.floor(moreclickprice);

        efficientautoprice *= 0.95;
        efficientautoprice = Math.floor(efficientautoprice);

        efficientclickprice *= 0.95;
        efficientclickprice = Math.floor(efficientclickprice);

        everythingbetterprice *= 0.95;
        everythingbetterprice = Math.floor(everythingbetterprice);

        everythingevenbetterprice *= 0.95;
        everythingevenbetterprice = Math.floor(everythingevenbetterprice);

        mostefficientprice *= 0.95;
        mostefficientprice = Math.floor(mostefficientprice);

        auntydiscountprice *= 0.95;
        auntydiscountprice = Math.floor(auntydiscountprice);

        humanautoclickpriceelement.innerText = humanautoclickprice;
        alienautoclickpriceelement.innerText = alienautoclickprice;
        moreclickpriceelement.innerText = moreclickprice;
        antautoclickpriceelement.innerText = antautoclickprice;
        efficientclickpriceelement.innerText = efficientclickprice;
        efficientautopriceelement.innerText = efficientautoprice;
        everythingbetterpriceelement.innerText = everythingbetterprice;
        everythingevenbetterpriceelement.innerText = everythingevenbetterprice;
        mostefficientpriceelement.innerText = mostefficientprice;
        auntydiscountpriceelement.innerText = auntydiscountprice;

        auntydiscountamt++;
        grasscountelement.innerText = grasscount;
        auntydiscountelement.innerText = "Amount: " + auntydiscountamt;

        playSound();
    } else noGrass();
}

function addersAndCheckWin() {
    if (grasscount == Infinity) {
        alert("You win!");
        window.location.href = "https://www.youtube.com/watch?v=klfT41uZniI";
    }
    if (persecond == 0) return;
    grasscount++;
    grasscountelement.innerText = grasscount;
}

function playSound() {
    audio.play();
}

function noGrass() {
    error.classList.add("errorisshown");
    setTimeout(function () {
        error.classList.remove("errorisshown");
    }, 1200);
}

function grassclick() {
    grasscount += clickamt * efclick;
    grasscountelement.innerText = grasscount;
}

function antautoclick() {
    if (grasscount >= antautoclickprice) {
        playSound();
        grasscount -= antautoclickprice;
        persecond += 0.5;
        antautoclickers++;
        grasscountelement.innerText = grasscount;
        antautoclickelement.innerText = "Amount: " + antautoclickers;
        antautoclickprice *= pricemultiplier;
        antautoclickprice = Math.floor(antautoclickprice);
        antautoclickpriceelement.innerText = antautoclickprice;
        persecondcountelement.innerText = persecond;
        clearInterval(previousInterval);
        previousInterval = setInterval(addersAndCheckWin, (1 / persecond) * 1000);
    } else noGrass();
}

function humanautoclick() {
    if (grasscount >= humanautoclickprice) {
        playSound();
        grasscount -= humanautoclickprice;
        persecond += 5;
        humanautoclickers++;
        grasscountelement.innerText = grasscount;
        humanautoclickelement.innerText = "Amount: " + humanautoclickers;
        humanautoclickprice *= pricemultiplier;
        humanautoclickprice = Math.floor(humanautoclickprice);
        humanautoclickpriceelement.innerText = humanautoclickprice;
        persecondcountelement.innerText = persecond;
        clearInterval(previousInterval);
        previousInterval = setInterval(addersAndCheckWin, (1 / persecond) * 1000);
    } else noGrass();
}

function alienautoclick() {
    if (grasscount >= alienautoclickprice) {
        playSound();
        grasscount -= alienautoclickprice;
        persecond += 300;
        alienautoclickers++;
        grasscountelement.innerText = grasscount;
        alienautoclickelement.innerText = "Amount: " + alienautoclickers;
        alienautoclickprice *= pricemultiplier;
        alienautoclickprice = Math.floor(alienautoclickprice);
        alienautoclickpriceelement.innerText = alienautoclickprice;
        persecondcountelement.innerText = persecond;
        clearInterval(previousInterval);
        previousInterval = setInterval(addersAndCheckWin, (1 / persecond) * 1000);
    } else noGrass();
}

function moreclick() {
    if (grasscount >= moreclickprice) {
        playSound();
        grasscount -= moreclickprice;
        clickamt++;
        grasscountelement.innerText = grasscount;
        moreclickelement.innerText = "Amount: " + (clickamt - 1);
        moreclickprice *= pricemultiplier;
        moreclickprice = Math.floor(moreclickprice);
        moreclickpriceelement.innerText = moreclickprice;
    } else noGrass();
  }

  function effclick() {
    if (grasscount >= efficientclickprice) {
      playSound();
      grasscount -= efficientclickprice;
      efclick++;
      amtefclick++;
      grasscountelement.innerText = grasscount;
      efficientclickelement.innerText = "Amount: " + amtefclick;
      efficientclickprice *= pricemultiplier;
      efficientclickprice = Math.floor(efficientclickprice);
      efficientclickpriceelement.innerText = efficientclickprice;
    } else noGrass();
  }

  function effauto() {
    if (grasscount >= efficientautoprice) {
      playSound();
      grasscount -= efficientautoprice;
      efauto++;
      amtefauto++;
      grasscountelement.innerText = grasscount;
      efficientautoelement.innerText = "Amount: " + amtefauto;
      efficientautoprice *= pricemultiplier;
      efficientautoprice = Math.floor(efficientautoprice);
      efficientautopriceelement.innerText = efficientautoprice;
      persecondcountelement.innerText = persecond;
    } else noGrass();
  }

  function geneff() {
    if (grasscount >= everythingbetterprice) {
      playSound();
      grasscount -= everythingbetterprice;
      efauto *= 3;
      persecond *= 3;
      evbet += 1;
      grasscountelement.innerText = grasscount;
      everythingbetterelement.innerText = "Amount: " + evbet;
      everythingbetterprice *= pricemultiplier;
      everythingbetterprice = Math.floor(everythingbetterprice);
      everythingbetterpriceelement.innerText = everythingbetterprice;
      persecondcountelement.innerText = persecond;
    } else noGrass();
}

function effteff() {
    if (grasscount >= mostefficientprice) {
      playSound();
      grasscount -= mostefficientprice;
      efauto *= 100;
      persecond *= 100;
      mosteff += 1;
      grasscountelement.innerText = grasscount;
      mostefficientelement.innerText = "Amount: " + evevbet;
      mostefficientprice *= pricemultiplier;
      mostefficientprice = Math.floor(mostefficientprice);
      mostefficientpriceelement.innerText = mostefficientprice;
      persecondcountelement.innerText = persecond;
    } else noGrass();
}

function teff() {
    if (grasscount >= everythingevenbetterprice) {
        playSound();
        grasscount -= everythingevenbetterprice;
        efauto *= 10;
        persecond *= 10;
        evevbet += 1;
        grasscountelement.innerText = grasscount;
        everythingevenbetterelement.innerText = "Amount: " + mosteff;
        everythingevenbetterprice *= pricemultiplier;
        everythingevenbetterprice = Math.floor(everythingevenbetterprice);
        everythingevenbetterpriceelement.innerText = everythingevenbetterprice;
        persecondcountelement.innerText = persecond;
    } else noGrass();
}
