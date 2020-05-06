/**
 * 枚举
 * https://www.tslang.cn/docs/handbook/enums.html
 */

// 使用枚举我们可以定义一些带名字的常量。
// 使用枚举可以清晰地表达意图或创建一组有区别的用例。
// TypeScript支持数字的和基于字符串的枚举

// 数字枚举

enum Direction {
  Up = 1,
  Down,
  Left,
  Right,
}

// 我们可以完全不使用初始化器

enum Direction2 {
  Up,
  Down,
  Left,
  Right,
}

// 使用枚举很简单：
// 1、通过枚举的属性来访问枚举成员
// 2、使用枚举的名字来访问枚举类型

enum Response1 {
  No = 0,
  Yes = 1,
}
function response(recipient: string, message: Response1) {
  console.log(`recipient: ${recipient}, message: ${message}`);
}
response('test', Response1.Yes);

// 不带初始化器的枚举或者被放在第一的位置，或者被放在使用了数字常量或其它常量初始化了的枚举后面
const getSomeValue = () => Math.floor(Math.random() * 10);
enum E {
  B, // B 放在这个位置OKOK，放在下面报错
  A = getSomeValue(),
}

// 字符串枚举

//  在一个字符串枚举里，每个成员都必须用字符串字面量，或另外一个字符串枚举成员进行初始化

enum Direction3 {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT',
}

// 异构枚举

// 从技术的角度来说，枚举可以混合字符串和数字成员，但是似乎你并不会这么做

enum BooleanLikeHeterogeneousEnum {
  No = 0,
  Yes = 'YES',
}

enum ShapeKind {
  Circle,
  Square,
}

interface Circle {
  kind: ShapeKind.Circle;
  radius: number;
}
interface Square {
  kind: ShapeKind.Square;
  sideLength: number;
}
let c: Circle = {
  kind: ShapeKind.Circle,
  radius: 10,
};

// 举类型本身变成了每个枚举成员的 联合

enum E2 {
  Foo,
  Bar,
}
function f(x: E2) {
  console.log('只能是 Foo 或者 Bar');
}

// 运行时的枚举
enum E3 {
  X,
  Y,
  Z,
}
function f2(obj: { X: number }) {
  console.log('测试', obj);
}
f2(E3); // OK 因为枚举对象是真实存在的

// 反向映射

// 除了创建一个以属性名做为对象成员的对象之外
// 【数字枚举】成员还具有了 反向映射，从枚举值到枚举名字

enum E4 {
  A,
}
let a = E4.A;
let nameOfA = E4[a]; // A

// 字符串枚举成员生成反向映射

// const 枚举

// 常量枚举通过在枚举上使用 const修饰符来定义

const enum E5 {
  A = 1,
  B = A * 2,
}
const enum Direction4 {
  Up,
  Down,
  Left,
  Right,
}
let d = [Direction4.Up, Direction4.Down, Direction4.Left, Direction4.Right];

// 外部枚举 ??

// 外部枚举用来描述已经存在的枚举类型的形状
declare enum E6 {
  A = 1,
  B,
  C = 2,
}

// 外部枚举和非外部枚举之间有一个重要的区别
// 在正常的枚举里，没有初始化方法的成员被当成常数成员。
// 对于非常数的外部枚举而言，没有初始化方法时被当做需要经过计算的
