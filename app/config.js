angular.module('exel.CONFIG', [])

.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyCgWReZ13GtycUlvQBvYNTXqqKL2K6JaKs',
        v: '3.17',
        libraries: 'weather,geometry,visualization'
    });
})

.constant('CONFIG', {
  'MAIN' : 'головна',
  'PRODUCTS' : 'товари',
  'ABOUT' : 'доставка',
  'OFFERS': 'послуги',
  'PORTFOLIO':'портфоліо',
  'CONTACTS': 'контакти'
})


.constant('services', {
  'DESIGN' : {'name': 'Дизайн', 'filter': 'design'},
  'HANGER' : {'name': 'Вивіски', 'filter': 'hanger'},
  'INTER': {'name': 'Інтер’єри', 'filter': 'inter'},
  'STREER':{'name': 'Зовнішня реклама', 'filter': 'street'},
  'POLIGRAPHY': {'name': 'Поліграфія', 'filter': 'poligraphy'},
  'WIDE': {'name': 'Широкоформатний друк', 'filter': 'wide'},
  'DIGITAL': {'name': 'Цифровий друк', 'filter': 'digital'},
  'FLAG': {'name': 'Флагштоки', 'filter': 'flag'},
  'SOUVENIR': {'name': 'Сувенірна продукція', 'filter': 'souvenir'},
  'WEB': {'name': 'Розробка сайтів', 'filter': 'web'}
})
