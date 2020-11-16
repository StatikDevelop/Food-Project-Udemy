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

export default slider;