const BASE_URL = 'https://restcountries.com/v3.1/name/';

export default function fetchCountries(country) {
  const response = fetch(
    `${BASE_URL}${country}?fields=name,capital,population,flags,languages`
  ).then(res => res.json());
  return response;
}
