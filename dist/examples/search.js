"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src");
const main = () => src_1.default.search('Deadmau5', { lang: 'fr', country: 'FR' });
main().then((results) => console.log(results));