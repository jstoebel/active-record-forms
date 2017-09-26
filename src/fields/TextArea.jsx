import React from 'react';

import {FormGroup, FormControl, ControlLabel, HelpBlock} from 'react-bootstrap'
import {getValidationState} from '../helpers'

const TextArea = ({ 
                    id, 
                    label, 
                    help,
                    meta,
                    ...props }) => {

  return (

    // <FormGroup controlId="formControlsTextarea">
    //   <ControlLabel>Textarea</ControlLabel>
    //   <FormControl componentClass="textarea" placeholder="textarea" />
    // </FormGroup>

    <FormGroup 
        controlId={id}
        validationState={getValidationState(meta)}
    >
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {meta.touched && (meta.error || meta.warning) && <HelpBlock>{meta.error || meta.warning}</HelpBlock>}
      
    </FormGroup>
  );
}

export default TextArea


