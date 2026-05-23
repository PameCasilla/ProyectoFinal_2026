import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { userLogin } from '../stores/actions/auth/loginActions';
import Login from '../views/pages/authentication/Login';

export const LoginContainer = () => {
  const loading = useSelector(state => state.isLoading);
  const notification = useSelector(state => state.notification);
  const dispatch = useDispatch();
  const onLogin = useCallback(async credentials => {
    await dispatch(userLogin(credentials));
  }, [dispatch]);
  return <Login onLogin={onLogin} loading={loading} notification={notification} />;
};
