// https://www.codewars.com/kata/decompose-double-strand-dna-into-6-reading-frames

const REVERSING = {
    A:'T',
    G:'C',
    T:'A',
    C:'G'
};
const FRAMES_SCHEMA = [
    {name:'Frame 1',startChunk:3,maxChunkSize:3},
    {name:'Frame 2',startChunk:1,maxChunkSize:3},
    {name:'Frame 3',startChunk:2,maxChunkSize:3}
]
function spliceStingIntoChunks(string,startChunk,maxChunkSize){
    const array = Array.from(string);
    const chunks = [];
    let i = 0;
    while(array.length>0) {
        chunks.push(array.splice(0, i?maxChunkSize:startChunk));
        i++;
    }
    return chunks;
}
const COMMA_REGEXP = /\,/g;
function combineStringFromChunks(chunks) {
    return chunks.join(' ').replace(COMMA_REGEXP,'');
}
function replaceAt(str,index,sub) {
    return str.substr(0,index) + sub + str.substr(index+1,str.length);
}
function reverseDNA(dna) {
    let i = 0;
    while(dna.length>i) {
        dna = replaceAt(dna,i,REVERSING[dna[i]] || dna[i]);
        i++;
    }
    return dna;
}
function decomposeDoubleStrand(doubleStrand){
    let outputData = '';
    FRAMES_SCHEMA.forEach(({name,startChunk,maxChunkSize})=>{
        outputData+= name+': '+combineStringFromChunks(spliceStingIntoChunks(doubleStrand,startChunk,maxChunkSize))+'\n';
    });
    outputData+='\n';
    const reversedDna = reverseDNA(doubleStrand).split('').reverse().join('');
    FRAMES_SCHEMA.forEach(({name,startChunk,maxChunkSize})=>{
        outputData+= 'Reverse '+name+': '+combineStringFromChunks(spliceStingIntoChunks(reversedDna,startChunk,maxChunkSize))+'\n';
    });
    return outputData.substr(0,outputData.length-1);
}

console.log(decomposeDoubleStrand('AGGTGACACCGCAAGCCTTATATTAGC'));

