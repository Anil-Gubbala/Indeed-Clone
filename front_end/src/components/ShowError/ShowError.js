import { Alert } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { STATE } from '../../reducers/reducerConst';

const ShowError = () => {
  const [showAlert, setShowAlert] = useState(false);
  const errorState = useSelector((state) => state.errorReducer);
  const [errorMsg, setErrorMsg] = useState('');

  const hideAlert = () => {
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  useEffect(() => {
    if (errorState[STATE.ERR_MSG] !== '') {
      setErrorMsg(errorState[STATE.ERR_MSG]);
      setShowAlert(true);
      hideAlert();
    }
  }, [errorState]);

  return (
    <>
      {showAlert && (
        <div style={{ position: 'fixed', bottom: '10px', zIndex: '2' }}>
          <Alert variant="danger">{errorMsg}</Alert>
        </div>
      )}
    </>
  );
};

export default ShowError;
