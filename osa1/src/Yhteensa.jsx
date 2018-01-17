import React from 'react'

const Yhteensa = ({ osat }) => {
    const summa = osat.reduce((sum, osa) => sum + osa.tehtavia, 0)
    return (
        <p>yhteensä {summa} tehtävää</p>
    )
}

export default Yhteensa