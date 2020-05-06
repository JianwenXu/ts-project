/**
 * 函数
 * https://www.tslang.cn/docs/handbook/functions.html
 */

// 函数类型

// 为函数定义类型
function add(x: number, y: number): number {
  return x + y;
}
const add2 = function(x: number, y: number): number {
  return x + y;
};
// 我们可以给每个参数添加类型之后再为函数本身添加返回值类型。
// TypeScript能够根据返回语句自动推断出返回值类型，因此我们通常省略它

// 完整类型

// 可选参数和默认参数

// TS 中 传递给一个函数的参数个数必须与函数期望的参数个数一致

function buildName(firstName: string, lastName?: string) {
  return `${firstName} ${lastName}`;
}
const name1 = buildName('a');
const name2 = buildName('a', 'b');
// const name3 = buildName('a', 'b', 'c'); // 报错

// 可选参数必须跟在必须参数后面

function buildName2(firstName: string, lastName: string = 'smith') {
  return `${firstName} ${lastName}`;
}

// 在所有必须参数后面的带默认初始化的参数都是可选的，与可选参数一样，在调用函数的时候可以省略。
// 也就是说可选参数与末尾的默认参数共享参数类型
// 共享的类型为 (firstName: string, lastName?: string) => string

// 与普通可选参数不同的是，带默认值的参数不需要放在必须参数的后面。
// 如果带默认值的参数出现在必须参数前面，用户必须明确的传入 undefined值来获得默认值。

// 剩余参数

function buildName3(firstName: string, ...restArgus: string[]): string {
  return `${firstName} ${restArgus.join(' ')}`;
}
buildName3('a'); // 剩余参数可以是 0 ~ n 个
buildName3('a', 'b');
const buildName4: (fname: string, ...rest: string[]) => string = buildName3;

// this

// this 和 箭头函数

// 箭头函数能保存函数创建时的 this值，而不是调用时的值

let deck = {
  suits: ['hearts', 'spades', 'clubs', 'diamonds'],
  cards: Array(52),
  createCardPicker: function() {
    // NOTE: the line below is now an arrow function, allowing us to capture 'this' right here
    return () => {
      let pickedCard = Math.floor(Math.random() * 52);
      let pickedSuit = Math.floor(pickedCard / 13);

      return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
    };
  },
};
let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

console.log('card: ' + pickedCard.card + ' of ' + pickedCard.suit);

// this 参数

// this 参数在回调函数中

// 重载
let suits = ['hearts', 'spades', 'clubs', 'diamonds'];

function pickCard(x: { suit: string; card: number }[]): number;
function pickCard(x: number): { suit: string; card: number };
function pickCard(x): any {
  if (typeof x === 'object') {
    let pickedCard = Math.floor(Math.random() * x.length);
    return pickedCard;
  } else if (typeof x === 'number') {
    let pickedSuit = Math.floor(x / 13);
    return {
      suit: suits[pickedSuit],
      card: x % 13,
    };
  }
}

// 为了让编译器能够选择正确的检查类型，它与JavaScript里的处理流程相似。
// 它查找重载列表，尝试使用第一个重载定义。
// 如果匹配的话就使用这个。 因此，在定义重载的时候，一定要把最精确的定义放在最前面。

// 注意，function pickCard(x): any并不是重载列表的一部分，
// 因此这里只有两个重载：一个是接收对象另一个接收数字。 以其它参数调用 pickCard会产生错误。
