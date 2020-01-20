import React, { ImgHTMLAttributes } from 'react'
import { HtmlAttributes } from 'csstype';


interface IpCarInterface {
    cars?: [],
    carName : string,
    carImg : string,
    carPrice? : number
    // (name : string, price : number) : boolean
}



class Cars extends React.Component<IpCarInterface>{


    render(){
        return(
            <div>
                {this.props.carName}
                <img src={this.props.carImg} alt=""/> 
            </div>
        )
    }
}

export default Cars