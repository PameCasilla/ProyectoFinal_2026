import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../stores/actions/auth/registerActions';
import Register from '../views/pages/authentication/Register';

export const RegisterContainer = () => {
  const dispatch = useDispatch();
  const onRegister = useCallback(async credentials => {
    await dispatch(register(credentials));
  }, [dispatch]);
  const loading = useSelector(state => state.isLoading);
  const notification = useSelector(state => state.notification);
  const registerUser = useSelector(state => state.register);

  return <Register
    onRegister={onRegister}
    register={registerUser}
    loading={loading}
    notification={notification}
  />;
};
