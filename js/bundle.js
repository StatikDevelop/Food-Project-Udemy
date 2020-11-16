/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
function calc() {
     //Calc

     const result = document.querySelector(".calculating__result span");

     let sex, height, weight, age, ratio;
     
     if(localStorage.getItem('sex')) {
         sex = localStorage.getItem('sex');
     } else {
         sex = "female";
         localStorage.setItem('sex', 'female');
     }
 
     if(localStorage.getItem('ratio')) {
         ratio = localStorage.getItem('ratio');
     } else {
         ratio = 1.375;
         localStorage.setItem('ratio', 1.375);
     }
 
     function initLocalStorage(selector, activeClass) {
         const elements = document.querySelectorAll(`${selector} div`);
 
         elements.forEach(elem => {
             elem.classList.remove(activeClass);
              if(elem.getAttribute('id') === localStorage.getItem('sex')) {
                 elem.classList.add(activeClass);
              }
              if(elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                  elem.classList.add(activeClass);
              }
         });
     }
 
     initLocalStorage('#gender', 'calculating__choose-item_active');
     initLocalStorage('.calculating__choose_big', 'calculating__choose-item_active');
 
     function calcTotal() {
         if (!sex || !weight || !height || !age || !ratio) {
             result.textContent = "____";
             return;
         }
 
         if (sex === "female") {
             result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
         } else {
             result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
         }
     }
 
     calcTotal();
 
     function getStatikInformation(parentSelector, activeClass) {
         const elements = document.querySelectorAll(`${parentSelector} div`);
 
         elements.forEach(elem => {
             elem.addEventListener('click', (e) => {
                 if (e.target.getAttribute('data-ratio')) {
                     ratio = +e.target.getAttribute('data-ratio');
                     localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                 } else {
                     sex = e.target.getAttribute('id');
                     localStorage.setItem('sex', e.target.getAttribute('id'));
                 }
     
                 elements.forEach(elem => {
                     elem.classList.remove(activeClass);
                 });
     
                 e.target.classList.add(activeClass);
     
                 calcTotal();
             });
         });
     }
 
     getStatikInformation('#gender', 'calculating__choose-item_active');
     getStatikInformation('.calculating__choose_big', 'calculating__choose-item_active');
 
     function getDynamicInfo(selector) {
         const input = document.querySelector(selector);
 
         input.addEventListener('input', () => {
 
             if(input.value.match(/\D/g)) {
                 input.style.border = "2px solid red";
             } else {
                 input.style.border = "none";
             }
             
             switch (input.getAttribute('id')) {
                 case 'height':
                     height = +input.value;
                     console.log(height);
                     break;
                 case 'weight':
                     weight = +input.value;
                     console.log(weight);
                     break;
                 case 'age':
                     age = +input.value;
                     console.log(age);
                     break;
             }
             calcTotal();
         });
     }
 
     getDynamicInfo('#height');
     getDynamicInfo('#weight');
     getDynamicInfo('#age');
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
function cards() {
    const card = document.querySelectorAll('.menu__item');

    class Card {
        constructor(src, imgAlt, title, descr, price, ...classes) {
            this.src = src;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.imgAlt = imgAlt;
            this.transfer = 27;
            this.priceConverterToUAH();
        }

        priceConverterToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const wrapper = document.querySelector('[data-cardContainer]');
            const div = document.createElement('div');

            if (this.classes.lenght === 0) {
                this.div = 'menu__element';
                div.classList.add(this.div);
            } else {
                this.classes.forEach(className => div.classList.add(className));
            }

            div.innerHTML = `
        <div class="menu__item">
            <img src=${this.src} alt=${this.imgAlt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
        </div>`;

            wrapper.append(div);
        }
    }

    const getResourses = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    };

    // getResourses("http://localhost:3000/menu")
    // .then(data => {
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //         new Card(img, altimg, title, descr, price).render();
    //     });
    // });

    axios.get("http://localhost:3000/menu")
        .then(data => {
            data.data.forEach(({
                img,
                altimg,
                title,
                descr,
                price
            }) => {
                new Card(img, altimg, title, descr, price).render();
            });
        });

    // getResourses("http://localhost:3000/menu")
    // .then(data => {
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //         const div = document.createElement('div');

    //         div.innerHTML = `
    //             <div class="menu__item">
    //                 <img src=${img} alt=${altimg}>
    //                 <h3 class="menu__item-subtitle">${title}</h3>
    //                 <div class="menu__item-descr">${descr}</div>
    //                 <div class="menu__item-divider"></div>
    //                 <div class="menu__item-price">
    //                     <div class="menu__item-cost">Цена:</div>
    //                     <div class="menu__item-total"><span>${price}</span> грн/день</div>
    //                 </div>
    //             </div>
    //         `;

    //         document.querySelector('[data-cardContainer]').append(div);
    //     });
    // });

    // new Card("img/tabs/vegy.jpg", 
    //         "vegy", 
    //         'Меню "Фитнес"', 
    //         'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    //          9).render();

    // new Card('"img/tabs/elite.jpg"', 
    //         '"elite"', 
    //         'Меню “Премиум”', 
    //         'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', 
    //         15).render();

    // new Card('"img/tabs/post.jpg"', 
    //         '"post"', 
    //         'Меню "Постное"', 
    //         'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.', 
    //         12).render();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/form.js":
/*!****************************!*\
  !*** ./js/modules/form.js ***!
  \****************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/modal */ "./js/modules/modal.js");
;

function form(modalSelector, modalWindowTimer) {
    //Forms

    const forms = document.querySelectorAll('form');

    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        return res.json();
    };

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const message = {
                loading: 'img/form/spinner.svg',
                success: 'Готово!',
                failure: 'Что-то не так'
            };

            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
        `;
            form.insertAdjacentElement('afterend', statusMessage);

            // const request = new XMLHttpRequest();
            // request.open('POST', 'server.php');

            // request.setRequestHeader('Content-type', 'multipart/form-data'); -- НЕ ВВОДИТЬ КОГДА ОТПРАВЛЯЕМ ФОРМЫ
            // request.setRequestHeader('Content-type', 'application/json');

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            // request.send(JSON.stringify(object));

            form.append(statusMessage);


            postData("http://localhost:3000/requests", json)
                .then((data) => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
                }).catch(() => {
                    showThanksModal(message.failure);
                }).finally(() => {
                    form.reset();
                });


            // request.addEventListener('load', () => {
            //     if (request.status === 200) {
            //         console.log(request.response);
            //         showThanksModal(message.success);
            //         form.reset();
            //         statusMessage.remove();
            //     } else {
            //         showThanksModal(message.failure);
            //     }
            // });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        (0,_modules_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)(modalSelector, modalWindowTimer);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>×</div>
            <div class="modal__title">${message}</div>
        </div>
    `;

        document.querySelector(".modal").append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            (0,_modules_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)(modalSelector);
        }, 4000);
    }

    // fetch('https://jsonplaceholder.typicode.com/posts',{
    //     method: "POST",
    //     body: JSON.stringify({name: 'Artem'}),
    //     headers: {
    //         "Content-type": "application/json"
    //     }
    // }
    // )
    //   .then(response => response.json())
    //   .then(json => console.log(json));


    fetch('http://localhost:3000/menu')
        .then(item => item.json())
        .then(item => console.log(item));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (form);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/*! namespace exports */
/*! export closeModal [provided] [no usage info] [missing usage info prevents renaming] */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! export openModal [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__,
/* harmony export */   "openModal": () => /* binding */ openModal,
/* harmony export */   "closeModal": () => /* binding */ closeModal
/* harmony export */ });
function openModal(modalSelector, modalWindowTimer) {
    const modal = document.querySelector(modalSelector);
    
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    
    if(modalWindowTimer) {
        clearInterval(modalWindowTimer);
    }
}

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function modal(modalSelector, openTrigger, modalWindowTimer) {
    // Modal

    const modalTrigger = document.querySelectorAll(openTrigger),
          modal = document.querySelector(modalSelector);

    modalTrigger.forEach(item => {
        item.addEventListener('click', () => openModal(modalSelector, modalWindowTimer));
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);

        }
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Escape' && modal.classList.contains('show')) {
                closeModal(modalSelector);
            }
        });
    });

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal(modalSelector, modalWindowTimer);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);


/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
function slider() {
    //Slider 2 (IVAN PETRICENKO)
    const slides = document.querySelectorAll('.offer__slide');
    const slidesWrapper = document.querySelector('.offer__slider-wrapper');
    const slidesField = document.querySelector('.offer__slider-inner');
    const width = window.getComputedStyle(slidesWrapper).width;
    const prevBtn = document.querySelector('.offer__slider-prev');
    const nextBtn = document.querySelector('.offer__slider-next');
    const dots = [];

    const slider = document.querySelector('.offer__slider');

    let currentItem = document.querySelector('#current');
    let totalItem = document.querySelector('#total');

    let sliderIndex = 1;
    let offset = 0;

    if (slides.length < 10) {
        totalItem.textContent = `0${slides.length}`;
        currentItem.textContent = `0${sliderIndex}`;
    } else {
        totalItem.textContent = slides.length;
        currentItem.textContent = sliderIndex;
    }

    function deleteNumbers(str) {
        return +str.replace(/\D/g, '');
    }

    slider.style.position = 'relative';

    const indicators = document.createElement('ol');
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `    
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
`;

    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
        box-sizing: content-box;
        flex: 0 1 auto;
        width: 30px;
        height: 6px;
        margin-right: 3px;
        margin-left: 3px;
        cursor: pointer;
        background-color: #fff;
        background-clip: padding-box;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        opacity: .5;
        transition: opacity .6s ease;
    `;
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }


    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(item => {
        item.style.width = width;
    });

    prevBtn.addEventListener('click', () => {
        if (offset == 0) {
            offset = deleteNumbers(width) * (slides.length - 1);
        } else {
            offset -= deleteNumbers(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (sliderIndex == 1) {
            sliderIndex = slides.length;
        } else {
            sliderIndex--;
        }

        if (slides.length < 10) {
            currentItem.textContent = `0${sliderIndex}`;
        } else {
            currentItem.textContent = sliderIndex;
        }

        dots.forEach(dot => dot.style.opacity = ".5");
        dots[sliderIndex - 1].style.opacity = 1;
    });

    nextBtn.addEventListener('click', () => {
        if (offset == deleteNumbers(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += deleteNumbers(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (sliderIndex == slides.length) {
            sliderIndex = 1;
        } else {
            sliderIndex++;
        }

        if (slides.length < 10) {
            currentItem.textContent = `0${sliderIndex}`;
        } else {
            currentItem.textContent = sliderIndex;
        }

        dots.forEach(dot => dot.style.opacity = ".5");
        dots[sliderIndex - 1].style.opacity = 1;
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            sliderIndex = slideTo;
            offset = deleteNumbers(width) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            if (slides.length < 10) {
                currentItem.textContent = `0${sliderIndex}`;
            } else {
                currentItem.textContent = sliderIndex;
            }

            dots.forEach(dot => dot.style.opacity = ".5");
            dots[sliderIndex - 1].style.opacity = 1;
        });
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
function tabs() {
    //TABS
    let tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');

        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
function timer() {
     //Timer

     const deadline = '2020-11-30';

     function getTimeRemaining(endtime) {
         const t = Date.parse(endtime) - Date.parse(new Date()),
             days = Math.floor(t / (1000 * 60 * 60 * 24)),
             hours = Math.floor((t / (1000 * 60 * 60) % 24)),
             minutes = Math.floor((t / 1000 / 60) % 60),
             seconds = Math.floor((t / 1000) % 60);
 
 
         return {
             'total': t,
             'days': days,
             'hours': hours,
             'minutes': minutes,
             'seconds': seconds
         };
     }
 
     function getZero(num) {
         if (num >= 0 && num < 10) {
             return `0${num}`;
         } else {
             return num;
         }
     }
 
     function setClock(selector, endtime) {
         const timer = document.querySelector(selector),
             days = timer.querySelector('#days'),
             hours = timer.querySelector('#hours'),
             minutes = timer.querySelector('#minutes'),
             seconds = timer.querySelector('#seconds'),
             timeInterval = setInterval(updateClock, 1000);
         updateClock();
 
         function updateClock() {
             const t = getTimeRemaining(endtime);
 
             days.innerHTML = getZero(t.days);
             hours.innerHTML = getZero(t.hours);
             minutes.innerHTML = getZero(t.minutes);
             seconds.innerHTML = getZero(t.seconds);
 
             if (t.total <= 0) {
                 clearInterval(timeInterval);
                 days.innerHTML = "0";
                 hours.innerHTML = "0";
                 minutes.innerHTML = "0";
                 seconds.innerHTML = "0";
             }
         }
     }
     setClock('.timer', deadline); 
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_modules_calc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../js/modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _js_modules_cards__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../js/modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _js_modules_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../js/modules/form */ "./js/modules/form.js");
/* harmony import */ var _js_modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../js/modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _js_modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../js/modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _js_modules_tabs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../js/modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _js_modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../js/modules/timer */ "./js/modules/timer.js");
;









window.addEventListener('DOMContentLoaded', () => {

    const modalWindowTimer = setTimeout(() => (0,_js_modules_modal__WEBPACK_IMPORTED_MODULE_3__.openModal)('.modal', modalWindowTimer), 60000);

    (0,_js_modules_calc__WEBPACK_IMPORTED_MODULE_0__.default)();
    (0,_js_modules_cards__WEBPACK_IMPORTED_MODULE_1__.default)();
    (0,_js_modules_form__WEBPACK_IMPORTED_MODULE_2__.default)('.modal', modalWindowTimer);
    (0,_js_modules_modal__WEBPACK_IMPORTED_MODULE_3__.default)('.modal', '[data-modal]', modalWindowTimer);
    (0,_js_modules_slider__WEBPACK_IMPORTED_MODULE_4__.default)();
    (0,_js_modules_tabs__WEBPACK_IMPORTED_MODULE_5__.default)();
    (0,_js_modules_timer__WEBPACK_IMPORTED_MODULE_6__.default)();

});

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./js/script.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=bundle.js.map