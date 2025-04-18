// localStorage.clear();

let serviceTitle = document.querySelector('.service-title');
let serviceImage = document.querySelector('.content-block__img');
let serviceSubtitle = document.querySelector('.content-block__subtitle');
let serviceParamentresTitle =document.querySelector('.payment-parameters');
let serviceParamentresContainer= document.querySelector('.choose-sum');
let popupInfo = document.querySelector('.popup__info');
let popup = document.querySelector('.popup');
let loaderPopup = popup.querySelector('.loader');
let popupIcon = popup.querySelector('.popup__icon');
let payAfterCheck = popup.querySelector('.payAfterCheck');
let bgForQR = document.querySelector('.popup__content');
let paymentSumInput = document.querySelector('.payment-input');

let popupTypes = document.querySelector('.choose-typePopup');
let popupTypesSteam = document.querySelector('.choose-typePopup_steam');
let chooseRegion = document.querySelector('.choose-region');
let showDropdownRegionsButton = document.querySelector('.region-select__sector');
let popupTypesTitle = document.querySelector('.content-block__title_popup');
let regionContainer = document.querySelector('.content-block__description_popup-region');
let regionSelect = document.querySelector('.region-select');
let steamPay = document.querySelector('.content__parameters_pay-steam');
let voucherPay = document.querySelector('.voucherEmail');
let paymentButton = document.querySelector('.popupType__item_payment');
let voucherButton = document.querySelector('.popupType__item_voucher');
let voucherNominalsContainer = document.querySelector('.choose-sum__items');

let payButton = document.querySelector('.pay');
let theEmailForm = document.forms.email;
let paymentSum = document.querySelector('.pay-info__pay-type_sum');
let finalSum = document.querySelector('.pay-info__pay-type_result');
let loader = document.querySelector('.loader');
let comissionSum = document.querySelector('.comission');
let errorText = document.querySelector('.error');

let popupServiceName = document.querySelector('.service-name');
let popupClientEmail = document.querySelector('.client-email');
let popupPaymentSum = document.querySelector('.paymentsum');

let regionTitle = document.querySelector('.region-select__title');

let search = document.querySelector('.search');
let searchResultDiv = document.querySelector('.topline__searchResult');

let stickyElement = document.querySelector('.sticky-component');

let paymentMethods = document.querySelector('.pay-info__payment-methods');
let paymentMethodTitle = document.querySelectorAll('.payment-method__title');

let currency = document.querySelector('.currency');
let popupSum = document.querySelector('.topup-sum');

let cyberCard = document.querySelector('.cybercard');
let cyberIcon = document.querySelector('.cyber');

let paymentComission = document.querySelector('.payment-comission');


// Выбор способа оплаты

let methods = [
    {
        id: 1,
        title: 'SBP'
    },
    {
        id: 2,
        title: 'Card'
    },
    {
        id: 3,
        title: 'Cyber'
    }
]

let comission = 50;

function ifCyberCard() {
    if(cyberCard.checked) {
        cyberIcon.setAttribute('src', '../img/cybercard_chosen.png');
    } else {
        cyberIcon.setAttribute('src', '../img/cybercard.png');
    }
}
paymentMethods.addEventListener('click', function(){
    ifCyberCard();
    let paymentAmount = document.querySelector('.payment-sum');
    
    if(cyberCard.checked) {
        comission = 0;
        paymentComission.textContent = 0 + ' ' + '₽';
        finalSum.textContent = (Number(paymentAmount.value) + Number(comission)).toLocaleString() + ' ' + '₽';
    } else {
        comission = 50;
        paymentComission.textContent = 50 + ' ' + '₽';
        finalSum.textContent = (Number(paymentAmount.value) + Number(comission)).toLocaleString() + ' ' + '₽';
    }
})

// 



const url = new URL(
    document.location.href
)

// кнопка оплаты при скролле

// window.addEventListener('scroll', () => {
//     if (window.pageYOffset < 430) {
//         stickyElement.classList.remove('hidden');
//     } else {
//         stickyElement.classList.add('hidden');
//     }
// });

// window.addEventListener('scroll', () => {
//     let place = document.body.scrollTop;
//     let alertOn = document.getElementById('theElement').offsetTop;
//     if(place > alertOn){
//     alert('Function execute here');
//     this.removeEventListener('scroll', arguments.callee, false);
//     }
// });


// Определяем id сервиса

let serviceId = url.searchParams.get('id');
let theServiceGlobal = services.find((element) => element.serviceId == serviceId);
getServiceParamentres(serviceId);

// запрос check для получения курса

getCurrencyRate();

function getCurrencyRate() {
    fetch('http://localhost:3000/check', { 
        method: 'POST', 
        headers: { 
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({
            'serviceId': 'P0101',
            'account': '0',
            'agentTransactionId': '111',
            'agentTransactionDate': '2025-01-23T20:41:13',
            'amountTo': 500.00,
            'amountFrom': 500.00
    })})
    .then(res => {
        loaderPopup.classList.add('hidden');
        return res.json()
    })
    .then(res => setLocalStorage(res))
     // параметры сервиса - ответ от сервера
    .catch(err => console.log({ err }))
}

function setLocalStorage(res) {
    if(res.result == 220) {
        popup.classList.remove('hidden');
        loaderPopup.classList.add('hidden');
        popupIcon.setAttribute('src', '../img/error.png')
        popupIcon.classList.remove('hidden');
        popupInfo.textContent = `Произошла ошибка. Мы уже знаем об этом и работаем над ее устранением. Пожалуйста, повторите попытку позже`;
        popup.addEventListener('click', (e) => {
            if(e.target.classList.contains('close') || e.target.classList.contains('popup__wrapper')) {
                popup.classList.add('hidden');
                popupIcon.classList.add('hidden');
                popupInfo.textContent = '';
                location.reload()
            }
        })
        return;
    } else {
        localStorage.setItem('currencyRate', res.rate);
        localStorage.setItem('currency', res.currency);
        currency.textContent = localStorage.getItem('currency');
    }
}

// данные названия сервиса, субтайтл + картинка по id сервиса

function getServiceParamentres(id) {

//тесты на локальных сервисах

    // theService(services) 

    fetch('http://localhost:3000/service', { 
        method: 'POST', 
        headers: { 
            'Content-Type': 'application/json'
         }, 
         body: JSON.stringify({
            "serviceId": id
    })})
    .then(res => {
        return res.json();
      })
      .then(res => theService(res)) // параметры сервиса - ответ от сервера
      .catch(err => console.log({ err }))  
}

function theService(services) {

    let theService = services.services.find((element) => element.serviceId == serviceId);
    // let theService = services.find((element) => element.serviceId == serviceId);
    loadServiceParameters(theService);
}

let sumToPay = 0;
let sumToPopup = 0;

// Нашли сервис, наполняем страницу полученными параметрами

function loadServiceParameters(service) {
    serviceTitle.textContent = service.name;
    serviceSubtitle.textContent = service.country;
    
    if(service.serviceId == 'P0101') {
        let imgLink = '../img/test.jpg';
        serviceImage.setAttribute('style', `background-image:url(${imgLink})`)
    } else if(service.serviceId == 'P1011') {
        let imgLink = '../img/beeline-kaz.jpg';
        serviceImage.setAttribute('src', `${imgLink}`)
    } else if(service.serviceId == 'P1012') {
        let imgLink = '../img/herbalife.png';
        serviceImage.setAttribute('src', `${imgLink}`)
    } else if(service.serviceId == 'P0005') {
        let imgLink = '../img/alseko.webp';
        serviceImage.setAttribute('src', `${imgLink}`)
    } else {
        let imgLink = '../img/default.webp';
        serviceImage.setAttribute('src', `${imgLink}`)
    }

    serviceParamentresTitle.textContent = 'Пополнение баланса';
    let form = document.createElement('form');
    form.classList.add('payment-form');
    form.setAttribute('name', 'paymentParams');

    service.inputs.forEach(function(el) {

        let inputItem = document.createElement('div');
        let inputLabel = document.createElement('label');
        let input = document.createElement('input');
        let error = document.createElement('p');

        inputItem.classList.add('input-item');
        inputLabel.classList.add('form-label');
        input.classList.add('region-select__sector');
        input.classList.add('payment-input');
        input.setAttribute('name', el.name);
        input.setAttribute('pattern', el.regexp);
        input.setAttribute('placeholder', el.title);
        error.classList.add('error');
        error.classList.add('play-regular');
        error.classList.add('hidden');

        if(el.required == true) {
            input.setAttribute('required', true);
        }

        serviceParamentresContainer.appendChild(form);
        form.appendChild(inputItem);
        inputItem.appendChild(inputLabel);
        inputItem.appendChild(input);
        inputItem.appendChild(error);

        inputLabel.textContent = el.title;

        input.addEventListener('input', function() {

            if(input.value == '') {
                error.classList.remove('hidden');
                error.textContent = 'Это поле обязтельное';    
            } else if(!input.value == '') {
                let regex = new RegExp(el.regexp);
                if(regex.test(input.value) == false) {
                    error.classList.remove('hidden');
                    error.textContent = 'Проверьте корректность введенных данных';
                } else {
                    error.classList.add('hidden');
                    error.textContent = '';
                }
            }
        })
    })

    if(service.fixedPayment == false) {

        let sumToPopup = 0;
        let inputItemSum = document.createElement('div');
        let sumToTitle= document.createElement('h3');
        let inputLabelSum = document.createElement('label');
        let inputSum = document.createElement('input');
        let errorSum = document.createElement('p');
        inputItemSum.classList.add('input-item');
        inputLabelSum.classList.add('form-label');
        inputSum.classList.add('region-select__sector');
        inputSum.classList.add('payment-input');
        inputSum.classList.add('payment-sum');
        inputSum.setAttribute('type', 'number')
        errorSum.classList.add('error');
        errorSum.classList.add('hidden');
        inputItemSum.classList.add('sum');
        sumToTitle.classList.add('sumToTitle');
        inputSum.setAttribute('value', 0);

        form.appendChild(inputItemSum);
        inputItemSum.appendChild(inputLabelSum);
        inputItemSum.appendChild(inputSum);
        inputItemSum.appendChild(errorSum);
        inputItemSum.appendChild(sumToTitle);

        inputSum.addEventListener('input', function() {
            sumToPopup = inputSum.value * localStorage.getItem('currencyRate');
            popupSum.textContent = inputSum.value;
            sumToTitle.textContent = '~' + sumToPopup.toFixed(2).toLocaleString() + ' ' + `${localStorage.getItem('currency')} к зачислению на счет ${service.name}`;
            paymentSum.textContent = '~' + sumToPopup.toFixed(2).toLocaleString() + ' ' + localStorage.getItem('currency');
            sumToPay = Number(inputSum.value);
            finalSum.textContent = (Number(inputSum.value) + Number(comission)).toLocaleString() + ' ' + '₽';
        })

        inputSum.setAttribute('placeholder', 'Введите сумму');
        inputLabelSum.textContent = 'Сумма пополнения, в рублях';
        sumToTitle.textContent = sumToPopup.toFixed(2).toLocaleString() + ' ' + `${localStorage.getItem('currency')} к зачислению на счет ${service.name}`;

        inputSum.addEventListener('input', function() {

                if(inputSum.value == '' || inputSum.value < 10 || inputSum.value > 15000) {
                    errorSum.classList.remove('hidden');
                    errorSum.textContent = 'Минимальная сумма оплаты 10 рублей, максимальная 15 000 рублей';  
                }
                else {
                    errorSum.classList.add('hidden');
                    errorSum.textContent = '';
                }
            })
    }
}



// параметры сервиса

// function getServiceParamentres(id) {
//     services.forEach(el => {
//         if (el.id == id) {
//             if(el.popupTypes.length < 2) {
//                 voucherPay.classList.remove('hidden');
//                 regionTitle.textContent = el.region[0].title;
//             }

//         // если сервис Steam
//         if (el.title == 'Steam') {
//             popupTypesSteam.classList.remove('hidden');
//             steamPay.classList.remove('hidden');
//             vouchers.classList.add('hidden');
//             popupTypes.classList.remove('hidden');
//         }
//         } if (el.id == id && el.region && el.region.length > 1) {
//             popupTypes.classList.remove('hidden');
//             chooseRegion.classList.remove('hidden');
//             let regionFlag = document.querySelector('.region-flag');
//             regionFlag.setAttribute('src', `.${el.region[0].img}`);
//             let regionTitle = document.querySelector('.region-select__title');
//             regionTitle.textContent = el.region[0].title;
//             let dropDown = document.querySelector('.region-select__dropdown');

//             el.region.forEach(el => {
//                 const dropdownRegionItem = document.createElement('div');
//                 const dropdownRegionImage = document.createElement('img');
//                 const dropdownRegionTitle = document.createElement('p');

//                 dropdownRegionItem.classList.add('region-item');
//                 dropdownRegionImage.classList.add('region-flag');
//                 dropdownRegionTitle.classList.add('region-title');

//                 dropDown.appendChild(dropdownRegionItem);
//                 dropdownRegionItem.appendChild(dropdownRegionImage);
//                 dropdownRegionItem.appendChild(dropdownRegionTitle);

//                 dropdownRegionImage.setAttribute('src', `.${el.img}`);
//                 dropdownRegionTitle.textContent = el.title;
//             })

//             showDropdownRegionsButton.addEventListener('click', function () {
//                 dropDown.classList.toggle('hidden');
//             }
//             )

//             // Определяем выбранную в выпадающем меню страну

//             dropDown.addEventListener('click', function (e) {
//                 if (e.target.classList.contains('region-item')) {
//                     let chosenRegionTitle = e.target.querySelector('.region-title').textContent;
//                     let chosenRegionFlag = e.target.querySelector('.region-flag').getAttribute('src');
//                     dropDown.classList.toggle('hidden');
//                     chosenRegion(chosenRegionTitle, chosenRegionFlag);
//                 } if (e.target.classList.contains('region-flag')) {
//                     let chosenRegionTitle = e.target.nextElementSibling.textContent;
//                     let chosenRegionFlag = e.target.getAttribute('src');
//                     dropDown.classList.toggle('hidden');
//                     chosenRegion(chosenRegionTitle, chosenRegionFlag);
//                 } if (e.target.classList.contains('region-title')) {
//                     let chosenRegionTitle = e.target.textContent;
//                     let chosenRegionFlag = e.target.previousSibling.getAttribute('src');
//                     dropDown.classList.toggle('hidden');
//                     chosenRegion(chosenRegionTitle, chosenRegionFlag);
//                 }
//             })
//         } 
//     })
// }

// Работаем с выбранным регионом из выпадающего списка

// function chosenRegion(name, flag) {
//     let regionTitle = document.querySelector('.region-select__title');
//     let regionFlag = document.querySelector('.region-select__sector').querySelector('.region-flag');
//     regionTitle.textContent = name;
//     regionFlag.setAttribute('src', `${flag}`)
//     loadVouchers(name);
// }

// показываем номиналы ваучеров в зависимости от страны

// function loadVouchers(country) {
//     if(theService.popupTypes.length < 2) {
//         // let regionTitle = document.querySelector('.region-select__title');
//         let theCountryVouchers = theService.region.find((element) => element.title == country);
        
//         voucherNominalsContainer.textContent = '';

//         theCountryVouchers.voucherNominals.forEach(el => {
//             let voucherNominal = document.createElement('p');
//             voucherNominal.classList.add('choose-sum__item');
//             voucherNominalsContainer.appendChild(voucherNominal);
//             voucherNominal.textContent = el;
//         })
//     } else {

//         let theCountryVouchers = theService.region.find((element) => element.title == country);
        
//         voucherNominalsContainer.textContent = '';

//         theCountryVouchers.voucherNominals.forEach(el => {
//             let voucherNominal = document.createElement('p');
//             voucherNominal.classList.add('choose-sum__item');
//             voucherNominalsContainer.appendChild(voucherNominal);
//             voucherNominal.textContent = el;
//         })
//     }

//     if(theService.title == 'Steam') {
//         vouchers.classList.add('hidden');
//     }
// }

// Выбор способа пополнения

// document.addEventListener('click', function(e) {
//     if(e.target == paymentButton) {
//         if(!paymentButton.classList.contains('popupType__item_active')) {
//             paymentButton.classList.add('popupType__item_active');
//             voucherButton.classList.remove('popupType__item_active');
//             vouchers.classList.add('hidden');
//         } if(steamPay.classList.contains('hidden')) {
//             steamPay.classList.remove('hidden');
//             voucherPay.classList.add('hidden');
//             voucherPay.classList.add('hidden');
//         }
//     }

//     if(e.target == voucherButton) {

//         // активация/деактивация кнопок выбора способа оплаты - ваучер или оплата

//         if(!voucherButton.classList.contains('popupType__item_active')) {
//             voucherButton.classList.add('popupType__item_active');
//             paymentButton.classList.remove('popupType__item_active');
//             vouchers.classList.add('hidden');
//         } if(!steamPay.classList.contains('hidden')) {
//             steamPay.classList.add('hidden');
//             voucherPay.classList.remove('hidden');
//             vouchers.classList.remove('hidden');
//         }
//     }
// })

// Выбор номинала ваучера

// document.addEventListener('click', function(e) {
//     let voucher = document.querySelectorAll('.choose-sum__item');
//     let currency = ''
//     if(e.target.classList.contains('choose-sum__item')) {
//         finalSum.textContent = '';
//         loader.classList.remove('hidden');
//         for (let i = 0; i < voucher.length; i++) {
//             if(voucher[i].classList.contains('choose-sum__item_active')) {
//                 voucher[i].classList.remove('choose-sum__item_active')
//             }
//         }
//         e.target.classList.add('choose-sum__item_active');
        
//         let theSum = e.target.textContent;

//         if(theSum.slice(-1) == '$') {
//             currency = 'USD';
//         } else if(theSum.slice(-1) == '€') {
//             currency = 'EUR';
//         } else if(theSum.slice(-1) == '₺') {
//             currency = 'TRY';
//         } else if(theSum.slice(-1) == 'ł' || theSum.slice(-2)[0] == 'Z') {
//             currency = 'PLN';
//         } else if(theSum.slice(-1) == '.') {
//             currency = 'AED'
//         } else if(theSum.slice(-1) == '₽') {
//             currency = 'RUR'
//         } else if(theSum.slice(-1) == 'G') {
//             currency = 'TG'
//         } else if(theSum.slice(-2) == 'ds') {
//             currency = 'Diamonds' // проверить на других сервисах
//         } else if(theSum.slice(-2) == 'ns') {
//             currency = 'Coins'
//         } else if(theSum.slice(-2) == 'ck') {
//             currency = 'Pack'
//         } else if(theSum.slice(-2) == 'ов') {
//             currency = 'Кристаллы' // не работает
//         } else if(theSum.slice(-1) == '₹') {
//             currency = 'INR'
//         } else if(theSum.slice(-1) == '£') {
//             currency = 'GBP'
//         } else if(theSum.slice(-2) == 'R$') {
//             currency = 'BRL'
//         } else if(theSum.slice(-1) == 'س') {
//             currency = 'SAR';
//         }
//         let theRate = rates.find((element) => element.currency == currency)
//         let paymentSumNumber = theSum.replace(/\D/g, "");
//         paymentSum.textContent = sumFormat((paymentSumNumber * theRate.rate)) + ' ' + '₽';

//         setTimeout(() => finalSum.textContent = sumFormat(Number((paymentSumNumber * theRate.rate).toFixed(2)) + Number(theRate.comission)) + ' ' + '₽', 1000);
//         setTimeout(() => loader.classList.add('hidden'), 999);

//         let sumForButtonPay = sumFormat(Number((paymentSumNumber * theRate.rate).toFixed(2)) + Number(theRate.comission)) + ' ' + '₽';
//         setTimeout(() => payButton.textContent = 'Оплатить' + ' ' + sumFormat(sumForButtonPay), 1000);
//         comissionSum.textContent = theRate.comission + ' ' + '₽';
//     };
// })

// Форматирование суммы к оплате

// function sumFormat(sum) {
//     return sum.toLocaleString();
// }

// Поиск

search.addEventListener('input', function() {
    let searchResultArr = [];

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
            itemLink.setAttribute('href', `index.html?id=${id}`)

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

// Оплата

payButton.addEventListener('click', function(e) {
    e.preventDefault();

    if(cyberCard.checked) {
        comission = 0;
    }

    // checkInputs()


    // let vouchers = document.querySelectorAll('.choose-sum__item');
    // let voucher = '';

    //     for (let i = 0; i < vouchers.length; i++) {
    //         if(vouchers[i].classList.contains('choose-sum__item_active')) {
    //             voucher = vouchers[i].textContent;
    //         }
    //     }

        let result = checkInputs();
        if(result == 'error') {
            return;
        } else if(result == 'ok') {
            let theForm = document.forms.paymentParams;
            payButton.removeAttribute('disabled');
            let agentTransactionId = generatetransactionId();

            let dateTime = new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString().split('.')[0];
            popup.classList.remove('hidden');
            loaderPopup.classList.remove('hidden');

            // let paymentInfo = {
            //     'serviceId': serviceId,
            //     'account': theForm.elements.account.value,
            //     'agentTransactionId': transactionId,
            //     'agentTransactionDate': dateTime,
            //     'amountTo': parseInt(theForm.elements.amount.value, 10),
            //     'amountFrom': 200.00
            // }

            // if(theForm.elements.amount) {
            //     let sum = parseInt(theForm.elements.amount.value);
            // } else {
            //     let sum = 150;
            // }

                fetch('http://localhost:3000/check', { 
                    method: 'POST', 
                    headers: { 
                        'Content-Type': 'application/json'
                    }, 
                    body: JSON.stringify({
                        'serviceId': serviceId,
                        'account': theForm.elements.account.value,
                        'agentTransactionId': agentTransactionId,
                        'agentTransactionDate': dateTime,
                        'amountTo': Number(sumToPay),
                        'amountFrom': Number(sumToPay) + comission
                })})
                .then(res => {
                    return res.json()
                })
                .then(res => resultOrcestrator(res.result, agentTransactionId, res, dateTime, theForm.elements.account.value))
                 // параметры сервиса - ответ от сервера
                .catch(err => console.log({ err }))

                let thePayment = {
                    'serviceId': serviceId,
                    'account': theForm.elements.account.value,
                    'agentTransactionId': agentTransactionId,
                    'agentTransactionDate': dateTime,
                    'amountTo': Number(sumToPay),
                    'amountFrom': Number(sumToPay) + comission
                }
           
            // popupServiceName.textContent = theService.title;
            // popupClientEmail.textContent = theEmailForm.elements.steamEmail.value;
            // popupPaymentSum.textContent = paymentInfo.paymentSum;

            popup.addEventListener('click', (e) => {
                if(e.target.classList.contains('close') || e.target.classList.contains('popup__wrapper')) {
                    popup.classList.add('hidden');
                    popupIcon.classList.add('hidden');
                    popupInfo.textContent = '';
                    location.reload()
                }
            })
        }
})

// Обработка ответа сервера

function resultOrcestrator(result, agentTransactionId, res, dateTime, acc) {

// Добавляем запись в базу

if(cyberCard.checked) {
    comission = 0;
}

    fetch('http://localhost:3000/newpayment', { 
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({
            'agentTransactionId': res.agentTransactionId,
            'transactionId': res.transactionId,
            'date': dateFormat(),
            'time': timeFormat(),
            'serviceId': serviceId,
            'serviceName': theServiceGlobal.name,
            'sumFrom': Number(sumToPay),
            'sumTo': ((Number(sumToPay) - Number(sumToPay) * 0.035) * localStorage.getItem('currencyRate')).toFixed(2),
            'sumCurrency': localStorage.getItem('currency'),
            'comissionPercentage': 3.5,
            'comissionFee': comission,
            'statusBank': 'В процессе',
            'statusPartner': 'Запрос check ' + res.resultMessage,
            'clientAccountId': acc
    })})
    .then(res => {
        return res.json()
    })
    .then(res => res)
    .catch(err => console.log({ err }))

// Обработка ответа от сервера

    if(result == 300) {
        loaderPopup.classList.add('hidden');
        popupIcon.setAttribute('src', '../img/error.png')
        popupIcon.classList.remove('hidden');
        popupInfo.textContent = 'Техническая ошибка на стороне провайдера. Попробуйте позже';
    } if(result == 0) {

        let order = {
            // "TerminalKey": "1574412702003DEMO",
            "Amount": (Number(sumToPay) + 50) * 100,
            "OrderId": res.agentTransactionId,
            "Description": "Оплата покупки",
        }

        startSBP(order, agentTransactionId, dateTime);

    } if(result == 1) {
        loaderPopup.classList.add('hidden');
        popupInfo.textContent = 'Запрос в обработке, повторите запрос позже';
    } if(result == 4) {
        loaderPopup.classList.add('hidden');
        popupIcon.setAttribute('src', '../img/attention.png')
        popupIcon.classList.remove('hidden');
        popupInfo.textContent = 'Неверный формат идентификатора абонента';
    } if(result == 5) {
        loaderPopup.classList.add('hidden');
        popupInfo.textContent = 'Идентификатор не найден (проверьте номер)';
    } if(result == 7) {
        loaderPopup.classList.add('hidden');
        popupInfo.textContent = 'Техническая ошибка на стороне провайдера. Попробуйте позже';
    } if(result == 8) {
        loaderPopup.classList.add('hidden');
        popupInfo.textContent = 'Техническая ошибка на стороне провайдера. Попробуйте позже';
    } if(result == 130) {
        loaderPopup.classList.add('hidden');
        popupIcon.setAttribute('src', '../img/error.png')
        popupIcon.classList.remove('hidden');
        popupInfo.textContent = 'Техническая ошибка на стороне провайдера. Попробуйте позже';
    } if(result == 220) {
        loaderPopup.classList.add('hidden');
        popupIcon.setAttribute('src', '../img/error.png')
        popupIcon.classList.remove('hidden');
        popupInfo.textContent = 'Баланс закончился. Повторите попытку позже';
    } if(result == 204) {
        loaderPopup.classList.add('hidden');
        popupIcon.setAttribute('src', '../img/error.png')
        popupIcon.classList.remove('hidden');
        popupInfo.textContent = 'Прием платежа в указанной валюте не возможен';
    } if(result == 202) {
        loaderPopup.classList.add('hidden');
        popupIcon.setAttribute('src', '../img/error.png')
        popupIcon.classList.remove('hidden');
        popupInfo.textContent = 'Ошибка данных запроса';
    }
    
}

// Формат даты 

function dateFormat() {

    let today = new Date();
    let month = today.getMonth();
    let date = today.getDate();

    switch (month)
    {
      case 0: fMonth="01"; break;
      case 1: fMonth="02"; break;
      case 2: fMonth="03"; break;
      case 3: fMonth="04"; break;
      case 4: fMonth="05"; break;
      case 5: fMonth="06"; break;
      case 6: fMonth="07"; break;
      case 7: fMonth="08"; break;
      case 8: fMonth="09"; break;
      case 9: fMonth="10"; break;
      case 10: fMonth="11"; break;
      case 11: fMonth="12"; break;
    }

    switch (date)
    {
      case 1: fDate="01"; break;
      case 2: fDate="02"; break;
      case 3: fDate="03"; break;
      case 4: fDate="04"; break;
      case 5: fDate="05"; break;
      case 6: fDate="06"; break;
      case 7: fDate="07"; break;
      case 8: fDate="08"; break;
      case 9: fDate="09"; break;
    }

    let theDate = today.getDate() < 10 ? '0' + today.getDate() + '.' + (fMonth) + '.' + today.getFullYear() : today.getDate() + '.' + (fMonth) + '.' + today.getFullYear();
    return theDate;
}

function timeFormat() {
    let today = new Date();
    let hours = today.getHours() < 10 ? '0' + today.getHours() : today.getHours();
    let minutes = today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes();
    let seconds = today.getSeconds() < 10 ? '0' + today.getSeconds() : today.getSeconds();
    let time = hours + ':' + minutes + ':' + seconds;
    return time;
}

function resultPayOrcestrator(res, serviceId, agentTransactionId, dateTime) {
    bgForQR.classList.remove('bgWhite');
    console.log(agentTransactionId);

    if(res.result == 1) {
        console.log('Нужно повторно направить запрос');
        const timerId = setTimeout(() => { pay(serviceId, agentTransactionId, dateTime)}, 5000)
        loaderPopup.classList.remove('hidden');
        payAfterCheck.classList.add('hidden');
        popupInfo.textContent = '';
        popupInfo.textContent = 'Пожалуйста, подождите';
        let popup = document.querySelector('.popup__window');
        popup.classList.add('column');
    }  if(res.result == 0) {
        console.log('Успех');
        payAfterCheck.classList.add('hidden');
        loaderPopup.classList.add('hidden');
        popupInfo.textContent = '';
        popupInfo.textContent = `Оплата прошла успешно, номер транзакции ${res.transactionId}`;
        popupIcon.setAttribute('src', '../img/ok.png')
        popupIcon.classList.remove('hidden');

        // Обновление записи в базе

        fetch('http://localhost:3000/payresult', { 
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({
                'statusPartner': res.resultMessage,
                'agentTransactionId': agentTransactionId,
                'transactionId': res.transactionId
        })})
        .then(res => {
            return res.json()
        })
        .then(res => res)
        .catch(err => console.log({ err }))
            }
}

// Оплата после проверки /check - функция

function pay(serviceId, agentTransactionId, dateTime) {

    fetch('http://localhost:3000/pay', { 
        method: 'POST', 
        headers: { 
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({
            'serviceId': serviceId,
            'account': 1,
            'agentTransactionId': agentTransactionId,
            'agentTransactionDate': dateTime,
            'amountTo': (Number(sumToPay) - Number(sumToPay) * 0.035).toFixed(2),
            'amountFrom': Number(sumToPay)
    })})
    .then(res => {
        return res.json()
    })
    .then(res => resultPayOrcestrator(res, serviceId, agentTransactionId, dateTime))
     // параметры сервиса - ответ от сервера
    .catch(err => console.log({ err }))
}

// Генерация id транзакции



function generatetransactionId() {
    const min = 1000000;
    const max = 9999999;
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    let transactionId = ((new Date()).getTime()).toString().slice(1,6) + randomNum.toString();
    return Number(transactionId);
}

// FAQ

document.addEventListener('click', function (e) {
    if(e.target.classList.contains('question-title') || e.target.classList.contains('faq__arrow')) {
        e.target.parentNode.nextElementSibling.classList.toggle('visible');
        e.target.parentNode.querySelector('.faq__arrow').classList.toggle('rotate');
    }
})

// валидация полей

function checkInputs() {

    let theForm = document.forms.paymentParams;
    for(let i = 0; i < theForm.elements.length; i++) {
        if(theForm.elements[i].value == '') {
            theForm.elements[i].nextElementSibling.classList.remove('hidden');
            theForm.elements[i].nextElementSibling.textContent = 'Это обязательное поле';
            return 'error';
        } else if(theForm.elements[i].nextElementSibling.textContent != '') {
            return 'error';
        }
    }

    if(document.querySelector('.payment-sum') && document.querySelector('.payment-sum').value < 10 || document.querySelector('.payment-sum').value > 15000) {
        let sumInput = document.querySelector('.payment-sum');
        sumInput.nextElementSibling.classList.remove('hidden');
        sumInput.nextElementSibling.textContent = 'Минимальная сумма оплаты 10 рублей, максимальная 15 000 рублей';
        return 'error';
    }

    return 'ok';

    
    // if(theEmailForm.elements.steamEmail.value == '') {
    //     errorText.classList.remove('hidden');
    //     errorText.textContent = 'Это обязательное поле';
    //     result = 'error';
    //     theEmailForm.elements.steamEmail.classList.add('err');
    //     return result;
    // } else if(!theEmailForm.elements.steamEmail.value == '') {
    //     var regex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    //     if(regex.test(theEmailForm.elements.steamEmail.value) == false) {
    //         errorText.classList.remove('hidden');
    //         errorText.textContent = 'Проверьте введенный email';
    //         result = 'error';
    //         theEmailForm.elements.steamEmail.classList.add('err');
    //         return result;
    //     } else {
    //         errorText.classList.add('hidden');
    //         result = 'ok';
    //         theEmailForm.elements.steamEmail.classList.remove('err');
    //         return result;
    //     }
    // }
}




// СБП

function startSBP(order, agentTransactionId, dateTime) {

    let paymentAmount = document.querySelector('.payment-sum');

    if(cyberCard.checked) {
        order.Amount = (Number(paymentAmount.value)) * 100;
    }

    fetch('http://localhost:3000/sbpInit', { 
        method: 'POST',
        headers: { 
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                "Amount": order.Amount,
                "OrderId": order.OrderId.toString(),
                "Description": "Оплата покупки"
            }         
        )})
        .then(res => {
            return res.json();
        })
        .then(res => {
            getQR(res, agentTransactionId, dateTime);
        })
        .catch(err => console.log({ err })
        );
}

function generateToken(string) {
    const utf8 = new TextEncoder().encode(string);
    return crypto.subtle.digest('SHA-256', utf8).then((hashBuffer) => {
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
    .map((bytes) => bytes.toString(16).padStart(2, '0'))
    .join('');
    return hashHex;
    });
}

// function sbpInit(order, agentTransactionId, dateTime) {
//     fetch('http://localhost:3000/sbpInit', { 
//     method: 'POST',
//     headers: { 
//     'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(
//         {
//             "Amount": order.Amount,
//             "OrderId": order.OrderId.toString(),
//             "Description": "Оплата покупки",
//             "Token": order.Token
//         }         
//     )})
//     .then(res => {
//         return res.json();
//     })
//     .then(res => getQR(res, agentTransactionId, dateTime))
//     .catch(err => console.log({ err }))
// }


// function getQR(res, agentTransactionId, dateTime) {

// let result = '';
//     if(res.ErrorCode == 0) {
//         let password = 'o6zmp4svjrvxg68a';

//         if( screen.width <= 480 ) {
//             let token = [{"DataType": "PAYLOAD"},{"Password": `${password}`},{"PaymentId": `${res.PaymentId}`},{"TerminalKey": `${res.TerminalKey}`}];
                
//             let values = [];
//             for(let i = 0; i < token.length; i++) {
//                 values.push(String(Object.values(token[i])))
//             }
//             result = values.join('');
//         } else {
//             let token = [{"DataType": "IMAGE"},{"Password": `${password}`},{"PaymentId": `${res.PaymentId}`},{"TerminalKey": `${res.TerminalKey}`}];
                
//             let values = [];
//             for(let i = 0; i < token.length; i++) {
//                 values.push(String(Object.values(token[i])))
//             }
        
//             result = values.join('');
//         }
        
//         generateToken(result).then((result) => {
//                 localStorage.setItem('token', result);

//                 if( screen.width <= 480 ) {
//                     let theOrder = {
//                         "TerminalKey": res.TerminalKey.toString(),
//                         "PaymentId": res.PaymentId,
//                         "DataType": "PAYLOAD",
//                         "Token": result
//                     }

//                     showPayload(theOrder, agentTransactionId, dateTime);
//                 } else {
//                     let theOrder = {
//                         "TerminalKey": res.TerminalKey.toString(),
//                         "PaymentId": res.PaymentId,
//                         "DataType": "IMAGE",
//                         "Token": result
//                     }
//                     showQR(theOrder, agentTransactionId, dateTime);
//                 }

//             })
//     } else {
//         console.log('Ошибка запроса QR')
//     }
// }


function getQR(result, agentTransactionId, dateTime) {

        if(result.ErrorCode == 0) {
    
            if( screen.width <= 480 ) {

                fetch('http://localhost:3000/generateQR', { 
                    method: 'POST',
                    headers: { 
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(
                        {
                            "DataType": "PAYLOAD",
                            "PaymentId": result.PaymentId
                        }         
                    )})
                    .then(res => {
                        return res.text();
                    })
                    .then(res => {
                        let theOrder = {
                            "PaymentId": result.PaymentId,
                            "DataType": "PAYLOAD",
                            "Token": res
                        }
                        showPayload(theOrder, agentTransactionId, dateTime);
                    })
                    .catch(err => console.log({ err }));

            } else {

                fetch('http://localhost:3000/generateQR', { 
                    method: 'POST',
                    headers: { 
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(
                        {
                            "DataType": "IMAGE",
                            "PaymentId": result.PaymentId
                        }         
                    )})
                    .then(res => {
                        return res.text();
                    })
                    .then(res => {
                        let theOrder = {
                            "PaymentId": result.PaymentId,
                            "DataType": "IMAGE",
                            "Token": res
                        }
                        showQR(theOrder, agentTransactionId, dateTime);
                    })
                    .catch(err => console.log({ err }));
            }
        } else {
                loaderPopup.classList.add('hidden');
                popupIcon.setAttribute('src', '../img/error.png')
                popupIcon.classList.remove('hidden');
                popupInfo.textContent = `Произошла ошибка. Мы уже знаем об этом и работаем над ее устранением. Пожалуйста, повторите попытку позже`;
                popup.addEventListener('click', (e) => {
                    if(e.target.classList.contains('close') || e.target.classList.contains('popup__wrapper')) {
                        popup.classList.add('hidden');
                        popupIcon.classList.add('hidden');
                        popupInfo.textContent = '';
                        location.reload()
                    }
                })
            console.log('Ошибка запроса QR');

                // Обновление записи в базе

                fetch('http://localhost:3000/payresultSBP', { 
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json'
                    }, 
                    body: JSON.stringify({
                        'statusBank': "Ошибка генерации QR",
                        'statusPartner': "Операция неуспешна",
                        'agentTransactionId': agentTransactionId
                })})
                .then(res => {
                    return res.json()
                })
                .then(res => res)
                .catch(err => console.log({ err }))
        }
    }

function showQR(res, agentTransactionId, dateTime) {

    fetch('http://localhost:3000/getQr', { 
        method: 'POST',
        headers: { 
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                "PaymentId": res.PaymentId,
                "DataType": "IMAGE",
                "Token": res.Token
            }         
        )})
        .then(res => {
            return res.json();
        })
        .then(res => showQRforClient(res, agentTransactionId, dateTime)) // отправляется ответ на клиент
        .catch(err => console.log({ err }))
}

function showPayload(res, agentTransactionId, dateTime) {
    fetch('http://localhost:3000/getQr', { 
        method: 'POST',
        headers: { 
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                "PaymentId": res.PaymentId,
                "DataType": "PAYLOAD",
                "Token": res.Token
            }         
        )})
        .then(res => {
            return res.json();
        })
        .then(res => showQRforClient(res, agentTransactionId, dateTime)) // отправляется ответ на клиент
        .catch(err => console.log({ err }))
}

function showQRforClient(res, agentTransactionId, dateTime) {

    if(res.ErrorCode == '99' || res.ErrorCode == '3001') {
        loaderPopup.classList.add('hidden');
        popupIcon.setAttribute('src', '../img/error.png')
        popupIcon.classList.remove('hidden');
        popupInfo.textContent = `Произошла ошибка. Мы уже знаем об этом и работаем над ее устранением. Пожалуйста, повторите попытку позже`;
        popup.addEventListener('click', (e) => {
            if(e.target.classList.contains('close') || e.target.classList.contains('popup__wrapper')) {
                popup.classList.add('hidden');
                popupIcon.classList.add('hidden');
                popupInfo.textContent = '';
                location.reload()
            }
        })
        return;
    } else {
        loaderPopup.classList.add('hidden');
        popupInfo.textContent = 'Отсканируйте QR код СБП для проведения оплаты с использованием мобильного приложения Вашего банка';
        payAfterCheck.setAttribute('style', 'width: fit-content; background-color: #fff;');
    
        if(screen.width <= 480 ) {
            let paySbpButton = document.createElement('a');
            paySbpButton.setAttribute('href', res.Data);
            paySbpButton.classList.add('pay');
            paySbpButton.setAttribute('style', 'padding: 10px 15px');
            payAfterCheck.setAttribute('style', 'background: none');
            payAfterCheck.setAttribute('style', 'width: fit-content');
            paySbpButton.setAttribute('target', '_blank');
            payAfterCheck.appendChild(paySbpButton);
            paySbpButton.textContent = 'Оплатить по СБП';
            popupInfo.textContent = '';
        } else {
            payAfterCheck.innerHTML = `${res.Data}`;
        }
        popup.classList.remove('hidden');
        payAfterCheck.classList.remove('hidden');
        getState(res, agentTransactionId, dateTime);
    }
}





function getState(payment, agentTransactionId, dateTime) {

let password = 'o6zmp4svjrvxg68a';
let token = [{"Password": `${password}`},{"PaymentId": `${payment.PaymentId}`},{"TerminalKey": `${payment.TerminalKey}`}];

let values = [];
for(let i = 0; i < token.length; i++) {
    values.push(String(Object.values(token[i])))
}

const result = values.join('');

generateToken(result).then((result) => {
    localStorage.setItem('token', result);

    fetch('http://localhost:3000/getState', { 
        method: 'POST',
        headers: { 
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                "TerminalKey": payment.TerminalKey.toString(),
                "PaymentId": payment.PaymentId.toString(),
                "Token": result
            }         
        )})
        .then(res => {
            // console.log(res);
            return res.json();
        })
        .then(res => statesOrcestrator(res, agentTransactionId, dateTime, payment)) // отправляется ответ на клиент
        .catch(err => console.log({ err }))
    })
}

function statesOrcestrator(res, agentTransactionId, dateTime, payment) {

    testPaymentSuccess(res);
    testPaymentTimeout(res);
    testPaymentReject(res);

    if(res.ErrorCode == 0) {
        if(res.Status == "CONFIRMED") {

            pay(serviceId, agentTransactionId, dateTime);
        
        } if(res.Status == "NEW" || res.Status == "AUTHORIZING" || res.Status == "AUTHORIZED" || res.Status == "CONFIRMING" || res.Status == "FORM_SHOWED") {
            console.log('Повторить запрос статуса');
            const timerId = setTimeout(() => { getState(payment, agentTransactionId, dateTime)}, 5000)
        } if(res.Status == "DEADLINE_EXPIRED") {
            console.log('НЕУСПЕШНО - ТАЙМАУТ');
            payAfterCheck.classList.add('hidden');
            loaderPopup.classList.add('hidden');
            popupIcon.setAttribute('src', '../img/error.png')
            popupIcon.classList.remove('hidden');
            popupInfo.textContent = 'Истекло время ожидания оплаты. Повторите попытку';
            
            // Обновление записи в базе

            fetch('http://localhost:3000/payresultSBP', { 
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json'
                }, 
                body: JSON.stringify({
                    'statusBank': "Отклонен банком плательщика",
                    'statusPartner': "Операция неуспешна",
                    'agentTransactionId': agentTransactionId
            })})
            .then(res => {
                return res.json()
            })
            .then(res => res)
            .catch(err => console.log({ err }))

        } if(res.Status == "REJECTED") {
            console.log('НЕУСПЕШНО');
            loaderPopup.classList.add('hidden');
            payAfterCheck.classList.add('hidden');
            popupIcon.setAttribute('src', '../img/error.png')
            popupIcon.classList.remove('hidden');
            popupInfo.textContent = 'Банк отклонил оплату. Повторите попытку';

            // Обновление записи в базе

            fetch('http://localhost:3000/payresultSBP', { 
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json'
                }, 
                body: JSON.stringify({
                    'statusBank': "Отклонен банком плательщика",
                    'statusPartner': "Операция неуспешна",
                    'agentTransactionId': agentTransactionId
            })})
            .then(res => {
                return res.json()
            })
            .then(res => res)
            .catch(err => console.log({ err }))

        }
    } else {
        console.log('Запрос статуса неуспешен')
    }
}

// Тест успех

function testPaymentSuccess(res) {
    localStorage.setItem('paymentId', res.PaymentId);
    let password = 'o6zmp4svjrvxg68a';
    let token = [{"Password": `${password}`},{"PaymentId": `${res.PaymentId}`},{"TerminalKey": `${res.TerminalKey}`}];

    let values = [];
    for(let i = 0; i < token.length; i++) {
        values.push(String(Object.values(token[i])))
    }

    const result = values.join('');

    generateToken(result).then((result) => {
        localStorage.setItem('token', result);
        })
}

// Тест таймаут

function testPaymentTimeout(res) {
    localStorage.setItem('paymentId', res.PaymentId);
    let password = 'o6zmp4svjrvxg68a';
    let token = [{"IsDeadlineExpired": `true`},{"Password": `${password}`},{"PaymentId": `${res.PaymentId}`},{"TerminalKey": `${res.TerminalKey}`}];

    let values = [];
    for(let i = 0; i < token.length; i++) {
        values.push(String(Object.values(token[i])))
    }

    const result = values.join('');

    generateToken(result).then((result) => {
        localStorage.setItem('tokenDeadlineExpired', result);
        })
}

// Тест отказ

function testPaymentReject(res) {
    localStorage.setItem('paymentId', res.PaymentId);
    let password = 'o6zmp4svjrvxg68a';
    let token = [{"IsRejected": `true`},{"Password": `${password}`},{"PaymentId": `${res.PaymentId}`},{"TerminalKey": `${res.TerminalKey}`}];

    let values = [];
    for(let i = 0; i < token.length; i++) {
        values.push(String(Object.values(token[i])))
    }

    const result = values.join('');

    generateToken(result).then((result) => {
        localStorage.setItem('tokenRejected', result);
        })
}

// расчет суммы к оплате, к зачислению, скидок и кэшбеков

function paymentAmountAndCashbacks(payment) {
    
}