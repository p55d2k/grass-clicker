function simplest(strrr) {
    let smpstr = strrr.split(" ");
    let arr = smpstr.map(substring => substring.toLowerCase());
    return arr.join("");
}