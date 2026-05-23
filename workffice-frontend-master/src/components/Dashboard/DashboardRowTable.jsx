import React from 'react'

export const DashboardRowTable = (props) => {
    return (
        <tr>
            <td style={{fontWeight:'bolder', color: '#133148', fontSize:'20px'}}>{props.title}</td>
            <td className="text-right" style={{fontWeight:'bolder', color: '#34b18a',fontSize:'20px'}}>{props.value}</td>
        </tr>
    )
}
