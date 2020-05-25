import React from "react";
import { Button } from "react-bootstrap";

import * as CONSTANTS from "../../../constants";

type Props = {
  curPage: string,
  setPage: Function
};

const BtnPanel = ({ curPage, setPage }: Props) => {

  return (
    <div className="btn-container">
      {curPage === CONSTANTS.START_PAGE && (
        <Button
          variant="outline-primary"
          className="btn-start btn-bugress-outline"
          onClick={() => setPage(CONSTANTS.START_PAGE)}
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
            className="btn-bugress-outline btn-secondary btn-disable"
          >
            Start
          </Button>
        </>
      )}
    </div>
  );
};

export default BtnPanel;
