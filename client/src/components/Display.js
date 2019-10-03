import React, { Fragment } from 'react'

const Display = ({ db: { translation, text } }) => {
    return (
        <div>
            {translation && translation.length > 0 ? (
                <Fragment>
                    <div>
                        <p>"{text}"</p>
                    </div>
                    <div id='display'>
                        <p>{translation.join("")}</p>
                    </div>
                </Fragment>
            ) : null}
        </div>

    )
}

export default Display
