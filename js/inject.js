// let code = "<button onmousedown='antautoclick()'>Ant's autoclicker: <br>+0.5 clicks per second, costs <span class='price' id='antautoclickerprice'>30</span> grass.<span id='antautodesc' class='amountofupgrades'>Amount: 0</span></button>";

function simplest(strrr) {
    let smpstr = strrr.split(" ");
    let arr = smpstr.map(substring => substring.toLowerCase());
    return arr.join("");
}

async function getdata() {
    return await fetch("../json/data.json").then(res => res.json());
}

container = document.getElementById("inject");
getdata().then(data => {
    const items = Object.values(data);
    items.sort((a, b) => a.id - b.id);

    items.forEach(item => {
        container.innerHTML += `<button onmousedown='buy(${item.id})'>${item.name}: <br>${item.descrip} Costs <span class='price' id='${simplest(item.name)}price'>${item.price}</span> grass.<span id='${simplest(item.name)}desc' class='amountofupgrades'>Amount: 0</span></button>`;
    });
});
