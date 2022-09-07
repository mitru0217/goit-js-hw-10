import './css/styles.css';
import cards from './templates/cards.hbs';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css';
import fetchCountries from './fetchCounties';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));
function onInputChange(e) {
  e.preventDefault();
  const country = e.target.value;
  console.log(country);
  fetchCountries(country).then(country => {
    createMarkup(country);
  });
}
function createMarkup(obj) {
  console.log(obj);
  return obj.map(
    ({
      name: { official },
      flags: { svg },
      capital,
      languages,
      population,
    }) => {
      // const countryName = official;
      // const flags = svg;
      // console.log(countryName);
      // console.log(flags);
      const capitalOfCountry = capital[0];
      // console.log(capitalOfCountry);
      // const populationOfCountry = population;
      // console.log(populationOfCountry);
      const languagesOfCountry = Object.values(languages).join(', ');
      // console.log(languagesOfCountry);
      return `<div class="country__card">
      <div class="country__head">
     <img class="country__img" src="${svg}" alt="Flag" width="150" height="150">
     <h1 class="country__title>${official}</h1>
      </div>
     <div class="country__info>
    <h2>Capital:</h2>
    <p>${capitalOfCountry}</p>
    <h2> Population:</h2>
    <p>${population}</p>
    <h2>Languages:</h2>
    <p>${languagesOfCountry}</p>
    </div>
    </div>`;
    }
  );
}

// `<div class="country__card">
//     <div class="country__head">
//     <img class="country__img" src="${flags}" alt="Flag" width="150" height="150">
//     <h1 class="country__title>${countryName}</h1>
//     </div>
//     <div class="country__info>
//     <h2>Capital:</h2>
//     <p>${capital}</p>
//     <h2> Population:</h2>
//     <p>${population}</p>
//     <h2>Languages:</h2>
//     <p>${languages}</p>
//     </div>
//     </div>`;

// countryInfo.innerHTML = '';
// countryList = markup;
