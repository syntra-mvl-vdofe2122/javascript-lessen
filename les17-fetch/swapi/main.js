let $resourceList = document.getElementById('resource-list');
let $resourceItem = document.getElementById('resource-item');
let $resourceDetails = document.getElementById('resource-details');

/**
 * Draw buttons for each resource
 * @param {Object} resources
 */
function drawResourceList(resources) {
    let keys = Object.keys(resources);

    let resourceBtns = keys.reduce((previousVal, key) => {
        previousVal += `<button class="resourse-item-btn" data-url="${resources[key]}">${key}</button>`;

        return previousVal;
    }, '');

    $resourceList.insertAdjacentHTML('beforeend', resourceBtns);
}

/**
 * Draw resource item
 * @param {string} name
 * @param {object} resource
 */
function drawResourceItem(name, resource) {
    let resourceHTML = `<h2>${name}</h2>`;

    resourceHTML = resource.results.reduce((prevVal, item) => {
        let label = item.name ? item.name : item.title;

        prevVal += `<button class="resource-details-btn" data-url="${item.url}">${label}</button>`;
        return prevVal;
    }, resourceHTML);

    $resourceItem.innerHTML = resourceHTML;
}

function drawResourceDetails(name, details) {
    let detailKeys = Object.keys(details);
    let detailsHTML = `<h2>${name}</h2>`;
    let ignoreKeys = ['name', 'title', 'url'];
    let urlKeys = [
        'homeworld',
        'people',
        'films',
        'vehicles',
        'planets',
        'species',
        'vehicles',
        'starships',
        'residents',
        'characters',
        'pilots',
    ];

    let detailsPromises = detailKeys.map((key) => {
        if (ignoreKeys.includes(key)) {
            return Promise.resolve('');
        }

        if (urlKeys.includes(key)) {
            return fetchExtraDetails(key, details[key]);
        }

        return Promise.resolve(
            `<p><strong>${key}:</strong> ${details[key]}</p>`,
        );
    });

    return Promise.all(detailsPromises)
        .then((detailsItemHTML) => {
            detailsHTML = detailsItemHTML.reduce((prevVal, item) => {
                prevVal += item;

                return prevVal;
            }, detailsHTML);

            $resourceDetails.innerHTML = detailsHTML;
        })
        .catch((error) => {
            console.error(error);

            detailsHTML += `<p>${error}</p>`;
            $resourceDetails.innerHTML = detailsHTML;
        });
}

/**
 * Fetch extra details
 * @param {string} key
 * @param {string[], string} urls
 */
function fetchExtraDetails(key, urls) {
    if (!Array.isArray(urls)) {
        urls = [urls];
    }

    console.log(urls);

    let urlsFetch = urls.map((url) => {
        return fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Fetching resource item failed');
                }

                return response.json();
            })
            .then((body) => {
                let label = body.name ? body.name : body.title;

                return `<button class="resource-details-extra-btn" data-url="${body.url}">${label}</button>`;
            });
    });

    return Promise.all(urlsFetch).then((btns) => {
        console.log(btns);
        let btnsHTML = btns.reduce((prevVal, btns) => {
            prevVal += btns;
            return prevVal;
        }, '');

        return `<p><strong>${key}:</strong> ${btnsHTML}</p>`;
    });
}

/**
 * Fetches list of all available resources
 * @return {Promise<Response>}
 */
function fetchResourceList() {
    $resourceList.classList.add('loading');
    return fetch('https://swapi.dev/api/')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Fetching resource list failed');
            }

            return response.json();
        })
        .then((body) => {
            drawResourceList(body);
        })
        .catch((error) => {
            console.error(error);
        })
        .finally(() => {
            $resourceList.classList.remove('loading');
        });
}

/**
 * Fetch resource item
 * @param {string} name
 * @param {string} url
 * @return {Promise<Response>}
 */
function fetchResourceItem(name, url) {
    $resourceItem.classList.add('loading');
    return fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Fetching resource item failed');
            }

            return response.json();
        })
        .then((body) => {
            drawResourceItem(name, body);
        })
        .catch((error) => {
            console.error(error);
        })
        .finally(() => {
            $resourceItem.classList.remove('loading');
        });
}

/**
 * Fetch resource details
 * @param {string} name
 * @param {string} url
 * @return {Promise<any>}
 */
function fetchResourceDetails(name, url) {
    $resourceDetails.classList.add('loading');
    return fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Fetching resource item failed');
            }

            return response.json();
        })
        .then((body) => {
            return drawResourceDetails(name, body);
        })
        .catch((error) => {
            console.error(error);
        })
        .finally(() => {
            $resourceDetails.classList.remove('loading');
        });
}

/**
 * Click handler for $resourceList
 * @param {MouseEvent} event
 */
function resourceListClicked(event) {
    if (event.target.matches('.resourse-item-btn')) {
        let resourceName = event.target.innerText;
        let url = event.target.dataset.url;

        fetchResourceItem(resourceName, url);
    }
}

/**
 * Click handler for $resourceItem
 * @param {MouseEvent} event
 */
function resourceItemClicked(event) {
    if (event.target.matches('.resource-details-btn')) {
        let resourceName = event.target.innerText;
        let url = event.target.dataset.url;

        fetchResourceDetails(resourceName, url);
    }
}

function resourceDetailsClicked(event) {
    if (event.target.matches('.resource-details-extra-btn')) {
        let resourceName = event.target.innerText;
        let url = event.target.dataset.url;

        fetchResourceDetails(resourceName, url);
    }
}

fetchResourceList();

$resourceList.addEventListener('click', resourceListClicked);
$resourceItem.addEventListener('click', resourceItemClicked);
$resourceDetails.addEventListener('click', resourceDetailsClicked);
