function domainName(url){
    return url.match(/^(?:https?:)?(?:\/\/)?(?:www\.)?([^\.\?]+)/)[1]
}

console.log(domainName('http://google.com'));
console.log(domainName('www.xakep.ru'));
console.log(domainName('8nvzd2r6aemx-rmsomf6u8u.it/default.html'));