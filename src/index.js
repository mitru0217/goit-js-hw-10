import './css/styles.css';
import cardsList from './templates/cards-list.hbs';
import cards from './templates/cards.hbs';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css';
import fetchCountries from './fetchCounties';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
let countryList = document.querySelector('.country-list');

input.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));

function onInputChange(e) {
  e.preventDefault();
  const inp = e.target.value.trim();
  if (inp != ' ') {
    fetchCountries(inp).then(country => {
      if (country.length > 10) {
        Notify.info(
          ` Too many matches found. Please enter a more specific name.`
        );
        countryList.innerHTML = '';
      } else if (country.length >= 2) {
        countryList.innerHTML = cardsList(country);
      } else {
        countryList.innerHTML = cards(country);
      }
    });
  }
}

// // function createMarkup(obj) {
// //   console.log(obj);
// //   return obj.map(
// //     ({
// //       name: { official },
// //       flags: { svg },
// //       capital,
// //       languages,
// //       population,
// //     }) => {
// //       // const countryName = official;
// //       // const flags = svg;
// //       // console.log(countryName);
// //       // console.log(flags);
// //       const capitalOfCountry = capital[0];
// //       // console.log(capitalOfCountry);
// //       // const populationOfCountry = population;
// //       // console.log(populationOfCountry);
// //       const languagesOfCountry = Object.values(languages).join(', ');
// //       // console.log(languagesOfCountry);
// //       return `<div class="country__card">
// //       <div class="country__head">
// //      <img class="country__img" src="${svg}" alt="Flag" width="150" height="150">
// //      <h1 class="country__title>${official}</h1>
// //       </div>
// //      <div class="country__info>
// //     <h2>Capital:</h2>
// //     <p>${capitalOfCountry}</p>
// //     <h2> Population:</h2>
// //     <p>${population}</p>
// //     <h2>Languages:</h2>
// //     <p>${languagesOfCountry}</p>
// //     </div>
// //     </div>`;
// //     }
// //   );
// }
// function stopFetch() {
//   let controller = new AbortController();

//   fetch(country, {
//     signal: controller.signal,
//   });
//   if ((country.value = '')) {
//     controller.abort();
//   }
// }
