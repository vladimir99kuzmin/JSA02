const goods = [
    {image: 'https://place-hold.it/150', name: 'Товар 1', descr: 'Описание товара 1', price: 100},
    {image: 'https://place-hold.it/150', name: 'Товар 2', descr: 'Описание товара 2', price: 101},
    {image: 'https://place-hold.it/150', name: 'Товар 3', descr: 'Описание товара 3', price: 102},
    {image: 'https://place-hold.it/150', name: 'Товар 4', descr: 'Описание товара 4', price: 103},
    {image: 'https://place-hold.it/150', name: 'Товар 5', descr: 'Описание товара 5', price: 104},
    {image: 'https://place-hold.it/150', name: 'Товар 6', descr: 'Описание товара 6', price: 105},
    {image: 'https://place-hold.it/150', name: 'Товар 7', descr: 'Описание товара 7', price: 106},
    {image: 'https://place-hold.it/150', name: 'Товар 8', descr: 'Описание товара 8', price: 107},
    {image: 'https://place-hold.it/150', name: 'Товар 9', descr: 'Описание товара 9', price: 108},
    {image: 'https://place-hold.it/150', name: 'Товар 10', descr: 'Описание товара 10', price: 109}
];
const goodPresentation = (good) => { //не понимаю зачем сюда передавать отдельно title, price и т.д. можно же сразу оперировать объектом
    return `<div class="good">  
        <img class="good--image" src=" ${good.image}" alt="">  
        <h3 class="good--name">${good.name}</h3> 
        <p class="good-descr">${good.descr}</p>
        <p class="good--price"><span class = "good--price__count">${good.price}</span>$</p>
        <button class="good--button">Добавить</button>
      </div>`;
}
//вопрос такой: при обработке клика на кнопку "добавить", как мы локализуем какой товар добавлен в корзину? по имени? имена могут быть и одинаковыми. 
//имеет смысл добавить id товара и присваивать его как data, я думаю. но тогда юзер может через дебагер увидеть и изменить значение, добавит в корзину несуществующий или отсутствующий в продаже товар 
//есть ли какой-то другой вариант, сокрытый от глаз юзера, умеющего пользоваться исследованием элемента в браузере?
const goodsListToShop = (list = goods) => { //это имолсь ввиду под заданием 2? 
    let goodsList = goods.map(item => goodPresentation(item)); //если бы не Ваши уроки, делал бы всё циклом как дебик хехе
    document.querySelector('.goodsbox__handler').innerHTML = goodsList.join(''); //запятая выводится, как я понял, из-за представления массива в виде строки, это стандартная фигня, а вот join как раз определяет разделители между элементами массива
}

goodsListToShop();

/*по-хорошему, я думаю, сначала нужно выводить карточки товаров (без наполнения), а потом их заполнять. 
В таком случае страница будет подгружаться более плавно. 
Имеется ввиду, что даже если данные будут подгружаться дольше обычного (из базы запрос подвиснет, допустим), карточка уже будет отрисована, но она будет пустой,
соответственно, так сказать, габариты под элемент уже будут определены, в ожидании заполнения*/