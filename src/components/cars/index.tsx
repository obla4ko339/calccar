import React, { ImgHTMLAttributes, HtmlHTMLAttributes } from 'react'
import { HtmlAttributes } from 'csstype';
import { stringify } from 'querystring';


interface IpCarInterface {
   
    carName : string,
    carImg : string,
    carPrice? : number,
    listCars:any,
    handlerCarIndex(data:any):any
}





class Cars extends React.Component<IpCarInterface, {}>{

    private sliderShift:number = 0
    private height_lenta:number = 500
    private countVisibleImg:number = 4
    private container_img = document.getElementsByClassName("img_car_list")
   
    
 
    handleUp(){
        const upBottonLine = document.getElementById("upBottonLine")
        console.log(this.sliderShift)
        if(upBottonLine){
            this.sliderShift = this.sliderShift - this.height_lenta
           
            if(this.sliderShift >= 0){
                upBottonLine.style.marginTop = -this.sliderShift+"px"
            }else{
                this.sliderShift = 0
            }
            console.log(this.sliderShift)
            
            upBottonLine.style.transition = "all 0.5s"
        }
    }

    handleBottom(){
        const upBottonLine = document.getElementById("upBottonLine")
        const numberAuto = this.container_img.length
        const visible_img = (this.height_lenta / this.countVisibleImg) - 10
        const maxBottom = numberAuto * visible_img
       
        if(upBottonLine){
            this.sliderShift = this.sliderShift + this.height_lenta
           
            if(this.sliderShift<=maxBottom+this.height_lenta){
                upBottonLine.style.marginTop = -this.sliderShift+"px"
                console.log(this.sliderShift)
            }else{
                this.sliderShift = this.sliderShift - 500
            }
            upBottonLine.style.transition = "all 0.5s"
        }
    }

    componentDidMount(){
        const img_lenta = document.getElementById("img_lenta")
        const visible_img = (this.height_lenta / this.countVisibleImg) - 10
        if(img_lenta){
            img_lenta.style.height = this.height_lenta+"px"
        }
        for(let i=0; i<this.container_img.length; i++){
            this.container_img[i].setAttribute("height", visible_img.toString()+"px") 
            this.container_img[i].setAttribute("width", 168+"px") 
        }
    }


    render(){
      
        return(
            <div className="container_img_lenta">
            <div className="topLenta navigation_car" id="topLenta" onClick={ ()=>this.handleUp() } >
            <img src="http://cdn.onlinewebfonts.com/svg/img_440225.png" className="imgTop totalIconImg" alt=""/>
            </div>
            <div className="img_lenta" id="img_lenta">
            <div className="upBottonLine" id="upBottonLine">
            {
                this.props.listCars.map((item:any, index:number)=>(
                  <div key={index}  className="container_img">
                  
                    <img className="img_car_list" src={item.featured_media_url} alt={item.title.rendered} height="120px" data-id={item.id} data-ar={index} onClick={(e)=>this.props.handlerCarIndex(e)} />
                   
                  </div>
               ))
               }
               </div>
            </div>
            <div className="bottomLenta navigation_car" id="bottomLenta" onClick={(e)=>this.handleBottom()}>
            <img src="http://cdn.onlinewebfonts.com/svg/img_440225.png" className="imgBottom totalIconImg" alt=""/>
            </div>
            </div>
        )
    }
}

export default Cars