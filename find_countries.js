let searchEl = document.getElementById("searchInput");
let resultcountries = document.getElementById("resultCountries");
let spinner = document.getElementById("spinner");

let countriesList = [];
let searchInputval = "";

function createandappendCountry(country) {
    let countrycontainer = document.createElement("div");
    countrycontainer.classList.add("country-card", "col-11", "mr-3", "col-md-5", "d-flex", "flex-row");
    resultcountries.appendChild(countrycontainer);

    let countryflag = document.createElement("img");
    countryflag.src = country.flag;
    countryflag.classList.add("country-flag", "col-4");
    countrycontainer.appendChild(countryflag);

    let countryinfoEle = document.createElement("div");
    countryinfoEle.classList.add("d-flex", "flex-column");
    countrycontainer.appendChild(countryinfoEle);

    let countryname = document.createElement("h1");
    countryname.textContent = country.name;
    countryname.classList.add("country-name");
    countryinfoEle.appendChild(countryname);

    let countrypopulation = document.createElement("p");
    countrypopulation.textContent = country.population;
    countrypopulation.classList.add("country-population");
    countryinfoEle.appendChild(countrypopulation);

}

function displaycountry() {
    //spinner.classList.toggle("d-none");
    for (let country of countriesList) {
        let countryName = country.name;
        if (countryName.includes(searchInputval)) {
            createandappendCountry(country);
        }
    }
}

function getpopulationofcountry(event) {
    let url = "https://restcountries.eu/rest/v2/all?fields=name;population;flag";
    let option = {
        method: "GET"
    };
    spinner.classList.toggle("d-none");
    fetch(url, option)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            console.log(jsonData);
            spinner.classList.toggle("d-none");
            countriesList = jsonData;
            displaycountry();
        });
}

function onchangesSearchInput(event) {
    searchInputval = event.target.value;
    console.log(searchInputval);
    getpopulationofcountry();
}
getpopulationofcountry();
searchEl.addEventListener("keyup", onchangesSearchInput);
