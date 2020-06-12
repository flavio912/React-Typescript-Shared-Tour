import React from 'react';
import styled from 'styled-components';
import { Spinner } from 'react-bootstrap';

const CustomLoading = (() => {
  return (
    <CustomSpinner>
      <Spinner animation="grow" variant="info" /><span className="ml-2">Loading...</span>
    </CustomSpinner>
  )
})

const CustomSpinner = styled.div`
  color: #00AFD3;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-weight: 700;
`

export default CustomLoading;