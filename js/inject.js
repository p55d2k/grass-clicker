// let code = "<button onmousedown='antautoclick()'>Ant's autoclicker: <br>+0.5 clicks per second, costs <span class='price' id='antautoclickerprice'>30</span> grass.<span id='antautodesc' class='amountofupgrades'>Amount: 0</span></button>";

function simplest(strrr) {
    let smpstr = strrr.split(" ");
    let arr = smpstr.map(substring => substring.toLowerCase());
    return arr.join("");
}

async function getdata() {
    return await fetch("../json/data.json").then(res => res.json());
}

