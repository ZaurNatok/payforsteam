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

let search = document.querySelector('.topline__search');
let searchResultDiv = document.querySelector('.topline__searchResult');

// FAQ

document.addEventListener('click', function (e) {
    if(e.target.classList.contains('question-title') || e.target.classList.contains('faq__arrow')) {
        e.target.parentNode.nextElementSibling.classList.toggle('visible');
        e.target.parentNode.querySelector('.faq__arrow').classList.toggle('rotate');
    }
})

// Поиск

search.addEventListener('input', function() {
    let searchResultArr = [];

    services.forEach(el => {
        if(el.title.toLowerCase().includes(search.value.toLowerCase())) {
            searchResultArr.push(el.title);
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
        if(elt.title == element) {

            let title = elt.title;
            let imgLink = elt.imageLink;
            let id = elt.id;
            
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
            createCard(mainContainer, el);
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
            createCard(mainContainer, el);
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
            createCard(mainContainer, el);
        }
    }) 
}
})

// Загрузка всех сервисов

// serviceCardsLoad(services);

function serviceCardsLoad(services) {

    const container = document.querySelector('.items_main');
    services.forEach(el => createCard(el, container))



// services.forEach(el => {
//     if(el.isPopular == true) {
//         const container = document.querySelector('.swiper-wrapper_popular');
//         createCard(container, el)
//     } if(el.type == 'Игры' || el.group == 'Тестовая услуга') {
//         console.log(el)
//         const container = document.querySelector('.items_main');
//         createCard(container, el)
//     } 
// }) 

}

function createCard(el, container) {
console.log(el)
let title = el.name;
let id = el.serviceId;




    let imgLink = el.imageLink;

    
    const itemLink = document.createElement('a');
    const itemContainer = document.createElement('div');
    const itemImage = document.createElement('div');
    const itemTitle = document.createElement('h3');

    itemLink.classList.add('item__link', 'swiper-slide');
    itemContainer.classList.add('items__item');
    itemImage.classList.add('item__image_div');
    itemTitle.classList.add('item__title');
    itemImage.setAttribute('style', `background-image: url(./img/steam.png);`)
    itemLink.setAttribute('href', `service/index.html?id=${id}`)

    container.appendChild(itemLink);
    itemLink.appendChild(itemContainer);
    itemContainer.appendChild(itemImage);
    itemContainer.appendChild(itemTitle);

    itemTitle.textContent = title;
}

//

// getNews();

function getNews () {
    return fetch(`https://newsdata.io/api/1/news?apikey=pub_5998959fa921d44bec0f4534d9d39848c29bd&q=steam&country=ru&language=ru `)
    .then((response) => response.json())
    .then((data) => {
        loadNews(data.results);
        })
}

// getServicesTest();
getServices();

function getServices() {
    fetch('http://localhost:3000/balance', { 
        method: 'POST', 
        headers: { 
            'Content-Type': 'application/json'
         }})
    .then(res => {
        // console.log(res);
        return res.json()
      })
      .then(res => console.log(res)) // отправляется ответ на клиент
      .catch(err => console.log({ err }))
}

function getServicesTest() {

    fetch('http://localhost:3000/check', { 
        method: 'POST', 
        headers: { 
            'Content-Type': 'application/json'
         }, 
         body: JSON.stringify({
            "serviceId": "P0101",
            "account": "0",
            "agentTransactionId": "1",
            "agentTransactionDate": "2020-11-25T11:37:25",
            "amountTo": "200.00",
            "amountFrom": "200.00"
    })})
    .then(res => {
        console.log(res);
        return res.json()
      })
      .then(res => console.log(res)) // отправляется ответ на клиент
      .catch(err => console.log({ err }))



    // let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjUxIiwiVHlwZSI6IkFnZW50IiwiQWdlbnRJZCI6IjU2IiwibmJmIjoxNzM0Mjg3NzE0LCJleHAiOjIwNDkwMzI3NzIsImlhdCI6MTczNDI4NzcxNCwiaXNzIjoiUGF5TmV0IiwiYXVkIjoiQ3liZXJpYVNvZnQifQ.83iFQ4rYhdmuZe6qYWqp3wNUwtnHsxV8lQXlUS3Z9BQ';
    // return fetch('http://185.102.73.67:8081/TestPTService/api/v20/check', {
    //     headers: {
    //         'Access-Control-Allow-Origin': '*',
    //         'Access-Control-Allow-Headers': 'Content-Type,Authorization',
    //         'Access-Control-Allow-Credentials': true,
    //         'Access-Control-Allow-Methods': 'POST, PUT, PATCH, GET, DELETE, OPTIONS',
    //         'Content-Type': 'application/json',
    //         'Accept': 'application/json',
    //         'Authorization': `Bearer ${token})`
    //       },
    //     method: 'POST',
    //     body: {
    //         "serviceId": "P0101",
    //         "account": "0",
    //         "agentTransactionId": "1",
    //         "agentTransactionDate": "2020-11-25T11:37:25",
    //         "amountTo": "200.00",
    //         "amountFrom": "200.00"
    //     }        
    //   })
    // .then((response) => response.json())
    // .then((data) => {
    //     console.log(data.results)
    //     })
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


