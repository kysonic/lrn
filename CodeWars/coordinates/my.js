function isValidCoordinates(coordinates){
    return /^[-+]?([0-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/.test(coordinates);
}

console.log(isValidCoordinates('2342.43536, 34.324236'));