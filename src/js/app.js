import * as flsFunctions from "./modules/functions.js";

flsFunctions.isWeb();

import Swiper, { Navigation, Pagination } from 'swiper';

const swiper = new Swiper();

window.DARKNESS = {};

// Navigation
(function () {
    let nav = document.querySelector('.nav');

    if (nav) {
        nav.addEventListener('click', (e) => {
            let target = e.target;
            if (target.tagName.toLowerCase() !== 'a') {
                return;
            }
            e.preventDefault();
            DARKNESS.navigation.toggleToActiveLink(target);
        })
    }
}());

//Form Open
(function () {
    let openFormButton = document.querySelector('.arrow-down');

    if (openFormButton) {
        openFormButton.addEventListener('click', (e) => {
            e.preventDefault();
            DARKNESS.form.open();
        })
    }
}());

//Form Submit
(function () {
    let submitFormButton = document.querySelector('.form');

    if (submitFormButton) {
        submitFormButton.addEventListener('submit', (e) => {
            e.preventDefault();
            if (DARKNESS.form.isValid()) {
                console.log('All good');
            } else {
                console.log('Not good');
            }
        })
    }
}());

// Form Valid Events
(function () {
    let validEvent = {};

    validEvent.isEmail = (email) => {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    validEvent.isNumber = (number) => {
        let re = /^\d+$/;
        return re.test(number);
    };

    validEvent.isNotEmpty = (str) => {
        return Boolean(str);
    };

    DARKNESS.validation = validEvent;
}());

// Form Event
(function () {
    let formEvent = {};
    let form = document.querySelector('.form-container');
    let closeButton = null;

    let onClose = () => {
        formEvent.close();
        closeButton.removeEventListener('click', onClose);
    };

    formEvent.open = () => {
        form.classList.remove('is-hidden');
        closeButton = document.querySelector('.form_close-button');
        closeButton.addEventListener('click', onClose);
        document.addEventListener('keydown', (event) => {
            const keyName = event.key;
            if (keyName === 'Escape') {
                onClose();
            }
        });
    };

    formEvent.close = () => {
        form.classList.add('is-hidden');
    };

    formEvent.isValid = () => {
        let requiredFields = document.querySelectorAll('[data-valid="required"]');
        let emailValue = document.querySelector('[data-email]').value;
        let numberValue = document.querySelector('[data-number]').value;

        if (!formEvent.isAllCompleted(requiredFields)) {
            return false;
        } else if (!DARKNESS.validation.isEmail(emailValue)) {
            console.log('Error Email');
            return false;
        } else if (!DARKNESS.validation.isNumber(numberValue)) {
            console.log('Error Number');
            return false;
        }
        return true;
    };

    formEvent.isAllCompleted = (data) => {
        let result = true;
        for (let i = 0; i < data.length; i++) {
            if (!DARKNESS.validation.isNotEmpty(data[i].value)) {
                result = false;
                break;
            }
        }
        return result;
    };

    DARKNESS.form = formEvent;
}());

// Page Navigation
(function () {
    let navEvent = {};

    navEvent.toggleToActiveLink = (target) => {
        let links = document.querySelectorAll('.nav_link');
        let showedSection = target.dataset.link;

        for (let i = 0; i < links.length; i++) {
            if (links[i].classList.contains('nav_link-active')) {
                links[i].classList.remove('nav_link-active');
            }
        }
        target.classList.add('nav_link-active');
        scrollToActiveSection(showedSection);
    };

    let scrollToActiveSection = (showedSection) => {
        let section = document.querySelector('.' + showedSection);
        let coords = section.getBoundingClientRect();
        let animateTime = 0.4;
        let timerID = setInterval(() => {
            if (window.scrollY < coords.top) {
                window.scrollBy(0, 10);
            } else {
                clearInterval(timerID);
            }
        }, animateTime || 0.5);
    }
    DARKNESS.navigation = navEvent;
}());

