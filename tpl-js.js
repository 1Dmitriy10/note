// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// ==================================Мобильное меню======================================================
// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

// ----------------стрелка для меню-------------------
function arrowMenu() {

    let menuItem = $('.mob-nav-item');

    menuItem.each(function (inf, valf) {
        let el = valf.lastElementChild;
        if (el.classList == 'spoiler-content-menu') {
            valf.insertAdjacentHTML("beforeend", `
            <btn class='_spoiler-js-menu'>
            <svg width="12" height="12" viewBox="0 0 52 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.20711 1.70711L25.2929 25.7929C25.6834 26.1834 26.3166 26.1834 26.7071 25.7929L50.7929 1.70711C51.4229 1.07714 50.9767 1.57952e-06 50.0858 1.57952e-06H1.91422C1.02331 1.57952e-06 0.577144 1.07714 1.20711 1.70711Z" fill="black"/>
            </svg>
            </btn>
            `);
        }
    })
}
arrowMenu();

// ---------------спойлеры для меню------------------
function spoilerMenu() {
    //скорость анимации
    let timeAnimation = 300;
    //режим аккордеона
    let accordion = false;
    //Первый спойлер активный
    let firstOpen = false;

    $('.spoiler-content-menu').slideUp();
    //Первый спойлер активный
    if (firstOpen) {
        $('details').first().attr("open", "");
        $('.spoiler-content-menu').first().slideDown(timeAnimation);

    }

    $('._spoiler-js-menu').click(function (e) {
        //режим аккордеона
        if (accordion) {
            if ($(this).attr('class') == '_spoiler-js-menu active') {
                $('.spoiler-content-menu').slideUp(timeAnimation);
                $(this).removeClass('active');
            } else {
                $('.spoiler-content-menu').slideUp(timeAnimation).css("display", "none");
                $('._spoiler-js-menu').removeClass('active');
                $(this).siblings('.spoiler-content-menu').slideDown(timeAnimation);
                $(this).addClass('active');
            }


            //основной режим    
        } else {

            if ($(this).attr('class') == '_spoiler-js-menu active') {
                let spoiler = $(this).parent();
                $(this).removeClass('active');
                $(this).siblings('.spoiler-content-menu').slideUp(timeAnimation);


            } else {
                $(this).siblings('.spoiler-content-menu').slideDown(timeAnimation);
                $(this).addClass('active');
            }
        }
    });
    // ===========закрытие спойлеров при закрытии меню===============
    $('.mob-menu-exit').click(function () {
        $('.spoiler-content-menu').slideUp(timeAnimation).css("display", "none");
        $('._spoiler-js-menu').removeClass('active');
    });
}
spoilerMenu();


// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// ==================================Меню======================================================
// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

export function burgerMenu() {
    $('.mob-nav-btn').click(function () {
        $(this).toggleClass('active');
        $('.mob-nav').toggleClass('active');
        $('.mob-nav-link').click(function () {
            $('.mob-nav').removeClass('active');
            $('.mob-nav-btn').removeClass('active');

        });
    })
}
burgerMenu()


// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// ==================================Добавление цвета хедеру при скроле======================================================
// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

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


// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// ==================================Плавный скролл======================================================
// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

export function anchorScroll() {
    //получаем все ссылки навигации
    let links = document.querySelectorAll('._scroll-js');
    for (const el of links) {
        el.addEventListener("click", getScroll);
    }
    function getScroll(ev) {
        //отключаем действие по умолчанию
        ev.preventDefault();
        let anchor = ev.target.hash
        //плавный переход к якорю
        let block = document.querySelector(`${anchor}`);
        block.scrollIntoView({
            behavior: 'smooth'
        });
    }
}
anchorScroll()


// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// ==================================Табы======================================================
// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

{/* <div class="tabs">
    <div class="tabs__title-box">
        <span class="tabs__title">первая вкладка</span>
        <span class="tabs__title">вторая вкладка</span>
        <span class="tabs__title">третья вкладка</span>
    </div>
    <div class="tabs__item-box">
        <div class="tabs__item">
        </div>
        <div class="tabs__item">
        </div>
        <div class="tabs__item">
        </div>
    </div>
</div> */}

let tabs = document.querySelectorAll("._tabs-js");



tabs.forEach(el => {
    el.addEventListener("click", (ev) => {
        let count = 1;
        let countTabs = 1;
        let titles = el.children[0].children;
        let items = el.children[1].children;
        for (const el of titles) {
            console.log(el.className)
            if (el.className == "tabs__title" || el.className == "tabs__title active") {
                el.dataset.number = `tab_${count} `;
                count++
            }

        }

        for (const el of items) {

            el.dataset.number = `tab_${countTabs} `;
            countTabs++
        }
        if (ev.target.className === "tabs__title") {
            let number = ev.target.dataset.number;
            getActiveTab(titles, items, number)
        }



    })
});


function getActiveTab(titles, items, number) {
    for (const el of items) {
        let item = el.dataset.number;
        el.classList.remove("active");
        if (number === item) {
            el.classList.add("active")
        }
    }

    for (const el of titles) {
        let item = el.dataset.number;
        el.classList.remove("active");
        if (number === item) {
            el.classList.add("active")
        }
    }
}


// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// ==================================Отправка формы======================================================
// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

//--------------маска(нужен inputmask.min.js)--------------------
let phone = $('input[name="tel"]');

let im = new Inputmask("+7 (999) 999-99-99");
im.mask(phone);

//===валидация формы===
let count = 1;
const validator = [];
$('form').each(function () {
    $(this).attr('id', `form_${count}`);
    let id = $(this).attr('id');
    validator.push(new JustValidate(`#${id}`))
    count++;
});

//-------------валидация(нужен jastValidate)----------------
validator.forEach(el => {
    el
        .addField('#basic_name', [

            {
                rule: 'required',
                errorMessage: 'Поле не должно быть пустым',
            },
            {
                rule: 'minLength',
                value: 2,
                errorMessage: 'Должно быть не менее 2 букв',
            },
            {
                rule: 'maxLength',
                value: 15,
                errorMessage: 'Должно быть не более 15 букв',
            },

        ])
        .addField('#basic_email', [
            {
                rule: 'required',
                errorMessage: 'Поле не должно быть пустым',
            },
            {
                rule: 'required',
                errorMessage: 'Не верный формат',
            },
            {
                rule: 'email',
                errorMessage: 'Не верный формат',
            },
        ]);
    el.onSuccess((event) => {
        event.preventDefault()
        formSend(el.form);
    });


})

//------------------отправка формы--------------------
async function formSend(el) {
    let formData = new FormData(el);
    let response = await fetch('send_mail.php', {
        method: "POST",
        body: formData
    });


    //если форма успешно отправлена
    let messageBox = $('.form-message');
    let result = await response.json();


    if (response.ok) {

        messageBox.innerHTML = '';
        messageBox.addClass("active_green").append(`<p>${result.message}</p>`);
        let closeMessage = setTimeout(() => {
            messageBox.removeClass("active_green").html();
        }, 5000
        )
        el.reset();
        //если произошла ошибка отпраки
    } else {

        messageBox.innerHTML = '';
        messageBox.addClass("active_red").append(`<p>${result.message}</p>`);
        let closeMessage = setTimeout(() => {
            messageBox.removeClass("active_green")
        }, 5000
        )
    }
}


// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// ==================================Слайдер свайпер======================================================
// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// подключение
{/* <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" /> */}

const swiperStories = new Swiper('.stories__slider', {
    // Стрелки
    pagination: {
        el: '.stories__slider-pagination',
    },
    /*Отступ у карточек*/
    spaceBetween: 20,
    /*Показывать по n карточек*/
    slidesPerView: 1,

    /*Брек-поинты*/
    breakpoints: {
        1200: {
            slidesPerView: 4,
            spaceBetween: 13,
        },
        1200: {
            slidesPerView: 4,
            spaceBetween: 13,
        },
        768: {
            slidesPerView: 3,
            spaceBetween: 15,
        },
        576: {
            slidesPerView: 2,
            spaceBetween: 13,
        }
    },
})


// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// ==================================Спойлер======================================================
// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

/*
<details>
    <summary class="_spoiler-js">Заголовок 1</summary>
    <p class="spoiler-content">
        Контент 1
    </p>
</details>
*/
export function spoiler() {
    //скорость анимации
    let timeAnimation = 300;
    //режим аккордеона
    let accordion = true;
    //Первый спойлер активный
    let firstOpen = true;

    $('.spoiler-content').slideUp();
    //Первый спойлер активный
    if (firstOpen) {
        $('details').first().attr("open", "");
        $('.spoiler-content').first().slideDown(timeAnimation);

    }

    $('._spoiler-js').click(function (e) {
        //режим аккордеона
        if (accordion) {

            if ($(this).parent().attr('open')) {
                e.preventDefault();
                let spoiler = $(this).parent();
                setTimeout(function () {
                    console.log($(this).parent())
                    spoiler.removeAttr('open');
                }, timeAnimation);
                $(this).removeClass('active');
                $('.spoiler-content').slideUp(timeAnimation);

            } else {
                $('details').removeAttr('open');
                $('summary').removeClass('active');
                $('.spoiler-content').slideUp(timeAnimation);
                $(this).siblings('.spoiler-content').slideDown(timeAnimation);
                $(this).addClass('active');
            }
            //основной режим    
        } else {

            if ($(this).parent().attr('open')) {
                e.preventDefault();
                let spoiler = $(this).parent();
                $(this).removeClass('active');
                $(this).siblings('.spoiler-content').slideUp(timeAnimation);
                setTimeout(function () {
                    spoiler.removeAttr('open');
                }, timeAnimation);

            } else {
                $(this).siblings('.spoiler-content').slideDown(timeAnimation);
                $(this).addClass('active');
            }
        }
    });
}
spoiler()


// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// ==================================Модальные окна======================================================
// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

{/*
 <div class="popup-bg">
    <div class="popup-wrap">
        Форма, содержимое попапа
    </div>
    <div class="popup-exit">x</div>
</div> 
*/}

export function getPopup() {
    //Выход из попапа
    const exitBtn = document.querySelector(".popup-exit");
    //Кнопки вызова попапа
    const btn = document.querySelectorAll(".btn-popup");
    //Общий фон попапа
    const popupBg = document.querySelector(".popup-bg");
    //Оболочка попапа
    const body = document.querySelector("body");

    //Цикл по всем кнопкам вызывающим попап и вешаем событие
    for (const el of btn) {
        //Вешаем событие по клику
        el.addEventListener("click", addActiveClass)
    };

    exitBtn.addEventListener("click", removeActiveClass);

    function addActiveClass(ev) {
        ev.preventDefault();
        popupBg.classList.add("active");
        body.style.cssText = `overflow: hidden;`;
    }
    function removeActiveClass(ev) {
        ev.preventDefault();
        popupBg.classList.remove("active");
        body.style.cssText = `overflow: auto;`;
    }
}
getPopup()


// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// ==================================Прелоадор======================================================
// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

// <div id="preloader" class="visible"></div>

function loadData() {
    return new Promise((resolve, reject) => {
        // setTimeout не является частью решения
        // Код ниже должен быть заменен на логику подходящую для решения вашей задачи
        setTimeout(resolve, 2200);
    })
}

loadData()
    .then(() => {
        let preloaderEl = document.getElementById('preloader');
        preloaderEl.classList.add('hidden');
        preloaderEl.classList.remove('visible');
    });


// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// ==================================Обратный отсчет======================================================
// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

document.addEventListener('DOMContentLoaded', function () {
    // конечная дата, например 1 июля 2021
    const deadline = new Date(2021, 06, 01);
    // id таймера
    let timerId = null;
    // склонение числительных
    function declensionNum(num, words) {
        return words[(num % 100 > 4 && num % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(num % 10 < 5) ? num % 10 : 5]];
    }
    // вычисляем разницу дат и устанавливаем оставшееся времени в качестве содержимого элементов
    function countdownTimer() {
        const diff = deadline - new Date();
        if (diff <= 0) {
            clearInterval(timerId);
        }
        const days = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24) : 0;
        const hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
        const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
        const seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;
        $days.textContent = days < 10 ? '0' + days : days;
        $hours.textContent = hours < 10 ? '0' + hours : hours;
        $minutes.textContent = minutes < 10 ? '0' + minutes : minutes;
        $seconds.textContent = seconds < 10 ? '0' + seconds : seconds;
        $days.dataset.title = declensionNum(days, ['день', 'дня', 'дней']);
        $hours.dataset.title = declensionNum(hours, ['час', 'часа', 'часов']);
        $minutes.dataset.title = declensionNum(minutes, ['минута', 'минуты', 'минут']);
        $seconds.dataset.title = declensionNum(seconds, ['секунда', 'секунды', 'секунд']);
    }
    // получаем элементы, содержащие компоненты даты
    const $days = document.querySelector('.timer__days');
    const $hours = document.querySelector('.timer__hours');
    const $minutes = document.querySelector('.timer__minutes');
    const $seconds = document.querySelector('.timer__seconds');
    // вызываем функцию countdownTimer
    countdownTimer();
    // вызываем функцию countdownTimer каждую секунду
    timerId = setInterval(countdownTimer, 1000);
});


// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// ==================================кнопка наверх======================================================
// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

{/* <button class="goUp"></button> */ }

export function goUp() {
    let btn = document.querySelector(".goUp");
    btn.addEventListener("click", goUp);
    window.scrollTo(0, 0);
}
goUp()


// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// ==================================Анимация при скроле======================================================
// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

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


// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// ==================================Анимация фона переходящего с карточки на карточку======================================================
// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

{/*
<!-- сам элемент -->
<div class="service__content-item">
    <!-- элемент который будет двигаться и менять фон -->
    <div class="service__content-item-bg-blue"></div>
</div> 
*/}

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

// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// ==================================Валидация формы с помощью jastValidate======================================================
// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

let count = 1;
const validator = [];
$('form').each(function () {
    $(this).attr('id', `form_${count}`);
    let id = $(this).attr('id');
    validator.push(new JustValidate(`#${id}`))
    count++;
});

validator.forEach(el => {
    el
        .addField('#basic_name', [

            {
                rule: 'required',
                errorMessage: 'Поле не должно быть пустым',
            },
            {
                rule: 'minLength',
                value: 2,
                errorMessage: 'Должно быть не менее 2 букв',
            },
            {
                rule: 'maxLength',
                value: 15,
                errorMessage: 'Должно быть не более 15 букв',
            },

        ])
        .addField('#basic_email', [
            {
                rule: 'required',
                errorMessage: 'Поле не должно быть пустым',
            },
            {
                rule: 'required',
                errorMessage: 'Не верный формат',
            },
            {
                rule: 'email',
                errorMessage: 'Не верный формат',
            },
        ]);
    el.onSuccess((event) => {
        event.preventDefault()
        formSend(el.form);
    });


})

// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// ==================================mansonry======================================================
// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

{/* <div class="_mansonry-js" data-gap="20/40" data-cols="2">               data-gap="20/40" - отступы между колонками и строками
    <div>item1</div>                                                        data-cols="2" - колличество колонок
    <div>item2</div>
    <div>item3</div>
    <div>...</div>
</div> */}

// -----------------------------------------------------------------------------------

function masonry() {
    // ---------родительский элемент----------
    let mansonryWrap = document.querySelector("._mansonry-js");
    // ---------колличество колонок----------
    let columns = mansonryWrap.dataset.cols;
    // ---------отступы----------
    let row_gap = Number(mansonryWrap.dataset.gap.split("/")[0]);
    let col_gap = Number(mansonryWrap.dataset.gap.split("/")[1]);

    //---------массивы----------------- 
    let firstRow = [];
    let array = [...mansonryWrap.children];
    //---------брейкпоинты----------------- 
    let breack = {
        "768": 1
    }

    for (const key in breack) {
        if (window.innerWidth < key) {
            mansonryWrap.dataset.cols = `${breack[key]}`
            if (breack[key] == "1") {
                array.forEach(el => {
                    el.style.cssText = `
                    flex: 0 1 calc(100%);
                    `
                })
                console.log(mansonryWrap)
                mansonryWrap.style.cssText = `
                    gap: ${row_gap}px ${col_gap}px;
                    `
            }
        }
        else {
            // -----------------------стили родителя----------------------

            mansonryWrap.style.cssText = `
                gap: ${row_gap}px ${col_gap}px;
                `
            // -----------------------стили элементов----------------------
            array.forEach(el => {
                el.style.cssText = `
                    flex: 0 1 calc((100% - ${columns - 1} * ${col_gap}px) / ${columns});
                    `
            })
            getmasonry();
        }
    }




    function getmasonry() {

        for (let index = 0; index < columns; index++) {
            firstRow.push(mansonryWrap.children[index])
        }

        firstRow.forEach(el => {
            el.dataset.height = `${el.offsetTop + el.offsetHeight}`;

        })

        for (let index = columns; index < array.length; index++) {
            let oldHeight = array[index - columns].dataset.height
            let newHeight = array[index].offsetTop

            array[index].style.cssText = `
             margin-top: ${(oldHeight - newHeight) + row_gap}px;
             flex: 0 1 calc((100% - ${columns - 1} * ${col_gap}px) / ${columns});
             `

            array[index].dataset.height = `${array[index].offsetTop + array[index].offsetHeight}`;
        }

    }
};
masonry();


