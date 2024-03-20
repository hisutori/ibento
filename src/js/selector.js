'use strict';

const filter = (eventsList, start, end) => {
    for (const event of eventsList) {
        const year = parseInt(event.getAttribute('data-year'));

        if (year >= start && year <= end) {
            event.style.display = 'flex';
        } else {
            event.style.display = 'none';
        }
    }

    window.scrollTo(0, 0);
};

// Main
const buttonList = document.body.querySelectorAll('nav button');
const eventList = document.body.querySelectorAll('[data-year]');

for (const button of buttonList) {
    button.addEventListener('click', () => {
        filter(eventList, button.getAttribute('data-start'), button.getAttribute('data-end'));
    });
}
