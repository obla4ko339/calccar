import React, { HTMLAttributes } from 'react'
import {Idays} from './interface'


const Days = (props:Idays) =>{


    return (
        <div className="container_days">
            <div className={props.activeClass === 0 ? "container_days_active" : ""} data-daynumber="0" onClick={(e)=>props.hendleDay(e.currentTarget.dataset.daynumber)}>Тариф "Базовый"</div>
            <div className={props.activeClass === 1 ? "container_days_active" : ""} data-daynumber="1" onClick={(e)=>props.hendleDay(e.currentTarget.dataset.daynumber)}>Тариф "Выходные" <span className="subtext">действует с 17:00 пятницы до 09:00 понедельника</span> </div>
        </div>
    )
}

export default Days


