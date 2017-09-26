import React from 'react';

import {FormGroup, FormControl, ControlLabel, HelpBlock} from 'react-bootstrap'
import {getValidationState} from '../helpers'

const InputField = ({ 
                    id, 
                    label,
                    meta,
                    styles,
                    ...props }) => {

  return (
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

export default InputField