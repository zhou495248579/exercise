// import html from './index.html'
// import styles from './styles/index.less';

/// <reference path="./ts-learn/validator.ts" />
/// <reference path="./ts-learn/letters-only-validator.ts" />
/// <reference path="./ts-learn/zip-code-validator.ts" />

let strings = ["Hello", "98052", "101"];

// Validators to use
let validators: { [s: string]: Validation.StringValidator; } = {};
validators["ZIP code"] = new Validation.ZipCodeValidator();
validators["Letters only"] = new Validation.LettersOnlyValidator();

// Show whether each string passed each validator
for (let s of strings) {
    for (let name in validators) {
        console.log(`"${ s }" - ${ validators[name].isAcceptable(s) ? "matches" : "does not match" } ${ name }`);
    }
}