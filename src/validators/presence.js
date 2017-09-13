/**
* returns a validator for required presence
* msg(string): the error message to display
* value(string): the value of the field
*/
const presence = options => value => value ? undefined : options.message || 'can\'t be blank'

export default presence

