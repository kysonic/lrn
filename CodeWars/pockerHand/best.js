const face_number = {T: 10, J: 11, Q: 12, K: 13, A: 14}
const card_number = (x) => face_number[x[0]] || +x[0]
const cards_to_numbers = (h) => h.split(" ").map(card_number)
const numbers_in_sequence = (arr) => arr.reduce((a,c)=>a+c) == arr.length * (2*arr[0] + arr.length - 1) / 2
const straight = (h) => numbers_in_sequence(cards_to_numbers(h).reverse())
const flush = (h) => /^.(.) .\1 .\1 .\1 .\1$/.test(h)
const sort_cards = (h) => h.split(' ').sort((a,b)=>card_number(b)-card_number(a)).join(' ')
const match_res = (m) => m == null ? null : m[0]
const highest_card = (h) => h.slice(0,2)

var order = [
    {n:"straight_flush", f:x => straight(x) && flush(x) ? x : null},
    {n:"four",           f:x => match_res(x.match(/(.). \1. \1. \1./))},
    {n:"full_house",     f:x => match_res(x.match(/(.). \1. \1. (.). \2./) || x.match(/(.). \1. (.). \2. \2./))},
    {n:"flush",          f:x => flush(x) ? x : null},
    {n:"straight",       f:x => straight(x) ? x : null},
    {n:"three",          f:x => match_res(x.match(/(.). \1. \1./))},
    {n:"two_pair",       f:x => match_res(x.match(/.*(.). \1..*(.). \2..*/))},
    {n:"one_pair",       f:x => match_res(x.match(/.*(.). \1..*/))},
    {n:"highest_card",   f:x => x},
]

const find_sorted_hand = (h) => {
    for(var i = 0; i < order.length; i++) {
        var res = order[i].f(h)
        if(res != null) return { i: i, res: res, name: order[i].n }
    }}
const find_hand = (h) => find_sorted_hand(sort_cards(h))

const Result = { win: 1, loss: 2, tie: 3 }

function PokerHand(hand) {
    this.hand = find_hand(hand);
    this.high_to_low = cards_to_numbers(sort_cards(hand))
}

PokerHand.prototype.compareWith = function(other){
    if(this.hand.i < other.hand.i) return Result.win;
    if(this.hand.i > other.hand.i) return Result.loss;
    for(var i=0;i<5;i++) {
        if(this.high_to_low[i] > other.high_to_low[i]) return Result.win;
        if(this.high_to_low[i] < other.high_to_low[i]) return Result.loss;
    }
    return Result.tie;
}