import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css';
const BASE_URL = 'https://restcountries.com/v3.1/name/';

export default function fetchCountries(country) {
  return fetch(
    `${BASE_URL}${country}?fields=name,capital,population,flags,languages`
  )
    .then(res => {
      if (!res.ok) {
        throw new Error(mistake);
      }
      return res.json();
    })
    .catch(error => {
      console.log(error);
      console.log('mistake');
      Notify.failure(`❌ Oops, there is no country with that name`);
    });
}
