/**
 * 基本类型
 * https://www.tslang.cn/docs/handbook/basic-types.html
 */

// 布尔值
let isDone: Boolean = false;

// 数字
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
let binaryLiteral: number = 0b1010;
let octalLiteral: number = 0o744;

// 字符串
// let name: string = 'bob';
// name = 'smith';

// 使用模板字符串
let name1: string = 'Gene';
let age: number = 37;
let sentence: string = `hi, my name is ${name1} and my age is ${age}`;

// 数组
// 有两种方式可以定义数组

// 第一种
// 可以在元素类型后面接上 []，表示由此类型元素组成的一个数组
// let list: number[] = [1, 2, 3];

// 第二种
// 使用数组泛型，Array<元素类型>
// let list: Array<number> = [1, 2, 3];

// 元组 Tuple
// 元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同
let x: [string, number];
x = ['hello', 10];
// x = [10, 'hello']; // 报错

// 当访问一个已知索引的元素，会得到正确的类型
console.log(x[0].substr(1)); // OK
// console.log(x[1].substr(1)); // 报错

// 当访问一个越界的元素，会使用联合类型替代：
// 但是但是但是 下面这三行报错了
// x[3] = 'world'; // OK, 字符串可以赋值给(string | number)类型
// console.log(x[5].toString()); // OK, 'string' 和 'number' 都有 toString
// x[6] = true; // Error, 布尔不是(string | number)类型

// 枚举
// enum Color { Red, Green, Blue };
// let c: Color = Color.Green;

// 默认情况下，从0开始为元素编号。 你也可以手动的指定成员的数值
// enum Color { Red = 1, Green, Blue };
// let c: Color = Color.Green;

// 或者，全部都采用手动赋值：
// enum Color { Red = 1, Green = 2, Blue = 4 };
// let c: Color = Color.Green;

// 枚举类型提供的一个便利是你可以由枚举的值得到它的名字
enum Color {
  Red = 1,
  Green,
  Blue,
}
let colorName: string = Color[2];
console.log(colorName); // Green

// Any
let notSure: any = 4;
notSure = 'hello ts';
notSure = false;

// 当你只知道一部分数据的类型时，any类型也是有用的
let list: any[] = [1, true, 'free'];
list[1] = 100;

// Void
// 某种程度上来说，void类型像是与any类型相反，它表示没有任何类型。 当一个函数没有返回值时，你通常会见到其返回值类型是 void
function warnUser(): void {
  console.log('This is a warning message!');
}

// 声明一个void类型的变量没有什么大用，因为你只能为它赋予undefined和null
let unusable: void = undefined;

// Null 和 Undefined 也意义不大
// 当你指定了--strictNullChecks标记，null和undefined只能赋值给void和它们各自
// 推荐使用 --strictNullChecks

// Never
// never类型是任何类型的子类型，也可以赋值给任何类型；然而，没有类型是never的子类型或可以赋值给never类型（除了never本身之外）。 即使 any也不可以赋值给never。

// Object
// object表示非原始类型，也就是除number，string，boolean，symbol，null或undefined之外的类型。
// 使用object类型，就可以更好的表示像Object.create这样的API
declare function create(o: object | null): void;
create({ prop: 0 }); // OK
create(null); // OK

// create(42); // 报错
// create('hello'); // 报错
// create(false); // 报错
create(undefined); // OK

// 类型断言
// 类型断言好比其它语言里的类型转换，但是不进行特殊的数据检查和解构。 它没有运行时的影响，只是在编译阶段起作用

// 类型断言与两种形式
// 1、尖括号语法
// let someVaValue: any = 'hello';
// let strLength: number = (<string>someVaValue).length;

// 2、as 语法
let someValue: any = 'hello';
let strLength: number = (someValue as string).length;

// 两种形式是等价的。 至于使用哪个大多数情况下是凭个人喜好；然而，当你在TypeScript里使用JSX时，只有 as语法断言是被允许的。
