
let serviceTitle = document.querySelector('.service-title');
let serviceImage = document.querySelector('.content-block__img');
let serviceSubtitle = document.querySelector('.content-block__subtitle');
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
let vouchers = document.querySelector('.choose-sum');
let payButton = document.querySelector('.pay');
let theEmailForm = document.forms.email;
let paymentSum = document.querySelector('.pay-info__pay-type_sum');
let finalSum = document.querySelector('.pay-info__pay-type_result');
let loader = document.querySelector('.loader');
let comissionSum = document.querySelector('.comission');
let errorText = document.querySelector('.error');
let popup = document.querySelector('.popup');
let popupServiceName = document.querySelector('.service-name');
let popupClientEmail = document.querySelector('.client-email');
let popupPaymentSum = document.querySelector('.paymentsum');

let regionTitle = document.querySelector('.region-select__title');

let search = document.querySelector('.topline__search');
let searchResultDiv = document.querySelector('.topline__searchResult');

const url = new URL(
    document.location.href
)

// Определяем id сервиса

let serviceId = url.searchParams.get('id');
let theService = services.find((element) => element.serviceId == serviceId);
getService(serviceId);
loadVouchers(regionTitle.textContent);

// данные названия сервиса, субтайтл + картинка по id сервиса

function getService(id) {
    console.log(theService.inputs[0].title)
    serviceTitle.textContent = theService.name;
    serviceImage.setAttribute('src', '.' + `${theService.imageLink}`)
    serviceSubtitle.textContent = theService.subtitle;

    let input = document.createElement('input');
    let inputLabel = document.createElement('label');
    let error = document.createElement('p');
    error.classList.add('error');
    error.classList.add('hidden');
    inputLabel.classList.add('form-label');
    input.classList.add('region-select__sector');
    input.classList.add('payment-input');
    voucherNominalsContainer.appendChild(inputLabel);
    voucherNominalsContainer.appendChild(input);
    voucherNominalsContainer.appendChild(error);
    inputLabel.textContent = theService.inputs[0].title;

    let regex1 = new RegExp(`${theService.inputs[0].regexp}`, "g");
    console.log(regex1)
    input.addEventListener('input', () => {
        console.log(input.value);
        if(input.value.match(regex1) == false) {
            error.classList.remove('hidden');
            error.textContent = 'Ошибка'
        } else if(regex1.test(input.value) == true) {
            error.classList.add('hidden');
            error.textContent = '';
        }
    })
        




    getServiceParamentres(id);
}

// параметры сервиса

function getServiceParamentres(id) {
    services.forEach(el => {
        if (el.id == id) {
            if(el.popupTypes.length < 2) {
                voucherPay.classList.remove('hidden');
                regionTitle.textContent = el.region[0].title;
            }

        // если сервис Steam
        if (el.title == 'Steam') {
            popupTypesSteam.classList.remove('hidden');
            steamPay.classList.remove('hidden');
            vouchers.classList.add('hidden');
            popupTypes.classList.remove('hidden');
        }
        } if (el.id == id && el.region && el.region.length > 1) {
            popupTypes.classList.remove('hidden');
            chooseRegion.classList.remove('hidden');
            let regionFlag = document.querySelector('.region-flag');
            regionFlag.setAttribute('src', `.${el.region[0].img}`);
            let regionTitle = document.querySelector('.region-select__title');
            regionTitle.textContent = el.region[0].title;
            let dropDown = document.querySelector('.region-select__dropdown');

            el.region.forEach(el => {
                const dropdownRegionItem = document.createElement('div');
                const dropdownRegionImage = document.createElement('img');
                const dropdownRegionTitle = document.createElement('p');

                dropdownRegionItem.classList.add('region-item');
                dropdownRegionImage.classList.add('region-flag');
                dropdownRegionTitle.classList.add('region-title');

                dropDown.appendChild(dropdownRegionItem);
                dropdownRegionItem.appendChild(dropdownRegionImage);
                dropdownRegionItem.appendChild(dropdownRegionTitle);

                dropdownRegionImage.setAttribute('src', `.${el.img}`);
                dropdownRegionTitle.textContent = el.title;
            })

            showDropdownRegionsButton.addEventListener('click', function () {
                dropDown.classList.toggle('hidden');
            }
            )

            // Определяем выбранную в выпадающем меню страну

            dropDown.addEventListener('click', function (e) {
                if (e.target.classList.contains('region-item')) {
                    let chosenRegionTitle = e.target.querySelector('.region-title').textContent;
                    let chosenRegionFlag = e.target.querySelector('.region-flag').getAttribute('src');
                    dropDown.classList.toggle('hidden');
                    chosenRegion(chosenRegionTitle, chosenRegionFlag);
                } if (e.target.classList.contains('region-flag')) {
                    let chosenRegionTitle = e.target.nextElementSibling.textContent;
                    let chosenRegionFlag = e.target.getAttribute('src');
                    dropDown.classList.toggle('hidden');
                    chosenRegion(chosenRegionTitle, chosenRegionFlag);
                } if (e.target.classList.contains('region-title')) {
                    let chosenRegionTitle = e.target.textContent;
                    let chosenRegionFlag = e.target.previousSibling.getAttribute('src');
                    dropDown.classList.toggle('hidden');
                    chosenRegion(chosenRegionTitle, chosenRegionFlag);
                }
            })
        } 
    })
}

// Работаем с выбранным регионом из выпадающего списка

function chosenRegion(name, flag) {
    let regionTitle = document.querySelector('.region-select__title');
    let regionFlag = document.querySelector('.region-select__sector').querySelector('.region-flag');
    regionTitle.textContent = name;
    regionFlag.setAttribute('src', `${flag}`)
    loadVouchers(name);
}

// показываем номиналы ваучеров в зависимости от страны

function loadVouchers(country) {
    if(theService.popupTypes.length < 2) {
        // let regionTitle = document.querySelector('.region-select__title');
        let theCountryVouchers = theService.region.find((element) => element.title == country);
        
        voucherNominalsContainer.textContent = '';

        theCountryVouchers.voucherNominals.forEach(el => {
            let voucherNominal = document.createElement('p');
            voucherNominal.classList.add('choose-sum__item');
            voucherNominalsContainer.appendChild(voucherNominal);
            voucherNominal.textContent = el;
        })
    } else {

        let theCountryVouchers = theService.region.find((element) => element.title == country);
        
        voucherNominalsContainer.textContent = '';

        theCountryVouchers.voucherNominals.forEach(el => {
            let voucherNominal = document.createElement('p');
            voucherNominal.classList.add('choose-sum__item');
            voucherNominalsContainer.appendChild(voucherNominal);
            voucherNominal.textContent = el;
        })
    }

    if(theService.title == 'Steam') {
        vouchers.classList.add('hidden');
    }
}

// Выбор способа пополнения

document.addEventListener('click', function(e) {
    if(e.target == paymentButton) {
        if(!paymentButton.classList.contains('popupType__item_active')) {
            paymentButton.classList.add('popupType__item_active');
            voucherButton.classList.remove('popupType__item_active');
            vouchers.classList.add('hidden');
        } if(steamPay.classList.contains('hidden')) {
            steamPay.classList.remove('hidden');
            voucherPay.classList.add('hidden');
            voucherPay.classList.add('hidden');
        }
    }

    if(e.target == voucherButton) {

        // активация/деактивация кнопок выбора способа оплаты - ваучер или оплата

        if(!voucherButton.classList.contains('popupType__item_active')) {
            voucherButton.classList.add('popupType__item_active');
            paymentButton.classList.remove('popupType__item_active');
            vouchers.classList.add('hidden');
        } if(!steamPay.classList.contains('hidden')) {
            steamPay.classList.add('hidden');
            voucherPay.classList.remove('hidden');
            vouchers.classList.remove('hidden');
        }
    }
})

// Выбор номинала ваучера

document.addEventListener('click', function(e) {
    let voucher = document.querySelectorAll('.choose-sum__item');
    let currency = ''
    if(e.target.classList.contains('choose-sum__item')) {
        finalSum.textContent = '';
        loader.classList.remove('hidden');
        for (let i = 0; i < voucher.length; i++) {
            if(voucher[i].classList.contains('choose-sum__item_active')) {
                voucher[i].classList.remove('choose-sum__item_active')
            }
        }
        e.target.classList.add('choose-sum__item_active');
        
        let theSum = e.target.textContent;

        if(theSum.slice(-1) == '$') {
            currency = 'USD';
        } else if(theSum.slice(-1) == '€') {
            currency = 'EUR';
        } else if(theSum.slice(-1) == '₺') {
            currency = 'TRY';
        } else if(theSum.slice(-1) == 'ł' || theSum.slice(-2)[0] == 'Z') {
            currency = 'PLN';
        } else if(theSum.slice(-1) == '.') {
            currency = 'AED'
        } else if(theSum.slice(-1) == '₽') {
            currency = 'RUR'
        } else if(theSum.slice(-1) == 'G') {
            currency = 'TG'
        } else if(theSum.slice(-2) == 'ds') {
            currency = 'Diamonds' // проверить на других сервисах
        } else if(theSum.slice(-2) == 'ns') {
            currency = 'Coins'
        } else if(theSum.slice(-2) == 'ck') {
            currency = 'Pack'
        } else if(theSum.slice(-2) == 'ов') {
            currency = 'Кристаллы' // не работает
        } else if(theSum.slice(-1) == '₹') {
            currency = 'INR'
        } else if(theSum.slice(-1) == '£') {
            currency = 'GBP'
        } else if(theSum.slice(-2) == 'R$') {
            currency = 'BRL'
        } else if(theSum.slice(-1) == 'س') {
            currency = 'SAR';
        }
        let theRate = rates.find((element) => element.currency == currency)
        let paymentSumNumber = theSum.replace(/\D/g, "");
        paymentSum.textContent = sumFormat((paymentSumNumber * theRate.rate)) + ' ' + '₽';

        setTimeout(() => finalSum.textContent = sumFormat(Number((paymentSumNumber * theRate.rate).toFixed(2)) + Number(theRate.comission)) + ' ' + '₽', 1000);
        setTimeout(() => loader.classList.add('hidden'), 999);

        let sumForButtonPay = sumFormat(Number((paymentSumNumber * theRate.rate).toFixed(2)) + Number(theRate.comission)) + ' ' + '₽';
        setTimeout(() => payButton.textContent = 'Оплатить' + ' ' + sumFormat(sumForButtonPay), 1000);
        comissionSum.textContent = theRate.comission + ' ' + '₽';
    };
})

// Форматирование суммы к оплате

function sumFormat(sum) {
    return sum.toLocaleString();
}

// Поиск

search.addEventListener('input', function () {
    let searchResultArr = [];

    services.forEach(el => {
        if (el.title.toLowerCase().includes(search.value.toLowerCase())) {
            searchResultArr.push(el.title);
        } else {
            searchResultDiv.classList.remove('visible');
            searchResultDiv.textContent = '';
        }
    })
    searchService(searchResultArr);
    if (searchResultArr.length == 0) {
        searchResultDiv.textContent = 'Ничего не найдено';
    }
})

// Общая функция поиска

function searchService(el) {

    searchResultDiv.textContent = ''
    searchResultDiv.classList.add('visible');

    el.forEach(element => {

        services.forEach(elt => {
            if (elt.title == element) {

                let title = elt.title;
                let imgLink = elt.imageLink;
                let id = elt.id;

                const itemLink = document.createElement('a');
                const itemImage = document.createElement('img');
                const itemTitle = document.createElement('h3');

                itemLink.classList.add('searchResult__item');
                itemImage.classList.add('searchResult__icon');
                itemImage.setAttribute('src', `../${imgLink}`)
                itemTitle.classList.add('searchResult__title');
                itemLink.setAttribute('href', `index.html?id=${id}`)

                searchResultDiv.appendChild(itemLink);
                itemLink.appendChild(itemImage);
                itemLink.appendChild(itemTitle);

                itemTitle.textContent = title;
            }
        })
    })

    if (search.value == '') {
        searchResultDiv.textContent = '';
        searchResultDiv.classList.remove('visible');
    }
}

// Оплата

payButton.addEventListener('click', function(e) {

    e.preventDefault();

    let vouchers = document.querySelectorAll('.choose-sum__item');
    let voucher = '';

        for (let i = 0; i < vouchers.length; i++) {
            if(vouchers[i].classList.contains('choose-sum__item_active')) {
                voucher = vouchers[i].textContent;
            }
        }

        let result = '';

        if(checkInputs(result) == 'error') {
            return;
        } else {

            payButton.removeAttribute('disabled');

            let paymentInfo = {
                'serviceTitile': theService.title,
                'region': regionTitle.textContent,
                'voucherNominal': voucher,
                'paymentSum': finalSum.textContent,
                'clientEmail': theEmailForm.elements.steamEmail.value
            }

            popup.classList.remove('hidden');
            popupServiceName.textContent = theService.title;
            popupClientEmail.textContent = theEmailForm.elements.steamEmail.value;
            popupPaymentSum.textContent = paymentInfo.paymentSum;

            popup.addEventListener('click', (e) => {
                if(e.target.classList.contains('close') || e.target.classList.contains('popup__wrapper')) {
                    popup.classList.add('hidden');
                }
            })
            console.log(paymentInfo);
        }
})

// FAQ

document.addEventListener('click', function (e) {
    if(e.target.classList.contains('question-title') || e.target.classList.contains('faq__arrow')) {
        e.target.parentNode.nextElementSibling.classList.toggle('visible');
        e.target.parentNode.querySelector('.faq__arrow').classList.toggle('rotate');
    }
})

// валидация полей

function checkInputs(result) {
    if(theEmailForm.elements.steamEmail.value == '') {
        errorText.classList.remove('hidden');
        errorText.textContent = 'Это обязательное поле';
        result = 'error';
        theEmailForm.elements.steamEmail.classList.add('err');
        return result;
    } else if(!theEmailForm.elements.steamEmail.value == '') {
        var regex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
        if(regex.test(theEmailForm.elements.steamEmail.value) == false) {
            errorText.classList.remove('hidden');
            errorText.textContent = 'Проверьте введенный email';
            result = 'error';
            theEmailForm.elements.steamEmail.classList.add('err');
            return result;
        } else {
            errorText.classList.add('hidden');
            result = 'ok';
            theEmailForm.elements.steamEmail.classList.remove('err');
            return result;
        }
    }
}