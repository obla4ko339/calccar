import React from 'react'
import {IParamsSelectParams} from './interface'



const RenderSelectParams = (props:IParamsSelectParams) =>{

    
   
    
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
            <div>Количество дней аренды</div>
            <div>{props.numberDay}</div>
          </div>
          <div>
            <div>Выбранные дополнительные параметры</div>
            <div>
            <div></div>
                {
                    // console.log( Object.keys(props.listDopParams) )
                    // params.map((item:string, index:number)=>(
                    //     <div>
                    //     <div></div>
                    //         {
                    //             console.log(item)
                    //         }
                    //     </div>
                    //))
                }
            </div>
          </div>
        </div>
      </div>

        </div>
    )
}

export default  RenderSelectParams