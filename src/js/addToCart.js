let addToCartBtns1 = document.querySelectorAll('.js-add2cart');
let addToCartBtns2 = document.querySelectorAll('.products__item .button');
let cartBtns = document.querySelectorAll('.bcart__button');
let input = document.querySelector('.qty__input');
let plusBtn = document.querySelector('.qty__change--plus');
let minusBtn = document.querySelector('.qty__change--minus');
let notification = document.querySelector('#product-added');
let test = document.querySelector('.page-header--v1 .breadcrumbs');

// Функция активации корзины в шапке
function activateCart() {
  for (let i = 0; i < cartBtns.length; i++) {
    cartBtns[i].classList.add('bcart__button--active');
  }
}

// Функция деактивации корзины в шапке
function deActivateCart() {
  for (let i = 0; i < cartBtns.length; i++) {
    cartBtns[i].classList.remove('bcart__button--active');
  }
}
// Функция валидации текстового поля на ввод только чисел
if (input) {
  input.oninput = function() {
    this.value = this.value.replace(/[^0-9]/g, "");
  };
}

// Функция инкремента
if (plusBtn) {
  (function () {
    let maxValue = input.getAttribute("data-max");
    plusBtn.addEventListener('click', () => {
      input.value = parseInt(input.value);
      if (input.value >= maxValue || input.value.length > 2) {
        input.value = maxValue;
      } else {
        input.value = parseInt(input.value) + 1;
      }
    });
  })()
}
// Функция декремента
if (minusBtn) {
  (function () {
    minusBtn.addEventListener('click', () => {
      if (input.value > 1) {
        input.value = parseInt(input.value) - 1;
      } else input.value = 1;
    });
  })()
}

// Функция закрытия оповещения о добавлении товара в корзину
function closeNotification() {
  if (notification.classList.contains('notification--opened')) {
    notification.classList.remove('notification--opened')
  }
}

// Функция кроссбраузерной установки обработчика событий
function addEvent(elem, type, handler) {
  if (elem.addEventListener) {
    elem.addEventListener(type, handler, false);
  } else {
    elem.attachEvent('on' + type, function () {
      handler.call(elem);
    });
  }
  return false;
}

// Получаем данные из LocalStorage
function getCartData() {
  return JSON.parse(localStorage.getItem('cart'));
}

// Записываем данные в LocalStorage
function setCartData(o) {
  localStorage.setItem('cart', JSON.stringify(o));
  return false;
}

// Добавляем товар в корзину по кнопке 'в корзину'
function addToCart1(e) {
  let minValue = input.getAttribute("data-min");
  let maxValue = input.getAttribute("data-max");
  
  let items = getCartData() || [], // получаем данные корзины или создаём новый массив, если данных еще нет
    id = this.getAttribute("data-id"), // ID товара
    name = this.getAttribute("data-name"), // название товара
    price = this.getAttribute("data-price"), // стоимость товара
    url = this.getAttribute("data-src"),// картинка товара
    text = this.innerHTML,
    qty; 
  if (input.value < minValue || input.value === "") {
    input.value = minValue;
  } else if (input.value >= maxValue && input.value.length > 2) {
      input.value = maxValue;
    } else {
      input.value = input.value;
    }

  qty = parseInt(input.value);
  text = 'В корзине';

  let isItemInCart = items.find(item => item.id === id);

  if (isItemInCart) {
    // если такой товар уже в корзине, то делаем кнопку неактивной
    this.setAttribute("disabled", "");
  } else {
    // если товара в корзине еще нет, то добавляем в массив новый объект
    let item = {
      id: id,
      name: name,
      price: price,
      pic: url,
      qty: qty,
      text: text
    };
    items.push(item);
    this.setAttribute("disabled", "");
  };

  setCartData(items);
  this.innerHTML = 'В корзине';
  notification.classList.add('notification--opened');
  setTimeout(closeNotification, 4000);
  activateCart();
}

// Добавляем товар в корзину по кнопке 'заказать'
function addToCart2(e) {

  let items = getCartData() || [], // получаем данные корзины или создаём новый массив, если данных еще нет
    id = this.getAttribute("data-id"), // ID товара
    name = this.getAttribute("data-name"), // название товара
    price = this.getAttribute("data-price"), // стоимость товара
    url = this.getAttribute("data-src"), // картинка товара
    text = this.innerHTML,
    qty =  1;

  text = "В корзине";
  let isItemInCart = items.find(item => item.id === id);

  if (isItemInCart) {
    // если такой товар уже в корзине, то делаем кнопку неактивной
    this.setAttribute("disabled", "")
  } else {
    // если товара в корзине еще нет, то добавляем в массив новый объект
    let item = {
      id: id,
      name: name,
      price: price,
      pic: url,
      qty: qty,
      text: text
    };
    items.push(item);
    this.setAttribute("disabled", "");
  };

  setCartData(items);
  this.innerHTML = 'В корзине';
  notification.classList.add('notification--opened');
  setTimeout(closeNotification, 4000);
  activateCart();
}

// Устанавливаем обработчик события на каждую кнопку 'в корзину'
for (var i = 0; i < addToCartBtns1.length; i++) {
  addEvent(addToCartBtns1[i], 'click', addToCart1);
}

// Устанавливаем обработчик события на каждую кнопку 'заказать'
for (var i = 0; i < addToCartBtns2.length; i++) {
  addEvent(addToCartBtns2[i], 'click', addToCart2);
}

function onLoadProductQty() {
    let productQty = localStorage.getItem('cart');

  if (productQty && productQty !== '[]') {
    productQty = JSON.parse(localStorage.getItem('cart'))
    activateCart();

    for (var i = 0; i < addToCartBtns1.length; i++) {
      let buttonId = addToCartBtns1[i].getAttribute("data-id");
      if (productQty.find(item => item.id === buttonId)) {
        addToCartBtns1[i].innerHTML = productQty.find(item => item.id === buttonId).text;
        addToCartBtns1[i].setAttribute("disabled", "");
      }
    }
    for (var j = 0; j < addToCartBtns2.length; j++) {
      let buttonId = addToCartBtns2[j].getAttribute("data-id");
      if (productQty.find(item => item.id === buttonId)) {
        addToCartBtns2[j].innerHTML = productQty.find(item => item.id === buttonId).text;
        addToCartBtns2[j].setAttribute("disabled", "");
      }
    }
  }
}

onLoadProductQty()