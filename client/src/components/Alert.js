import React from 'react'

const Alert = ({ alert: { msg, type } }) => {
    return (
        <div id='alert' className={type}>
            <p>{msg}</p>
        </div>
    )
}

export default Alert
