// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

/**
 * @param {JQuery<HTMLElement>} ctx -> context, the element passed into the assertion
 * @param {object} expected -> expected data object; key is the css property, value is the expected value
 * @param {string} elementName -> name of the element being tested
 * @returns (boolean | string)[]
 */
const assertChainer = (ctx: JQuery<HTMLElement>, expected: object, elementName: string) => {
    const hasCorrectProperties = Object.entries(expected).every(([key, value]) => ctx.css(key) === value);
    let positiveErrorString = `expected #{this} to be a ${elementName}\n`;
    Object.entries(expected).forEach(([key, value]) => { 
        if (ctx.css(key) !== value) { 
            positiveErrorString += `\nexpected #{this} to have ${key}: \n\t${value}, \nbut found:\n\t${ctx.css(key)}\n`;
        }
    });
    return [hasCorrectProperties, positiveErrorString];
}

chai.use((_chai, utils) => {
    utils.addProperty(_chai.Assertion.prototype, 'todoItem', function() {
        const expected = {
            padding: '15px 15px 15px 60px',
            'text-decoration': 'none solid rgb(72, 72, 72)'
        }
        this.assert(
            ...assertChainer(this._obj, expected, 'Todo Item')
        );
    })

    utils.addProperty(_chai.Assertion.prototype, 'completedTodoItem', function() {
        const expected = {
            padding: '15px 15px 15px 60px',
            'text-decoration': 'line-through solid rgb(148, 148, 148)', 
        }

        this.assert(
            ...assertChainer(this._obj, expected, 'Completed Todo Item')
        );
    });
})
