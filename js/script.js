let grass = 0;

let grassperclick = 1;
let grasspersecond = 0;
let grassclickmultiplier = 1;

let grasscount = document.getElementById("grasscount");
let persecond = document.getElementById("persecondcount");

let buysfx = new Audio("sfx/buttonpress.mp3");
buysfx.volume = 0.8;

let errorbuyingsfx = new Audio("sfx/errorbuying.mp3");
errorbuyingsfx.volume = 0.8;

let grasssfx = new Audio("sfx/grass.mp3");
grasssfx.volume = 0.8;

let bgmusic = new Audio("sfx/bgmusic.mp3");
bgmusic.loop = true;
bgmusic.volume = 0.07;
bgmusic.play();

async function getdata() {
    return await fetch("../json/data.json").then(res => res.json());
}

function simplest(strrr) {
    let smpstr = strrr.split(" ");
    let arr = smpstr.map(substring => substring.toLowerCase());
    return arr.join("");
}

let error = document.getElementById("error");
let previousInterval;
function buy(id) {
    if (unlocked[id] == false) {
        errorbuyingsfx.play();
        error.innerText = "You don't have enough grass!";
        error.classList.add("errorisshown");
        setTimeout(function () {
            error.classList.remove("errorisshown");
        }, 1200);
    } else {
        grass -= prices[id];
        buysfx.play();  
        if (id == 0) {  
            grasspersecond += 0.5;
            resetinterval();
        } else if (id == 1) {
            grassperclick++;
        } else if (id == 2) {
            grasspersecond += 4;
            resetinterval();
        } else if (id == 3) {
            grasspersecond *= 1.5;
            grasspersecond = Math.round(grasspersecond * 100) / 100;
            resetinterval();
        } else if (id == 4) {
            grassperclick += 10;
        } else if (id == 5) {
            grassclickmultiplier *= 1.5;
            grassclickmultiplier = Math.round(grassclickmultiplier * 100) / 100;
        } else if (id == 6) {
            grasspersecond *= 2;
            grasspersecond = Math.round(grasspersecond * 100) / 100;
            grassclickmultiplier *= 2;
            grassclickmultiplier = Math.round(grassclickmultiplier * 100) / 100;
            resetinterval();
        } else if (id == 7) {
            grassperclick += 50;
        } else if (id == 8) {
            grasspersecond *= 5;
            grasspersecond = Math.round(grasspersecond * 100) / 100;
            grassclickmultiplier *= 5;
            grassclickmultiplier = Math.round(grassclickmultiplier * 100) / 100;
            resetinterval();
        } else if (id == 9) {
            grasspersecond *= 10;
            grasspersecond = Math.round(grasspersecond * 100) / 100;
            grassclickmultiplier *= 10;
            grassclickmultiplier = Math.round(grassclickmultiplier * 100) / 100;
            resetinterval();
        } else if (id == 10) {
            grasspersecond += 150;
            resetinterval();
        } else if (id == 11) {
            grasspersecond += 500;
            resetinterval();
        } else if (id == 12) {
            grasspersecond += 1000;
            grassclickmultiplier += 1000;
            resetinterval();
        }
        updateamt(id);
        updateprice(id);
        checkunlocks();
        grass = Math.round(grass);
        grasscount.innerText = grass;
        persecond.innerText = grasspersecond;
    }
}

function updateamt(id) {
    amt[id]++;
    amtelements[id].innerText = amt[id];
}

function updateprice(id) {
    prices[id] = Math.round(prices[id] * multipliers[id]);
    priceelements[id].innerText = prices[id];
}

function resetinterval() {
    clearInterval(previousInterval);
    if (grasspersecond != 0)
        previousInterval = setInterval(addgrassandcheck, (1 / grasspersecond) * 1000);
}

function grassclick() {
    grasssfx.play();
    grass += grassperclick * grassclickmultiplier;
    grass = Math.round(grass);
    grasscount.innerText = grass;
    checkunlocks();
} 

function checkunlocks() {
    for (let i = 0; i < prices.length; i++) {
        if (grass >= prices[i]) {
            unlocked[i] = true;
        } else {
            unlocked[i] = false;
        }
    }
    for (let i = 0; i < buttons.length; i++) {
        if (unlocked[i] == true) {
            buttons[i].classList.add("unlocked");
            buttons[i].classList.remove("locked");
        } else {
            buttons[i].classList.remove("unlocked");
            buttons[i].classList.add("locked");
        }
    }
}

function updateprices() {
    for (let i = 0; i < prices.length; i++) {
        priceelements[i].innerText = prices[i];
    }
}

function addgrassandcheck() {
    grass++;
    grasscount.innerText = grass;
    if (grass == Infinity) {
        alert("You have reached Infinity grass! You win!");
        window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
        reset();
    } else if (grass == NaN) {
        reset();
    } checkunlocks();
}

let amtelements = []; let amt = [];
let priceelements = []; let prices = [];
let multipliers = []; let unlocked = [];
let buttons = [];
let container = document.getElementById("inject");
grasscount.innerText = grass;
persecond.innerText = grasspersecond;
getdata().then(data => {
    const items = Object.values(data);
    items.sort((a, b) => a.id - b.id);
    const fragment = document.createDocumentFragment();
    items.forEach(item => {
        const button = document.createElement("button");
        button.classList.add("locked");
        button.innerHTML = `${item.name}: <br>${item.descrip} Costs <span class='price' id='${item.id}price'>${item.price}</span> grass.<span class='amountofupgrades'>Amount: <span id='${item.id}amt' style='margin-left:5px'>0</span></span>`;
        button.addEventListener("mousedown", () => buy(item.id-1));
        fragment.appendChild(button);

        amt.push(0); prices.push(item.price);
        multipliers.push(item.multiplier);
        unlocked.push(false);
    });
    container.appendChild(fragment);
    items.forEach(item => {
        amtelements.push(document.getElementById(`${item.id}amt`));
        priceelements.push(document.getElementById(`${item.id}price`));
        buttons.push(document.querySelector(`button:nth-child(${item.id})`));
    });

    if (localStorage.getItem("saved") == "true") {
        resetinterval();
        grass = parseInt(localStorage.getItem("grass"));
        grasspersecond = parseFloat(localStorage.getItem("grasspersecond"));
        grassperclick = parseFloat(localStorage.getItem("grassperclick"));
        grassclickmultiplier = parseFloat(localStorage.getItem("grassclickmultiplier"));
        amt = JSON.parse(localStorage.getItem("amt"));
        prices = JSON.parse(localStorage.getItem("prices"));
        multipliers = JSON.parse(localStorage.getItem("multipliers"));
        unlocked = JSON.parse(localStorage.getItem("unlocked"));
        grasscount.innerText = grass;
        persecond.innerText = grasspersecond;
        updateprices();
    }
});

setInterval(save, 2500);
function save() {
    localStorage.setItem("grass", grass);
    localStorage.setItem("grasspersecond", grasspersecond);
    localStorage.setItem("grassperclick", grassperclick);
    localStorage.setItem("grassclickmultiplier", grassclickmultiplier);
    localStorage.setItem("amt", JSON.stringify(amt));
    localStorage.setItem("prices", JSON.stringify(prices));
    localStorage.setItem("multipliers", JSON.stringify(multipliers));
    localStorage.setItem("unlocked", JSON.stringify(unlocked));
    localStorage.setItem("saved", true);
}

function reset() {
    for (let i = 0; i < amt.length; i++) { amt[i] = 0; }
    for (let i = 0; i < unlocked.length; i++) { unlocked[i] = false; }
    localStorage.removeItem("grass");
    localStorage.removeItem("grasspersecond");
    localStorage.removeItem("grassperclick");
    localStorage.removeItem("grassclickmultiplier");
    localStorage.removeItem("amt");
    localStorage.removeItem("prices");
    localStorage.removeItem("multipliers");
    localStorage.removeItem("unlocked");
    localStorage.removeItem("saved");
    location.reload();
    checkunlocks();
}

function exportf() {
    let exportdata = {
        grass: grass,
        grasspersecond: grasspersecond,
        grassperclick: grassperclick,
        grassclickmultiplier: grassclickmultiplier,
        amt: amt,
        prices: prices,
        multipliers: multipliers,
        unlocked: unlocked
    }
    exportdata = JSON.stringify(exportdata);
    exportdata = btoa(exportdata).slice(0, -2);
    let link = document.createElement('a');
    link.download = 'grassclickerdata.txt';
    link.href = 'data:text/plain;charset=utf-8,' + exportdata;
    link.click();
}

function uploadf() {
    let input = document.createElement('input');
    input.type = 'file';
    input.onchange = e => {
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsText(file, 'UTF-8');
        reader.onload = readerEvent => {
            let content = readerEvent.target.result;
            content = atob(content + "==") + "}";
            content = JSON.parse(content);
            grass = content.grass;
            grasspersecond = content.grasspersecond;
            grassperclick = content.grassperclick;
            grassclickmultiplier = content.grassclickmultiplier;
            amt = content.amt;
            prices = content.prices;
            multipliers = content.multipliers;
            unlocked = content.unlocked;
            localStorage.setItem("grass", grass);
            localStorage.setItem("grasspersecond", grasspersecond);
            localStorage.setItem("grassperclick", grassperclick);
            localStorage.setItem("grassclickmultiplier", grassclickmultiplier);
            localStorage.setItem("amt", JSON.stringify(amt));
            localStorage.setItem("prices", JSON.stringify(prices));
            localStorage.setItem("multipliers", JSON.stringify(multipliers));
            localStorage.setItem("unlocked", JSON.stringify(unlocked));
            localStorage.setItem("saved", true);
            location.reload();
        }
    }
    input.click();
    checkunlocks();
}
