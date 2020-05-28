import styled from 'styled-components';
import { Button } from 'react-bootstrap';

const PlayButton = styled(Button)`
  background: transparent !important;
  border: 0 !important;
  outline: none !important;
  box-shadow: none !important;
  padding: 0;
  cursor: pointer;
  z-index: 10;

  &:after {
    display: none;
  }
  margin-bottom: 1rem;
`

export default PlayButton;