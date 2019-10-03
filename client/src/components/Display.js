import React, { Fragment } from 'react'

const Display = ({ db: { translation, text } }) => {
    return (
        <Fragment>
            {translation && translation.length > 0 ? (
                <Fragment>
                    <div>
                        <p>"{text}"</p>
                    </div>
                    <div id='display'>
                        {translation.map((item, index) => { return <p key={index}>{item}</p> })}
                    </div>
                </Fragment>
            ) : null}
        </Fragment>

    )
}

export default Display
