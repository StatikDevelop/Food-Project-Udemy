var Promise = require('es6-promise-polyfill').Promise;
import 'core-js';

import calc from '../js/modules/calc';
import cards from '../js/modules/cards';
import form from '../js/modules/form';
import modal from '../js/modules/modal';
import slider from '../js/modules/slider';
import tabs from '../js/modules/tabs';
import timer from '../js/modules/timer';

import {openModal, closeModal} from '../js/modules/modal';

window.addEventListener('DOMContentLoaded', () => {

    const modalWindowTimer = setTimeout(() => openModal('.modal', modalWindowTimer), 60000);

    calc();
    cards();
    form({
        formSelector: 'form',
        modalSelector: '.modal',
        modalWindowTimer: modalWindowTimer
    });
    modal({
        modalSelector: '.modal',
        openTrigger: '[data-modal]',
        modalWindowTimer: modalWindowTimer
        
    });
    slider({
        container: '.offer__slider',
        wrapper: '.offer__slider-wrapper',
        prevArrow: '.offer__slider-prev',
        nextArrow: '.offer__slider-next',
        slide: '.offer__slide',
        totalCounter: '#total',
        currentCounter: '#current',
        field: '.offer__slider-inner'
    });
    tabs({
        tabsSelector: '.tabheader__item',
        tabsContentSelector: '.tabcontent',
        tabsParentSelector: '.tabheader__items',
        activeClass: 'tabheader__item_active'
    });
    timer({
        deadline:'2020-11-30',
        timerSelector: '.timer'
    });
});