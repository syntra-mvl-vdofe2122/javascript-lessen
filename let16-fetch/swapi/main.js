let $resourceBtnsContainer = document.getElementById('resource-btns-container');
let $resourceContainer = document.getElementById('resource-container');
let $resourceDetailsContainer = document.getElementById(
    'resource-details-container',
);

/**
 * Inserts resource btn in $resourceContainer
 * @param {string} name
 * @param {string} url
 */
function drawResourceButton(name, url) {
    let html = `<button data-url='${url}' class='resource-btn'>${name}</button>`;

    $resourceBtnsContainer.insertAdjacentHTML('beforeend', html);
}

/**
 * Draw list of items in resource
 * @param {array} items
 * @param {string} resourceName
 */
function drawResourceList(items, resourceName) {
    console.log(items);

    let titleHTML = `<h2>${resourceName}</h2>`;
    $resourceContainer.insertAdjacentHTML('beforeend', titleHTML);

    items.forEach(function (item) {
        let name = item['name'] ? item['name'] : item['title'];
        let itemHTML = `<button data-url='${item['url']}' class='resource-item-btn'>${name}</button>`;

        $resourceContainer.insertAdjacentHTML('beforeend', itemHTML);
    });
}

function drawDetails(details, name) {
    console.log({ details, name });

    let detailsKeys = Object.keys(details);
    let ignoredKeys = ['name', 'title', 'url'];

    let titleHTML = `<h2>${name}</h2>`;
    $resourceDetailsContainer.insertAdjacentHTML('beforeend', titleHTML);

    detailsKeys.forEach(function (key) {
        if (!ignoredKeys.includes(key)) {
            let detailHTML = `<p><strong>${key}:</strong> ${details[key]}</p>`;
            $resourceDetailsContainer.insertAdjacentHTML(
                'beforeend',
                detailHTML,
            );
        }
    });
}

/**
 * Fetches list of available resources
 */
function fetchResourceList() {
    fetch('https://swapi.dev/api/')
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Root request failed');
            }

            return response.json();
        })
        .then(function (body) {
            console.log(body);

            let keys = Object.keys(body);

            keys.forEach(function (key) {
                drawResourceButton(key, body[key]);
            });
        })
        .catch(function (error) {
            console.error(error);
        });
}

/**
 * Fetch resource
 * @param {string} name
 * @param {string} url
 */
function fetchResource(name, url) {
    console.log({ name, url });
    fetch(url)
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Root request failed');
            }

            return response.json();
        })
        .then(function (body) {
            console.log(body);
            drawResourceList(body.results, name);
        })
        .catch(function (error) {
            console.error(error);
        });
}

function fetchDetails(name, url) {
    fetch(url)
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Root request failed');
            }

            return response.json();
        })
        .then(function (body) {
            console.log(body);
            drawDetails(body, name);
        })
        .catch(function (error) {
            console.error(error);
        });
}

/**
 * $resourceBtnsContainer click event handler
 * @param {MouseEvent} event
 */
function resourceBtnClicked(event) {
    let $target = event.target;
    $resourceContainer.innerHTML = '';
    $resourceDetailsContainer.innerHTML = '';

    if ($target.matches('.resource-btn')) {
        let name = $target.innerText;
        let url = $target.dataset.url;

        fetchResource(name, url);
    }
}

/**
 * Click handler for $resourceContainer
 * @param {MouseEvent} event
 */
function resourceItemBtnClicked(event) {
    let $target = event.target;
    $resourceDetailsContainer.innerHTML = '';

    if ($target.matches('.resource-item-btn')) {
        let name = $target.innerText;
        let url = $target.dataset.url;

        fetchDetails(name, url);
    }
}

$resourceBtnsContainer.addEventListener('click', resourceBtnClicked);
$resourceContainer.addEventListener('click', resourceItemBtnClicked);
fetchResourceList();
