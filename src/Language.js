import i18 from './i18.json';

const params = new URLSearchParams(window.location.search);
const curLanguage = params.get('l');
const defaultLanguage = 'Cn';
let languageJson = i18[defaultLanguage];
if (curLanguage && i18.hasOwnProperty(curLanguage)) {
	languageJson = i18[curLanguage];
}
const contractTitleEle = document.getElementById('contractTitle');
const priceTitleEle = document.getElementById('priceTitle');
const minerTitleEle = document.getElementById('minerTitle');
const btnEle = document.getElementById('btn');

contractTitleEle.innerHTML = languageJson['contract-title'];
priceTitleEle.innerHTML = languageJson['price-title'];
minerTitleEle.innerHTML = languageJson['miner-title'];
btnEle.innerHTML = languageJson['btn-text'];
