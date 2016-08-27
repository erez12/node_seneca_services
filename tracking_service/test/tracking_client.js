"use strict";

const request = require('request');
const ONE_MILION = 1000000;

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}
// Using these function so not to deal with precision issues
let to1MValue = (x) => x * ONE_MILION;
let toRealValue = (x) => x / ONE_MILION;

let changeLoaction = (x) => toRealValue(to1MValue(x) + to1MValue(Math.random().toFixed(5) * Math.round(Math.random()) * 2 - 1))
let bag_id = guid();
let lon = 51.49913;
let lat = -0.12829;

setInterval(() => {
    request({
        method: 'PUT',
        url: 'http://127.0.0.1:3003/api/tracking',
        json: true,
        body: {
            lon,
            lat,
            bag_id
        }
    });
    lon = changeLoaction(lon);
    lat = changeLoaction(lat);
}, 1000 * 5)