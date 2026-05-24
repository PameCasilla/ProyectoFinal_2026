import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../stores/actions/auth/resetPasswordAction';
import { ResetPasswordPage } from '../views/pages/authentication/ResetPasswordPage';

export const ResetPasswordContainer = () => {
    const loading = useSelector(state => state.isLoading);
    const notification = useSelector(state => state.notification);
    const resetPass = useSelector(state => state.resetPaswword);
    const dispatch = useDispatch();
    const onResetPassword = useCallback((token, password) => {
        dispatch(resetPassword(token, password));
    }, [dispatch])
    return <ResetPasswordPage
        onResetPassword={onResetPassword}
        resetPassword={resetPass}
        loading={loading}
        notification={notification}
    />
}
