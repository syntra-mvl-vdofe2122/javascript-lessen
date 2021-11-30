// OBJECTS
let anObject = {};
let otherObject = new Object();

let newKey = 'gender';

let user = {
    name: 'Korneel',
    'full name': 'Korneel Eeckhout',
    age: 30,
    [newKey]: 'male',
};

console.log(user.name);
console.log(user['age']);
console.log(user['full name']);

let key = 'name';

console.log(user[key]);
console.log(user.key);

let brand = 'Toyota';
let year = 1999;

let car = {
    brand,
    year,
};

let carTwo = {
    brand: brand,
    year: year,
};

// do not user __proto__

console.log(user.lastName);

console.log('lastname' in user);
console.log('name' in user);

// METHODS

// .keys() / .values()

console.log(Object.keys(user));
console.log(Object.values(user));

let userKeys = Object.keys(user);

for (let i = 0; i < userKeys.length; i++) {
    console.log('Key: ' + userKeys[i]);
    console.log('Value: ' + user[userKeys[i]]);
}

// FOR ... IN loop

for (const key in user) {
    console.log('Key: ' + key);
    console.log('Value: ' + user[key]);
}
