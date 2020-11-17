import {getResourses} from '../services/services';

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

export default cards;