import React from 'react'
import './Statistics.css'
import Statistic from './Statistic'

const Statistics = ({ stats }) => {
    const getRenderContent = () => {
        const ratingSum = stats.reduce((sum, stat) => sum + stat.value * stat.votes, 0)
        const votes = stats.reduce((sum, stat) => sum + stat.votes, 0)
        const mean = Number(ratingSum / votes || 0).toFixed(2)
        const positiveVotes = stats
            .filter(stat => stat.value > 0)
            .reduce((sum, stat) => sum + stat.votes, 0)
        
        const positiveShare = Math.round((positiveVotes / votes || 0) * 100)

        // If no votes has been cast, do not show statistics
        if (votes === 0) return <p>yhtään palautetta ei ole annettu</p>

        return (
            <table>
                <tbody>
                    { stats.map(stat => <Statistic key={stat.name} stat={stat} />) }
                    <tr>
                        <td>keskiarvo</td>
                        <td>{mean}</td>
                    </tr>
                    <tr>
                        <td>positiivisia</td>
                        <td>{positiveShare} %</td>
                    </tr>
                </tbody>
            </table>
        )
    }

    return (
        <div>
            <h2>Statistiikka</h2>
            { getRenderContent(stats) }
        </div>
    )
}

export default Statistics