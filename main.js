class Good { //этот плоский класс нужен онли для описания товара. в шарпах, например, можно было бы использовать struct, но тут красивее так
    constructor(image, name, descr, price) {
        this._image = image;
        this._name = name;
        this._descr = descr;
        this._price = price;
    }
    get image() { return this._image }
    get name() { return this._name }
    get descr() { return this._descr }
    get price() { return this._price }
    get render() {
        return `<div class="good">  
        <img class="good--image" src=" ${this._image}" alt="">  
        <h3 class="good--name">${this._name}</h3> 
        <p class="good-descr">${this._descr}</p>
        <p class="good--price"><span class = "good--price__count">${this._price}</span>$</p>
        <button class="good--button">Добавить</button>
        </div>`;
    }
}

class GoodsManager {
    constructor() {
        this._list = [];
    }
    get get() {
        return this._list;
    }
    get totalPrice() {
        let total = 0;
        this._list.forEach(element => {
            total += element.price;
        });
        return total;
    }
    add(item) {
        if (typeof item === typeof new Good()) this._list.push(item);
    }
    fullGoodsList() { //а тут может быть какой-нить запрос, вместо вбивания номенклатуры ручками. ps только опосля заметил подобный метод (fetchGoods()) в методичке, сижу довольный, что сам дошел до этого С:
        const good10 = new Good('https://place-hold.it/150', 'Товар 10', 'Описание товара 10', 109); //это для примера
        goodsManager.add(new Good('https://place-hold.it/150', 'Товар 1', 'Описание товара 1', 101));
        goodsManager.add(new Good('https://place-hold.it/150', 'Товар 2', 'Описание товара 2', 102));
        goodsManager.add(new Good('https://place-hold.it/150', 'Товар 3', 'Описание товара 3', 103));
        goodsManager.add(new Good('https://place-hold.it/150', 'Товар 4', 'Описание товара 4', 104));
        goodsManager.add(new Good('https://place-hold.it/150', 'Товар 5', 'Описание товара 5', 105));
        goodsManager.add(new Good('https://place-hold.it/150', 'Товар 6', 'Описание товара 6', 106));
        goodsManager.add(new Good('https://place-hold.it/150', 'Товар 7', 'Описание товара 7', 107));
        goodsManager.add(new Good('https://place-hold.it/150', 'Товар 8', 'Описание товара 8', 108));
        goodsManager.add(new Good('https://place-hold.it/150', 'Товар 9', 'Описание товара 9', 109));
        goodsManager.add(good10); //можно и так
        goodsManager.add("НЕ GOOD"); //пример проверки от "сферического идиота в вакууме". раз на то пошло, то нужно делать и проверки на NaN у price, чтоб не словить ошибку при получении тотал прайса
    }
}

class GoodPresenter { //в методичке метод "render()" находится в классе GoodsList (мой аналог GoodsManager). Я с этим делом не согласен, так как считаю, что ответственности нужно разделять. Пусть уж Лист занимается листом, а Отоброжатель отображением.
    constructor(list) {
        this._goodsList = goods.map(item => item.render);
    }
    present() {
        document.querySelector('.goodsbox__handler').innerHTML = this._goodsList.join('');
    }
}

class CartManager {
    constructor() {
        this._collection = [];
    }

    add(cartElement) {
        if (typeof cartElement === typeof new CartElement()) {
            this._collection.push(cartElement);
        }
    }
}

class CartElement {
    constructor(good) {
        this._element = good;
    }
    //какие-то обработки гуда
    //...
    //какие-то публичные поля
    get good() {
        return this._element;
    }
    get image() { return this.good.image }
    get name() { return this.good.name }
    get descr() { return this.good.descr }
    get price() { return this.good.price }
    get render() {
        return `someHTML`;
    }
}

class CartPresenter {

}

//по поводу корзины все банально. подобные типы - подобные классы

const goodsManager = new GoodsManager();
goodsManager.fullGoodsList();
const goods = goodsManager.get;
const goodPresenter = new GoodPresenter(goods);
goodPresenter.present();
console.log(goodsManager.totalPrice);

//приятно осознавать, что я начинаю что-то понимать. до этой реализации, которая имеется сейчас я дошел без методички. какого же было мое удивление, что я попал по всем пунктам в точку О_о

/********************************/
class HamburgerMaker {
    constructor() {
        this._presenter = document.querySelector('.hamburgerMaker__chooseSize--presenter');
        this._food =
            [
                this.burger = {
                    sizeBig: { add: document.getElementById('sizeBig').checked, calorie: 40, price: 5.99 },
                    sizeSmall: { add: document.getElementById('sizeSmall').checked, calorie: 20, price: 2.99 }
                },
                this.additionals = {
                    cheese: { add: document.getElementById('cheese').checked, calorie: 20, price: 1 },
                    salat: { add: document.getElementById('salat').checked, calorie: 5, price: 0.5 },
                    french: { add: document.getElementById('french').checked, calorie: 10, price: 1 },
                    pepper: { add: document.getElementById('pepper').checked, calorie: 0, price: 0.5 },
                    mayo: { add: document.getElementById('mayo').checked, calorie: 5, price: 0.5 }

                }
            ];
        document.onclick = event => {
            this._food.forEach(e => {
                for (let key in e) { //знаю, что так делать некрасиво, но let key of e у меня почему-то не итерабельно ¯\_(ツ)_/¯
                    let element = e[key];
                    element.add = document.getElementById(key).checked;
                }
            });
            this.countTotalAndCalory();
            if (event.target.getAttribute('id') == 'makeOrder' && this.tryMakeOrder()) {
                alert('Заказ сделан');
            }
        }
        this.tryMakeOrder = () => {
            if (!(this._food[1].cheese.add || this._food[1].french.add || this._food[1].salat.add)) {
                return false;
            }
            else return true;
        }
        this.countTotalAndCalory = () => {
            let totalPrice = 0;
            let totalCalorie = 0;
            this._food.forEach(e => {
                for (let key in e) {
                    let element = e[key];
                    if (element.add) {
                        totalPrice += element.price;
                        totalCalorie += element.calorie;
                    }
                }
            });
            document.getElementById('totalPrice').innerHTML = totalPrice;
            document.getElementById('totalCalorie').innerHTML = totalCalorie;
        }
        this.countTotalAndCalory();
    }
    setSize(value) { //для разнообразия
        if (value == 0) {
            this._presenter.style.fontSize = "100px";
        }
        else {
            this._presenter.style.fontSize = "200px";
        }
    }
}
hamburgerMaker = new HamburgerMaker();
