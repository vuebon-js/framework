const babel = require('@babel/core');
const fs    = require('fs');

const code = babel.transformFileSync("../core/App.js", {
    "presets": [
        ["@babel/env", {
            "debug": true,
            "useBuiltIns": "usage",
            "targets": "last 3 Chrome versions",
            "corejs": 3
        }]
    ],
    "plugins": [
        ["@babel/proposal-decorators", { "legacy": true }],
        ["@babel/plugin-proposal-class-properties"],
        ["@babel/plugin-proposal-private-methods"],
        "@babel/proposal-logical-assignment-operators",
        "@babel/plugin-proposal-optional-chaining",
        "@babel/plugin-proposal-nullish-coalescing-operator"
    ]
}).code;

fs.writeFile('../dist/App.js', code, (err) => {
    if (err) throw err;

    console.log("The file was successfully saved!");
})