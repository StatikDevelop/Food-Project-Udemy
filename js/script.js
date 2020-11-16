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
    form('.modal', modalWindowTimer);
    modal('.modal', '[data-modal]', modalWindowTimer);
    slider();
    tabs();
    timer();

});