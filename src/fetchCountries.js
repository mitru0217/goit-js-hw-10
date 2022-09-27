const BASE_URL = 'https://restcountries.com/v3.1/name/';

export default function fetchCountries(searchQuery) {
  return fetch(
    `${BASE_URL}${searchQuery}?fields=name,capital,population,flags,languages`
  ).then(res => {
    if (!res.ok) {
      throw new Error(mistake);
    }
    return res.json();
  });
}
