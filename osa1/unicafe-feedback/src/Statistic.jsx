import React from 'react'

const Statistic = ({ stat }) => {

    return (
        <tr>
            <td>{stat.name}</td>
            <td>{stat.votes}</td>
        </tr>
    )
}

export default Statistic