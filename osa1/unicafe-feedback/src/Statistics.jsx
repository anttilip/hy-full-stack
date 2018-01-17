import React from 'react'

const Statistics = ({ stats }) => {
    return (
        <div>
            { stats.map(stat => <p key={stat.name}>{stat.name}: {stat.votes}</p>) }
        </div>
    )
}

export default Statistics