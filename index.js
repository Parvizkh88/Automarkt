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
let mostSearchedTitle = document.createElement('h2');
let bestDealsTitle = document.createElement('h2');
var cards = document.createElement('div');

searachDiv.className = 'searachDiv';
searachInput.className = 'input1';
advanceSearchDiv.className = 'advanceSearchDiv';
filterButton.className = 'filterButton';
goToNormalSearch.className = 'goToNormalSearch';
advanceSearchButton.className = 'advanceSearchButton';
advanceSearchTitle.className = 'advanceSearchTitle';
searachInput.setAttribute('placeholder', 'serach cars');
carBrandInput.className = 'carBrandInput';
carCylindersInput.className = 'carCylindersInput';
countryInput.className = 'countryInput';
carBrandInput.setAttribute('placeholder', 'Brand');
carCylindersInput.setAttribute('placeholder', 'Cylinders');
countryInput.setAttribute('placeholder', 'Country');
mostSearchedDiv.className = 'mostSearchedDiv';
mostSearchedDiv.id = 'mostSearchedDiv';
mostSearchedTitle.className = 'mostSearchedTitle';
bestDealsDiv.className = 'bestDealsDiv';
bestDealsDiv.id = 'bestDealsDiv';
bestDealsTitle.className = 'bestDealsTitle';
bestDealsTitle.id = 'bestDealsTitleId';

filterButton.innerHTML = 'filters';
goToNormalSearch.innerHTML = 'Normal Search';
advanceSearchButton.innerHTML = 'Advance search';
advanceSearchTitle.innerHTML = 'Advance search';
mostSearchedTitle.innerHTML = 'Most Searched';
bestDealsTitle.innerHTML = 'Best Deals';

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
    alert(detailOutput)
};

function appendData(data) {
    for (let i = 0; i < data.length; i++) {
        var card = document.createElement('div');
        var cardTitle = document.createElement('h5');
        var theButton = document.createElement('BUTTON');
        theButton.addEventListener('click', function () {
            detailPop(data[i])
        })
        let newOutput = '';
        for (let key in data[i]) {
            if (key === "Name" || key === "Origin" || key === "Cylinders") {
                newOutput += key + ': ' + data[i][key] + '<br\>';
                cardTitle.innerHTML = newOutput;
            }
        }

        theButton.innerHTML = 'Details';

        cards.className = 'cards';
        card.id = `cardId${i}`;
        card.setAttribute('draggable', 'true');
        card.classList.add('card', 'draggable');
        theButton.classList.add('btn', 'btn-primary');

        card.append(cardTitle, theButton);
        cards.appendChild(card);

        document.querySelector(`#cardId${i}`).addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('gg', e.target.id)
            console.log('dragstart!');
        })
        document.querySelector('.cards').addEventListener('dragover', (e) => {
            e.preventDefault();
            console.log('dragover is happening!');
        })
        document.querySelector('.cards').addEventListener('drop', (e) => {
            console.log(e.dataTransfer.getData('gg'));
            e.target.appendChild(document.getElementById(e.dataTransfer.getData('gg')));
        })
    }

}
let theTitle = document.createElement('h2');

theTitle.innerHTML = 'All Cars';

searachDiv.append(searachInput, filterButton);
advanceSearchDiv.append(advanceSearchTitle, carBrandInput, carCylindersInput,
    countryInput, advanceSearchButton, goToNormalSearch);
mostSearchedDiv.appendChild(mostSearchedTitle);
bestDealsDiv.appendChild(bestDealsTitle);
document.body.append(searachDiv, advanceSearchDiv, theTitle);
document.body.appendChild(cards)
document.body.append(mostSearchedDiv, bestDealsDiv);

bestDealsTitle.setAttribute('draggable', 'true');
document.getElementById('bestDealsTitleId').addEventListener('dragstart', (e) => {
    console.log('dragstart is done!');
    e.dataTransfer.setData('myData', e.target.id);
})

document.querySelector('.mostSearchedDiv').addEventListener('dragover', (e) => {
    console.log('dragover is done!');
    e.preventDefault();
});

document.querySelector('.mostSearchedDiv').addEventListener('drop', (e) => {
    console.log('drop is done!');
    let myData2 = e.dataTransfer.getData('myData');
    e.target.appendChild(document.getElementById(myData2));
})

document.querySelector('.input1').addEventListener('keyup', function () {
    let list1 = document.querySelectorAll('.card-title');
    let list2 = document.querySelectorAll('.card');
    if (list1) {
        for (let i = 0; i < list1.length; i++) {
            if (list1[i].textContent.toLowerCase().indexOf(searachInput.value.toLowerCase()) == -1) {
                list2[i].style.display = 'none';
            }
            else {
                list2[i].style.display = 'block';
            }
        }
    }
});

document.querySelector('.advanceSearchButton').addEventListener('click', function () {
    let list3 = document.querySelectorAll('.card-title');
    let list4 = document.querySelectorAll('.card');
    let list5 = document.querySelectorAll('.card-cylinders');
    if (list3) {
        for (let i = 0; i < list3.length; i++) {
            if (list3[i].textContent.toLowerCase().indexOf(carBrandInput.value.toLowerCase()) !== -1
                && list5[i].textContent.toLowerCase().indexOf(carCylindersInput.value.toLowerCase()) !== -1) {
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
const toggleButton = document.getElementsByClassName('toggle-button')[0];
const navbarLinks = document.getElementsByClassName('navbar-links')[0];

toggleButton.addEventListener('click', () => {
    navbarLinks.classList.toggle('active')
})