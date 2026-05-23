import React from 'react'

export const ErrorCustomized = ({ message, classIcon}) => {
    return (
        <>
            <span>{message}</span><i className={classIcon} />
        </>
    )
}
