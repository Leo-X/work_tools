/// <reference path="./jQuery.d.ts" />



function needString(person: string) {
    console.log(`person ：${person}`);
    return "Hello, " + person;
}
let user = "leo";
needString(user);


// 布尔值
let isOk: boolean = false;

// 数值
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;

// ES6 中的二进制表示法
let binaryLiteral: number = 0b1010;

// ES6 中的八进制表示法，二进制和八进制会被编译成十进制
let octalLiteral: number = 0o744;

let notANumber: number = NaN;
let infinityNumber: number = Infinity;


// 字符串
let myName: string = 'wangchuang';
let myAge: number = 25;

// 模板字符串
let template: string = `My name is ${myName}. 
Now,
I'm ${myAge} years old.`;
console.log(`template ：${template}`);


// 空值
// JavaScript 没有空值（Void）的概念，在 TypeScirpt 中，可以用 void 表示没有任何返回值的函数：
function alertName(): void {
    let name: string = "leo";
    alert(`My name is ${name}`);
    console.log(`void function ：${name}`);
    // return name;
}
// alertName();

// 声明一个 void 类型的变量，只能将其赋值为 undefined 和 null,没什么用
let unusable1: void = null;
let unusable2: void = undefined;
// undefined 类型的变量只能被赋值为 undefined，null 类型的变量只能被赋值为 null

// 与 void 的区别是，undefined 和 null 是所有类型的子类型。也就是说 undefined 类型的变量，可以赋值给 number 类型的变量：
// 这样不会报错
let num_undefined1: number = undefined;


// 这样不会报错
let num_undefined2: undefined;
// let num_undefined3: number = unusable2; // void不是number子类型,不能赋值给number类型变量
let num_undefined3: number = num_undefined2;




// 任意值，允许赋值为任意类型
let value_string: string = 'seven-eleven';
// value_string = 7;
// any 类型，允许被赋值为任意类型。
let value_any: any = 'seven-eleven';
value_any = 711;


//  任意值的属性和方法
// 在任意值上访问任何属性都是允许的：
let anyThing: any = 'anything';
// console.log(anyThing.myName);
// console.log(anyThing.myName.firstName);


// 可以调用任何方法
// anyThing.setName('Jerry');
// anyThing.setName('Jerry').sayHello();
// anyThing.myName.setFirstName('Cat');




//未声明类型的变量 默认 任意类型
// 未赋值，赋值后会有类型推断
let something;
// let something: any;
something = 'seven';
something = 7;
// something.setName('Tom');



// 类型推断
let type_deduce = 'seven';
// let type_deduce:string = 'seven';
// type_deduce = 7;

// 定义时没有赋值，不管之后有没有赋值，都会被推断成 any 类型而完全不被类型检查

// 联合类型
let union_types_sn: string | number;
union_types_sn = 'seven';
union_types_sn = 7;
// union_types_sn = true;

// 访问联合类型的属性或方法
// 当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，
// 我们只能访问此联合类型的所有类型里共有的属性或方法：
// function getLength(something: string | number): number {
//     return something.length;
// }
// 不为void 或any 的函数 必须返回值


// string 和 number 的共有属性 toString
function getString(something: string | number): string {
    return something.toString();
}
// 联合类型变量在被赋值时，会根据类型推论的规则推断出一个类型：
let union_types_deduce: string | number;
union_types_deduce = 'seven';
console.log(union_types_deduce.length); // 5
union_types_deduce = 7;
// console.log(union_types_deduce.length); // 编译时报错

// 对象的类型——接口
interface Person {
    name: string;
    age: number;
}
// 约束 leo 的形状必须和接口 Person 一致。
// 接口一般首字母大写
let leo: Person = {
    name: 'Tom',
    age: 25,  //顺序无要求
    // hobby:"swim"    //多了属性不行
};

// 少属性不行
// let leo2: Person = {
//     name: 'leo2'
// };

// 总结：赋值的时候，变量的形状必须和接口的形状保持一致。


// 可选属性
// 有时我们希望不要完全匹配一个形状，那么可以用可选属性：
interface Person2 {
    name: string;
    age?: number;
}

let leo2: Person2 = {
    name: 'leo2',
    //  hobby:"swim"    //多了属性不行
};

// 这时仍然不允许添加未定义的属性：




// 任意属性，如下方式：
interface Person3 {
    name: string;
    age?: number;
    [propName: string]: any;
}

let leo3: Person3 = {
    name: 'leo3',
    gender: 'male',
    hobby: "swim",
    age: 55,
    王创: ""
};
// 定义了任意属性取 string 类型的值。
// 一旦定义了任意属性，那么确定属性和可选属性都必须是它的子属性：
interface Person4 {
    name: string;
    age?: number;
    // [propName: string]: string;
    // [propName: string]: string|number;
    [propName: string]: any;
};

let leo4: Person4 = {
    name: 'Tom',
    age: 25,
    gender: 'male'
};



// 只读属性
interface Read_only {
    readonly id: number;
    // readonly id?: number;
    name: string;
    age?: number;
    [propName: string]: any;
}

let leo_read_only: Read_only = {
    id: 89757,
    name: 'leo',
    gender: 'male'
};
// leo_read_only.id = 9527;

// 只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候：
// 只读属性，作为可选属性 定义时属性不被赋值则以后不能赋值了


// 数组的类型
// 「类型 + 方括号」表示法
let fibonacci: number[] = [1, 1, 2, 3, 5];  //斐波那契数组
// 数组的项中不允许出现其他的类型：
// let fibonacci2: number[] = [1, '1', 2, 3, 5];
//[1, '1', 2, 3, 5] 的类型被推断为 (number | string)[]，这是联合类型和数组的结合。


// any 类型即可
let fibonacci2: any[] = [1, '1', 2, 3, 5];
fibonacci2.push('8');
console.log(`fibonacci2 ：${fibonacci2}`);

let list: any[] = ['ctrip', 25, { website: 'http://ctrip.com' }];





// 数组的一些方法的参数也会根据数组在定义时约定的类型进行限制：
// fibonacci.push('8');




// 数组泛型
// 泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。
// let fibonacci3: Array<number> = [1, 1, 2, 3, 5];
let fibonacci3: Array<number>;
fibonacci3 = [1, 1, 2, 3, 5];



function createArray(length: number, value: any): Array<any> {
    let result = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}
createArray(3, 'x'); // ['x', 'x', 'x'],定义返回值类型为数组



// 用接口表示数组
interface NumberArray {
    [index: number]: number;
}
let fibonacci_interface: NumberArray = [1, 1, 2, 3, 5];
// NumberArray 表示：只要 index 的类型是 number，那么值的类型必须是 number。



// 类数组 ,（Array-like Object）不是数组类型，比如 arguments：
// function sum() {
//     let args: number[] = arguments;
// }

// 枚举类型

// 定义枚举
enum Days {Sun=7, Mon=1, Tue, Wed, Thu, Fri, Sat};
// 枚举成员会被赋值为从 0 开始递增的数字，同时也会对枚举值到枚举名进行反向映射：
console.log(Days["Sun"] === 7); // true
console.log(Days["Mon"] === 1); // true
console.log(Days["Tue"] === 2); // true
console.log(Days["Sat"] === 6); // true

console.log(Days[7] === "Sun"); // true
console.log(Days[1] === "Mon"); // true
console.log(Days[2] === "Tue"); // true
console.log(Days[6] === "Sat"); // true





// 事实上常见的类数组都有自己的接口定义，如 IArguments, NodeList, HTMLCollection 等：
function sum() {
    let args: IArguments = arguments;
}

// 函数的类型


// 函数声明（Function Declaration）
function sum2(x, y) {
    return x + y;
}
// 函数表达式（Function Expression）
let mySum = function (x, y) {
    return x + y;
};
// 箭头函数（Function Expression）
let mySum2 = (x, y) => {
    return x + y;
};

// typescript中
function sum3(x: number, y: number): number {
    return x + y;
}

// 可选参数
// 可选参数必须接在必需参数后面。换句话说，可选参数后面不允许再出现必须参数了
function sum4(x: number, y: number = 2, z?: number): number {
    return x + y + z;
}
// sum4(1,2,3,4);
// sum4(1);
// 输入多余的（或者少于要求的）参数，是不被允许的：
// TypeScript 会将添加了默认值的参数识别为可选参数,所以此时不必再加问号，可选参数未传值，NaN
// 此时就不受「可选参数必须接在必需参数后面」的限制了：
let sum_number: number = sum4(1, 2);
console.log(`sum4 ：${sum_number}`);




// 函数表达式 可以通过编译
let myfun1 = function (x: number, y: number): number {
    return x + y;
};// 类型推断

let myfun2: (x: number, y: number) => number = function (x: number, y: number): number {
    return x + y;
};
// 在 TypeScript 的类型定义中，=> 用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型。
// 在 ES6 中，=> 叫做箭头函数，两个不一样

// 用接口定义函数的形状
interface SearchFunc {
    (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function (source: string, subString: string) {
    return source.search(subString) !== -1;
}




// 约束剩余参数
// ES6
function arr_push(array, ...items) {
    items.forEach(function (item) {
        array.push(item);
    });
}

let arr_push_1 = [];
arr_push(arr_push_1, 1, 2, 3);
console.log(`arr_push_1 ：${arr_push_1}`);

// items 是一个数组。所以我们可以用数组的类型来定义它：
// rest 参数只能是最后一个参数
function arr_push2(array: any[], ...items: any[]) {
    items.forEach(function (item) {
        array.push(item);
    });
}
let arr_push_2 = [];
arr_push2(arr_push_2, 1, 2, 3, 4, 5);
console.log(`arr_push_2 ：${arr_push_2}`);





// 重载,重载允许一个函数接受不同数量或类型的参数时，作出不同的处理。
// 函数 reverse，输入数字 123 的时候，输出反转的数字 321，输入字符串 'hello' 的时候，输出反转的字符串 'olleh'。
function reverse(x: number | string): number | string {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}



// 声明语句
// 使用第三方库
// declare var jQuery: (selector: string) => any;
// jQuery('#foo'); 
//jQuery('#foo');
// declare 定义的类型只会用于编译时的检查，编译结果中会被删除。

// 声明文件

// 约定声明文件以 .d.ts 为后缀。

jQuery('#foo');



// 内置对象
// DOM 和 BOM 的内置对象  Document、HTMLElement、Event、NodeList
let body: HTMLElement = document.body;
let allDiv: NodeList = document.querySelectorAll('div');
document.addEventListener('click', function (e: MouseEvent) {
    // Do something
});



// TypeScript 中类的用法
// TypeScript 可以使用三种访问修饰符（Access Modifiers），分别是 public、private 和 protected。
// public 修饰的属性或方法是公有的，可以在任何地方被访问到，默认所有的属性和方法都是 public 的
// private 修饰的属性或方法是私有的，不能在声明它的类的外部访问
// protected 修饰的属性或方法是受保护的，它和 private 类似，区别是它在子类中也是允许被访问的

class Animal1 {
    public name;
    public constructor(name) {
        this.name = name;
    }
}

let dog = new Animal1('dog1');
console.log(`dog.name ：${ dog.name }`);// Jack
dog.name = 'dog1';
console.log(`dog.name ：${ dog.name }`);// Tom
// name 被设置为了 public，所以直接访问实例的 name 属性是允许的。

class Animal2 {
    private name;
    public constructor(name) {
        this.name = name;
    }
}
let dog2 = new Animal2('dog2');
// console.log(`dog2.name ：${ dog2.name }`);
// dog2.name = 'Tom';



// 使用 private 修饰的属性或方法，在子类中也是不允许访问的
// class Animal {
//     private name;
//     public constructor(name) {
//         this.name = name;
//     }
// }

// class Cat extends Animal {
//     constructor(name) {
//         super(name);
//         console.log(this.name);
//     }
// }






// 而如果是用 protected 修饰，则允许在子类中访问：
// class Animal {
//     protected name;
//     public constructor(name) {
//         this.name = name;
//     }
// }

// class Cat extends Animal {
//     constructor(name) {
//         super(name);
//         console.log(this.name);
//     }
// }