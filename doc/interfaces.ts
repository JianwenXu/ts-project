/**
 * 接口
 * https://www.tslang.cn/docs/handbook/interfaces.html
 */

// function printLabel(labeledObject: { label: string }): void {
//     console.log(labeledObject.label);
// }
// let myObject = {
//     size: 10,
//     label: 'Size 10 Object',
// };
// printLabel(myObject);

interface LabelledValue {
  label: string;
}
function printLabel(labeledObject: LabelledValue) {
  console.log(labeledObject.label);
}
let myObject = {
  size: 10,
  label: 'Size 10 Object',
};
printLabel(myObject);

// 我们在这里并不能像在其它语言里一样，说传给 printLabel的对象实现了这个接口。我们只会去关注值的外形。 只要传入的对象满足上面提到的必要条件，那么它就是被允许的
// 还有一点值得提的是，类型检查器不会去检查属性的顺序，只要相应的属性存在并且类型也是对的就可以。

// 可选属性
interface SquareConfig {
  color?: string;
  width?: number;
}
function creatSquare(config: SquareConfig): { color: string; area: number } {
  let newSquare = {
    color: 'white',
    area: 100,
  };
  if (config.color) {
    newSquare.color = config.color;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}
let mySquare = creatSquare({ color: 'black' });

// 带有可选属性的接口与普通的接口定义差不多，只是在可选属性名字定义的后面加一个?符号。
// 可选属性的好处之一是可以对可能存在的属性进行预定义
// 好处之二是可以捕获引用了不存在的属性时的错误。
// 比如，我们故意将 createSquare里的color属性名拼错，就会得到一个错误提示

// 只读属性
// 一些对象属性只能在对象刚刚创建的时候修改其值。 你可以在属性名前用 readonly来指定只读属性
interface Point {
  readonly x: number;
  readonly y: number;
}
// 你可以通过赋值一个对象字面量来构造一个Point。 赋值后， x和y再也不能被改变了。
let p1: Point = {
  x: 10,
  y: 20,
};
// p1.x = 30; // 报错

// TypeScript具有ReadonlyArray<T>类型，它与Array<T>相似，只是把所有可变方法去掉了，因此可以确保数组创建后再也不能被修改
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
// ro[0] = 12; // 报错
// ro.push(5); // 报错
// ro.length = 100; // 报错
// a = ro; // 报错

// 上面代码的最后一行，可以看到就算把整个ReadonlyArray赋值到一个普通数组也是不可以的。 但是你可以用类型断言重写
a = ro as number[];
// 但是在这之后 ro 还是只读的

// 最简单判断该用readonly还是const的方法是看要把它做为变量使用还是做为一个属性。 做为变量使用的话用 const，若做为属性则使用readonly。

// 额外的属性检查

// interface SquareConfig {
//     color?: string,
//     width?: number,
// };
// function creatSquare(config: SquareConfig): { color: string, area: number } {
//     let newSquare = {
//         color: 'white',
//         area: 100,
//     };
//     if (config.color) {
//         newSquare.color = config.color;
//     }
//     if (config.width) {
//         newSquare.area = config.width * config.width;
//     }
//     return newSquare;
// }

// 对象字面量会被特殊对待而且会经过 额外属性检查，当将它们赋值给变量或作为参数传递的时候。 如果一个对象字面量存在任何“目标类型”不包含的属性时，你会得到一个错误
// let mySquare = creatSquare({ colour: 'black', width: 100 }); // 报错

// 最简单的方式：可以使用类型检查绕开这些断言
// let mySquare = creatSquare({ colour: 'black', width: 100 } as SquareConfig); // OK

// 然而，最佳的方式是能够添加一个字符串索引签名，前提是你能够确定这个对象可能具有某些做为特殊用途使用的额外属性。

interface SquareConfig {
  color?: string;
  width?: number;
  // [propName: string]: any,
}
function creatSquare(config: SquareConfig): { color: string; area: number } {
  let newSquare = {
    color: 'white',
    area: 100,
  };
  if (config.color) {
    newSquare.color = config.color;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}
// let mySquare = creatSquare({ colour: 'black', width: 100 }); // OK

// 还有最后一种跳过这些检查的方式，这可能会让你感到惊讶，它就是将这个对象赋值给一个另一个变量
let squareOptions = {
  colour: 'red',
  width: 100,
};
let mySquare = creatSquare(squareOptions); // OK

// 函数类型

// 它就像是一个只有参数列表和返回值类型的函数定义。参数列表里的每个参数都需要名字和类型。
interface SearchFunc {
  (source: string, subString: string): boolean;
}
let mySearch: SearchFunc;
mySearch = function(source: string, subString: string): boolean {
  let result = source.search(subString);
  return result > -1;
};

// 对于函数类型的类型检查来说，函数的参数名不需要与接口里定义的名字相匹配。
let mySearch2: SearchFunc;
mySearch2 = function(src: string, sub: string): boolean {
  // OK
  let result = src.search(sub);
  return result > -1;
};

// 函数的参数会逐个进行检查，要求对应位置上的参数类型是兼容的。
let mySearch3: SearchFunc;
mySearch3 = function(src, sub) {
  let res = src.search(sub);
  return res > -1;
};

// 可索引的类型

// 可索引类型具有一个 索引签名，它描述了对象索引的类型，还有相应的索引返回值类型
interface StringArray {
  [index: number]: string;
}
let myArray: StringArray = ['Bob', 'Jane'];
let myStr: string = myArray[0];

// TypeScript支持两种索引签名：字符串和数字。
// 可以同时使用两种类型的索引，但是数字索引的返回值必须是字符串索引返回值类型的子类型。
class Animal {
  name: string;
}
class Dog extends Animal {
  breed: string;
}
// interface NotOk {
//     [x: number]: Animal,
//     [x: string]: Dog,
// }
interface Ok {
  [x: string]: Animal;
  [x: number]: Dog;
}

// 字符串索引签名能够很好的描述dictionary模式，并且它们也会确保所有属性与其返回值类型相匹配
interface NumberDictionary {
  [index: string]: number;
  length: number;
  // name: string; // 报错
  name: number; // OK
}

interface NumberDictionary2 {
  [index: string]: string;
  // length: number; // 报错
  name: string;
}

// 你可以将索引签名设置为只读，这样就防止了给索引赋值
interface ReadonlyStringArray {
  readonly [index: number]: string;
}
let rsa: ReadonlyStringArray = ['Jane', 'Smith'];
// rsa[1] = 'hello'; // 报错

// 类类型

// 与C#或Java里接口的基本作用一样，TypeScript也能够用它来明确的强制一个类去符合某种契约。
interface ClockInterface {
  currentTime: Date;
}
class Clock implements ClockInterface {
  currentTime: Date;
  constructor(h: number, m: number) {}
}

// 你也可以在接口中描述一个方法，在类里实现它
interface ClockInterface2 {
  currentTime: Date;
  setTime(d: Date);
}
class Clock2 implements ClockInterface2 {
  currentTime: Date;
  setTime(d: Date) {
    this.currentTime = d;
  }
  constructor(h: number, m: number) {}
}

// 接口描述了类的公共部分，而不是公共和私有两部分

// 类静态部分与实力部分的区别

// 当你操作类和接口的时候，你要知道类是具有两个类型的：静态部分的类型和实例的类型。
// 你会注意到，当你用构造器签名去定义一个接口并试图定义一个类去实现这个接口时会得到一个错误
interface ClockInterface3 {
  new (h: number, m: number);
}
// class Clock3 implements ClockInterface3 { // 报错
//     currentTime: Date;
//     constructor(h:number, m: number) { }
// }

// 这里因为当一个类实现了一个接口时，只对其实例部分进行类型检查。
// constructor存在于类的静态部分，所以不在检查的范围内。

interface ClockInterface4 {
  tick();
}
interface ClockConstructor {
  new (hour: number, minute: number): ClockInterface4;
}
function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface4 {
  return new ctor(hour, minute);
}
class DigitalClock implements ClockInterface4 {
  constructor(h: number, m: number) {}
  tick() {
    console.log('beep beep~');
  }
}
class AnalogClock implements ClockInterface4 {
  constructor(h: number, m: number) {}
  tick() {
    console.log('tick tock~');
  }
}
let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 12, 0);

// 继承接口

// 接口也可以继承
interface Shape {
  color: string;
}
interface Square extends Shape {
  sideLength: number;
}
let square = <Square>{};
square.color = 'red';
square.sideLength = 100;

// 一个接口可以继承多个接口，创建出多个接口的合成接口。
interface PenStroke {
  penWidth: number;
}
interface Square2 extends Shape, PenStroke {
  sideLength: number;
}
let square2 = <Square2>{};
square2.color = 'blue';
square2.penWidth = 2;
square2.sideLength = 100;

// 混合类型

// 一个例子就是，一个对象可以同时做为函数和对象使用，并带有额外的属性。??
interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
}
function getCounter(): Counter {
  let counter = <Counter>function(start: number) {};
  counter.interval = 123;
  counter.reset = function() {};
  return counter;
}
let c = getCounter();
c(10);
c.reset();
c.interval = 5;

// 在使用JavaScript第三方库的时候，你可能需要像上面那样去完整地定义类型 ??

// 接口继承类

// 当接口继承了一个类类型时，它会继承类的成员但不包括其实现。
// 就好像接口声明了所有类中存在的成员，但并没有提供具体实现一样。
// 接口同样会继承到类的private和protected成员。
// 这意味着当你创建了一个接口继承了一个拥有私有或受保护的成员的类时，这个接口类型只能被这个类或其子类所实现（implement）。
class Control {
  private state: any;
}
interface SelectableControl extends Control {
  select(): void;
}
class Button extends Control implements SelectableControl {
  select() {}
}
class TextBox extends Control {
  select() {}
}
// class Image implements SelectableControl { // 报错，就算是加上 private state 还是会报错
//     // private state: any;
//     select() { };
// }

class Location1 {}
