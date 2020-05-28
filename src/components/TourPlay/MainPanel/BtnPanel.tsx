import React from "react";
import { Button } from "react-bootstrap";

import * as CONSTANTS from "../../../constants";

type Props = {
  curPage: string,
  setPage: Function
};

const BtnPanel = ({ curPage, setPage }: Props) => {
  let stopSessionBtnClickableClass = (curPage === CONSTANTS.TOUR_PLAY_PAGE) ? 'clickable': '';

  return (
    <div className="btn-container d-flex justify-content-end mt-2">
      {curPage === CONSTANTS.TOUR_HOME_PAGE && (
        <Button
          variant="outline-primary"
          className="btn-start btn-bugress-outline"
          onClick={() => setPage(CONSTANTS.CONNECTING_PAGE)}
        >
          Start
        </Button>
      )}

      {curPage === CONSTANTS.CONNECTING_PAGE && (
        <>
          <Button
            variant="outline-primary"
            className="btn-bugress-outline btn-secondary mr-2"
          >
            Go to tour
          </Button>
          <Button
            variant="outline-primary"
            className="btn-bugress-outline btn-secondary mr-2"
          >
            Stop session
          </Button>
          <Button
            variant="outline-primary"
            className='btn-bugress-outline btn-secondary btn-disable'
          >
            Start
          </Button>
        </>
      )}

      {curPage === CONSTANTS.CONNECTED_PAGE && (
        <>
          <Button
            variant="outline-primary"
            className="btn-bugress-outline btn-secondary mr-2"
          >
            Go to tour
          </Button>
          <Button
            variant="outline-primary"
            className="btn-bugress-outline btn-secondary mr-2"
          >
            Stop session
          </Button>
          <Button
            variant="outline-primary"
            className='btn-bugress-outline btn-secondary'
            onClick={() => setPage(CONSTANTS.TOUR_START_PAGE)}
          >
            Start
          </Button>
        </>
      )}

      {curPage === CONSTANTS.TOUR_START_PAGE && (
        <>
          <Button
            variant="outline-primary"
            className="btn-bugress-outline btn-secondary mr-2 clickable"
          >
            Go to tour
          </Button>
          <Button
            variant="outline-primary"
            className="btn-bugress-outline btn-secondary mr-2"
          >
            Stop session
          </Button>
          <Button
            variant="outline-primary"
            className='btn-bugress-outline btn-secondary'
            onClick={() => setPage(CONSTANTS.TOUR_PLAY_PAGE)}
          >
            Start
          </Button>
        </>
      )}

      {curPage === CONSTANTS.TOUR_PLAY_PAGE && (
        <>
          <Button
            variant="outline-primary"
            className="btn-bugress-outline btn-secondary mr-2"
          >
            Go to tour
          </Button>
          <Button
            variant="outline-primary"
            className="btn-bugress-outline btn-secondary mr-2 clickable"
            onClick={() => setPage(CONSTANTS.TOUR_PAUSE_PAGE)}
          >
            Stop session
          </Button>
          <Button
            variant="outline-primary"
            className='btn-bugress-outline btn-secondary'
            onClick={() => setPage(CONSTANTS.TOUR_START_PAGE)}
          >
            Start
          </Button>
        </>
      )}

      {curPage === CONSTANTS.TOUR_PAUSE_PAGE && (
        <>
          <Button
            variant="outline-primary"
            className="btn-bugress-outline btn-secondary mr-2"
          >
            Go to tour
          </Button>
          <Button
            variant="outline-primary"
            className="btn-bugress-outline btn-secondary mr-2"
            onClick={() => setPage(CONSTANTS.TOUR_STOP_PAGE)}
          >
            Stop session
          </Button>
          <Button
            variant="outline-primary"
            className='btn-bugress-outline btn-secondary active'
            onClick={() => setPage(CONSTANTS.TOUR_PLAY_PAGE)}
          >
            Resume
          </Button>
        </>
      )}

      {curPage === CONSTANTS.TOUR_STOP_PAGE && (
        <>
          <Button
            variant="outline-primary"
            className="btn-bugress-outline btn-secondary mr-2"
          >
            Go to tour
          </Button>
          <Button
            variant="outline-primary"
            className="btn-bugress-outline btn-secondary mr-2 stop"
            onClick={() => setPage(CONSTANTS.TOUR_PLAY_PAGE)}
          >
            Stop session
          </Button>
          <Button
            variant="outline-primary"
            className='btn-bugress-outline btn-secondary active'
            onClick={() => setPage(CONSTANTS.TOUR_PLAY_PAGE)}
          >
            Resume
          </Button>
        </>
      )}
    </div>
  );
};

export default BtnPanel;
