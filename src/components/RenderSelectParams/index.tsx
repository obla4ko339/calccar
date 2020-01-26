import React from 'react'
import {IParamsSelectParams} from './interface'



const RenderSelectParams = (props:IParamsSelectParams) =>{
    let listdop:Array<any> = []

    for(let value in props.listDopParams){
      listdop = [...listdop, props.listDopParams[value]]
    }

    
    return(
        <div>
        <div className="selectParams">
        <div>
          <h2>
            Выбранные Вами параметры
          </h2>
        </div>
        <div>
          <div>
            <div className="titleDop">Количество дней аренды</div>
            <div className="numberDay">{props.numberDay}</div>
          </div>
          <div>
            <div className="titleDop">Выбранные дополнительные параметры</div>
            <div >
            
                {
                     
                     listdop.map((item:any, index:number)=>(
                        <div key={index} className="listDopParams">
                            {item}
                        </div>
                    ))
                }
            </div>
          </div>
        </div>
      </div>

        </div>
    )
}

export default  RenderSelectParams