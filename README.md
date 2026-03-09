1. What is the difference between var, let, and const?
Ans: var is old js variable declaration. let and const is modern. we can change the value for let but can not change the value for const. There is some problem with var. It can be redeclared. But let and const can not be redeclared. var gets hoisted and initialized with undefined. let gets hoisted but not initialized. const must be initialized when declared.

2.What is the spread operator (...)?
Ans: suppose,
const numbers = [3,4,5,10,8,9,50];
here, console.log(Math.max(numbers)); will return NaN. Because math.max used the array not the items of numbers array. To solve this problem we use spread operator. Finally, we can say that spread operator expands elements of an array or object.

3. What is the difference between map(), filter(), and forEach()?
Ans:  map(), filter(), and forEach() all of them are array method. But there working purpose is different. map() transforms an array into a new array and returns it. on the other hand, forEach() does NOT return a new array. it often used for printing, updating DOM, logging, etc. filter() selects specific items based on condition then returns it.

4.What is an arrow function?
Ans. There are many ways to write a function. Arrow Function is one of them. It shorts a function.
normally we write:
function add1(num1,num2){
    return num1+num2;
}
console.log(add1(10,20));

but in arrow function we can write this:
const add3 = (num1,num2) => num1+num2;
console.log(add3(100,200));

so we can say, arrow function is a short way to write functions in JavaScript.

5.What are template literals?
Ans: Template literals is a way of writing string. we use back ticks instead of quotes. In quotes we can not write multi line string. Also we can not change it dynamically. With the help of template literals we can write multi line as well as change it dynamically by using ${}.
