// https://www.codewars.com/kata/5739174624fc28e188000465/train/javascript

var Result = { "win": 1, "loss": 2, "tie": 3 };

const SORT_SEQUENCE= '23456789TJQKA';

var combinations = {
    'Royal Flush': {cards:'TJQKA',suit: 'same',weight:10},
    'Straight Flush': {cards:'23456789TJQKA',suit: 'same',weight:9},
    'Straight Flush Wheel': {cards:'2345A',suit: 'same',weight:9},
    'Quads': {cards:'####',suit:'any',weight:8},
    'Full House': {cards:'###**',suit:'any',weight:7},
    'Flush': {cards:'any',suit:'same',weight:6},
    'Straight': {cards:'23456789TJQKA',suit:'any',weight:5},
    'Wheel': {cards:'2345A',suit:'any',weight:5},
    'Three': {cards:'###',suit:'any',weight:4},
    'Two pairs': {cards:'##**',suit:'any',weight:3},
    'Pair': {cards:'##',suit:'any',weight:2}
}

function PokerHand(hand) {
    this.hand = hand;
}

PokerHand.prototype.compareWith = function(hand){
    const mhc = this.findCombination(this.hand);
    const ohc = this.findCombination(hand.hand);
    if(mhc.weight===ohc.weight) return this.compareCards(mhc.sortedCards,ohc.sortedCards);
    return mhc.weight>ohc.weight ?  Result.win : Result.loss;
}

PokerHand.prototype.compareCards = function(myCards,oCards){
    let diffIndex = false;
    const myCardsReversed = Array.from(myCards).reverse().join('');
    const oCardsReversed = Array.from(oCards).reverse().join('');
    const diff = Array.from(myCardsReversed).some((letter,i)=>{
        diffIndex = i;
        return letter != oCardsReversed[i]
    });
    console.log(myCardsReversed,oCardsReversed,diff,diffIndex);
    return !diff ? Result.tie : SORT_SEQUENCE.indexOf(myCardsReversed[diffIndex])>SORT_SEQUENCE.indexOf(oCardsReversed[diffIndex]) ? Result.win : Result.loss;
}

PokerHand.prototype.findCombination = function(hand) {
    const preparedHand = this.prepareHand(hand);
    for (let combinationKey of Object.keys(combinations)) {
        const combination = combinations[combinationKey];
        if(this.isCombinationFit(combination,preparedHand)) return Object.assign({},combination,{sortedCards:preparedHand.cards});
    }
    return {weight:1,sortedCards:preparedHand.cards};
}

PokerHand.prototype.isCombinationFit = function(combination,preparedHand) {
    if(combination.cards[0]!=='#') return (combination.cards==='any' || ~combination.cards.indexOf(preparedHand.cards)) && combination.suit===preparedHand.suit;
    const occurrences = this.occurrencesToString(this.countOccurrences(preparedHand.cards));
    return (combination.cards===occurrences) && combination.suit===preparedHand.suit;
}

PokerHand.prototype.isSameSuit = function(suit){
    const firstSuit = suit[0];
    return suit.some((s)=>s!=firstSuit);
}

PokerHand.prototype.prepareHand = function(hand){
    const split= hand.split(' ').map((pair)=>[pair[0],pair[1]]);
    return {
        cards: this.sortHand(split.map((a)=>a[0]).join('')),
        suit: this.isSameSuit(split.map((a)=>a[1])) ? 'any' : 'same'
    }
}

PokerHand.prototype.sortHand = function(hand){
    return Array.from(hand).sort((a,b)=>SORT_SEQUENCE.indexOf(a)-SORT_SEQUENCE.indexOf(b)).join('');
}

PokerHand.prototype.countOccurrences = function(cards){
    const occurrences = {};
    Array.from(cards).forEach((letter)=>occurrences[letter] = (cards.match(new RegExp(letter,'g'))||[]).length);
    return occurrences;
}

const specialSymbols = ['#','*'];
PokerHand.prototype.occurrencesToString = function(occurrences){
    return Object.keys(occurrences).map((key)=>occurrences[key]).sort().reverse().map((num,i)=>num>=2 ? new Array(num+1).join(specialSymbols[i]) : "").join('');
}

assert(Result.win, "AS AH 2H AD AC", "JS JD JC JH 3D");


function assert(expected, player, opponent){
    var p = new PokerHand(player);
    var o = new PokerHand(opponent);
    console.log(expected, p.compareWith(o));
}