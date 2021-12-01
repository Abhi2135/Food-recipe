const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search-result');
const container = document.querySelector('.container');
let searchQuery = '';
const APP_ID = '710fc6f8';
const APP_KEY = 'f37fe8d981200cfe0c6e4e2e25766e9a';

searchForm.addEventListener('submit',(e) => {
    e.preventDefault();
    searchQuery = e.target.querySelector('input').value;
    fetchAPI();
})


async function fetchAPI(){
    const bassURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}&to=21`;
    const response = await fetch(bassURL);
    const data = await response.json();
    generateHTML(data.hits);
}

function generateHTML(results){
    container.classList.remove('initial');
    if(results.length == 0){
        container.classList.add('initial');
    }
    let generatedHTML = '';
    results.map(result => {
        generatedHTML += 
        `<div class="item">
            <img src="${result.recipe.image}" alt="">
            <div class="flex-container">
                <h1 class="title">${result.recipe.label}</h1>
                <a class="view-button" href="${result.recipe.url}" target="_blank">View Recipe</a>
            </div>
            <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p>
            <p class="item-data">Diet Label: ${result.recipe.dietLabels.length > 0 ? result.recipe.dietLabels : "No Data"}</p>
            <p class="item-data">Health Label: ${result.recipe.healthLabels}</p>
        </div>`;
    })
    searchResultDiv.innerHTML = generatedHTML;
}