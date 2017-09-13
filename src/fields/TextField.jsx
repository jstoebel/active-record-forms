import React from 'react';

import {FormGroup, FormControl, ControlLabel, HelpBlock} from 'react-bootstrap'
import {getValidationState} from '../helpers'

const TextField = ({ 
                    id, 
                    label, 
                    help,
                    meta,
                    ...props }) => {

  return (
    <FormGroup 
        controlId={id}
        validationState={getValidationState(meta)}
    >
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

export default TextField