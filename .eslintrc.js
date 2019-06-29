module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": "airbnb",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        "indent": ["warn", 4, { "SwitchCase": 1 }],
        "quotes": ["warn", "double"],
        "comma-dangle": ["error", "never"],
        "padded-blocks": ["warn", { "classes": "always" }],
        "import/prefer-default-export": false,
        "import/extensions": false
    },
    "globals": {
        "Handlebars": "readonly",
    }
};