import React, { ImgHTMLAttributes } from 'react'
import { HtmlAttributes } from 'csstype';


interface IpCarInterface{
   
    carName : string,
    carImg : string,
    carPrice? : number,
    listCars:any,
    handlerCarIndex(data:any):any
}



class Cars extends React.Component<IpCarInterface>{


    render(){
        return(
            <div>
            <div>
            {
                this.props.listCars.map((item:any, index:number)=>(
                  <div key={index}>
                    <img src={item.featured_media_url} alt={item.title.rendered} width="150px" data-id={item.id} data-ar={index} onClick={(e)=>this.props.handlerCarIndex(e.currentTarget.dataset.ar)} />
                  </div>
               ))
               }
            </div>
               
            </div>
        )
    }
}

export default Cars