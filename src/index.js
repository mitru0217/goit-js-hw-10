import './css/styles.css';
import cardsList from './templates/cards-list.hbs';
import cards from './templates/cards.hbs';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css';
import fetchCountries from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const query = document.querySelector('#search-box');
let countryList = document.querySelector('.country-list');

query.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));
function onInputChange(e) {
  e.preventDefault();
  const searchQuery = e.target.value.trim();

  if (searchQuery != '') {
    fetchCountries(searchQuery)
      .then(country => {
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
      })
      .catch(error => {
        console.log(error);
        Notify.failure(`❌ Oops, there is no country with that name`);
        countryList.innerHTML = '';
      });
  }
  return (countryList.innerHTML = '');
}
