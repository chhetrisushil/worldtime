/******************************************
*  Author : Sushil Chhetri
*  Created On : Sat Mar 03 2018
*  File : .eslintrc.js
*******************************************/
module.exports = {
    "parserOptions": {
        "ecmaVersion": 2017
    },
    "env": {
        "node": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-console": "off"
    }
};