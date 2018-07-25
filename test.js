let obj = {
    name: 'lyl',
    cdc: '56',
    ddd: {
        "dd": 568
    },
    age: 18
}

// let arr = [1, 3, 5, 7, 9];

// let sum=(x,y)=>(x+y);
// let cc=arr.reduce(sum);
// console.log(cc); 



let arr = [1, 2, 2, 3, 5, 4, 5]

// our reducer function

let items = [10, 120, 1000];
console.log(`total ：${
    items.reduce((x, y) => x + y)
    }`);


//利用set将数组arr转化成set数据,利用array from将set转化成数组类型
// const changeReArr=(arr)=>Array.from(new Set(arr)) ;
// console.log(`changeReArr ：${changeReArr(arr)}`);
console.log(`changeReArr ：${arr.map(x => x * x)}`);

