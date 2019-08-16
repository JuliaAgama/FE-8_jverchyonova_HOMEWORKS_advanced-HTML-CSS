/* Advanced JS. Prototypes. HomeWork_02. Hamburger (ES6)*/
;
    //  data base simulation:
    const sizes = [
        {value: 'small', price: 50, calories: 20},
        {value: 'large', price: 100, calories: 40}
    ];
    const stuffings = [
        {value: 'cheese', price: 10, calories: 20},
        {value: 'salad', price: 20, calories: 5},
        {value: 'potato', price: 15, calories: 10}
    ];
    const toppings = [
        {value: 'spices', price: 15, calories: 0},
        {value: 'mayonese', price: 20, calories: 5}
    ];

/*******************************************************************/
{
    /* Класс, объекты которого описывают параметры гамбургера. */

    class Hamburger {

        /* Размеры, виды начинок и добавок */
        static SIZE_SMALL = 'small';
        static SIZE_LARGE = 'large';
        static STUFFING_CHEESE = 'cheese';
        static STUFFING_SALAD = 'salad';
        static STUFFING_POTATO = 'potato';
        static TOPPING_MAYO = 'mayonese';
        static TOPPING_SPICE = 'spices';

        constructor (size, stuffing) {
            this.size = size;
            this.stuffing = stuffing;
            this._toppings = [];
        }

        // функция проверки правильности ввода:
        validateInput (el) {
            for (let key in Hamburger) {
                if(el == Hamburger[key]) {
                    return true;
                }
            }
            return false;
        };

        /* Узнать размер гамбургера */
        get size () {
            return this._size;
        }
        set size (value) {
            if (!value) {
                throw new HamburgerException (`NO SIZE CHOSEN! You must enter size of hamburger!!!!`);
            } else if (!this.validateInput(value)) {
                throw new HamburgerException (`INVALID SIZE "${value}"! Choose correct size!!!!`)
            } else {
                this._size = value;
            }
        }

    /* Узнать начинку гамбургера */
        get stuffing () {
            return this._stuffing;
        }
        set stuffing (value) {
            if (!value) {
                throw new HamburgerException (`NO SIZE CHOSEN! You must enter stuffing of hamburger!!!!`);
            } else if (!this.validateInput(value)) {
                throw new HamburgerException (`INVALID STUFFING "${value}"! Choose correct stuffing!!!!`)
            } else {
                this._stuffing = value;
            }
        }

        /* Получить список добавок. */
        get toppings () {
            return this._toppings;
        }

        /* Добавить добавку к гамбургеру. Можно несколько, если разные */
        addTopping (t) {
            if (this.toppings.some(el => el==t)) {
                throw new HamburgerException(`DUPLICATE TOPPING. You are trying to add: "${t}". But you have already added it`);
            } else if (!this.validateInput(t)) {
                throw new HamburgerException (`INVALID TOPPING "${t}"! Choose correct TOPPING!!!!`);
            } else {
                this.toppings.push(t);
            }
            console.log(`you have added "${t}".`);
        }

        /* Убрать добавку, если она ранее была добавлена */
        removeTopping (t) {
            if (this._toppings.some(el => el==t)) {
                this._toppings = this._toppings.filter(el => el!==t);
            } else {
                throw new HamburgerException(`TOPPING IS NOT FOUND. You didn't add the "${t}". So, you cannot remove it`);
            }
            console.log(`you have removed "${t}"`);
        }

        /* Узнать цену гамбургера */
        calculatePrice () {
            let price = sizes.find(el => el.value == this._size).price+stuffings.find(el => el.value == this._stuffing).price;
            if(this._toppings[0]) {
                this._toppings.forEach(function(i) {
                        price += toppings.find(el => el.value == i).price;
                });
            };
            return price;
        }

        /* Узнать калорийность */
        calculateCalories () {
            let calories = sizes.find(el => el.value == this._size).calories+stuffings.find(el => el.value == this._stuffing).calories;
            if(this._toppings[0]) {
                this._toppings.forEach(function(i) {
                        calories += toppings.find(el => el.value == i).calories;
                });
            };
            return calories;
        }
    }

    /* Представляет информацию об ошибке в ходе работы с гамбургером. */
    class HamburgerException {
        constructor (message) {
            this.name = 'NO!!! ';
            this.message = message;
        }

        get message() {
            return this._message;
        }
        set message(value) {
            this._message = value;
        }
    }

    /* Let's check the result: */
    try {
        // маленький гамбургер с начинкой из сыра, узнаем цену и калории
        let myHam = new Hamburger('small', 'cheese');
        console.log(`You have created new Hamburger! size: ${myHam.size}, stuffing: ${myHam.stuffing}. Price: ${myHam.calculatePrice()} uah. (${myHam.calculateCalories()} calories)`);
        console.log(`Total price: ${myHam.calculatePrice()}.`)
        console.log(`Total calories: ${myHam.calculateCalories()}.`)
        console.log('----------------------------');

        // добавка из майонеза, узнаем цену и калории
        myHam.addTopping('mayonese');
        console.log(`(myHam) has ${myHam.toppings.length} toppings: ${myHam.toppings.join(', ')}`);
        console.log(`Total price: ${myHam.calculatePrice()}.`)
        console.log(`Total calories: ${myHam.calculateCalories()}.`)
        console.log('----------------------------');

        // добавка из специй, узнаем цену и калории
        myHam.addTopping('spices');
        console.log(`Total price: ${myHam.calculatePrice()}.`)
        console.log(`Total calories: ${myHam.calculateCalories()}.`)
        console.log('----------------------------');

        // узнаем, с какими добавками гамбургер
        console.log(`(myHam) has ${myHam.toppings.length} toppings: ${myHam.toppings.join(', ')}`);

        // узнаем, большой ли гамбургер
        console.log(`Is (myHam) large? ${myHam.size === 'large'}.`);

        // узнаем, с какой начинкой гамбургер
        console.log(`What stuffing is in (myHam)? ${myHam.stuffing}.`);
        console.log('----------------------------');

        // Еще один гамбургер: большой с начинкой из салата, узнаем цену и калории
        let yourHam = new Hamburger('large', 'salad');
        console.log(`You have created new Hamburger! size: ${yourHam.size}, stuffing: ${yourHam.stuffing}.`);
        console.log(`Total price: ${yourHam.calculatePrice()}.`)
        console.log(`Total calories: ${yourHam.calculateCalories()}.`)
        console.log('----------------------------');

        // добавка из специй, узнаем цену и калории
        yourHam.addTopping('spices');
        console.log(`(yourHam) has ${yourHam.toppings.length} toppings: ${yourHam.toppings.join(', ')}`);
        console.log(`Total price: ${yourHam.calculatePrice()}.`)
        console.log(`Total calories: ${yourHam.calculateCalories()}.`)
        console.log('----------------------------');

        // передумали, убираем добавку из специй, обновляем цену и калории
        yourHam.removeTopping('spices');
        console.log(`(yourHam) has ${yourHam.toppings.length} toppings: ${yourHam.toppings.join(', ')}`);
        console.log(`Total price: ${yourHam.calculatePrice()}.`)
        console.log(`Total calories: ${yourHam.calculateCalories()}.`)
        console.log('----------------------------');


// /** Examples of EXCEPTIONS: */
        // let emptyHam = new Hamburger(); //NO!!!  You must choose both SIZE and STUFFING!!!!
        // let wrongSize = new Hamburger('hi', 'salad'); //NO!!!  INVALID SIZE...
        // let wrongStuffing = new Hamburger('small', 'hi'); //NO!!!  INVALID SIZE...
        // myHam.addTopping('spices'); //NO!!!  DUPLICATE TOPPING...
        // myHam.addTopping('hi'); //NO!!!  INVALID TOPPING...
        // yourHam.removeTopping('spices'); //NO!!! TOPPING IS NOT FOUND

    } catch (e) {
        console.error(e.name, e.message);
    };

}
