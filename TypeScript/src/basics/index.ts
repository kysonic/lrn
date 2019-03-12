let num: number = 123;

function identity(num: number): number {
    return num;
}

interface NameInterface {
    first: string,
    last: string
}

var myName: NameInterface = {
    first: 'Anton',
    last: 'Bolt'
}

var nameNumber: [string, number];

nameNumber = ['Jenny', 8675309];


type strOrNum = string|number;

var a:strOrNum = 1;
a='s3';
