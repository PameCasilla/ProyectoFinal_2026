import PropType from 'prop-types'
import React from 'react'
import { Alert } from "reactstrap"

export const Notification = ({ show, isError, message, hideNotification }) => {
    return (
        <Alert
            isOpen={show}
            color={isError ? "danger" : "success"}
            toggle={hideNotification}
            className="alert-with-icon"
        >
            {
                isError ? <span data-notify="icon" className="nc-icon nc-alert-circle-i"></span>
                    : <span data-notify="icon" className="nc-icon nc-check-2"></span>
            }
            <span data-notify="message">{message}</span>
        </Alert>
    )
}

Notification.propTypes = {
    show: PropType.bool.isRequired,
    isError: PropType.bool,
    message: PropType.string.isRequired,
    hideNotification: PropType.func
}