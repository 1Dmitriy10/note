// ========================= Подключение слайдера =============================================

// import { swiper } from "./swiper.js";              Подключение в главном фойле
//подключение без сборщика
import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.mjs'
//подключение в gulp 
import Swiper from 'swiper/bundle';

export const swiper = new Swiper('.swiper', {
  // Стрелки
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  // Пагинация
  pagination: {
    el: '.swiper-pagination',
  },
  // Скрол
  scrollbar: {
    el: '.swiper-scrollbar',
  },
  /*Бесконечная прокрутка*/
  loop: true,
  /*Эффект трансформации при перелисывании*/
  effect: 'coverflow',
  coverflowEffect: {
    /*Поворачивает карточки*/
    rotate: 0,
    stretch: 0,
    depth: 60,
    modifier: 3,
    slideShadows: false
  },
  /*Отступ у карточек*/
  spaceBetween: 15,
  /*Показывать по n карточек*/
  slidesPerView: 1,
  /*Поставить карточку в центр*/
  centeredSlides: true,
  /*Брек-поинты*/
  breakpoints: {
    780: {
      slidesPerView: 2,
    }
  },
  // При достижении конца, перепрыгнуть в начало
  rewind: true,
  // Автовоспроизведение
  autoplay: {
    delay: 1000,
    //остановка при наведении
    pauseOnMouseEnter: true
  },
  //скорость перелистывания
  speed: 1000,
});

//   ===================================================Бургер меню=======================================================

/* import { getMobMenu } from "./burgerMenu.js";
getMobMenu()                                                     Подключение в главном файле  */

export function getMobMenu() {
  let burgerMenuBTN = document.querySelector('.burger-menu-wrap');
  let burgerMenu = document.querySelector('.burger-menu');
  let menu = document.querySelector('.nav_box-mob');
  burgerMenuBTN.addEventListener('click', actionMenu);
  function actionMenu() {
    menu.classList.toggle('active')
    burgerMenu.classList.toggle('active')
  }
}
getMobMenu()

// ===================================================Кастомная нумерация списка===========================================

// import { getMarker } from "./customList.js";         Подключение
// getMarker()

export function getMarker() {
  let list = [], num = 0;
  list = document.querySelectorAll(".Элемент списка");
  for (const el of list) {
    ++num;
    el.insertAdjacentHTML('afterbegin',
      `
          <span class="Любой класс">${num}</span>
          `);
  }
}

// =======================================================Анимация deg в css============================================

// import { getAnimation } from "./animationBtn.js";          Подключение
// getAnimation()

export function getAnimation() {
  let elements = [];
  let deg = 90;
  btn = document.querySelectorAll(".Нужный класс")
  for (const el of elements) {
    // Событие при наведении
    el.addEventListener("mouseover", (event) => {
      //Повтор  
      let anim = setInterval(function getAnim() {
        el.style.background = `linear-gradient(${deg++}deg, #F58634 0%, #E8363A 100%)`
      }, 2);
      el.style.transform = "scale(1.03)"
      el.style.transition = "0.2s"
      // Событие при отведении мыши и сброс повтора
      el.addEventListener("mouseout", (event) => {
        clearInterval(anim)
        el.style.background = `linear-gradient(90deg, #F58634 0%, #E8363A 100%)`
        el.style.transform = "scale(1)"
      })
    })
  }
}

// ======================================================Сортировка списка по горизонтали===================================

// import { adaptiveCart } from "./schemItem.js";                 Подключение
// sortSchemItems()

// Смена картинки как фонового изображения при изменении положения карточек. Карточеи как "сцепка паровоза" идут друг за другом

export function adaptiveCart() {
  // Получаю картинки
  const img = document.querySelectorAll('.scheme__item-img');
  //Отслеживаю положение в ряде
  let positionX = img[0].getBoundingClientRect().top;
  // Счетчик
  let i = 0;
  // Медиазапрос
  const mediaQuery = window.matchMedia('(max-width: 880px)')
  if (mediaQuery.matches) {
    for (const el of img) {
      // Если разрешение меньше 880px всем карточкам кроме 1 и последней задаю среднее изображение
      el.src = "./img/scheme/schem__item-bg-2.png"
    }
  } else {
    for (const el of img) {
      i++
      // Если карточка в одном ряде с первой - задаю среднее изображение
      if (positionX === el.getBoundingClientRect().top) {
        el.src = "./img/scheme/schem__item-bg-2.png"
      }
      // Если карточка перешла на другую строку
      else {
        // Если это последний элемент элемент в списке и первый в новой строке, то предыдуший будет иметь промежуточное изображение
        if (el === img[img.length - 1]) {
          img[i - 2].src = "./img/scheme/schem__item-bg-2.png"
        }
        // Если элемент не последний
        else {
          // Переводим отслеживание на новую строку
          positionX = el.getBoundingClientRect().top
          // Задаем первому элементу новой строки первое изображение
          el.src = "./img/scheme/schem__item-bg-1.png"
          // Последнему элементу предыдущей строки задаем последнее изображение
          img[i - 2].src = "./img/scheme/schem__item-bg-3.png"
        }
      }
    }
  }
  // Первой и последней карточки задаем соответственно первое и последнее изображение
  img[0].src = "./img/scheme/schem__item-bg-1.png"
  img[img.length - 1].src = "./img/scheme/schem__item-bg-3.png"
}

// ======================================================Сортировка списка по вертикали===================================

// import { list } from "./choisList.js";        Подключение
export function list() {
  //Получаем элементы
  const items = document.querySelectorAll('.chois__item');
  //Получаем оболочку
  const wrap = document.querySelector('.chois__item-box');
  //Номер елемента (чет/не чет)
  let i = 0;
  //Результат высоты оболочки
  let result = 0;
  //Промежуточное значение
  let x = 0;
  //Цикл по всем элементам
  for (const el of items) {
    i++
    //Если нечетные
    console.log(result)
    if (i % 2 !== 0) {
      x = el.clientHeight + 16;
      result += x;
      //Если четные
    } else if (i % 2 === 0) {
      //Если высота елемента во 2 столбце больше елемента в 1 столбце, то используем его
      if (el.clientHeight > items[i - 2].clientHeight) {
        result = result - x + el.clientHeight + 16    //16 - это отступы между эелементами
      }
    }

  }
  //Присваеваем оболочке суммарную высоту вместе с отступами
  wrap.style.cssText = `height: ${result}px`

  //Делает параллельные блоки одинаковой высоты

  //Длинна масиива
  let length = items.length;
  //Элемент на котором заканчивается 1 столбец
  let lastElementFistColumn = Math.floor(length / 2)
  //Прохожу по элементам пока 
  for (let i = 0; lastElementFistColumn < length; i++) {
    //Если высота элемента из первой колонки больше, то и элементу из второй колонки присваиваем такуе-же высоту
    if (items[i].clientHeight > items[lastElementFistColumn].clientHeight) {
      items[lastElementFistColumn].style.cssText = `height: ${items[i].clientHeight}px`
    }
    else if (items[i].clientHeight < items[lastElementFistColumn].clientHeight) {
      items[i].style.cssText = `height: ${items[lastElementFistColumn].clientHeight}px`
    }
    lastElementFistColumn++

  }
}
list()

// ======================================================Попап===================================

// import { list } from "./choisList.js";   Подключение

export function getPopup() {
  //Выход из попапа
  const exitBtn = document.querySelectorAll(".popup-exit")
  //Кнопки вызова попапа
  const btn = document.querySelectorAll(".btn-form")
  //Общий фон попапа
  const popupBg = document.querySelector(".popup-bg")
  //Оболочка попапа
  const body = document.querySelector("body")
  //Счетчик для id кнопок
  let count = 1;
  //Цикл по всем кнопкам вызывающим попап и вешаем событие
  for (const el of btn) {
    //присваиваем кнопкам id
    el.id = count
    //Вешаем событие по клику
    el.addEventListener("click", toggleActiveClass)
    //Увеличиваем счетчик
    count++
  }
  //Цикл по всем кнопкам закрывающим попап и вешаем событие
  for (const el of exitBtn) {
    //Вешаем событие по клику
    el.addEventListener("click", toggleActiveClass)
  }
  //Если id нажатой кнопки совпадает с id элемента открывае попап
  function toggleActiveClass(ev) {
    for (const el of btn) {
      if (el.id === ev.target.id) {
        ev.preventDefault();
        popupBg.classList.toggle("active");
        body.style.cssText = `overflow: hidden;`
      }
    }
    for (const el of exitBtn) {
      if (el.id === ev.target.id) {
        ev.preventDefault();
        popupBg.classList.toggle("active");
        body.style.cssText = `overflow: auto;`
      }
    }
  }
}

// ======================================================Спойлер===================================

export function getSpoiler() {
  //Получаем заголовок и сам элемент спойлера
  const titles = document.querySelectorAll(".spoiler-title");
  const items = document.querySelectorAll(".spoiler-item");
  //Переменная для высоты закрытого спойлера
  let w = 0;
  //Проходим по всем спойлерам
  for (let i = 0; i < items.length; i++) {
    //Вешаем событие на клик по заголовку
    titles[i].addEventListener("click", toggleClass);
    //Берем высоту заголовка
    w = titles[i].clientHeight;
    //Присваиваем закрытому спойлеру высоту заголовка
    items[i].style.cssText = `height: ${w}px;`
  }

  function toggleClass(ev) {
    //Заголовок
    const title = ev.target;
    //Спойлер
    const item = ev.target.parentElement;
    //контент спойлера
    const text = ev.target.nextElementSibling;
    // Вешаем активный класс
    text.classList.toggle('active');
    title.classList.toggle('active');
    //Если спойлер закрыт
    if (item.classList[length + 1] !== "active") {
      //Вешаем активный класс
      item.classList.add('active');
      //Берем высоту спойлера
      let i = item.clientHeight
      let count = setInterval(function () {
        //Каждую итерацию увеличиваем высоту, пока она не достигнет высоты всего контента
        item.style.cssText = ` height: ${i}px;`;
        i = i + 3;
        if (i >= (title.clientHeight + text.clientHeight)) {
          clearInterval(count)
        }
      }, 0.1);
      //Если спойлер открыт
    } else if (item.classList[length + 1] === "active") {
      //Убираем активный клас
      item.classList.remove('active');
      //Берем высоту спойлера
      let i = item.clientHeight
      let count = setInterval(function () {
        //Уменьшаем высоту спойлера пока она не станет равна высоте заголовка
        item.style.cssText = ` height: ${i}px;`;
        i = i - 2;
        if (i <= title.clientHeight) {
          clearInterval(count)
        }
      }, 0.1);
    }
  }
}
getSpoiler()

// ======================================================Изменение цвета хедера при скроле===================================

//Подключение import { getColorHeader } from "./scroll.js";

export function getColorHeader() {
  //хедар
  const header = document.querySelector(".header")
  //событие при скроле
  window.addEventListener('scroll', getColor)
  function getColor() {
    //если мы вверху то хедер бесцветный
    if (window.pageYOffset === 0) {
      header.style.cssText = `background-color: transparent;`
      //если проскролили, то хедер в цвете
    } else {
      header.style.cssText = `background-color: #09AFF4;`
    }
  }
}
getColorHeader()

// ======================================================Анимация переходящего фона===================================
//Подключение import { getBlueBg } from "./animationBgBlue.js";

export function getBlueBg() {
  //все элементы
  const items = document.querySelectorAll(".srvice__content-item");
  //Всем вешаем событие
  for (const el of items) {
    el.addEventListener('mouseenter', addBg);
    el.addEventListener('mouseleave', removeBg);
  }
  //фон заходит слева направо
  function addBg(ev) {
    //первый дочерний элемент того элемента на который мы наводим(занимает всю высоту и ширину, изначально прозрачный)
    const bg = ev.target.firstElementChild
    bg.style.cssText = `
      background: #09aff4;
      transition: 0.5s;
      animation: go 0.5s forwards;`
  }
  //фон уходит слева направо
  function removeBg(ev) {
    //первый дочерний элемент того элемента с которого мы уходим
    const bg = ev.target.firstElementChild
    bg.style.cssText = `
      background: transparent;
      transition: 0.5s;
      animation: out 0.5s forwards;
      `
  }
}
getBlueBg()

// ======================================================увеличенное фото при клике===================================
//подключение import { getMinimize } from "./minimizeImg.js";

export function getMinimize() {
  //Выход из галереи
  const exitImg = document.querySelectorAll(".img-exit")
  //Кнопки вызова галереи
  const img = document.querySelectorAll(".minimize")
  //Общий фон попапа
  const popupBg = document.querySelector(".popup-bg")
  //Оболочка попапа
  const body = document.querySelector("body")
  //место куда вставляем фото
  const container = document.querySelector(".popup-wrap")
  //Счетчик для id кнопок
  let count = 1;
  //Цикл по всем кнопкам вызывающим галерею и вешаем событие
  for (const el of img) {
    //присваиваем кнопкам id
    el.id = count
    //Вешаем событие по клику
    el.addEventListener("click", toggleActiveClass)
    //Увеличиваем счетчик
    count++
  }
  //Цикл по всем кнопкам закрывающим попап и вешаем событие
  for (const el of exitImg) {
    //Вешаем событие по клику
    el.addEventListener("click", toggleActiveClass)
  }
  //Если id нажатой кнопки совпадает с id элемента открывае попап
  function toggleActiveClass(ev) {
    for (const el of img) {
      if (el.id === ev.target.id) {
        ev.preventDefault();
        let src = el.src;
        let newSrc = src.split(".").slice(0, 1)
        console.log(newSrc)
        popupBg.classList.toggle("active");
        body.style.cssText = `overflow: hidden;`
        container.innerHTML = ''
        container.insertAdjacentHTML("beforeend", `
        <img class="bigImg"
        src="${newSrc}-big.png" alt="">`)
      }
    }
    for (const el of exitImg) {
      if (el.id === ev.target.id) {
        ev.preventDefault();
        popupBg.classList.toggle("active");
        body.style.cssText = `overflow: auto;`
      }
    }
  }
}
getMinimize()

// =============================================Анимация при скроле==========================================

export function scrolAnim() {
  //беру все элементы, которые хочу анимироватб. У них класс anim
  let items = document.querySelectorAll(".anim");
  for (const el of items) {
    //событие при скроле
    window.addEventListener("scroll", getAnim)
    // высота элемента
    let itemHeight = el.offsetHeight;
    //верхняя точка элемента
    let itemTop = el.getBoundingClientRect().top;
    //высота экрана
    let height = window.innerHeight
    //коэфициент (1/4 высоты элемента)
    let k = 4;
    // точка старта анимации
    let start = height - itemHeight / k;

    function getAnim() {
      // если прокрутка стала больше верха елемента - точка старта
      if (pageYOffset > itemTop - start) {
        el.style.cssText = `
                  transition: 0.7s;
                  transform: translateY(0);`
      }
    }
  }
}
scrolAnim()

//=================================событие при изменении размера экрана====================

window.addEventListener('resize', (e) => {
  console.log(e)
});

//=================================кнопка наверх====================

// подключение import { goUp } from "./goToUp.js"; 

export function goUp() {
  let btn = document.querySelector(".goUp");
  btn.addEventListener("click", goUp);
  window.scrollTo(0, 0);
}
goUp()

//================================шаблон формы обратной================================
//ждем загрузки страницы
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".form");
  const printMessage = document.querySelector(".send-message-text");
  const boxMessage = document.querySelector(".send-message");
  const colorBoxMessage = document.querySelector(".send-message-wrap");
  //событие при отправке
  form.addEventListener("submit", formSend);
  //отправка
  async function formSend(e) {
    e.preventDefault();
    // переменная для ошибок в форме (вызывает функцию валидации)
    let error = formValidate(form);
    //если ошибок нет отправляем форму
    if (error === 0) {
      let formData = new FormData(form);
      //отправляем форму в файл send.php
      let response = await fetch('send.php', {
        method: "POST",
        body: formData
      });
      //если форма успешно отправлена
      if (response.ok) {
        let result = await response.json();
        printMessage.innerHTML = "";
        printMessage.innerHTML = `${result.message}`;
        boxMessage.classList.add("active");
        colorBoxMessage.classList.add("_green");
        let closeMessage = setTimeout(() => {
          boxMessage.classList.remove("active")
          colorBoxMessage.classList.remove("_green");
        }, 5000
        )
        form.reset();
        //если произошла ошибка отпраки
      } else {
        printMessage.innerHTML = "";
        printMessage.innerHTML = `Ошибка отправки формы`;
        boxMessage.classList.add("active");
        colorBoxMessage.classList.add("_red");
        let closeMessage = setTimeout(() => {
          boxMessage.classList.remove("active");
          colorBoxMessage.classList.remove("_red");
        }, 5000
        )
      }
      //если валидация не прошла выводим ошибку
    } else {
      printMessage.innerHTML = "";
      printMessage.innerHTML = `Ошибка отправки формы`;
      boxMessage.classList.add("active");
      colorBoxMessage.classList.add("_red");
      let closeMessage = setTimeout(() => {
        boxMessage.classList.remove("active");
        colorBoxMessage.classList.remove("_red");
      }, 5000
      )
    }
  }
  //функция валидации
  function formValidate(form) {
    let error = 0;
    //все инпуты
    let formReq = document.querySelectorAll("._req");
    for (const el of formReq) {
      const input = el;
      //сбрасываем ошибки инпутов
      formRemoveError(input);
      //если инпут имейл, то запускаем проверку имейла
      if (input.classList.contains('_email')) {
        if (emailTest(input)) {
          formAddError(input)
          error++;
        }
        //если инпут чекбокс
      } else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
        formAddError(input);
        error++
        //если инпут пустой
      } else {
        if (input.value === "") {
          formAddError(input);
          error++
        }
      }
    }
    return error;

  }
  //функция добавления ошибок
  function formAddError(input) {
    // input.parentElement.classList.add("_error");
    input.classList.add("_error");
  }
  //функция снятия ошибок
  function formRemoveError(input) {
    // input.parentElement.classList.remove("_error");
    input.classList.remove("_error");
  }
  //функция проверки имейла
  function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
  }
})

//=======================================================табы====================================================
// подключение import {getTabs} from "./getTabs.js" 

export function getTabs() {
  let tabsTitle = document.querySelectorAll(".tabs__title");
  let tabsItem = document.querySelectorAll(".tabs__item");
  let count = 1;
  let countTabs = 1;

  for (const el of tabsTitle) {
    el.id = `tab_${count}`;
    el.addEventListener('click', getItemTab);
    count++
  }
  for (const el of tabsItem) {
    el.id = `tab_${countTabs}`;
    if (el.id === "tab_1") {
      el.classList.add("active")
    }
    countTabs++
  }
  function getItemTab(ev) {
    for (const el of tabsItem) {
      el.classList.remove("active");
      if (ev.target.id === el.id) {
        el.classList.add("active")
      }
    }

  }
}
getTabs()