window.addEventListener('DOMContentLoaded', () => {
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

    //Timer

    const deadline = '2020-10-30';

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

// Modal

const modalTrigger = document.querySelectorAll('[data-modal]'),
      modal = document.querySelector('.modal');

const modalWindowTimer = setTimeout(openModal, 5000);

function openModal() {
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    clearInterval(modalWindowTimer);
}

modalTrigger.forEach(item => {
    item.addEventListener('click', openModal);
});

function closeModal() {
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.getAttribute('data-close') == '') {
        closeModal();

    }
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
});

function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
        openModal();
        window.removeEventListener('scroll', showModalByScroll);
    }
}

window.addEventListener('scroll', showModalByScroll);


// Card Menu

// const card = document.querySelectorAll('.menu__item');


// class Card {
//     constructor(src, imgAlt, title, descr, price) {
//         this.src = src;
//         this.title = title;
//         this.descr = descr;
//         this.price = price;
//         this.imgAlt = imgAlt;
//     }

//     setCard() {
//         return `<img src=${this.src} alt="${this.imgAlt}">
//         <h3 class="menu__item-subtitle">${this.title}</h3>
//         <div class="menu__item-descr">${this.descr}</div>
//         <div class="menu__item-divider"></div>
//         <div class="menu__item-price">
//             <div class="menu__item-cost">Цена:</div>
//             <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
//         </div>`;
//     }
// }

// function createCard(queryNum, src, imgAlt, title, descr, price) {
//     const cardSample = new Card(src, imgAlt, title, descr, price);
//     card[queryNum].innerHTML = cardSample.setCard();
// }

// createCard(0,'./img/tabs/elite.jpg', 'post', 'Топ Питание', 'Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст ', 349);





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
        
        if(this.classes.lenght === 0) {
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

new Card("img/tabs/vegy.jpg", 
        "vegy", 
        'Меню "Фитнес"', 
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
         9).render();

new Card('"img/tabs/elite.jpg"', 
        '"elite"', 
        'Меню “Премиум”', 
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', 
        15).render();

new Card('"img/tabs/post.jpg"', 
        '"post"', 
        'Меню "Постное"', 
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.', 
        12).render();


//Forms

const forms = document.querySelectorAll('form');

forms.forEach(item => {
    postData(item);
});

function postData (form) {
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

        const object = {};
        formData.forEach(function(value, key) {
            object[key] = value;
        });

        // request.send(JSON.stringify(object));
        
        form.append(statusMessage);
        

        fetch('server.php', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(object)
        }).then(data => data.text())
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
    openModal();

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
        closeModal();
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






















































});