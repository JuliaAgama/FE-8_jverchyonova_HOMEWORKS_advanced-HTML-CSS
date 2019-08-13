/* Advanced JS. Prototypes. HomeWork_02. Hamburger (ES-6)*/
;
/*******************************************************************/

{

    /*******************************************************************
       * Класс, объекты которого описывают параметры гамбургера.
       * @constructor
       * @param size        Размер
       * @param stuffing    Начинка
       * @throws {HamburgerException}  При неправильном использовании
       */

    class Hamburger {

        constructor (size, stuffing) {
            this.size = size;
            this.stuffing = stuffing;
            this._toppings = [];
        }

        get size () {
            return this._size;
        }
        set size (value) {
            if (!value) {
                throw new HamburgerException (`NO SIZE CHOSEN! You must enter size of hamburger!!!!`);
            } else if (!validateInput(size)) {
                throw new HamburgerException (`INVALID SIZE "${size}"! Choose correct size!!!!`)
            } else {
                this._size = value;
            }
        }

        get stuffing {
            
        }


        // validation of input:
        if (!stuffing) {
            throw new HamburgerException (`You must choose both SIZE and STUFFING!!!!`)
        };
        if(!validateInput(size)) {
            throw new HamburgerException (`INVALID SIZE "${size}"! Choose correct size!!!!`)
        };

        if(!validateInput(stuffing)) {
            throw new HamburgerException (`INVALID STUFFING "${stuffing}"! Choose correct stuffing!!!!`)
        };
        
        function validateInput (el) {
            for (let key in Hamburger) {
                if(el == Hamburger[key]) {
                    return true;
                }
            }
            return false;
        };

        

        // console.log(`You have created new Hamburger: ${this.size}, ${this.stuffing}. Price: ${sizes[this.size].price+stuffings[this.stuffing].price} uah (${sizes[this.size].calories+stuffings[this.stuffing].calories} calories).`)
    };

    
    /* Размеры, виды начинок и добавок */

    Hamburger.SIZE_SMALL = 'size_small';
    Hamburger.SIZE_LARGE = 'size_large';
    Hamburger.STUFFING_CHEESE = 'stuffing_cheese';
    Hamburger.STUFFING_SALAD = 'stuffing_salad';
    Hamburger.STUFFING_POTATO = 'stuffing_potato';
    Hamburger.TOPPING_MAYO = 'topping_mayo';
    Hamburger.TOPPING_SPICE = 'topping_spice';


    //  data base simulation:
    const sizes = {};
    const stuffings = {};
    const toppings = {};

    sizes[Hamburger.SIZE_SMALL] = {price: 50, calories: 20};
    sizes[Hamburger.SIZE_LARGE] = {price: 100, calories: 40};

    stuffings[Hamburger.STUFFING_CHEESE] = {price: 10, calories: 20};
    stuffings[Hamburger.STUFFING_SALAD] = {price: 20, calories: 5};
    stuffings[Hamburger.STUFFING_POTATO] = {price: 15, calories: 10};

    toppings[Hamburger.TOPPING_SPICE] = {price: 15, calories: 0};
    toppings[Hamburger.TOPPING_MAYO] = {price: 20, calories: 5};




    /*******************************************************************
     * Добавить добавку к гамбургеру. Можно добавить несколько добавок,
     * при условии, что они разные.
     *
     * @param topping     Тип добавки
     * @throws {HamburgerException}  При неправильном использовании
     */

    Hamburger.prototype.addTopping = function (topping) {
        if (this._toppings.some(function(el) {return el==topping;})) {
            throw new HamburgerException(`DUPLICATE TOPPING. You are trying to add: "${topping}". But you have already added it`);
        } else {
            this._toppings.push(topping);
        }
        console.log(`you have added "${topping}". Calories: ${toppings[topping].calories}. Price: ${toppings[topping].price}`);
    }


    /*******************************************************************
     * Убрать добавку, при условии, что она ранее была добавлена.
     *
     * @param topping   Тип добавки
     * @throws {HamburgerException}  При неправильном использовании
     */

    Hamburger.prototype.removeTopping = function (topping) {
        if (this._toppings.some(function(el) {return el==topping;})) {
            this._toppings = this._toppings.filter(function(el) {return el!==topping});
        } else {
            throw new HamburgerException(`TOPPING IS NOT FOUND. You didn't add the "${topping}". So, you cannot remove it`);
        }
        console.log(`you have removed "${topping}"`);
    }


    /*******************************************************************
       * Получить список добавок.
       * @return {Array} Массив добавленных добавок, содержит константы
       *                 Hamburger.TOPPING_*
       */

    Hamburger.prototype.getToppings = function () {
        return this._toppings;
    }


    /*******************************************************************
     * Узнать размер гамбургера */

    Hamburger.prototype.getSize = function () {
        return this.size;
    }


    /*******************************************************************
       * Узнать начинку гамбургера */
    Hamburger.prototype.getStuffing = function () {
        return this.stuffing;
    }


    /*******************************************************************
       * Узнать цену гамбургера
       * @return {Number} Цена в тугриках
       */

    Hamburger.prototype.calculatePrice = function () {
        let price = sizes[this.size].price + stuffings[this.stuffing].price;
        if(this._toppings[0]) {
            this._toppings.forEach(function(el) {
                    price += toppings[el].price;
            });
        };
        return price;
    }


    /*******************************************************************
     * Узнать калорийность
     * @return {Number} Калорийность в калориях
     */
    Hamburger.prototype.calculateCalories = function () {
        let calories = sizes[this.size].calories + stuffings[this.stuffing].calories;
        if(this._toppings[0]) {
            this._toppings.forEach(function(el) {
                    calories += toppings[el].calories;
            });
        };
        return calories;
    }


    /*******************************************************************
     * Представляет информацию об ошибке в ходе работы с гамбургером.
       * Подробности хранятся в свойстве message.
       * @constructor
       */
    function HamburgerException (message) {
        this.name = 'NO!!! ';
        this.message = message;
    }


    /*******************************************************************
    /** Let's check the result: */
    try {
        // маленький гамбургер с начинкой из сыра, узнаем цену и калории
        let myHam = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE);
        console.log(`Total calories: ${myHam.calculateCalories()}.`)
        console.log(`Total price: ${myHam.calculatePrice()}.`)
        console.log('----------------------------');
        
        // добавка из майонеза, узнаем цену и калории
        myHam.addTopping(Hamburger.TOPPING_MAYO);
        console.log(`Total calories: ${myHam.calculateCalories()}.`)
        console.log(`Total price: ${myHam.calculatePrice()}.`)
        console.log('----------------------------');
        
        // добавка из специй, узнаем цену и калории
        myHam.addTopping(Hamburger.TOPPING_SPICE);
        console.log(`Total calories: ${myHam.calculateCalories()}.`)
        console.log(`Total price: ${myHam.calculatePrice()}.`)
        console.log('----------------------------');
        
        // узнаем, большой ли гамбургер
        console.log(`Is (myHam) large? ${myHam.getSize() === Hamburger.SIZE_LARGE}.`);
        // узнаем, с какой начинкой гамбургер
        console.log(`What stuffing is in (myHam)? ${myHam.getStuffing()}.`);
        // узнаем, с какими добавками гамбургер
        console.log(`(myHam) has ${myHam.getToppings().length} toppings.`);
        console.log('----------------------------');
        
        // Еще один гамбургер: большой с начинкой из салата, узнаем цену и калории
        let yourHam = new Hamburger(Hamburger.SIZE_LARGE, Hamburger.STUFFING_SALAD);
        console.log(`Total calories: ${yourHam.calculateCalories()}.`)
        console.log(`Total price: ${yourHam.calculatePrice()}.`)
        console.log('----------------------------');
        
        // добавка из специй, узнаем цену и калории
        yourHam.addTopping(Hamburger.TOPPING_SPICE);
        console.log(`Total calories: ${yourHam.calculateCalories()}.`)
        console.log(`Total price: ${yourHam.calculatePrice()}.`)
        console.log('----------------------------');
        
        // передумали, убираем добавку из специй, обновляем цену и калории
        yourHam.removeTopping(Hamburger.TOPPING_SPICE);
        console.log(`Total calories: ${yourHam.calculateCalories()}.`)
        console.log(`Total price: ${yourHam.calculatePrice()}.`)
        console.log('----------------------------');


/** Examples of EXCEPTIONS: */
        // myHam.addTopping(Hamburger.TOPPING_SPICE); //NO!!!  DUPLICATE TOPPING...
        // yourHam.removeTopping(Hamburger.TOPPING_SPICE); //NO!!! TOPPING IS NOT FOUND
        // let emptyHam = new Hamburger(); //NO!!!  You must choose both SIZE and STUFFING!!!!
        // let wrongHam = new Hamburger('hi', Hamburger.STUFFING_SALAD); //NO!!!  INVALID SIZE...

    } catch (e) {
        console.error(e.name, e.message);
    };


}

