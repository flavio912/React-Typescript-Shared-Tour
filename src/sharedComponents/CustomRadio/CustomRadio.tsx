import React from 'react'
import { Form } from 'react-bootstrap';

type Props = {
  checkId?: string,
  value?: string,
  label?: string,
  name?: string,
  checked: boolean,
  onChange: Function,
}
const CustomRadio = ({
  label="",
  checkId=new Date().toString(),
  value=new Date().toString(),
  name="",
  checked,
  onChange
}: Props) => {  
  const handleChange = (event:any) => {    
    onChange(value)
  }

  return(
    <Form.Group className="bug-radio">
      <Form.Check 
        custom
        type={'radio'}
        label={label}
        id={name}
        name={name}
        onChange={(event:any) => {
          handleChange(event)
        }}
        checked={checked}
      />
    </Form.Group>
  )
}

export default CustomRadio;