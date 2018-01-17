import React from 'react'

const Feedback = ({ stats, onFeedback }) => {

    return (
        <div>
            { stats.map(stat => ( 
                <button key={stat.name} onClick={() => onFeedback(stat)}>
                    {stat.name}
                </button>
            )) }
        </div>
    )
}

export default Feedback