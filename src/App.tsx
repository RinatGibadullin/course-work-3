import React, { useEffect } from 'react';
import './styles/libs/bootstrap.scss'
import './styles/styles.scss'
import AppRouter from "./app/modules/navigation/routes";
import { useDispatch } from 'react-redux';
import { checkCurrentUserAuth } from 'app/modules/auth/store/current-user/actions';
import { ToastContainer } from 'react-toastify';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkCurrentUserAuth());
  }, []);
  return (
    <div className="container-fluid m-0 p-0" style={{ height: "100%" }}>
      <AppRouter />
      <ToastContainer
        position="top-right"
        hideProgressBar={true}
        pauseOnHover
        closeOnClick
        closeButton={false} autoClose={8000} />
    </div>
  );
}

export default App;
