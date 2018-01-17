import React from 'react'
import Osa from './Osa'

const Sisalto = ({ osat }) => (
    <div>
        { osat.map((osa, index) => <Osa key={index} osa={osa}/>) }
    </div>
)

export default Sisalto