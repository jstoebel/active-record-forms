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
import validatorIndex from '../validators/validators';
import InputField from './InputField';
import BooleanField from './BooleanField';
import {FormGroup, FormControl, ControlLabel} from 'react-bootstrap';

const renderField = ({id, 
               label, 
               help, 
               type,
               input,
               meta,
               ...props }) => {

  // text field for:
  // string, integer, decimal, float, bigint, text
  if (/decimal|float|integer|bigint|string|text/.test(type)) {

    const fieldProps = Object.assign({}, 
                                     {
                                       id: input.name,
                                       label: input.name,
                                       meta: meta,
                                     },
                                     input


    )

    // add type attr depending on data type
    if (type == 'string') {
      fieldProps.type = (input.name.toLowerCase() == 'password' ? 'password' : 'text')
    
    } else if (type == 'text') {
      fieldProps.componentClass = 'textarea'
    } else {
      // a number type
    }

    return (
      <InputField {...fieldProps} />
    )
  } else if (type == 'integer') {
    return (
      <InputField
        id={input.name}
        label={input.name}
        type="number"
        meta={meta}
        {...input}
      >
      </InputField>
    )
  } else if (type == 'boolean') {
    return (
        <BooleanField
          meta={meta}
          label={input.name}
          {...input}
        >
        </BooleanField>
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
          console.log(validator)  
          const validatorFunc = validatorIndex[validator.name]
          return validatorFunc({message: validator.options.message})
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