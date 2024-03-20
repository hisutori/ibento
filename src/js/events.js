'use strict';

const isStorageAvailable = () => {
    const test = 'test';

    try {
        localStorage.setItem(test, test);
        localStorage.removeItem(test);

        return true;
    } catch {
        return false;
    }
};

const isCacheAvailable = () => {
    return (
        isStorageAvailable() &&
        localStorage.getItem('events') !== null &&
        new Date(Number(localStorage.getItem('ttl')) + 360 * 60 * 1000) > new Date()
    );
};

const fetchEvents = async (month, day) => {
    if (isCacheAvailable()) {
        return JSON.parse(localStorage.getItem('events'));
    } else {
        const response = await fetch(`/data/${month}/${day}.json`);

        const events = await response.json();

        if (isStorageAvailable()) {
            localStorage.setItem('events', JSON.stringify(events));
            localStorage.setItem('ttl', +new Date());
        }

        return events;
    }
};

const displayEvents = (eventLists) => {
    const main = document.querySelector('main');

    for (const key in eventLists) {
        const section = document.createElement('section');
        section.setAttribute('id', key);

        const h2 = document.createElement('h2');
        h2.textContent = key;

        section.append(h2);

        for (const event of eventLists[key]) {
            const div = document.createElement('div');
            div.setAttribute('data-year', event.year);

            const h3 = document.createElement('h3');
            let year = event.year;
            if (year < 0) {
                year = -year;
                h3.classList.add('bc');
            }

            h3.textContent = year;

            const p = document.createElement('p');
            p.innerHTML = event.html;

            const linkList = p.querySelectorAll('a');
            for (const link of linkList) {
                link.setAttribute('rel', 'noreferrer');
            }

            div.append(h3, p);

            section.append(div);
        }

        main.append(section);
    }
};

// Main
(async () => {
    const today = new Date();

    let month = today.getMonth() + 1;
    month = month < 10 ? '0' + month : month;

    let day = today.getDate();
    day = day < 10 ? '0' + day : day;

    const events = await fetchEvents(month, day);

    if (/complete|interactive|loaded/.test(document.readyState)) {
        displayEvents(events);
    } else {
        document.addEventListener('DOMContentLoaded', displayEvents(events));
    }
})();
