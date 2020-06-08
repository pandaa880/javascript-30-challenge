const endpoint =
  "https://gist.githubusercontent.com/pandaa880/ac5b4aa612f7a202e6b23d68a7cf48c2/raw/a320e6dcebd91b50d4a2f80c461fcd005e2e8923/state.json";

// cities
const cities = [];

// get the data
fetch(endpoint)
  .then((blob) => blob.json())
  .then((response) => {
    cities.push(...response);
    console.log(cities);
  });

/**
 * Find the cities or states
 * @param {string} word to search for
 * @returns {Array} filtered cities with matching word
 */
function findMatches(word, cities) {
  return cities.filter((place) => {
    // find the city by word
    const wordRegex = new RegExp(word, "gi");
    return place.city.match(wordRegex) || place.state.match(wordRegex);
  });
}

/**
 * formats a number
 * @param {number} n
 * @returns {string} formatted number with commas
 */
function formatNumber(n) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * display the matches with highlighted words
 */
function displayMatches() {
  const matchArray = findMatches(this.value, cities);

  // generate html
  const html = matchArray
    .map((place) => {
      const regex = new RegExp(this.value, "gi");

      // highlight the searched word
      const cityName = place.city.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );
      const stateName = place.state.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );

      return `
      <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${formatNumber(place.population)}</span>
      </li>
    `;
    })
    .join("");

  suggestions.innerHTML = html;
}

// select search input
const search = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

// attach event listeners
search.addEventListener("change", displayMatches);
search.addEventListener("keyup", displayMatches);
