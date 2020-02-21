import React from 'react'
import {listDops} from './listDops'
import {IdopsRender} from './interfaceList'



export default function DopsRender(props:IdopsRender){
    

    

    return(
        <div>
            <div >
                {
                    listDops.map((item, index)=>(
                        <div key={index} className="container_dop">
                            <div className="dop__title">
                                <input type="checkbox" name={item.indetificator} className="dopParams" data-numday={props.numday} data-price={item.price} data-nameobject={item.indetificator} id={item.indetificator} data-namefield={item.spendAuto} onClick={(e)=>props.handleCheck(e.currentTarget)} />
                                <label htmlFor={item.indetificator}>{item.spendAuto}</label>
                            </div>
                            <div className="dop__price dop__price_disactive">
                            {item.indetificator === "childchair_child" ? `Цена: ${item.price * parseInt(props.numday) }₽` : `Цена: ${item.price}₽`}
                               
                            </div>
                        </div>
                        
                    ))
                }
            </div>
            {props.children}
        </div>
    )

}