import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { recovery } from '../stores/actions/auth/recoveryPasswordActions';
import { RecoveryPassword } from '../views/pages/authentication/RecoveryPassword';


export const RecoveryPasswordContainer = () => {
    const loading = useSelector(state => state.isLoading);
    const notification = useSelector(state => state.notification);
    const dispatch = useDispatch();
    const onRecovery = useCallback(userEmail => {
        dispatch(recovery(userEmail));
    }, [])
    return <RecoveryPassword onResetPassword={onRecovery} loading={loading} notification={notification} />
};
