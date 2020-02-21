import React from 'react'
import {IParamsSelectParams} from './interface'



const RenderSelectParams = (props:IParamsSelectParams) =>{
    let listdop:Array<any> = []
    let priceParamsValue:number = 0
    let priceCar = parseInt(props.priceCar)
    let childChair = parseInt(props.childChairPrice) 
    let resultPriceChildChar:number = 0

    
    for(let value in props.listDopParams){
      listdop = [...listdop, props.listDopParams[value]]
    }

    if(childChair !== 0 && parseInt(props.numberDay) > 1){
      resultPriceChildChar = (childChair * parseInt(props.numberDay)) - 100
    }

    


    for(let pricePar in props.priceParams){
      priceParamsValue = priceParamsValue + parseInt(props.priceParams[pricePar])
    }
    console.log(resultPriceChildChar)
    let resultPriceArenda = priceParamsValue + priceCar + resultPriceChildChar
    


    
    return(
        <div>
        <div className="selectParams">
        <div>
          <h2>
            Итого: 
          </h2>
        </div>
        <div className="price">
          {resultPriceArenda}₽
        </div>
       
      </div>

        </div>
    )
}

export default  RenderSelectParams