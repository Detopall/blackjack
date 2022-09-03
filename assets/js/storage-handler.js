"use strict";

function saveToStorage(key, value) {
    if (localStorage) {
        return localStorage.setItem(key,JSON.stringify(value));
    }
    return 'something went wrong';
}

function loadFromStorage(key) {
    if (localStorage) {
        return JSON.parse(localStorage.getItem(key));
    }
    return 'something went wrong';
}
