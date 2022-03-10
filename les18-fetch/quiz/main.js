let $catSelectContainer = document.getElementById('cat-select-container');
let $catSelectForm = document.getElementById('cat-select-form');
let $catSelectSelect = document.getElementById('cat-select-select');
let $catSelectSubmit = document.getElementById('cat-select-submit');
let $quizContainer = document.getElementById('quiz-container');
let $quizTitle = document.getElementById('quiz-title');

let state = {
    selectedCatId: null,
    selectCatText: null,
};

// Draw Function

function drawPage() {
    if (state.selectedCatId === null && state.selectCatText === null) {
        $catSelectContainer.classList.remove('hidden');
        $quizContainer.classList.add('hidden');
    } else {
        $quizTitle.innerText = `${state.selectCatText} Quiz`;
        $catSelectContainer.classList.add('hidden');
        $quizContainer.classList.remove('hidden');
    }
}

function disableCatForm() {
    $catSelectSelect.disabled = true;
    $catSelectSubmit.disabled = true;
}

function enableCatForm() {
    $catSelectSelect.disabled = false;
    $catSelectSubmit.disabled = false;
}

function drawOptions(categories) {
    let optionsHTML = categories.reduce((html, category) => {
        console.log({ html, category });

        html += `<option value="${category.id}">${category.name}</option>`;

        return html;
    }, '');

    console.log(optionsHTML);
    $catSelectSelect.innerHTML = optionsHTML;
}

// Fetch Functions

function fetchQuestions() {
    let queryParams = new URLSearchParams();
    queryParams.append('amount', 10);
    queryParams.append('category', state.selectedCatId);
    queryParams.append('difficulty', 'medium');
    queryParams.append('type', 'boolean');

    fetch('https://opentdb.com/api.php?' + queryParams.toString())
        .then((response) => {
            if (!response.ok) {
                throw new Error('Could not fetch questions');
            }

            return response.json();
        })
        .then((body) => {
            console.log(body);
        })
        .catch((error) => {
            console.error(error);
        });
}

function fetchCategories() {
    disableCatForm();

    fetch('https://opentdb.com/api_category.php')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Could not fetch categories');
            }

            return response.json();
        })
        .then((body) => {
            drawOptions(body.trivia_categories);
        })
        .catch((error) => {
            console.error(error);
        })
        .finally(() => {
            enableCatForm();
        });
}

// Event Handlers

function submitCatSelect(event) {
    event.preventDefault();

    let activeOption = event.target.querySelector('option:checked');

    state.selectedCatId = activeOption.value;
    state.selectCatText = activeOption.innerText;

    fetchQuestions();
    drawPage();
}

$catSelectForm.addEventListener('submit', submitCatSelect);

fetchCategories();
