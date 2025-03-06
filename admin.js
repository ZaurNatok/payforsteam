let paymentsTable = document.querySelector('.payments');
let paymentsTableBody = document.querySelector('.tbody');
let operationsCounterContainer = document.querySelector('.data__operations');
let operationsCounter = operationsCounterContainer.querySelector('.amount__text');
let sumCounterContainer = document.querySelector('.data__amount');
let sumCounter = sumCounterContainer.querySelector('.amount__text');
let profitCounterContainer = document.querySelector('.data__income');
let letprofitCounter = profitCounterContainer.querySelector('.amount__text');
let balanceSum = document.querySelector('.balance');
let loader = document.querySelector('.popup');

let filterAgentId = document.querySelector('.filter-agentId');
let filterId = document.querySelector('.filter-id');
let filterSum = document.querySelector('.filter-sum');
let filterDateButton = document.querySelector('.dateFilterButton');

let filterDate = document.querySelector('.filter-date');
let filterDateTill = document.querySelector('.filter-date-till');

let theDatesFilter = document.forms.datesFilter;
let operationsDate = document.querySelector('.operationsDate');

let download = document.querySelector('.operations__download');

let test = 'f';

testDB();
getBalance();

// Тест база данных

function testDB() {

loader.classList.remove('hidden');

    fetch('https://api.payforsteam.ru/payments', { 
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json'
            // 'Authorization': '***YfnjrPfeh5'
        }})
    .then(res => {
        return res.json();
    })
    .then(res => paymentsArr(res))
    .catch(err => console.log({ err }))
}

function paymentsArr(payments) {
    let todayPayments = [];
    operationsDate.textContent = 'за' + ' ' + dateFormat();

    for(let i = 0; i < payments.length; i++) {
        if(payments[i].date == dateFormat()) {
            todayPayments.push(payments[i]);
        }
    }
    result(todayPayments);
    console.log(todayPayments);

// Поиск по ID Агента

    filterAgentId.addEventListener('input', () => {
        let searchResultArr = [];
        todayPayments.forEach(el => {
            if (el.agentTransactionId.includes(filterAgentId.value)) {
                searchResultArr.push(el);
            }
        })
        paymentsTableBody.textContent = ''
        result(searchResultArr);
    })

// Поиск по ID Партнера

filterId.addEventListener('input', () => {
    let searchResultArr = [];
    todayPayments.forEach(el => {
        if (el.transactionId.includes(filterId.value)) {
            searchResultArr.push(el);
        }
    })
    paymentsTableBody.textContent = ''
    result(searchResultArr);
})

// Поиск по сумме принятой

filterSum.addEventListener('input', () => {
    let searchResultArr = [];
    todayPayments.forEach(el => {
        if (el.sumFrom == filterSum.value) {
            searchResultArr.push(el);
        }
    })
    paymentsTableBody.textContent = ''
    result(searchResultArr);
})

// Поиск по дате операций

filterDateButton.addEventListener('click', (event) => {
    event.preventDefault();

    let dateInputFrom = theDatesFilter.elements.dateFrom;
    let dateInputTill = theDatesFilter.elements.dateTill;

    if(dateInputFrom.value == '') {
        dateInputFrom.classList.add('red');
        return
    } else {
        dateInputFrom.classList.remove('red');
    }
    
    if(dateInputTill.value == '') {
        dateInputTill.classList.add('red');
        return
    } else {
        dateInputTill.classList.remove('red');
    }

    let paymentOnDatesPeriod = [];

    let start = new Date(dateInputFrom.value);
    let end = new Date(dateInputTill.value);

    for(let i = 0; i < payments.length; i++) {
        if(new Date(dateForFilter(payments[i].date)) >= start && new Date(dateForFilter(payments[i].date)) <= end) {
            paymentOnDatesPeriod.push(payments[i]);
        }
    }
    paymentsTableBody.textContent = '';
    operationsDate.textContent = 'за период с' + ' ' + dateFormatFilter(start) + ' по' + ' ' + dateFormatFilter(end);
    result(paymentOnDatesPeriod);
})

function dateForFilter(date) {
    let formatted = date.slice(-4) + '-' + date.slice(3, 5) + '-' + date.slice(0, 2);
    return formatted;
}

// filterDate.addEventListener('input', () => {
//     let searchResultArr = [];

//     for(let i = 0; i < payments.length; i++) {
//         if(payments[i].date == dateFormatFilter(filterDate.value)) {
//             searchResultArr.push(payments[i]);
//         }
//     }

//     // payments.forEach(el => {
//     //     if (el.date == dateFormatFilter(filterDate.value)) {
//     //         searchResultArr.push(el);
//     //         console.log(dateFormatFilter(filterDate.value));
//     //     }
//     // })
//     paymentsTableBody.textContent = '';
//     operationsDate.textContent = dateFormatFilter(filterDate.value);

//     // result(searchResultArr);
// })
}

function result(res) {
    loader.classList.add('hidden');
    // общее кол-во операций
    // ищем только успешные
    let success = [];
    for(let i = 0; i < res.length; i++) {
        if(res[i].statusPartner == 'Успешно') {
            success.push(res[i]);
        }
    }
    operationsCounter.textContent = success.length;
    // общий объем операций
    let sum = 0;
    let successSum = [];
    for(let i = 0; i < res.length; i++) {
        if(res[i].statusPartner == 'Успешно') {
            successSum.push(res[i]);
        }
    }
    successSum.forEach(el => {
        sum += el.sumFrom;
    });
    sumCounter.textContent = sumFormat(sum).toLocaleString() + ' ₽';
    // ЧКД
    let fixedComissionSum = 0;
    let successProfit = [];
    for(let i = 0; i < res.length; i++) {
        if(res[i].statusPartner == 'Успешно') {
            successProfit.push(res[i]);
        }
    }
    successProfit.forEach(el => {
        fixedComissionSum += el.comissionFee;
    });
    letprofitCounter.textContent = ((fixedComissionSum + sum * 0.035).toFixed(2)).toLocaleString() + ' ₽';
    printPayments(res);
}

function printPayments(arr) {
    arr.forEach(element => {
        let paymentRow = document.createElement('tr');
        paymentRow.classList.add('payment__row')
        let paymentCell = document.createElement('td');
        paymentCell.classList.add('payment__cell');

        let agentTransactionId = document.createElement('td');
        let transactionId = document.createElement('td');
        let date = document.createElement('td');
        let time = document.createElement('td');
        let serviceId = document.createElement('td');
        let serviceName = document.createElement('td');
        let sumFrom = document.createElement('td');
        let sumTo = document.createElement('td');
        let sumCurrency = document.createElement('td');
        let comissionPercentage = document.createElement('td');
        let comissionFee = document.createElement('td');
        let statusBank = document.createElement('td');
        let statusPartner = document.createElement('td');
        let clientAccountId = document.createElement('td');

        agentTransactionId.classList.add('payment__cell');
        transactionId.classList.add('payment__cell');
        date.classList.add('payment__cell');
        time.classList.add('payment__cell');
        serviceId.classList.add('payment__cell');
        serviceName.classList.add('payment__cell');
        sumFrom.classList.add('payment__cell');
        sumTo.classList.add('payment__cell');
        sumCurrency.classList.add('payment__cell');
        comissionPercentage.classList.add('payment__cell');
        comissionFee.classList.add('payment__cell');
        statusBank.classList.add('payment__cell');
        statusPartner.classList.add('payment__cell');
        clientAccountId.classList.add('payment__cell');

        paymentsTableBody.appendChild(paymentRow);
        paymentRow.appendChild(agentTransactionId);
        paymentRow.appendChild(transactionId);
        paymentRow.appendChild(date);
        paymentRow.appendChild(time);
        paymentRow.appendChild(serviceId);
        paymentRow.appendChild(serviceName);
        paymentRow.appendChild(sumFrom);
        paymentRow.appendChild(sumTo);
        paymentRow.appendChild(sumCurrency);
        paymentRow.appendChild(comissionPercentage);
        paymentRow.appendChild(comissionFee);
        paymentRow.appendChild(statusBank);
        paymentRow.appendChild(statusPartner);
        paymentRow.appendChild(clientAccountId);

        agentTransactionId.textContent = element.agentTransactionId;
        transactionId.textContent = element.transactionId;
        date.textContent = element.date;
        time.textContent = element.time;
        serviceId.textContent = element.serviceId;
        serviceName.textContent = element.serviceName;
        sumFrom.textContent = (Number(element.sumFrom)).toLocaleString();
        sumTo.textContent = (Number(element.sumTo)).toLocaleString();
        sumCurrency.textContent = element.sumCurrency;
        comissionPercentage.textContent = element.comissionPercentage;
        comissionFee.textContent = element.comissionFee;
        statusBank.textContent = element.statusBank;
        statusPartner.textContent = element.statusPartner;
        clientAccountId.textContent = element.clientAccountId;

        if(statusBank.textContent == 'Успешно') {
            statusBank.classList.add('green')
        } if(statusBank.textContent == 'Ошибка' || statusBank.textContent == 'Отклонен банком плательщика') {
            statusBank.classList.add('red')
        } if(statusBank.textContent == 'В процессе') {
            statusBank.classList.add('yellow')
        }

        if(statusPartner.textContent == 'Успешно') {
            statusPartner.classList.add('green')
        } if(statusPartner.textContent == 'Другая ошибка провайдера' || statusPartner.textContent == 'Операция неуспешна') {
            statusPartner.classList.add('red')
        } if(statusPartner.textContent == 'In process') {
            statusPartner.classList.add('yellow')
        }
    });
}

function sumFormat(sum) {
    return sum.toLocaleString();
}

function getBalance() {
    fetch('https://api.payforsteam.ru/balance', { 
        method: 'POST', 
        headers: { 
            'Content-Type': 'application/json'
        }})
    .then(res => {
        return res.json()
    })
    .then(res => balanceFormat(res.agent.balance))
     // параметры сервиса - ответ от сервера
    .catch(err => console.log({ err }))  
}

function balanceFormat(balance) {
    balanceSum.textContent = sumFormat(balance);
    if(balance < 0) {
        balanceSum.setAttribute('style', 'color: red');
    }
}

// Формат даты 

function dateFormat() {
    let today = new Date();
    let month = today.getMonth();

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

    let theDate = today.getDate() < 10 ? '0' + today.getDate() + '.' + (fMonth) + '.' + today.getFullYear() : today.getDate() + '.' + (fMonth) + '.' + today.getFullYear();
    return theDate;
}

// Формат даты инпута

function dateFormatFilter(date) {

    let month = date.getMonth();

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

    let formatted = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '.' + (fMonth) + '.' + date.getFullYear();

    return formatted;
    // let filterDate = date.slice(-2) + '.' + date.slice(5, 7) + '.' + date.slice(0, 4);
    // return filterDate;
}

// Скачать в Excel

let paymentTable = document.getElementById('paymentsTable');

download.addEventListener('click', function() {
    exportTableToExcel(paymentTable, filename = 'payments.xls')
});
    function exportTableToExcel(tableId, filename) {
        let dataType = 'application/vnd.ms-excel';
        let tableHTML = encodeURIComponent(tableId.outerHTML.replace(/ or .*?>/g, '>'));
        let link = document.createElement("a");
        link.href = `data:${dataType}, ${tableHTML}`;
        link.download = filename;
        link.click();
    }
