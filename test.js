let fib = n => {
    let f1 = 1;
    let f2 = 1;
    for (let i = 0; i < n - 1; i++) {
        [f1, f2] = [f2, f2 + f1];
    }
    return f2
}
console.log(`fib: ${ fib(50) }`);