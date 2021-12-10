# Les 8 - DOM

## Attributes

Standard HTML tag attributes become properties and visa versa

```javascript
// <input type="text" id="input-one" />

let input = document.getElementById('input');

console.log(input.type); // 'text'
console.log(input.id); // 'input-one'
```

### Methods to use attributes

These methods also read / write non-standard HTML attributes

```javascript
elem.hasAttribute(name); // checks for existence.
elem.getAttribute(name); // gets the value.
elem.setAttribute(name, value); // sets the value.
elem.removeAttribute(name); // removes the attribute.
```

https://javascript.info/dom-attributes-and-properties#html-attributes

## .classList

```javascript
el.classList.add('open'); // Add a class
el.classList.add('this', 'little', 'piggy'); // Add many classes
el.classList.remove('open'); // Remove a class
el.classList.remove('this', 'little', 'piggy'); // Remove multiple classes
el.classList.replace('is-big', 'is-small'); // Replace a class
el.classList.toggle('open'); // Toggle a class
el.classList.contains('open'); // Check if element has class
```

https://css-tricks.com/snippets/javascript/the-classlist-api/
https://www.javascripttutorial.net/javascript-dom/javascript-classlist/

## Creating elements

## Inserting elements

## Removing elements
