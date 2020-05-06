/**
 * 类
 * https://www.tslang.cn/docs/handbook/classes.html
 */
class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    return `Hello, ${this.greeting}`;
  }
}
let greeter = new Greeter('world');

// 继承

// 允许使用继承来扩展现有的类
class Animal {
  move(distanceInMeters: number = 0) {
    console.log(`move ${distanceInMeters} meters.`);
  }
}
class Dog extends Animal {
  bark() {
    console.log('Woof! Woof!');
  }
}
let dog = new Dog();
dog.bark();
dog.move(10);
dog.bark();

// 类从基类中继承了属性和方法。
// 这里， Dog是一个 派生类，它派生自 Animal 基类，通过 extends关键字。
// 派生类通常被称作 子类，基类通常被称作 超类。

class Animal2 {
  name: string;
  constructor(theName: string) {
    this.name = theName;
  }
  move(distanceInMeters: number = 0) {
    console.log(`${this.name} move ${distanceInMeters} meters.`);
  }
}
class Snake extends Animal2 {
  constructor(name) {
    super(name);
  }
  move(distanceInMeters = 5) {
    console.log('Slithering...');
    super.move(distanceInMeters);
  }
}
class Horse extends Animal2 {
  constructor(name) {
    super(name);
  }
  move(distanceInMeters = 45) {
    console.log('Galloping...');
    super.move(distanceInMeters);
  }
}
let snake = new Snake('snake');
snake.move(23);
let horse: Animal = new Horse('horse'); // 尽管他是 Animal 类型，但是他的值是 Horse 所以会调用 Horse 里面的 move 重写的方法
horse.move(100);

// 派生类包含了一个构造函数，它 必须调用 super()，它会执行基类的构造函数。
// 而且，在构造函数里访问 this的属性之前，我们 一定要调用 super() 。
// 这个是TypeScript强制执行的一条重要规则。

// 公有，私有和受保护的修饰符

// 默认 public

// 当成员被标记成 private时，它就不能在声明它的类的外部访问

class Animal3 {
  private name: string;
  constructor(theName: string) {
    this.name = theName;
  }
}
// new Animal3('a3').name; // 报错

// TS 比较不同的类型的时候不在乎他们从何而来，只要类型是兼容的就行
// 但是对于 private 和 protected 来说就在乎来源了

class Rhino extends Animal3 {
  constructor() {
    super('rhino');
  }
}
class Employee {
  private name: string;
  constructor(theName: string) {
    this.name = theName;
  }
}

let animal3 = new Animal3('a3');
let rhino = new Rhino();
let e1 = new Employee('e3');
animal3 = rhino;
// animal3 = e1; // 报错，类型不兼容

// protected

class Person {
  protected name: string;
  constructor(name: string) {
    this.name = name;
  }
}
class Employee2 extends Person {
  private department: string;
  constructor(name: string, department: string) {
    super(name);
    this.department = department;
  }
  getElevatorPitch() {
    // 如果 name 在 Person 里面声明为 private, 报错
    console.log(`my name is ${this.name}, work in ${this.department}`);
  }
}
let howard = new Employee2('howard', 'wangjing');
howard.getElevatorPitch();
// howard.name; // 报错

// 构造函数也可以被标记成 protected。
// 这意味着这个类不能在包含它的类外被实例化，但是能被继承
class Person2 {
  protected name: string;
  protected constructor(name: string) {
    this.name = name;
  }
}
class Employee3 extends Person2 {
  private department: string;
  constructor(name: string, department: string) {
    super(name);
    this.department = department;
  }
  getElevatorPitch() {
    console.log(`my name is ${this.name}, work in ${this.department}`);
  }
}
let h2 = new Employee3('h3', 'soho');
// let p1 = new Person2('p2'); // 报错

// readonly 修饰符

// 可以使用 readonly关键字将属性设置为只读的。
// 只读属性必须在声明时或构造函数里被初始化

class Octopus {
  readonly name: string;
  readonly numberOfLegs: number = 8;
  constructor(name: string) {
    this.name = name;
  }
}
let o1 = new Octopus('o1');
o1.name;
o1.numberOfLegs;
// o1.name = '123'; // 报错

// 参数属性

// 参数属性可以方便地让我们在一个地方定义并初始化一个成员

// 以下
// 构造函数里使用 readonly name: string参数来创建和初始化 name成员。 我们把声明和赋值合并至一处
class Octopus2 {
  readonly numberOfLegs: number = 8;
  constructor(readonly name: string) {}
}
let o2 = new Octopus2('o2');
o2.name;
o2.numberOfLegs;

// 参数属性通过给构造函数参数前面添加一个访问限定符来声明。
// 使用 private限定一个参数属性会声明并初始化一个私有成员；对于 public和 protected来说也是一样

// 存取器

// 通过getters/setters来截取对对象成员的访问。 它能帮助你有效的控制对对象成员的访问

// 没有存取器的类
class Employee {
  fullName: string;
}
let employee = new Employee();
employee.fullName = 'fn';
console.log(employee.fullName);

// 有存取器的类
let passcode = 'secure passcode';
class Employee2 {
  private _fullName: string;
  get fullName(): string {
    return this._fullName;
  }
  set fullName(fullName: string) {
    if (passcode && passcode === 'secret passcode') {
      this._fullName = fullName;
    } else {
      console.log('passcode error');
    }
  }
}
let employee2 = new Employee2();
employee2.fullName;
employee2.fullName = '123';

// 关于存取器需要注意的地方：
// 1、存取器要求你将编译器设置为输出ECMAScript 5或更高。 不支持降级到ECMAScript 3。
// 2、只带有 get不带有 set的存取器自动被推断为 readonly。
// 这在从代码生成.d.ts文件时是有帮助的，因为利用这个属性的用户会看到不允许够改变它的值。

// 静态属性

// 使用 [类名].[属性名] 访问静态属性
class Grid {
  static origin = { x: 0, y: 0 };
  calculateDistanceFromOrigin(point: { x: number; y: number }): number {
    let xDist = point.x - Grid.origin.x;
    let yDist = point.y - Grid.origin.y;
    return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
  }
  constructor(public scale: number) {}
}
let g1 = new Grid(1);
g1.calculateDistanceFromOrigin({
  x: 5,
  y: 5,
});

// 抽象类

// 抽象类做为其它派生类的基类使用。 它们一般不会直接被实例化。
// 不同于接口，抽象类可以包含成员的实现细节。
// abstract关键字是用于定义抽象类和在抽象类内部定义抽象方法
abstract class Animal {
  abstract makeSound(): void;
  move(): void {
    console.log('roaming the earch...');
  }
}

// 抽象类中的抽象方法不包含具体实现并且必须在派生类中实现。
// 抽象方法的语法与接口方法相似。 两者都是定义方法签名但不包含方法体。
// 然而，抽象方法必须包含 abstract关键字并且可以包含访问修饰符。

abstract class Department {
  constructor(public name: string) {}
  printName(): void {
    console.log(`Department name is ${this.name}`);
  }
  abstract printMetting(): void; // 必须在派生类中实现
}
class AccountingDepartment extends Department {
  constructor() {
    super('Accounting and Auditing'); // 在派生类的构造函数中必须调用 super
  }
  printMetting(): void {
    console.log('The Accounting Department meets each Monday at 10am.');
  }
  generateReports(): void {
    console.log('Generating accounting reports...');
  }
}
let d1: Department;
// d1 = new Department('d1'); // 报错，不能实例化一个抽象类
d1 = new AccountingDepartment();
d1.printMetting();
d1.printName();
// d1.generateReports(); // 报错 d1 的类型改成 AccountingDepartment 就不报错了

// 高级技巧 -- 构造函数

// 把类当做接口使用
