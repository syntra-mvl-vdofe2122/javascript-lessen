let $resourceList = document.getElementById('resource-list');
let $resourceItem = document.getElementById('resource-item');
let $resourceDetails = document.getElementById('resource-details');

let state = {
    selectedResource: null,
};

function getResourceFromUrl(url) {
    let splitUrl = url.split('/');
    return splitUrl[splitUrl.length - 3];
}

function generateResourceItemUrlFromName(name) {
    return `https://swapi.dev/api/${name}/`;
}

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

function drawPagination(resourceItem) {
    console.log(resourceItem);
    let paginationHTML = '<div class="pagination-btn-container">';

    if (resourceItem.previous) {
        paginationHTML += `<button class="pagination-btn" data-url="${resourceItem.previous}" >Previous</button>`;
    }

    if (resourceItem.next) {
        paginationHTML += `<button class="pagination-btn" data-url="${resourceItem.next}" >Next</button>`;
    }

    paginationHTML += '</div>';

    return paginationHTML;
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

    resourceHTML += drawPagination(resource);

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
    let dateKeys = ['created', 'edited'];

    let detailsPromises = detailKeys.map((key) => {
        if (ignoreKeys.includes(key)) {
            return Promise.resolve('');
        }

        if (urlKeys.includes(key)) {
            return fetchExtraDetails(key, details[key]);
        }

        if (dateKeys.includes(key)) {
            let dateString = new Date(details[key]).toLocaleDateString('nl-BE');

            return Promise.resolve(
                `<p><strong>${key}:</strong> ${dateString}</p>`,
            );
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

        if (state.selectedResource !== resourceName) {
            $resourceDetails.innerHTML = '';
        }

        state.selectedResource = resourceName;

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

    if (event.target.matches('.pagination-btn')) {
        console.log('ik werk');

        let resourceName = state.selectedResource;
        let url = event.target.dataset.url;

        fetchResourceItem(resourceName, url);
    }
}

/**
 * Click handler for extra buttons
 * @param {MouseEvent} event
 */
function resourceDetailsClicked(event) {
    if (event.target.matches('.resource-details-extra-btn')) {
        let resourceDetailsName = event.target.innerText;
        let url = event.target.dataset.url;

        let newResource = getResourceFromUrl(url);
        if (newResource !== state.selectedResource) {
            state.selectedResource = newResource;
            fetchResourceItem(
                newResource,
                generateResourceItemUrlFromName(newResource),
            );
        }

        fetchResourceDetails(resourceDetailsName, url);
    }
}

fetchResourceList();

$resourceList.addEventListener('click', resourceListClicked);
$resourceItem.addEventListener('click', resourceItemClicked);
$resourceDetails.addEventListener('click', resourceDetailsClicked);
