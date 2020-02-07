import React from 'react'
import {listDops} from './listDops'
import {IdopsRender} from './interfaceList'



export default function DopsRender(props:IdopsRender){

    return(
        <div>
            <div >
                {
                    listDops.map((item, index)=>(
                        <div key={index}>
                            <input type="checkbox" name={item.indetificator} className="dopParams" data-price={item.price} data-nameobject={item.indetificator} id={item.indetificator} data-namefield={item.spendAuto} onClick={(e)=>props.handleCheck(e.currentTarget)} />
                            <label htmlFor={item.indetificator}>{item.spendAuto}</label>
                        </div>
                    ))
                }
            </div>
        </div>
    )

}