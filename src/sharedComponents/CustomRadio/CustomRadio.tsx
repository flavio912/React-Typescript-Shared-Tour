import React from 'react'
import { Form } from 'react-bootstrap';
import styled from 'styled-components';

const CustomRadio = () => {
  return(
    <Form.Check type={"radio"}>
      <Form.Check.Label>{'CustomRadio'}</Form.Check.Label>      
    </Form.Check>
  )
}


// .bug-radio {
//   display: inline-flex;
//   padding-left: 30px;  
//   line-height: 27px;
// }

// .bug-radio.custom-radio .custom-control-input:checked~.custom-control-label {
//   /* position: relative; */
//   line-height: 27px;
// }

// .custom-radio .custom-control-label::before {
//   width: 27px;
//   height: 27px;
//   top: 0;
//   border: 1px solid #707070;    
//   background-color: transparent !important;  
// }

// .bug-radio.custom-radio .custom-control-input:checked~.custom-control-label::before {
//   background-image: none;
// }

// .custom-radio .custom-control-input:checked~.custom-control-label::after {
//   position: absolute;
//   top: 7px;
//   left: 7px;
//   width: 13px;
//   height: 13px;
//   background-color: #37BBC8;  
//   background-image: none;
//   border-radius: 6.5px;
// }
export default CustomRadio;