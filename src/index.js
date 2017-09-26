import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import TextField from './fields/TextField'
import FieldWrapper from './fields/FieldWrapper'
import axios from 'axios'
import {FormGroup, FormControl, ControlLabel} from 'react-bootstrap'

class Form extends Component {

    constructor() {
        super();
        this.render = this.render.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.state = {modelData: []}
        this.eachField = this.eachField.bind(this);
    }
    /**
     * fetch data on the model and set to state
     * @returns {undefined}
    */
    componentDidMount() {
        let _this = this;
        axios.get(`/model/${this.props.for}`)
             .then(function (response) {
                console.log(response)
                _this.setState({modelData: response.data.data})
             })
             .catch(function (error) {
                  // TODO render a form-wide error
                console.log(error);
             });

    }

    /**
     * renders each field based on model data
     * @param {object} field - data on how a field is structured
     * @param {number} i the index of the component
     * @returns a div containing a FieldWrapper component
    */
    eachField(field, i) {

        return (

            <div key={i}>
                <FieldWrapper
                    colName={field.col_name}
                    type={field.type}
                    validators={field.validators}
                />
            </div>
        )
    }

    render() {
        const {handleSubmit} = this.props;
        if (this.state.modelData) {
            return (
                <div>
                    <form onSubmit={handleSubmit(this.props.onSubmit)}>
                        {this.state.modelData.map(this.eachField)}
                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                </div>
            )
        } else {
            return <div></div>
        }
    }
}

export default Form