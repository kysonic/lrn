// function parameter annotation

function foo(bar: number, bas?: string): void {
    console.log(bar, bas);
}

// Callable

interface ReturnString {
    (): string
}

interface Complex {
    (foo: string, bar?: number, ...others: boolean[]): number;
}

// Arrow syntax

const simple: (foo: number) => string
    = (foo) => foo.toString();

// Newable

interface CallMeWithNewToGetString {
    new(): string
}
