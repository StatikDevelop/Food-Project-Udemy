function User(name, age, human) {
    this.name = name;
    this.age = age;
    this.human = true;
    this.hello = function() {
        console.log(`Привет ${this.name}`);
    };
}

User.prototype.exit = function() {
    console.log(`Пользователь, ${this.name}, вышел`);
};

const alex = new User('Alex', 35);
const nikita = new User('Nikita', 35);

alex.hello();

console.log(alex);

alex.exit();


//LESSON 46


function showThis() {
    // console.log(this);
}
showThis();

const obj = {
    a: 20,
    b: 40,
    sum: function() {
        console.log(this);
    }
};

obj.sum();

// 1) Обычная функция: this = window, но если use strict - undefined;
// 2) Контекст у методов объекта - сам объект;
// 3) this в конструкторах и классах - это новый экземпляр;
// 4) Ручная привязка this: call, apply, bind

function count(num) {
    return this*num;
}

const double = count.bind(2);
const triple = count.bind(3);

console.log(double(10));
console.log(triple(10));

const btn = document.querySelector('button');