import React from 'react'
import Button from './Button'

const Feedback = ({ stats, onFeedback }) => {

    return (
        <div>
            <h2>Anna palautetta</h2>
            { stats.map(stat => (
                <Button
                    key={stat.name}
                    name={stat.name}
                    cb={() => onFeedback(stat)}
                />
            )) }
        </div>
    )
}

export default Feedback