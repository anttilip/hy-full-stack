import React from 'react'

const Button = ({ name, cb }) => {
    return (
        <button onClick={cb}>{name}</button>
    )
}

export default Button