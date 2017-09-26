import React from 'react';

import {Checkbox, FormGroup, ControlLabel, HelpBlock} from 'react-bootstrap'
import {getValidationState} from '../helpers'

const BooleanField = ({meta,
                     label,
                     ...props }) => {

  return (

    <FormGroup 
        validationState={getValidationState(meta)}
    >
      <ControlLabel>{label}</ControlLabel>
      <Checkbox {...props} />
      {meta.touched && (meta.error || meta.warning) && <HelpBlock>{meta.error || meta.warning}</HelpBlock>}
      
    </FormGroup>
  );
};

export default BooleanField;