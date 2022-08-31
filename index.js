let searachDiv = document.createElement('div');
let searachInput = document.createElement('input');
let advanceSearchDiv = document.createElement('div');
let filterButton = document.createElement('Button');
let goToNormalSearch = document.createElement('Button');
let advanceSearchTitle = document.createElement('h3');
let carBrandInput = document.createElement('input');
let carCylindersInput = document.createElement('input');
let countryInput = document.createElement('input');
let advanceSearchButton = document.createElement('Button');
let mostSearchedDiv = document.createElement('div');
let bestDealsDiv = document.createElement('div');
var cards = document.createElement('div');

searachDiv.className = 'searachDiv';
searachInput.className = 'input1';
advanceSearchDiv.className = 'advanceSearchDiv';
filterButton.classList.add('filterButton', 'btn', 'btn-primary');
goToNormalSearch.classList.add('goToNormalSearch', 'btn', 'btn-primary');
advanceSearchButton.classList.add('advanceSearchButton', 'btn', 'btn-primary');
advanceSearchTitle.className = 'advanceSearchTitle';
searachInput.setAttribute('placeholder', 'serach cars');
carBrandInput.className = 'carBrandInput';
carCylindersInput.className = 'carCylindersInput';
countryInput.className = 'countryInput';
carBrandInput.setAttribute('placeholder', 'Brand');
carCylindersInput.setAttribute('placeholder', 'Cylinders');
countryInput.setAttribute('placeholder', 'Country');
mostSearchedDiv.classList.add('mostSearchedDiv', 'box');
mostSearchedDiv.id = 'mostSearchedDiv';
bestDealsDiv.classList.add('bestDealsDiv', 'box');
bestDealsDiv.id = 'bestDealsDiv';

filterButton.innerHTML = 'filters';
goToNormalSearch.innerHTML = 'Normal Search';
advanceSearchButton.innerHTML = 'Advance search';
advanceSearchTitle.innerHTML = 'Advance search';

let panels = document.querySelectorAll('.panel');
panels.forEach((panel) => {
    panel.addEventListener('click', () => {
        removeActiveClass()
        panel.classList.add('panelActive')
    })

})
function removeActiveClass() {
    panels.forEach((panel) => {
        panel.classList.remove('panelActive')
    })
}

fetch('cars.json')
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        appendData(data)
    })
    .catch(function (error) {
        console.log('the data is not valid');
    })

function detailPop(x) {
    let detailOutput = '';
    for (let key in x) {
        detailOutput += key + ': ' + x[key] + '\n';
    }
    console.log(detailOutput);
    alert(detailOutput)
};

function appendData(data) {
    for (let i = 0; i < data.length; i++) {
        var card = document.createElement('div');
        var cardTitle = document.createElement('h5');
        var theButton = document.createElement('button');
        var cardImage = document.createElement('img');

        theButton.addEventListener('click', function () {
            detailPop(data[i])
            console.log(theButton);
        })
        let newOutput = '';
        for (let key in data[i]) {
            if (data[i].image) {
                cardImage.setAttribute('src', data[i].image);

                if (data[i].alt) {
                    cardImage.setAttribute('alt', data[i].alt);
                }
            }
            if (key === "Name" || key === "Origin" || key === "Cylinders") {
                newOutput += key + ': ' + data[i][key] + "<br/>";
                cardTitle.innerHTML = newOutput;
                cardTitle.className = 'cardTitle'
            }
        }

        theButton.innerHTML = 'Details';

        cards.classList.add('cards', 'box', 'scrollBoxShow');
        card.id = `cardId${i}`;
        card.setAttribute('draggable', 'true');
        card.classList.add('card', 'draggable');
        theButton.classList.add('btn', 'btn-primary');
        cardImage.className = 'cardImage';

        card.append(cardImage, cardTitle, theButton);
        cards.appendChild(card);

        document.querySelector(`#cardId${i}`).addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('gg', e.target.id)
        })
        document.querySelector('.cards').addEventListener('dragover', (e) => {
            e.preventDefault();
        })
        document.querySelector('.cards').addEventListener('drop', (e) => {
            e.target.appendChild(document.getElementById(e.dataTransfer.getData('gg')));
        })
    }
}

let theTitle = document.createElement('h2');
theTitle.className = 'theTitle'
theTitle.innerHTML = 'All Cars';

let carouselExampleCaptions = document.querySelector('#carouselExampleCaptions');
let carouselExampleCaptions2 = document.querySelector('#carouselExampleCaptions2');
let MostSearchedTitle = document.querySelector('.MostSearchedTitle');
let bestDealsTitle = document.querySelector('.bestDealsTitle');
let footer = document.querySelector('.footer');

//---------------------------------------------
searachDiv.append(searachInput, filterButton);
advanceSearchDiv.append(advanceSearchTitle, carBrandInput, carCylindersInput,
    countryInput, advanceSearchButton, goToNormalSearch);
mostSearchedDiv.appendChild(carouselExampleCaptions);
bestDealsDiv.appendChild(carouselExampleCaptions2);
document.body.append(searachDiv, advanceSearchDiv, theTitle);
document.body.appendChild(cards)
document.body.append(MostSearchedTitle, mostSearchedDiv, bestDealsTitle, bestDealsDiv, footer);
//I deactivated the title drag and drop feature
//--------------------------------------------------------------
// bestDealsTitle.setAttribute('draggable', 'true');

// document.getElementById('bestDealsTitleId').addEventListener('dragstart', (e) => {
//     e.dataTransfer.setData('myData', e.target.id);
// })

// document.querySelector('.mostSearchedDiv').addEventListener('dragover', (e) => {
//     e.preventDefault();
// });

// document.querySelector('.mostSearchedDiv').addEventListener('drop', (e) => {
//     let myData2 = e.dataTransfer.getData('myData');
//     e.target.appendChild(document.getElementById(myData2));
// })
//--------------------------------------------------------------
document.querySelector('.input1').addEventListener('keyup', function () {

    let list1 = document.querySelectorAll('.cardTitle');
    let list2 = document.querySelectorAll('.card');
    if (list1) {
        for (let i = 0; i < list1.length; i++) {
            var myList1 = list1[i].textContent;
            var brs = myList1.split(":");
            var brs2 = brs[1].split('C');

            if (brs2[0].toLowerCase().indexOf(searachInput.value.toLowerCase()) == -1) {
                list2[i].style.display = 'none';
            }
            else {
                list2[i].style.display = 'block';
            }
        }
    }
});

document.querySelector('.advanceSearchButton').addEventListener('click', function () {
    let list3 = document.querySelectorAll('.cardTitle');
    let list4 = document.querySelectorAll('.card');
    if (list3) {
        for (let i = 0; i < list3.length; i++) {
            var myList1 = list3[i].textContent;
            let brs = myList1.split(":");
            let brs2 = brs[1].split('C');
            let brs3 = brs[2].split('O');
            let brs4 = brs[3];
            if (brs2[0].toLowerCase().indexOf(carBrandInput.value.toLowerCase()) !== -1 &&
                brs3[0].toLowerCase().indexOf(carCylindersInput.value.toLowerCase()) !== -1 &&
                brs4.toLowerCase().indexOf(countryInput.value.toLowerCase()) !== -1
            ) {
                list4[i].style.display = 'block';
            } else {
                list4[i].style.display = 'none';
            }
        }
    }
})

document.querySelector('.filterButton').addEventListener('click', function () {
    searachDiv.style.display = 'none';
    advanceSearchDiv.style.display = 'block';
})
//The code below hides advanceSearchDiv when we minimize the size of the browser
if (document.body.style.width < '800px') {
    advanceSearchDiv.style.display = 'none';
}

document.querySelector('.goToNormalSearch').addEventListener('click', function () {
    searachDiv.style.display = 'block';
    advanceSearchDiv.style.display = 'none';
})

const nav = document.querySelector('.nav');
window.addEventListener('scroll', fixNav);

function fixNav() {

    if (window.scrollY > nav.offsetHeight + 150) {
        nav.classList.add('active')
    } else {
        nav.classList.remove('active')
    }
}

window.addEventListener('scroll', navHide);
function navHide() {
    if (window.scrollY > 1395) {
        nav.style.display = 'none';
    } else {
        nav.style.display = 'block';;
    }
}
const shortcutsLinks = document.querySelector('.shortcuts-links');
window.addEventListener('scroll', shortcutCursor);

function shortcutCursor() {
    if (window.scrollY > 715) {
        // console.log(window.scrollY);
        shortcutsLinks.style.zIndex = "-2";
    }
    else {
        shortcutsLinks.style.zIndex = "1";
    }
}

const carShowContainer = document.querySelector('.carShowContainer');
window.addEventListener('scroll', panelCursor);
function panelCursor() {
    if (window.scrollY > 846) {
        carShowContainer.style.zIndex = "-2";
    } else {
        carShowContainer.style.zIndex = "1";
    }
}

var widerScreenWidth = window.matchMedia("(max-width: 501px)");
var screenWidth = document.body.clientWidth;
nav.classList.toggle('mobileNav');

if (widerScreenWidth.matches) {
    nav.classList.remove('nav');

    const toggle = document.getElementById('toggle');
    const container = document.getElementById('mobileNavId');
    // The first line below was done because I wanted to have the default nav in mobile starting small
    container.classList.remove('active');
    toggle.addEventListener('click', () => {
        container.classList.toggle('active')
    }
    )
} else {
    nav.classList.remove('strethNav');
}

let boxes = document.querySelectorAll('.box');

window.addEventListener('scroll', checkBoxes)
checkBoxes()
function checkBoxes() {
    const triggerPoint = window.innerHeight / 5 * 4;

    boxes.forEach(box => {
        const boxTop = box.getBoundingClientRect().top
        if (boxTop < triggerPoint) {
            box.classList.add('scrollBoxShow')
        } else {
            box.classList.remove('scrollBoxShow')
        }
    })
}