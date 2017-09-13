/**
* recives info on a field and renders the appropriate component
* info on the field:
*   type(string)
*   validators(json data from server)
*   example: [
        {
          "name": "presence",
          "options": {}
        }
      ]
*   name(string): name of field
*/

import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import validatorIndex from '../validators'
import TextField from './fields/TextField'
import {FormGroup, FormControl, ControlLabel} from 'react-bootstrap'

const renderField = ({id, 
               label, 
               help, 
               type,
               input,
               meta,
               ...props }) => {

  if (type == 'string') {
    console.log(meta)
    return (
      <TextField
        id={input.name}
        label={input.name}
        type={input.name.toLowerCase() == 'password' ? 'password' : 'text'}
        meta={meta}
        {...input}
      >
      </TextField>
    )
  
  } else {
    // not implemented
    return (
      <FormGroup>
        <ControlLabel>{input.name}</ControlLabel>
        <FormControl.Static>
          {type} is not implemented
        </FormControl.Static>
      </FormGroup>
    )
  }

};

export default class FieldWrapper extends Component {

    constructor(props) {
        super(props);
        this.render = this.render.bind(this);

        // see https://github.com/erikras/redux-form/issues/3288
        // You must define your validation functions outside of your render method. 
        //Additionally if they are a higher order function which receive props you should instantiate them when the component mounts / on instantiation.

        this.validators = this.props.validators.map((validator) => {
            const validatorFunc = validatorIndex[validator.name]
            return validatorFunc({message: "hey! don't leave that blank!"})
        })
    }

    render() {

        return (
            <Field
                name={this.props.colName}
                className="form-control"
                component={renderField}
                type={this.props.type}
                validate={this.validators}
            />
        )
    }
}