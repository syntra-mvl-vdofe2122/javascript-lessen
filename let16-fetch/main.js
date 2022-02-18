// JSON

let testData = {
    id: 12,
    name: 'Hilco',
    age: 24,
    children: null,
};

let jsonData = JSON.stringify(testData);

console.log(jsonData);

let data = JSON.parse(jsonData);

console.log(data);

// fetch

console.log(fetch('https://swapi.dev/api/'));

fetch('https://swapi.dev/api/')
    .then(function (response) {
        if (!response.ok) {
            throw new Error('request failed');
        }

        return response.json();
    })
    .then(function (body) {
        console.log(body);
    })
    .catch(function (error) {
        console.error(error);
    });
