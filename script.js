let questionTitle = document.querySelectorAll('.question-title');
let questionButton = document.querySelector('faq__arrow');
let gamesButton = document.querySelector('.filter__item_games');
let servicesButton = document.querySelector('.filter__item_services');
let programmsButton = document.querySelector('.filter__item_programms');
let gamesFilter = document.querySelector('.filter__title_games');
let servicesFilter = document.querySelector('.filter__title_services');
let programmsFilter = document.querySelector('.filter__title_programms');
let servicesButtonTitle = document.querySelector('.filter__title_services');
let gamesButtonTitle = document.querySelector('.filter__title_games');
let programmsButtonTitle = document.querySelector('.filter__title_programms');
let mainContainer = document.querySelector('.items_main');
let newsContainer = document.querySelector('.news__wrapper');

let search = document.querySelector('.search');
let searchResultDiv = document.querySelector('.topline__searchResult');

// Вызовы функций при загрузке сайта

getServices(); // загрузка всех сервисов с сервера

// FAQ

document.addEventListener('click', function (e) {
    if(e.target.classList.contains('question-title') || e.target.classList.contains('faq__arrow')) {
        e.target.parentNode.nextElementSibling.classList.toggle('visible');
        e.target.parentNode.querySelector('.faq__arrow').classList.toggle('rotate');
    }
})

// Поиск

document.addEventListener('click', function(e) {
    if(e.target.classList.contains('search-area') || e.target.classList.contains('search') || e.target.classList.contains('search-icon')) {
        search.classList.toggle('search_opened');
        search.focus()
        search.value = '';
        searchResultDiv.classList.remove('visible');
    }
})

search.addEventListener('input', function() {
    let searchResultArr = [];
    console.log(services)

    services.forEach(el => {
        if(el.name.toLowerCase().includes(search.value.toLowerCase())) {
            searchResultArr.push(el.name);
        } else {
            searchResultDiv.classList.remove('visible');
            searchResultDiv.textContent = '';
        }  
    })
    searchService(searchResultArr);
    if(searchResultArr.length == 0) {
        searchResultDiv.textContent = 'Ничего не найдено';
    }
})

// Общая функция поиска

function searchService(el) {

    searchResultDiv.textContent = ''
    searchResultDiv.classList.add('visible');

el.forEach(element => {

    services.forEach(elt => {
        if(elt.name == element) {

            let title = elt.name;
            let imgLink = elt.imageLink;
            let id = elt.serviceId;
            
            const itemLink = document.createElement('a');
            const itemImage = document.createElement('img');
            const itemTitle = document.createElement('h3');

            itemLink.classList.add('searchResult__item');
            itemImage.classList.add('searchResult__icon');
            itemImage.setAttribute('src', `${imgLink}`)
            itemTitle.classList.add('searchResult__title');
            itemLink.setAttribute('href', `service/index.html?id=${id}`)

            searchResultDiv.appendChild(itemLink);
            itemLink.appendChild(itemImage);
            itemLink.appendChild(itemTitle);

            itemTitle.textContent = title;
        }
    })
})

if(search.value == '') {
    searchResultDiv.textContent = '';
    searchResultDiv.classList.remove('visible');
    }
}

// Переключение типов сервисов

document.addEventListener('click', function(e){

if(e.target == gamesButton || e.target == gamesFilter) {
    mainContainer.textContent = '';
    gamesButton.classList.add('filter__item_active');
    gamesButtonTitle.classList.add('filter__title_active');
    servicesButton.classList.remove('filter__item_active');
    programmsButton.classList.remove('filter__item_active');
    servicesButtonTitle.classList.remove('filter__title_active');
    programmsButtonTitle.classList.remove('filter__title_active');
    services.forEach(el => {
        if(el.type == 'Игры') {
            createCard(el, mainContainer);
        }
    }) 
} else if(e.target == servicesButton || e.target == servicesFilter) {
    mainContainer.textContent = '';
    servicesButton.classList.add('filter__item_active');
    servicesButtonTitle.classList.add('filter__title_active');
    gamesButton.classList.remove('filter__item_active');
    programmsButton.classList.remove('filter__item_active');
    programmsButtonTitle.classList.remove('filter__title_active');
    gamesButtonTitle.classList.remove('filter__title_active');
    services.forEach(el => {
        if(el.type == 'Сервисы') {
            createCard(el, mainContainer);
        }
    }) 
} else if(e.target == programmsButton || e.target == programmsFilter) {
    mainContainer.textContent = '';
    programmsButton.classList.add('filter__item_active');
    programmsButtonTitle.classList.add('filter__title_active');
    gamesButton.classList.remove('filter__item_active');
    servicesButton.classList.remove('filter__item_active');
    servicesButtonTitle.classList.remove('filter__title_active');
    gamesButtonTitle.classList.remove('filter__title_active');
    services.forEach(el => {
        if(el.type == 'Программы') {
            createCard(el, mainContainer);
        }
    }) 
}
})

// Загрузка всех сервисов

// serviceCardsLoad(services);

function serviceCardsLoad(services) {
console.log(services)
services.forEach(el => {
    if(el.isPopular == true) {
        const container = document.querySelector('.swiper-wrapper_popular');
        createCardPopular(el, container);
    } 
    if(el.type == 'Игры' || el.name == 'Тестовая услуга') {
        const container = document.querySelector('.swiper-wrapper_games');
        createCard(el, container);
    }
    if(el.type == 'Сервисы') {
        const container = document.querySelector('.swiper-wrapper_services');
        createCard(el, container)
    }
    if(el.type == 'Программы') {
        const container = document.querySelector('.swiper-wrapper_programms');
        createCard(el, container)
    } 
}) 

}

function createCardPopular(el, container) {
    let title = el.name;
    let id = el.serviceId;

    const itemLink = document.createElement('a');
    const itemContainer = document.createElement('div');
    const itemImage = document.createElement('div');
    const itemTitle = document.createElement('h3');

    itemLink.classList.add('item__link', 'swiper-slide');
    itemContainer.classList.add('items__item-new');
    itemImage.classList.add('item__image_pipular_div');
    itemTitle.classList.add('items-popular__title');

    if(id == 'P0101') {
        let imgLink = './img/test.jpg';
        itemImage.setAttribute('style', `background-image: url(${imgLink});`)
    } else if(id == 'P1011') {
        let imgLink = './img/beeline-kaz.jpg';
        itemImage.setAttribute('style', `background-image: url(${imgLink});`)
    } else if(id == 'P1012') {
        let imgLink = './img/herbalife.png';
        itemImage.setAttribute('style', `background-image: url(${imgLink});`)
    } else if(id == 'P0005') {
        let imgLink = './img/alseko.webp';
        itemImage.setAttribute('style', `background-image: url(${imgLink});`)
    } else if(id == 'P0102') {
        let imgLink = el.imageLink;
        itemImage.setAttribute('style', `background-image: url(${imgLink});`)
    } else {
        let imgLink = './img/default.webp';
        itemImage.setAttribute('style', `background-image: url(${imgLink});`)
    }
    itemLink.setAttribute('href', `service/index.html?id=${id}`)
    container.appendChild(itemLink);
    itemLink.appendChild(itemContainer);
    itemContainer.appendChild(itemImage);
    itemContainer.appendChild(itemTitle);

    itemTitle.textContent = title;
}

function createCard(el, container) {

let title = el.name;
let id = el.serviceId;

    const itemLink = document.createElement('a');
    // const itemContainer = document.createElement('div');
    const itemImage = document.createElement('div');
    const itemTitle = document.createElement('h3');

    // itemContainer.classList.add('items__item');
    itemLink.classList.add('item__item', 'swiper-slide');
    itemImage.classList.add('item__image');
    itemTitle.classList.add('item__title');
    
    if(id == 'P0101') {
        let imgLink = './img/test.jpg';
        itemImage.setAttribute('style', `background-image: url(${imgLink});`)
    } else if(id == 'P1011') {
        let imgLink = './img/beeline-kaz.jpg';
        itemImage.setAttribute('style', `background-image: url(${imgLink});`)
    } else if(id == 'P1012') {
        let imgLink = './img/herbalife.png';
        itemImage.setAttribute('style', `background-image: url(${imgLink});`)
    } else if(id == 'P0005') {
        let imgLink = './img/alseko.webp';
        itemImage.setAttribute('style', `background-image: url(${imgLink});`)
    } else if(id == 'P0102') {
        let imgLink = el.imageLink;
        itemImage.setAttribute('style', `background-image: url(${imgLink});`)
    } else {
        let imgLink = './img/default.webp';
        itemImage.setAttribute('style', `background-image: url(${imgLink});`)
    }
    itemLink.setAttribute('href', `service/index.html?id=${id}`)

    container.appendChild(itemLink);
    itemLink.appendChild(itemImage);
    itemLink.appendChild(itemTitle);

    itemTitle.textContent = title;
}

// Загрузка новостей

// getNews();

function getNews () {
    return fetch(`https://newsdata.io/api/1/news?apikey=pub_5998959fa921d44bec0f4534d9d39848c29bd&q=steam&country=ru&language=ru`)
    .then((response) => response.json())
    .then((data) => {
        loadNews(data.results);
        })
}

function getServices() {

    serviceCardsLoad(services);

    // fetch('http://localhost:3000/services', { 
    //     method: 'POST', 
    //     headers: { 
    //         'Content-Type': 'application/json'
    //      }})
    // .then(res => {
    //     // console.log(res);
    //     return res.json()
    //   })
    //   .then(res => serviceCardsLoad(res.services)) // отправляется ответ на клиент
    //   .catch(err => console.log({ err }))
}

function loadNews(newsArr) {
    
    newsArr.forEach(el => {
        let title = el.title;
        let imgLink = el.image_url;
        let link = el.link;
        let subtitle = el.description;

        const itemLink = document.createElement('a');
        const itemImage = document.createElement('div');
        const itemContainer = document.createElement('div');
        const itemTitle = document.createElement('h3');
        const itemDescription = document.createElement('p');

        itemLink.classList.add('news__item', 'swiper-slide');
        itemImage.classList.add('news-image');
        itemContainer.classList.add('news-description');
        itemTitle.classList.add('news-title');
        itemDescription.classList.add('news-subtitle');
        itemImage.setAttribute('style', `background-image: url(${imgLink});`)
        itemLink.setAttribute('href', `${link}`)
        itemLink.setAttribute('target', 'blank')

        newsContainer.appendChild(itemLink);
        itemLink.appendChild(itemImage);
        itemLink.appendChild(itemContainer);
        itemContainer.appendChild(itemTitle);
        itemContainer.appendChild(itemDescription);

        itemTitle.textContent = title;
        itemDescription.textContent = subtitle;

    })
}