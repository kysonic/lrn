var decomposeDoubleStrand=function(doubleStrand){
    let read = str => str.match(/..?.?/g).join(' ').trim();
    let rev = str => [...str].reverse().map(c => ({A:'T', G:'C', T:'A', C:'G'})[c]).join('');

    return ['Frame 1: '+read(doubleStrand), 'Frame 2: '+read('  '+doubleStrand), 'Frame 3: '+read(' '+doubleStrand), '',
        'Reverse Frame 1: '+read(rev(doubleStrand)), 'Reverse Frame 2: '+read('  '+rev(doubleStrand)), 'Reverse Frame 3: '+read(' '+rev(doubleStrand))
    ].join('\n');
}

