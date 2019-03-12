interface FooInterface {
    bar: number,
    baz: string
}

var fool  = <FooInterface> {};
fool.bar = 1;
fool.baz = 'string';
