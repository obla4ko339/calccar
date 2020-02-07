import React from 'react'
import {IParamsSelectParams} from './interface'



const RenderSelectParams = (props:IParamsSelectParams) =>{
    let listdop:Array<any> = []
    let priceParamsValue:number = 0
    let priceCar = parseInt(props.priceCar) 
    

    for(let value in props.listDopParams){
      listdop = [...listdop, props.listDopParams[value]]
    }


    for(let pricePar in props.priceParams){
      priceParamsValue = priceParamsValue + parseInt(props.priceParams[pricePar])
    }
    let resultPriceArenda = priceParamsValue + priceCar
    


    
    return(
        <div>
        <div className="selectParams">
        <div>
          <h2>
            Стоимость аренды автомобиля
          </h2>
        </div>
        <div className="price">
          {resultPriceArenda}₽
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