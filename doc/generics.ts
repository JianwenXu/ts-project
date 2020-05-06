/**
 * 泛型
 * https://www.tslang.cn/docs/handbook/generics.html
 */

// 没有使用泛型
function identity(argu: number): number {
  return argu;
}

function identity2(argu: any): any {
  return argu;
}

// 但是上面那种可以瞎返回
// 我们需要一种方法使返回值的类型与传入参数的类型是相同的

// 以下这个函数叫泛型， 其中 T 是类型参数
function identity3<T>(argu: T): T {
  return argu;
}

// 泛型函数有两种使用方法
// 1、传入所有参数，包括类型参数
let output = identity3<string>('name');
// 2、[普遍使用]利用了类型推论 -- 即编译器会根据传入的参数自动地帮助我们确定T的类型
let output2 = identity3('name');

// 如果编译器不能够自动地推断出类型的话，只能像上面那样明确的传入T的类型，在一些复杂的情况下，这是可能出现的。

// 使用泛型变量

function loggingIdentity<T>(argu: T): T {
  // console.log(argu.length); // 报错
  return argu;
}
// 这可以让我们把泛型变量T当做类型的一部分使用，而不是整个类型，增加了灵活性
function loggingIdentity2<T>(argu: T[]): T[] {
  console.log(argu.length); // OK
  return argu;
}
function loggingIdentity3<T>(argu: Array<T>): Array<T> {
  console.log(argu.length); // OK
  return argu;
}

// 泛型类型

function identity4<T>(arg: T): T {
  return arg;
}
// 泛型函数的类型与非泛型函数的类型没什么不同，只是有一个类型参数在最前面，像函数声明一样
const identity5: <T>(arg: T) => T = identity4;
// 我们也可以使用不同的泛型参数名，只要在数量上和使用方式上能对应上就可以
const identity6: <U>(arg: U) => U = identity4;
// 我们还可以使用带有调用签名的对象字面量来定义泛型函数
const identity7: { <T>(arg: T): T } = identity4;
// 泛型接口
interface GenIdentityFn {
  <T>(arg: T): T;
}
const identity8: GenIdentityFn = identity4;
// 我们可能想把泛型参数当作整个接口的一个参数。 这样我们就能清楚的知道使用的具体是哪个泛型类型。
// 这样接口里的其它成员也能知道这个参数的类型了
interface GenIdentityFn2<T> {
  (arg: T): T;
}
const identity9: GenIdentityFn2<number> = identity4;
// const identity10: GenIdentityFn2 = identity4; // 报错，必须传类型参数

// 理解何时把参数放在调用签名里和何时放在接口上是很有帮助的

// 除了泛型接口，我们还可以创建泛型类。 注意，无法创建泛型枚举和泛型命名空间

// 泛型类

class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}
let n1 = new GenericNumber<number>();
n1.zeroValue = 0;
n1.add = (x, y) => x + y;
let s1 = new GenericNumber<string>();
s1.zeroValue = '';
s1.add = (x, y) => x + y;

// 注意：
// 泛型类指的是实例部分的类型，所以类的静态属性不能使用这个泛型类型。

// 泛型约束

// 我们可以对类型进行条件约束

// 可以通过定义一个接口来描述约束条件
interface Lengthwise {
  length: number;
}
function loggingIdentity4<T extends Lengthwise>(arg: T): T {
  console.log(arg.length); // OK
  return arg;
}
// const i1 = loggingIdentity4<number>(123); // 报错
// const i2 = loggingIdentity4(123); // 报错
const i3 = loggingIdentity4('hello'); // OK

// 在泛型约束中使用类型参数 ???
// function getProperty(obj: T, key: K) { // 报错 ？？
//     return obj[key];
// }
// const obj = {
//     a: 1,
//     b: 2,
//     c: 3,
//     d: 4,
// };
// getProperty(obj, 'a');
// getProperty(obj, 'm');

// 在泛型中使用类类型

function create<T>(c: { new (): T }): T {
  return new c();
}

// 一个更高级的例子，使用原型属性推断并约束构造函数与类实例的关系

class BeeKeeper {
  hasMask: boolean;
}
class ZooKeeper {
  nametag: string;
}
class Animal {
  numLegs: number;
}
class Bee extends Animal {
  keeper: BeeKeeper;
}
class Lion extends Animal {
  keeper: ZooKeeper;
}
function createInstance<A extends Animal>(c: new () => A): A {
  return new c();
}
createInstance(Lion).keeper.nametag;
// createInstance(Lion).keeper.hasMask; // 报错
createInstance(Bee).keeper.hasMask;
