import React from "react";
import { useSelector } from 'react-redux';
import { Button } from "react-bootstrap";

import * as CONSTANTS from "../../../constants";

type Props = {
  controller: string,
  handleEvent: Function
};

const BtnPanel = ({ controller, handleEvent }: Props) => {
  const { userState, virtualTourState } = useSelector((state: any) => ({
    userState: state.user,
    virtualTourState: state.virtualTour
  }));

  return (
    <div className="btn-container d-flex justify-content-end mt-2">
      {(!virtualTourState.eventType || virtualTourState.eventType === CONSTANTS.VIRTUAL_TOUR_CONTROL_EVENT.INIT) && (
        <Button
          variant="outline-primary"
          className={`btn-start btn-bugress-outline ${userState.user.role === controller? '': 'btn-disable'}`}
          onClick={() => handleEvent(CONSTANTS.VIRTUAL_TOUR_CONTROL_EVENT.INIT)}
        >
          Start
        </Button>
      )}

      {(virtualTourState.eventType && virtualTourState.eventType !== CONSTANTS.VIRTUAL_TOUR_CONTROL_EVENT.INIT) && (
        <>
          <Button
            variant="outline-primary"
            className={`btn-bugress-outline btn-secondary mr-2`}
            onClick={() => handleEvent(CONSTANTS.VIRTUAL_TOUR_CONTROL_EVENT.GOTO)}
          >
            Go to tour
          </Button>
          {virtualTourState.eventType !== CONSTANTS.VIRTUAL_TOUR_CONTROL_EVENT.PAUSE ? 
            (
              <>
                <Button
                  variant="outline-primary"
                  className={`btn-bugress-outline btn-secondary mr-2 ${userState.user.role === controller? '': 'btn-disable'}`}
                  onClick={() => handleEvent(CONSTANTS.VIRTUAL_TOUR_CONTROL_EVENT.PAUSE)}
                >
                  Stop session
                </Button>
                <Button
                  variant="outline-primary"
                  className={`btn-bugress-outline btn-secondary ${userState.user.role === controller? '': 'btn-disable'}`}
                  onClick={() => handleEvent(CONSTANTS.VIRTUAL_TOUR_CONTROL_EVENT.START)}
                >
                  Start
                </Button>
              </>
            ):
            (
              <>
                <Button
                  variant="outline-primary"
                  className={`btn-bugress-outline btn-secondary mr-2 stop ${userState.user.role === controller? '': 'btn-disable'}`}
                  onClick={() => handleEvent(CONSTANTS.VIRTUAL_TOUR_CONTROL_EVENT.STOP)}
                >
                  Stop session
                </Button>
                <Button
                  variant="outline-primary"
                  className={`btn-bugress-outline btn-secondary active ${userState.user.role === controller? '': 'btn-disable'}`}
                  onClick={() => handleEvent(CONSTANTS.VIRTUAL_TOUR_CONTROL_EVENT.START)}
                >
                  Resume
                </Button>
              </>
            )
          }          
        </>
      )}
    </div>
  );
};

export default BtnPanel;
