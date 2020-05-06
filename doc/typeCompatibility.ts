/**
 * 类型兼容性
 * https://www.tslang.cn/docs/handbook/type-compatibility.html
 */

/**
 * 没看完
 */

// TypeScript里的类型兼容性是基于结构子类型的。
// 结构类型是一种只使用其成员来描述类型的方式。 它正好与名义（nominal）类型形成对比

interface Named {
  name: string;
}
class Person {
  name: string;
}
let p: Named;
p = new Person(); // OK

// TypeScript结构化类型系统的基本规则是，如果x要兼容y，那么y至少具有与x相同的属性

let x: Named;
let y = {
  name: 'xiaoming',
  location: 'beijing',
};
x = y; // OK

// 检查函数参数的时候使用相同的规则
function greet(x: Named) {
  console.log(`Hello, ${x.name}`);
}
greet(y); // OK

// 这个比较过程是递归进行的，检查每个成员和子成员

// 比较两个函数

let x1 = (a: number) => 0;
let y1 = (a: number, s: string) => 0;

// x1 = y1; // 报错 y1 的第二个参数在 x1 中找不到，所以不允许赋值
y1 = x1; // OK x1 的每个参数在 y1 中都能找到对应的参数，所以允许赋值

// 返回类型不同怎么兼容
let x2 = () => ({ name: '小明' });
let y2 = () => ({ name: '小明', location: '北京' });

x2 = y2; // OK
// y2 = x2; // 报错 源函数的返回值必须是目标函数返回值的子类型（源函数 = 目标函数）

// 函数参数双向协变 ??

// 可选参数及剩余参数
