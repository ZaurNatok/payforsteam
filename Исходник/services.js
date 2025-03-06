const services = [
    {
        country: 'Международная',
        fixedPayment: false,
        group: 'Test',
        inputs: [
            {
                name: 'account',
                regexp: '^\d{1,3}$',
                required: true,
                title: 'Введите аккаунт'
            }
        ],
        name: 'Тестовая услуга',
        serviceId: 'P0101',
        type: 0
    },
    {
        type: 'Игры',
        title: 'Valorant',
        subtitle: 'Для аккаунтов США, Европы и Турции',
        addInfo: 'Официальный партнер',
        popupTypes: ['Ваучер'],
        region: [ 
            {
                title: 'США',
                img: './img/usa.jpg',
                voucherCurrency: 'USD',
                voucherNominals: ['5$', '10$', '20$', '25$', '35$', '50$', '100$']
            }, 
            {
                title: 'Европа',
                img: './img/europe.png',
                voucherCurrency: 'EUR',
                FXrate: 114.31,
                voucherNominals: ['5€', '10€', '20€', '50€', '100€']
            }, 
            {
                title: 'Турция',
                img: './img/turkey.webp',
                voucherCurrency: 'TRY',
                FXrate: 3.11,
                voucherNominals: ['150VP', '515VP', '1200VP', '1835VP', '2950VP', '6115VP']
            }],
        isVoucher: true,
        clientInfo: 'email',
        isPopular: false,
        imageLink: './img/valorant.jpg',
        id: 1
    },
    {
        type: 'Игры',
        title: 'Roblox',
        subtitle: 'При регистрации нового аккаунта используйте почту с доменом gmail.com',
        addInfo: 'Официальный партнер',
        popupTypes: ['Ваучер'],
        region: [ 
            {
                title: 'США',
                img: './img/usa.jpg',
                voucherCurrency: 'USD',
                voucherNominals: ['10$', '20$']
            }],
        isVoucher: true,
        clientInfo: 'email',
        isPopular: true,
        imageLink: './img/roblox.jpg',
        id: 2
    },
    {
        type: 'Игры',
        title: 'Razer Gold',
        subtitle: 'Для аккаунтов любого региона. При регистрации нового аккаунта использовать почту с доменом gmail.com',
        addInfo: 'Официальный партнер',
        popupTypes: ['Ваучер'],
        region: [ 
            {
                title: 'Любой регион',
                img: './img/russia.webp',
                voucherCurrency: 'USD',
                voucherNominals: ['5$', '10$']
            }, 
            {
                title: 'Турция',
                img: './img/turkey.webp',
                voucherCurrency: 'TRY',
                voucherNominals: ['50₺', '100₺', '250₺', '500₺']
            }],
        isVoucher: true,
        clientInfo: 'email',
        isPopular: false,
        imageLink: './img/RazerGold.jpg',
        id: 3
    },
    {
        type: 'Игры',
        title: 'PUBG mobile',
        subtitle: 'Для аккаунтов любого региона. При регистрации нового аккаунта использовать почту с доменом gmail.com',
        addInfo: 'Официальный партнер',
        popupTypes: ['Ваучер'],
        region: [
            {
                title: 'Любой регион',
                img: './img/russia.webp',
                voucherCurrency: 'USD',
                voucherNominals: ['60UC', '300 + 25UC', '600 + 60UC', '1500 + 300UC', '3000 + 850UC']
            }
        ],
        isVoucher: true,
        clientInfo: 'email',
        isPopular: false,
        imageLink: './img/PUBGmobile.jpg',
        id: 4
    },
    {
        type: 'Игры',
        title: 'Point Blank',
        subtitle: 'Для аккаунтов Турции. При регистрации нового аккаунта используйте почту с доменом gmail.com',
        addInfo: 'Официальный партнер',
        popupTypes: ['Ваучер'],
        region: [
            {
                title: 'Турция',
                img: './img/turkey.webp',
                voucherCurrency: 'TG',
                voucherNominals: ['900TG', '1800TG', '4500TG', '10400TG', '21000TG']
            }
        ],
        isVoucher: true,
        clientInfo: 'email',
        isPopular: false,
        imageLink: './img/Point_Blank.jpg',
        id: 5
    },
    {
        type: 'Игры',
        title: 'Mobile Legends',
        subtitle: 'Для аккаунтов любого региона. При регистрации нового аккаунта использовать почту с доменом gmail.com',
        addInfo: 'Официальный партнер',
        popupTypes: ['Ваучер'],
        region: [
            {
                title: 'Любой регион',
                img: './img/turkey.webp',
                voucherCurrency: 'Diamonds',
                voucherNominals: ['56 Diamonds', '278 Diamonds', '571 Diamonds', '1167 Diamonds', '1783 Diamonds', '3005 Diamonds', '4770 Diamonds', '6012 Diamonds']
            }
        ],
        isVoucher: true,
        clientInfo: 'email',
        isPopular: false,
        imageLink: './img/Mobile_Legends.jpg',
        id: 15
    },
    {
        type: 'Игры',
        title: 'Minecraft',
        subtitle: 'Для аккаунтов любого региона. При регистрации нового аккаунта использовать почту с доменом gmail.com',
        addInfo: 'Официальный партнер',
        popupTypes: ['Ваучер'],
        region: [
            {
                title: 'Любой регион',
                img: './img/turkey.webp',
                voucherCurrency: 'Coins',
                voucherNominals: ['1720 Coins']
            }
        ],
        isVoucher: true,
        clientInfo: 'email',
        isPopular: false,
        imageLink: './img/Minecraft.jpg',
        id: 6
    },
    {
        type: 'Игры',
        title: 'League of Legends',
        subtitle: 'При регистрации нового аккаунта используйте почту с доменом gmail.com',
        addInfo: 'Официальный партнер',
        popupTypes: ['Ваучер'],
        isVoucher: true,
        clientInfo: 'email',
        region: [ 
            {
                title: 'США',
                img: './img/usa.jpg',
                voucherCurrency: 'USD',
                voucherNominals: ['5$', '10$', '20$', '50$']
            }, 
            {
                title: 'Европа',
                img: './img/europe.png',
                voucherCurrency: 'EUR',
                voucherNominals: ['5€', '10€', '20€', '50€']
            }],
        isPopular: false,
        imageLink: './img/LeagueofLegends.jpg',
        id: 7
    },
    {
        type: 'Игры',
        title: 'HearthStone',
        subtitle: 'Для аккаунтов США и Европы. При регистрации нового аккаунта используйте почту с доменом gmail.com',
        addInfo: 'Официальный партнер',
        popupTypes: ['Ваучер'],
        isVoucher: true,
        clientInfo: 'email',
        region: [ 
            {
                title: 'США',
                img: './img/usa.jpg',
                voucherCurrency: 'Pack',
                voucherNominals: ['1 Pack']
            }, 
            {
                title: 'Европа',
                img: './img/europe.png',
                voucherCurrency: 'Pack',
                voucherNominals: ['1 Pack']
            }],
        isPopular: false,
        imageLink: './img/Hearthstone.jpg',
        id: 8
    },
    {
        type: 'Игры',
        title: 'Genshin Impact',
        subtitle: 'Для аккаунтов любого региона',
        addInfo: 'Новинка',
        popupTypes: ['Ваучер'],
        isVoucher: false,
        clientInfo: ['UID', 'Server'],
        region: [ 
            {
                title: 'Любой регион',
                img: './img/usa.jpg',
                voucherCurrency: 'Кристаллы',
                voucherNominals: ['60 кристаллов', '300 + 30 кристаллов', '980 + 110 кристаллов', '1280 + 140 кристаллов', '1980 + 260 кристаллов', '3280 + 600 кристаллов', '6480 + 1600 кристаллов', '9760 + 2200 кристаллов', '6480 + 1600 кристаллов x 2', '6480 + 1600 кристаллов x 3', '6480 + 1600 кристаллов x 4', '6480 + 1600 кристаллов x 5', '6480 + 1600 кристаллов x 10', '6480 + 1600 кристаллов x 15', '6480 + 1600 кристаллов x 20', '6480 + 1600 кристаллов x 25', '6480 + 1600 кристаллов x 50']
            }],
        isPopular: true,
        imageLink: './img/Genshin_impact.png',
        id: 9
    },
    {
        type: 'Игры',
        title: 'Free Fire',
        subtitle: 'Для аккаунтов любого региона. При регистрации нового аккаунта использовать почту с доменом gmail.com',
        addInfo: 'Официальный партнер',
        popupTypes: ['Ваучер'],
        isVoucher: true,
        clientInfo: 'email',
        region: [ 
            {
                title: 'Любой регион',
                img: './img/usa.jpg',
                voucherCurrency: 'Diamonds',
                voucherNominals: ['100 + 10 Diamomds', '210 + 21 Diamomds', '530 + 53 Diamomds', '1080 + 108 Diamomds', '2200 + 220 Diamomds']
            }],
        isPopular: false,
        imageLink: './img/FreeFire.jpg',
        id: 10
    },
    {
        type: 'Игры',
        title: 'Fortnite',
        subtitle: 'Для аккаунтов любого региона. При регистрации нового аккаунта использовать почту с доменом gmail.com',
        addInfo: 'Официальный партнер',
        popupTypes: ['Ваучер'],
        isVoucher: true,
        clientInfo: 'email',
        region: [ 
            {
                title: 'США',
                img: './img/usa.jpg',
                voucherCurrency: 'V-Bucks Card',
                voucherNominals: ['2800 V-Bucks Card 25$', '5000 V-Bucks Card 40$']
            }],
        isPopular: false,
        imageLink: './img/Fortnite.jpg',
        id: 11
    },
    {
        type: 'Игры',
        title: 'Black Desert',
        subtitle: 'Для аккаунтов Турции. При регистрации нового аккаунта использовать почту с доменом gmail.com',
        addInfo: 'Официальный партнер',
        popupTypes: ['Ваучер'],
        isVoucher: true,
        clientInfo: 'email',
        region: [ 
            {
                title: 'Турция',
                img: './img/turkey.jpg',
                voucherCurrency: 'Diamonds',
                voucherNominals: ['100 + 10 Diamomds', '200 + 20 Diamomds', '500 + 50 Diamomds', '1000 + 100 Diamomds', '2000 + 200 Diamomds', '5000 + 500 Diamomds']
            }],
        isPopular: false,
        imageLink: './img/BlackDesert.png',
        id: 12
    },
    {
        type: 'Игры',
        title: 'Apex Legends Mobile',
        subtitle: 'Для аккаунтов Германии. При регистрации нового аккаунта использовать почту с доменом gmail.com',
        addInfo: 'Официальный партнер',
        popupTypes: ['Ваучер'],
        isVoucher: true,
        clientInfo: 'email',
        region: [ 
            {
                title: 'Германия',
                img: './img/germany.webp',
                voucherCurrency: 'Syndicate Gold',
                voucherNominals: ['1050 Syndicate Gold', '2150 Syndicate Gold', '2750 Syndicate Gold']
            }],
        isPopular: false,
        imageLink: './img/ApexLegendsMobile.jpg',
        id: 13
    },
    {
        type: 'Сервисы',
        title: 'Steam',
        subtitle: 'Аккаунты РФ и стран СНГ. Деньги поступят на аккаунт в течение 15 мин. В редких случаях — до 2 часов.',
        addInfo: 'Официальный партнер',
        popupTypes: ['Пополнить аккаунт', 'Ваучер'],
        isVoucher: true,
        accountPopup: true,
        accountPopupInfo: 'логин Steam',
        clientInfo: 'email',
        region: [ 
            {
                title: 'Россия',
                img: './img/russia.webp',
                voucherCurrency: 'RUB',
                voucherNominals: ['5$', '10$', '20$', '25$', '35$', '50$', '100$']
            }, 
            {
                title: 'Казахстан',
                img: './img/kz.jpg',
                voucherCurrency: 'USD',
                voucherNominals: ['5$', '10$', '20$', '25$', '35$', '50$', '100$']
            }, 
            {
                title: 'Страны СНГ',
                img: './img/cia.jpg',
                voucherCurrency: 'EUR',
                voucherNominals: ['5$', '10$', '20$', '25$', '35$', '50$', '100$']
            }],
        regionVoucher: [ 
            {
                title: 'США',
                img: './img/russia.webp',
                voucherCurrency: 'RUB',
                voucherNominals: ['5$', '10$', '20$', '25$', '35$', '50$', '100$']
            }, 
            {
                title: 'Гонконг',
                img: './img/kz.jpg',
                voucherCurrency: 'USD',
                voucherNominals: ['5$', '10$', '20$', '25$', '35$', '50$', '100$']
            }, 
            {
                title: 'Европа',
                img: './img/cia.jpg',
                voucherCurrency: 'EUR',
                voucherNominals: ['5$', '10$', '20$', '25$', '35$', '50$', '100$']
            }, 
            {
                title: 'Перу',
                img: './img/cia.jpg',
                voucherCurrency: 'EUR',
                voucherNominals: ['5$', '10$', '20$', '25$', '35$', '50$', '100$']
            }, 
            {
                title: 'Чили',
                img: './img/cia.jpg',
                voucherCurrency: 'EUR',
                voucherNominals: ['5$', '10$', '20$', '25$', '35$', '50$', '100$']
            }, 
            {
                title: 'Мексика',
                img: './img/cia.jpg',
                voucherCurrency: 'EUR',
                voucherNominals: ['5$', '10$', '20$', '25$', '35$', '50$', '100$']
            }, 
            {
                title: 'Вьетнам',
                img: './img/cia.jpg',
                voucherCurrency: 'EUR',
                voucherNominals: ['5$', '10$', '20$', '25$', '35$', '50$', '100$']
            }, 
            {
                title: 'Колумбия',
                img: './img/cia.jpg',
                voucherCurrency: 'EUR',
                voucherNominals: ['5$', '10$', '20$', '25$', '35$', '50$', '100$']
            }, 
            {
                title: 'ЮАР',
                img: './img/cia.jpg',
                voucherCurrency: 'EUR',
                voucherNominals: ['5$', '10$', '20$', '25$', '35$', '50$', '100$']
            }, 
            {
                title: 'Польша',
                img: './img/cia.jpg',
                voucherCurrency: 'EUR',
                voucherNominals: ['5$', '10$', '20$', '25$', '35$', '50$', '100$']
            }, 
            {
                title: 'Великобритания',
                img: './img/cia.jpg',
                voucherCurrency: 'EUR',
                voucherNominals: ['5$', '10$', '20$', '25$', '35$', '50$', '100$']
            }, 
            {
                title: 'Арабские Эмираты',
                img: './img/cia.jpg',
                voucherCurrency: 'EUR',
                voucherNominals: ['5$', '10$', '20$', '25$', '35$', '50$', '100$']
            }, 
            {
                title: 'Филиппины',
                img: './img/cia.jpg',
                voucherCurrency: 'EUR',
                voucherNominals: ['5$', '10$', '20$', '25$', '35$', '50$', '100$']
            }, 
            {
                title: 'Саудовская Аравия',
                img: './img/cia.jpg',
                voucherCurrency: 'EUR',
                voucherNominals: ['5$', '10$', '20$', '25$', '35$', '50$', '100$']
            }, 
            {
                title: 'Индия',
                img: './img/cia.jpg',
                voucherCurrency: 'EUR',
                voucherNominals: ['5$', '10$', '20$', '25$', '35$', '50$', '100$']
            }, 
            {
                title: 'Бразилия',
                img: './img/cia.jpg',
                voucherCurrency: 'EUR',
                voucherNominals: ['5$', '10$', '20$', '25$', '35$', '50$', '100$']
            }, 
            {
                title: 'Индонезия',
                img: './img/cia.jpg',
                voucherCurrency: 'EUR',
                voucherNominals: ['5$', '10$', '20$', '25$', '35$', '50$', '100$']
            }, 
            {
                title: 'Южная Корея',
                img: './img/cia.jpg',
                voucherCurrency: 'EUR',
                voucherNominals: ['5$', '10$', '20$', '25$', '35$', '50$', '100$']
            }, 
            {
                title: 'Малайзия',
                img: './img/cia.jpg',
                voucherCurrency: 'EUR',
                voucherNominals: ['5$', '10$', '20$', '25$', '35$', '50$', '100$']
            }, 
            {
                title: 'Сингапур',
                img: './img/cia.jpg',
                voucherCurrency: 'EUR',
                voucherNominals: ['5$', '10$', '20$', '25$', '35$', '50$', '100$']
            }, 
            {
                title: 'Таиланд',
                img: './img/cia.jpg',
                voucherCurrency: 'EUR',
                voucherNominals: ['5$', '10$', '20$', '25$', '35$', '50$', '100$']
            }, 
            {
                title: 'Тайвань',
                img: './img/cia.jpg',
                voucherCurrency: 'EUR',
                voucherNominals: ['5$', '10$', '20$', '25$', '35$', '50$', '100$']
            }, 
            {
                title: 'Аргентина',
                img: './img/cia.jpg',
                voucherCurrency: 'EUR',
                voucherNominals: ['5$', '10$', '20$', '25$', '35$', '50$', '100$']
            }, 
            {
                title: 'Турция',
                img: './img/cia.jpg',
                voucherCurrency: 'EUR',
                voucherNominals: ['5$', '10$', '20$', '25$', '35$', '50$', '100$']
            }
        ],
        isPopular: true,
        imageLink: './img/steam.png',
        id: 14
    },
    {
        type: 'Сервисы',
        title: 'Playstation Network',
        subtitle: 'При регистрации нового аккаунта используйте почту с доменом gmail.com',
        addInfo: 'Официальный партнер',
        popupTypes: ['Ваучер'],
        isVoucher: true,
        accountPopup: false,
        accountPopupInfo: '',
        clientInfo: 'email',
        region: [ 
            {
                title: 'США',
                img: './img/usa.jpg',
                voucherCurrency: 'USD',
                voucherNominals: ['10$', '25$', '50$', '75$', '100$']
            }, 
            {
                title: 'Индия',
                img: './img/india.png',
                voucherCurrency: 'INR',
                voucherNominals: ['1000₹', '2000₹', '3000₹']
            }, 
            {
                title: 'Польша',
                img: './img/poland.png',
                voucherCurrency: 'PLN',
                voucherNominals: ['50Zł', '100Z₹', '200Z₹']
            }, 
            {
                title: 'Бельгия',
                img: './img/belgium.webp',
                voucherCurrency: 'EUR',
                voucherNominals: ['10€', '20€', '50€']
            }, 
            {
                title: 'Франция',
                img: './img/france.webp',
                voucherCurrency: 'EUR',
                voucherNominals: ['10€', '20€', '25€', '30€', '40€', '50€', '75€', '100€']
            }, 
            {
                title: 'Нидерланды',
                img: './img/holland.png',
                voucherCurrency: 'EUR',
                voucherNominals: ['20€', '25€', '30€']
            }, 
            {
                title: 'Австрия',
                img: './img/austria.png',
                voucherCurrency: 'EUR',
                voucherNominals: ['5€', '40€', '50€', '75€']
            }, 
            {
                title: 'Германия',
                img: './img/germany.webp',
                voucherCurrency: 'EUR',
                voucherNominals: ['5', '10€', '20€', '25€', '50€', '75€', '100€', '120€']
            }, 
            {
                title: 'Великобритания',
                img: './img/uk.jpg',
                voucherCurrency: 'GBP',
                voucherNominals: ['10£', '20£', '25£', '40£', '45£', '50£', '90£', '100£']
            }, 
            {
                title: 'Бразилия',
                img: './img/brazil.png',
                voucherCurrency: 'BRL',
                voucherNominals: ['60R$', '10R$', '150R$', '250R$', '300R$', '400R$']
            }, 
            {
                title: 'Ливан',
                img: './img/livan.jpg',
                voucherCurrency: 'USD',
                voucherNominals: ['5$', '10$', '15$', '20$', '21$', '30$', '34$', '40$', '45$', '50$', '60$', '70$', '83$', '100$']
            }, 
            {
                title: 'Арабские Эмираты',
                img: './img/uae.png',
                voucherCurrency: 'USD',
                voucherNominals: ['10$', '20$', '21$', '34$', '50$', '83$']
            }, 
            {
                title: 'Финляндия',
                img: './img/finland.jpg',
                voucherCurrency: 'EUR',
                voucherNominals: ['20€', '50€']
            }],
        isPopular: true,
        imageLink: './img/playstation.png',
        id: 16
    },
    {
        type: 'Сервисы',
        title: 'Battle.net',
        subtitle: 'Для аккаунтов США и Европы. При регистрации нового аккаунта используйте почту с доменом gmail.com',
        addInfo: 'Официальный партнер',
        popupTypes: ['Ваучер'],
        isVoucher: true,
        accountPopup: false,
        accountPopupInfo: '',
        clientInfo: 'email',
        region: [ 
            {
                title: 'США',
                img: './img/usa.jpg',
                voucherCurrency: 'USD',
                voucherNominals: ['20$', '50$']
            }, 
            {
                title: 'Европа',
                img: './img/europe.png',
                voucherCurrency: 'EUR',
                voucherNominals: ['20€', '50€']
            }],
        isPopular: true,
        imageLink: './img/battlenet.png',
        id: 17
    },
    {
        type: 'Сервисы',
        title: 'Xbox',
        subtitle: 'Для аккаунтов США или Турции. При регистрации нового аккаунта используйте почту с доменом gmail.com',
        addInfo: 'Официальный партнер',
        popupTypes: ['Ваучер'],
        isVoucher: true,
        accountPopup: false,
        accountPopupInfo: '',
        clientInfo: 'email',
        region: [ 
            {
                title: 'США',
                img: './img/usa.jpg',
                voucherCurrency: 'USD',
                voucherNominals: ['10$', '15$']
            },
            {
                title: 'Турция',
                img: './img/turkey.webp',
                voucherCurrency: 'TRY',
                voucherNominals: ['Turkey Ultimate 1 Month']
            }
        ],
        isPopular: true,
        imageLink: './img/xbox.png',
        id: 18
    },
    {
        type: 'Сервисы',
        title: 'Airbnb',
        subtitle: 'Для аккаунтов США. При регистрации нового аккаунта используйте почту с доменом gmail.com',
        addInfo: 'Официальный партнер',
        popupTypes: ['Ваучер'],
        isVoucher: true,
        accountPopup: false,
        accountPopupInfo: '',
        clientInfo: 'email',
        region: [ 
            {
                title: 'США',
                img: './img/usa.jpg',
                voucherCurrency: 'USD',
                voucherNominals: ['25$', '50$', '100$']
            }
        ],
        isPopular: false,
        imageLink: './img/Airbnb.jpg',
        id: 19
    },
    {
        type: 'Сервисы',
        title: 'Amazon',
        subtitle: 'Для аккаунтов США. При регистрации нового аккаунта используйте почту с доменом gmail.com',
        addInfo: 'Официальный партнер',
        popupTypes: ['Ваучер'],
        isVoucher: true,
        accountPopup: false,
        accountPopupInfo: '',
        clientInfo: 'email',
        region: [ 
            {
                title: 'США',
                img: './img/usa.jpg',
                voucherCurrency: 'USD',
                voucherNominals: ['5$', '10$', '15$', '50$', '100$']
            }
        ],
        isPopular: false,
        imageLink: './img/Amazon.jpg',
        id: 20
    },
    {
        type: 'Сервисы',
        title: 'App Store',
        subtitle: 'Активировать ваучер можно только для аккаунта США или Турции.',
        addInfo: 'Официальный партнер',
        popupTypes: ['Ваучер'],
        isVoucher: true,
        accountPopup: false,
        accountPopupInfo: '',
        clientInfo: 'email',
        region: [ 
            {
                title: 'Россия',
                img: './img/russia.webp',
                voucherCurrency: 'RUR',
                voucherNominals: ['500₽', '1000₽']
            }, 
            {
                title: 'США',
                img: './img/usa.jpg',
                voucherCurrency: 'USD',
                voucherNominals: ['2$', '3$', '4$', '5$', '10$', '15$', '20$', '25$', '30$', '40$', '50$', '60$', '70$', '100$', '200$', '300$', '400$', '500$']
            }, 
            {
                title: 'Турция',
                img: './img/turkey.webp',
                voucherCurrency: 'TRY',
                voucherNominals: ['25₺', '50₺', '100₺', '250₺', '500₺', '1000₺', '1500₺']
            }, 
            {
                title: 'Бельгия',
                img: './img/belgium.webp',
                voucherCurrency: 'EUR',
                voucherNominals: ['5€', '10€', '15€', '25€', '50€', '100€']
            }, 
            {
                title: 'Польша',
                img: './img/poland.png',
                voucherCurrency: 'PLN',
                voucherNominals: ['25Zł', '50Zł', '100Z₹', '200Z₹']
            },
            {
                title: 'Арабские Эмираты',
                img: './img/uae.png',
                voucherCurrency: 'AED',
                voucherNominals: ['50د. إ.', '100د. إ.', '250د. إ.', '500د. إ.']
            }],
        isPopular: false,
        imageLink: './img/App_Store.png',
        id: 21
    },
    {
        type: 'Сервисы',
        title: 'ChatGPT',
        subtitle: 'Для аккаунтов США. При регистрации нового аккаунта используйте почту с доменом gmail.com',
        imageLink: './img/ChatGPT.jpg',
        popupTypes: ['Ваучер'],
        isPopular: false,
        region: [ 
            {
                title: 'США',
                img: './img/usa.jpg',
                voucherCurrency: 'USD',
                voucherNominals: ['Plus 1 месяц']
            }
        ],
        id: 22
    },
    {
        type: 'Сервисы',
        title: 'Ebay',
        subtitle: 'Для аккаунтов США. При регистрации нового аккаунта используйте почту с доменом gmail.com',
        imageLink: './img/ebay.jpg',
        popupTypes: ['Ваучер'],
        isPopular: false,
        region: [ 
            {
                title: 'США',
                img: './img/usa.jpg',
                voucherCurrency: 'USD',
                voucherNominals: ['25$', '50$', '100$']
            }
        ],
        id: 23
    },
    {
        type: 'Сервисы',
        title: 'Netflix',
        subtitle: 'Для аккаунтов Турции. При регистрации нового аккаунта используйте почту с доменом gmail.com',
        imageLink: './img/netflix.jpg',
        region: [ 
            {
                title: 'Турция',
                img: './img/turkey.webp',
                voucherCurrency: 'TRY',
                voucherNominals: ['250₺', '400₺', '500₺', '600₺', '750₺', '900₺']
            }, 
            {
                title: 'Европа',
                img: './img/europe.png',
                voucherCurrency: 'EUR',
                voucherNominals: ['15€', '25€', '50€']
            }, 
            {
                title: 'Великобритания',
                img: './img/uk.jpg',
                voucherCurrency: 'GBP',
                voucherNominals: ['15£', '50£']
            }, 
            {
                title: 'Саудовская Аравия',
                img: './img/saudi.webp',
                voucherCurrency: 'SAR',
                voucherNominals: ['100س', '250س', '500س', '1000س']
            }, 
            {
                title: 'Польша',
                img: './img/poland.png',
                voucherCurrency: 'PLN',
                voucherNominals: ['60Zł', '80Zł', '120Z₹']
            }, 
            {
                title: 'Арабские Эмираты',
                img: './img/uae.png',
                voucherCurrency: 'AED',
                voucherNominals: ['100د. إ.', '500د. إ.']
            }, 
            {
                title: 'США',
                img: './img/usa.jpg',
                voucherCurrency: 'USD',
                voucherNominals: ['25$', '30$', '50$', '60$', '100$']
            }],
        popupTypes: ['Ваучер'],
        isPopular: true,
        id: 24
    },
    {
        type: 'Сервисы',
        title: 'Nintendo eShop',
        subtitle: 'При регистрации нового аккаунта используйте почту с доменом gmail.com',
        imageLink: './img/nintendo.jpg',
        popupTypes: ['Ваучер'],
        isPopular: true,
        region: [ 
            {
                title: 'США',
                img: './img/usa.jpg',
                voucherCurrency: 'USD',
                voucherNominals: ['10$', '20$', '35$', '50$', '3 Months Membership', '12 Months Membership']
            },
            {
                title: 'Европа',
                img: './img/europe.png',
                voucherCurrency: 'EUR',
                voucherNominals: ['15€', '25€']
            },
            {
                title: 'Япония',
                img: './img/japan.png',
                voucherCurrency: 'JPY',
                voucherNominals: ['500¥', '1000¥', '2000¥', '3000¥', '5000¥', '9000¥']
            }
        ],
        id: 25
    },
    {
        type: 'Сервисы',
        title: 'Spotify',
        subtitle: 'При регистрации нового аккаунта используйте почту с доменом gmail.com',
        imageLink: './img/spotify.jpg',
        popupTypes: ['Ваучер'],
        region: [ 
            {
                title: 'США',
                img: './img/usa.jpg',
                voucherCurrency: 'USD',
                voucherNominals: ['10$', '30$', '60$']
            },
            {
                title: 'Бельгия',
                img: './img/belgium.webp',
                voucherCurrency: 'EUR',
                voucherNominals: ['10€', '30€', '60€']
            },
            {
                title: 'Франция',
                img: './img/france.webp',
                voucherCurrency: 'EUR',
                voucherNominals: ['10€', '30€', '60€']
            },
            {
                title: 'Великобритания',
                img: './img/uk.jpg',
                voucherCurrency: 'GBP',
                voucherNominals: ['10£', '30£', '60£']
            },
            {
                title: 'Германия',
                img: './img/germany.webp',
                voucherCurrency: 'EUR',
                voucherNominals: ['10€', '30€', '60€']
            },
            {
                title: 'Ирландия',
                img: './img/ireland.jpg',
                voucherCurrency: 'EUR',
                voucherNominals: ['10€', '30€', '60€']
            },
            {
                title: 'Италия',
                img: './img/italy.jpg',
                voucherCurrency: 'EUR',
                voucherNominals: ['10€', '30€', '60€']
            },
            {
                title: 'Нидерланды',
                img: './img/holland.png',
                voucherCurrency: 'EUR',
                voucherNominals: ['10€', '30€', '60€']
            },
            {
                title: 'Испания',
                img: './img/spain.png',
                voucherCurrency: 'EUR',
                voucherNominals: ['10€', '30€', '60€']
            },
            {
                title: 'Польша',
                img: './img/poland.png',
                voucherCurrency: 'PLN',
                voucherNominals: ['1 месяц', '3 месяца', '6 месяцев']
            },
            {
                title: 'Алжир',
                img: './img/algeria.webp',
                voucherCurrency: 'DZD',
                voucherNominals: ['1 месяц', '3 месяца', '6 месяцев', '12 месяцев']
            },
            {
                title: 'Саудовская Аравия',
                img: './img/saudi.webp',
                voucherCurrency: 'SAR',
                voucherNominals: ['1 месяц', '3 месяца', '6 месяцев', '12 месяцев']
            }
        ],
        isPopular: false,
        id: 26
    },
    {
        type: 'Сервисы',
        title: 'TIDAL',
        subtitle: 'Для аккаунтов США. При регистрации нового аккаунта используйте почту с доменом gmail.com',
        imageLink: './img/tidal.jpg',
        popupTypes: ['Ваучер'],
        isPopular: false,
        id: 27
    },
    {
        type: 'Сервисы',
        title: 'Twitch',
        subtitle: 'Для аккаунтов США. При регистрации нового аккаунта используйте почту с доменом gmail.com',
        imageLink: './img/twitch.jpg',
        popupTypes: ['Ваучер'],
        region: [ 
            {
                title: 'США',
                img: './img/usa.jpg',
                voucherCurrency: 'USD',
                voucherNominals: ['25$', '50$', '100$']
            }
        ],
        isPopular: false,
        id: 28
    },
    {
        type: 'Программы',
        title: 'Adobe Creative Cloud',
        subtitle: 'Для аккаунтов США. При регистрации нового аккаунта используйте почту с доменом gmail.com',
        imageLink: './img/adobeCreativeCloud.jpg',
        popupTypes: ['Ваучер'],
        region: [ 
            {
                title: 'США',
                img: './img/usa.jpg',
                voucherCurrency: 'USD',
                voucherNominals: ['1 месяц']
            }
        ],
        isPopular: false,
        id: 29
    },
    {
        type: 'Программы',
        title: 'Discord Nitro',
        subtitle: 'Для аккаунтов любого региона. При регистрации нового аккаунта использовать почту с доменом gmail.com',
        imageLink: './img/discord.jpg',
        popupTypes: ['Ваучер'],
        region: [ 
            {
                title: 'Любой регион',
                img: './img/usa.jpg',
                voucherCurrency: 'USD',
                voucherNominals: ['Discord Nitro Classic Monthly', 'Discord Nitro Monthly', 'Discord Nitro Yearly']
            }
        ],
        isPopular: false,
        id: 30
    },
    {
        type: 'Программы',
        title: 'Microsoft Windows',
        subtitle: 'Для аккаунтов РФ. При регистрации нового аккаунта использовать почту с доменом gmail.com',
        imageLink: './img/MSWindows.jpg',
        popupTypes: ['Ваучер'],
        region: [ 
            {
                title: 'Россия',
                img: './img/usa.jpg',
                voucherCurrency: 'USD',
                voucherNominals: ['1 устройство']
            }
        ],
        isPopular: false,
        id: 31
    }
];

