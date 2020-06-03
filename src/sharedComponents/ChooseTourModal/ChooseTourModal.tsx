import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { TOURS } from '../../constants';

type Props = {
  isShow: boolean,
  hideModal: Function,
}

const ChooseTourModal = ({isShow, hideModal}: Props) => {
  const tours = TOURS;
  const history = useHistory();

  const handleSelect = () => {
    history.push('/dashboard');
  }

  return (
    <Modal
      show={isShow}
      onHide={hideModal}
      centered
      className="choose-tour-modal"
    >
      <Modal.Header className="flex-column">
        <h1>Welcome to your Virtual Guide</h1>
        <h2>A shared virtual experience</h2>
      </Modal.Header>
      <Modal.Body>
        <h1>Choose your tour</h1>
        <div className="tour-list">
          <ul>
            {tours && tours.map((item) => {
              return (
                <li>{item.name}</li>
              );
            })}
          </ul>
        </div>
        <Button className="mt-2" onClick={() => {handleSelect()}}>Select</Button>
      </Modal.Body>
    </Modal>
  )
}

export default ChooseTourModal;