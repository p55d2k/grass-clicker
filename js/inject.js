async function getdata() {
    return await fetch("../json/data.json").then(res => res.json());
}

container = document.getElementById("inject");
getdata().then(data => {
    const items = Object.values(data);
    items.sort((a, b) => a.id - b.id);

    items.forEach(item => {
        container.innerHTML += `<button onmousedown='buy(${item.id})'>${item.name}: <br>+${item.clicks} clicks per second, costs <span class='price' id='${item.name}price'>${item.price}</span> grass.<span id='${item.name}desc' class='amountofupgrades'>Amount: 0</span></button>`;
    });
});
