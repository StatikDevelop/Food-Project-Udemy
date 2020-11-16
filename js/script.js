window.addEventListener('DOMContentLoaded', () => {
    const calc = require('../js/modules/calc'),
          cards = require('../js/modules/cards'),
          form = require('../js/modules/form'),
          modal = require('../js/modules/modal'),
          slider = require('../js/modules/slider'),
          tabs = require('../js/modules/tabs'),
          timer = require('../js/modules/timer');

    calc();
    cards();
    form();
    modal();
    slider();
    tabs();
    timer();

});