import presence from './presence'

/**
* all validators are higher order functions that take validation options as an argument.
* they return a function that takes a value and returns the appropriate validation
*/

const validators = {
    presence
}

export default validators

