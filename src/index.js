import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import fetchCountries from './fetchCounties';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');

input.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));

function onInputChange(e) {
  e.preventDefault();
  const country = e.target.value;
  fetchCountries(country).then(country => createMarkup(country));
}
function createMarkup(obj) {
  console.log(obj);
  const countryName = obj[0].name.official;
  const flags = obj[0].flags.svg;
  const capital = obj[0].capital[0];
  const languages = Object.values(obj[0].languages).join(', ');
  const population = obj[0].population;
  console.log(flags);
  console.log(countryName);
  console.log(capital);
  console.log(languages);
  console.log(population);
  `<div class="country__card">
      <div class="country__head">
      <img class="country__img" src="${flags}" alt="Flag" width="150" height="150">
      <h1 class="country__title>${countryName}</h1>
      </div>
      <div class="country__info>
      <h2>Capital:</h2>
      <p>${capital}</p>
      <h2> Population:</h2>
      <p>${population}</p>
      <h2>Languages:</h2>
      <p>${languages}</p>
      </div>
      </div>`;

  countryInfo.innerHTML = '';
  countryList = markup;
}

// HTTP-запросы
// Используй публичный API Rest Countries, а именно ресурс name, возвращающий массив объектов стран удовлетворивших критерий поиска. Добавь минимальное оформление элементов интерфейса.

// Напиши функцию fetchCountries(name) которая делает HTTP-запрос на ресурс name и возвращает промис с массивом стран - результатом запроса. Вынеси её в отдельный файл fetchCountries.js и сделай именованный экспорт.

// Фильтрация полей
// В ответе от бэкенда возвращаются объекты, большая часть свойств которых тебе не пригодится. Чтобы сократить объем передаваемых данных добавь строку параметров запроса - так этот бэкенд реализует фильтрацию полей. Ознакомься с документацией синтаксиса фильтров.

// Тебе нужны только следующие свойства:

// name.official - полное имя страны
// capital - столица
// population - население
// flags.svg - ссылка на изображение флага
// languages - массив языков
// Поле поиска
// Название страны для поиска пользователь вводит в текстовое поле input#search-box. HTTP-запросы выполняются при наборе имени страны, то есть по событию input. Но, делать запрос при каждом нажатии клавиши нельзя, так как одновременно получится много запросов и они будут выполняться в непредсказуемом порядке.

// Необходимо применить приём Debounce на обработчике события и делать HTTP-запрос спустя 300мс после того, как пользователь перестал вводить текст. Используй пакет lodash.debounce.

// Если пользователь полностью очищает поле поиска, то HTTP-запрос не выполняется, а разметка списка стран или информации о стране пропадает.

// Выполни санитизацию введенной строки методом trim(), это решит проблему когда в поле ввода только пробелы или они есть в начале и в конце строки.
