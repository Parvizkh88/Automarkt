// About page JavaScript
const open = document.getElementById('open');
const close = document.getElementById('close');
const aboutUsContainer = document.querySelector('.aboutUsContainer');

open.addEventListener('click', () =>
    aboutUsContainer.classList.add('show-nav')
)
close.addEventListener('click', () =>
    aboutUsContainer.classList.remove('show-nav')
)