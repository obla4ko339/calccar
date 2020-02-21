import React from 'react';
import Cars from './components/cars'
import './static/css/style.css'
import DopsRender from './components/DopsRender'
import CallBack from './components/CallBack'
import RenderSelectParams from './components/RenderSelectParams'
import StatusRequest from './components/StatusRequest'
import Days from './components/Days'
import { type } from 'os';
import { stringify } from 'querystring';


interface InInterface{
  cars:any,
  indexCar:any,
  dopParamas:any,
  numberDay:string,
  nameCallBack:string,
  telCalBack:string,
  selectCar:any,
  nameCar:string,
  photoCar:string,
  statusRequest:boolean,
  tarif:number,
  price:number,
  priceParams:any,
  childchairChild:any,
  visibleCalc:boolean,
  isvisibleCallback:boolean

}


class App extends React.Component<{},InInterface>{

  private listDop:any = ""
  public params:Array<any> = []
  public  parametr:any = {}
  private paramsPrice:any = {}
  

  constructor(props:any){
    super(props)
    this.state = {cars:0, 
                  indexCar:0,
                  dopParamas:0, 
                  numberDay:"1", 
                  nameCallBack:"", 
                  telCalBack:"", 
                  selectCar:"", 
                  photoCar:"",
                  nameCar:"",
                  tarif:0,
                  price:0,
                  priceParams:"",
                  statusRequest:false,
                  childchairChild:"0",
                  visibleCalc:false,
                  isvisibleCallback:true
                 }
  }

  getAllCars(data:any){
      
      this.setState({cars:data})
      
  }

  warringFunc<T>(value:T){
    console.log("ERROR:" + value)
  }


  componentWillMount(){
    fetch("https://admin.prokatauto72.ru/wp-json/wp/v2/auto/?per_page=29")
      .then((respone)=>(respone.json()))
      .then((result)=>this.getAllCars(result))
      .catch((error)=>this.warringFunc(error))
  }

  handlerCarIndex(index:any){
    let dopParams = document.getElementsByClassName("dopParams")
    let dopPrice = document.getElementsByClassName("dop__price")
    
    for(let i = 0; i<dopParams.length; i++){
      
      let dopParamsTeg =  dopParams[i] as HTMLInputElement
      dopParamsTeg.checked = false
    }

     for(let i = 0; i<dopPrice.length; i++) {
       if(dopPrice[i].classList.contains("dop__price_active")){
        dopPrice[i].classList.remove("dop__price_active")
        dopPrice[i].classList.add("dop__price_disactive")
        console.log(dopPrice[i])
       }
      
     }


    this.parametr = {}
    this.paramsPrice = {}
    this.setState({price:0})

    for(let val in this.state.priceParams){
        this.state.priceParams[val] = 0
    }



    this.setState({photoCar:index.currentTarget.getAttribute("src"), nameCar:index.currentTarget.getAttribute("alt")})
    this.setState({indexCar:index.currentTarget.dataset.ar})
  }

  // Dop params kreslo, moyka
  handleCheck(data:HTMLInputElement){
     console.log(data.dataset.nameobject)  
    
     if(data.dataset.nameobject === "childchair_child"){
       if(data.checked){
          this.setState({childchairChild: data.dataset.price })
         
          data.classList.add("dop__price_active")
          data.classList.remove("dop__price_disactive")
       }else{
        this.setState({childchairChild: "0" })
        data.classList.remove("dop__price_active")
        data.classList.add("dop__price_disactive")
       }
       
     }
     let dopElement = data.parentElement?.parentElement?.lastChild as HTMLElement
     if(data.checked){
      dopElement.classList.remove("dop__price_disactive")
      dopElement.classList.add("dop__price_active")
     }else{
      dopElement.classList.add("dop__price_disactive")
      dopElement.classList.remove("dop__price_active")
     }
    
     
    const nameobject = data.dataset.nameobject
    const nameParams = data.getAttribute("name")
    const titleField = data.dataset.namefield
    let paramsPriceDataset = data.checked ? data.dataset.price : 0
    
    
    if(typeof nameParams === "string"){
      this.paramsPrice = {
      ...this.paramsPrice, ...{[nameParams]:paramsPriceDataset}
      }
    }
    this.setState({
      priceParams:this.paramsPrice
    })

    if(typeof nameParams == 'string'){
      this.listDop = {
      ...this.listDop, ...{[nameParams]:{title:titleField}}
      }
    }
    

    if(typeof nameParams == 'string'){
      this.setState({dopParamas:{...this.listDop}})
    }
    
    if(data.checked){
      if(typeof nameobject === 'string'){
          this.parametr = {
              ...this.parametr, ...{[nameobject]:this.listDop[nameobject].title}
          }
      }
    }else{
      if(typeof nameobject === 'string'){
          this.parametr[nameobject] = ""
      }
    }
  }

  handlerGetValue(data:any ){
    data.preventDefault()

    if(this.state.telCalBack === ""){
        alert("Заполните номер телефона")
        return false
    }

    if(this.state.nameCallBack === ""){
        alert("Введите Ваше имя")
        return false
    }

    this.setState({statusRequest:true})
   

    fetch("../handlejson/index.php", {
      method:"post",
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8" 
      },
     body:"numberday="+this.state.numberDay+"&nameCallBack="+this.state.nameCallBack+"&telCalBack="+this.state.telCalBack+"&dops="+ JSON.stringify(this.state.dopParamas)+"&photoCar="+this.state.photoCar+"&nameCar="+this.state.nameCar
    }) 
    .then((response)=> response.json())
    
    
    this.setState({
      visibleCalc: this.state.visibleCalc ? false : true
    })

    this.setState({
      isvisibleCallback:true
    })

    
  }

  handleInputText(data:HTMLInputElement){
    const nameField = data.dataset.name
    if(nameField === "name"){
      this.setState({nameCallBack:data.value})
    }else if(nameField === "telephone"){
      this.setState({telCalBack:data.value})
    }
  }

  handleNumberDay(e:React.ChangeEvent<HTMLInputElement>):void{
    let numDay = e.currentTarget.value

    if( this.state.tarif === 0){
     //1_3_day_skidka
      if( !!this.state.cars[this.state.indexCar].metadata.prices["1_3_day_skidka"] === true ){ 
        if( parseInt(numDay) <= 3){
          let priceCar = parseInt(this.state.cars[this.state.indexCar].metadata.prices["1_3_day_skidka"])  * parseInt(numDay)
          this.setState({price:priceCar})
        }
      }
      
      if(this.state.cars[this.state.indexCar].metadata.prices["1_3_day_skidka"] == null || this.state.cars[this.state.indexCar].metadata.prices["1_3_day_skidka"] == ""){
        if( parseInt(numDay) <= 3){
          let priceCar = parseInt(this.state.cars[this.state.indexCar].metadata.prices["1_3_day"])  * parseInt(numDay)
          this.setState({price:priceCar})
        }
      }

//4_7_day_skidka
      if( !!this.state.cars[this.state.indexCar].metadata.prices["4_7_day_skidka"] === true ){ 
        if(parseInt(numDay) > 3 && parseInt(numDay) <= 7){
          let priceCar = parseInt(this.state.cars[this.state.indexCar].metadata.prices["4_7_day_skidka"])  * parseInt(numDay)
          this.setState({price:priceCar})
        }
      }
      
      if(this.state.cars[this.state.indexCar].metadata.prices["4_7_day_skidka"] == null || this.state.cars[this.state.indexCar].metadata.prices["4_7_day_skidka"] == ""){
        if( parseInt(numDay) > 3 && parseInt(numDay) <= 7){
          let priceCar = parseInt(this.state.cars[this.state.indexCar].metadata.prices["4_7_day"])  * parseInt(numDay)
          this.setState({price:priceCar})
        }
      }

//8_15_day_skidka
      if( !!this.state.cars[this.state.indexCar].metadata.prices["8_15_day_skidka"] === true ){ 
        if( parseInt(numDay) > 7 && parseInt(numDay) <= 15){
          let priceCar = parseInt(this.state.cars[this.state.indexCar].metadata.prices["8_15_day_skidka"])  * parseInt(numDay)
          this.setState({price:priceCar})
        }
      }
      
      if(this.state.cars[this.state.indexCar].metadata.prices["8_15_day_skidka"] == null || this.state.cars[this.state.indexCar].metadata.prices["8_15_day_skidka"] == ""){
        if( parseInt(numDay) > 7 && parseInt(numDay) <= 15){
          let priceCar = parseInt(this.state.cars[this.state.indexCar].metadata.prices["8_15_day"])  * parseInt(numDay)
          this.setState({price:priceCar})
        }
      }

//16_30_day_skidka
      if( !!this.state.cars[this.state.indexCar].metadata.prices["16_30_day_skidka"] === true ){ 
        if( parseInt(numDay) > 15 && parseInt(numDay) <= 30){
          let priceCar = parseInt(this.state.cars[this.state.indexCar].metadata.prices["16_30_day_skidka"])  * parseInt(numDay)
          this.setState({price:priceCar})
        }
      }
      
      if(this.state.cars[this.state.indexCar].metadata.prices["16_30_day_skidka"] == null || this.state.cars[this.state.indexCar].metadata.prices["16_30_day_skidka"] == ""){
        if( parseInt(numDay) > 15 && parseInt(numDay) <= 30){
          let priceCar = parseInt(this.state.cars[this.state.indexCar].metadata.prices["16_30_day"])  * parseInt(numDay)
          this.setState({price:priceCar})
        }
      }
      
      
      
    }else if(this.state.tarif === 1){

      if( !!this.state.cars[this.state.indexCar].metadata.prices["weekend_skidka"] === true ){ 
        let priceCar = parseInt(this.state.cars[this.state.indexCar].metadata.prices["weekend_skidka"])  * parseInt(numDay)
        this.setState({price:priceCar})
      }

      if(this.state.cars[this.state.indexCar].metadata.prices["weekend_skidka"] == null || this.state.cars[this.state.indexCar].metadata.prices["weekend_skidka"] == ""){
        let priceCar = parseInt(this.state.cars[this.state.indexCar].metadata.prices["weekend_skidka"])  * parseInt(numDay)
        this.setState({price:priceCar})
      }


        
    }

    this.setState({numberDay:e.currentTarget.value})
  }


  hendleDay(data:any){
    
    this.setState({tarif:parseInt(data)})


  }

  handleVisibl(){
    this.setState({
      visibleCalc: this.state.visibleCalc ? false : true
    })
    console.log(window.scrollY)
    let containerCalc = document.getElementsByClassName("car-calc-blocks") as HTMLCollectionOf<HTMLElement>
      if(containerCalc[0]){
      containerCalc[0].style.top = window.scrollY+"px"}
    
    
  }

  handleClose(){
    this.setState({
      visibleCalc: this.state.visibleCalc ? false : true
    })

    this.setState({
      isvisibleCallback:true
    })
  }

  handleCallBackFeed(){
        this.setState({
          isvisibleCallback:this.state.isvisibleCallback ? false : true
        })
  }

  

  public render(){
    if(!this.state.cars) return false
    

    return(
      
      <div className="container-car-calc">
      <div  className={ !this.state.visibleCalc ? "container_btn_calc" : "container_btn_calc_dis"}>
        <div className="btn_calc"  onClick={()=>{this.handleVisibl()}}>
        Калькулятор аренды авто
        </div>
      </div>
     
      <div className={ this.state.visibleCalc ?  "overlayStyleVis" : "overlayStyledis"}></div>
        <div className={ this.state.visibleCalc ?  "container_without_btn container_without_visible" : "container_without_btn container_without_disvisible"}  >
      {
        console.log(this.state)
      }

      {
        //this.state.statusRequest ? <StatusRequest textstatus="Спасибо! Ваше запрос отправлен, Наши менеджеры свяжутся с Вами" /> : ""
      }

      <div className="closeWin" onClick={(e)=>this.handleClose()}>
        X
      </div>
      
      <div className={this.state.isvisibleCallback ? "car-calc-blocks" : "car-calc-blocks_dis"}>
        <div>
          {
            <Cars carName="Logon" carImg="img" listCars={this.state.cars} handlerCarIndex={this.handlerCarIndex.bind(this)} /> 
          }
        </div>
        
        <div className="bigImg">
          <img src={ this.state.cars[this.state.indexCar].featured_media_url } alt=""/>
          <div className="selectParams">
          

              

          </div>
        </div>

        <div className="dopService">
          <h2>Калькулятор проката и аренды авто в Тюмени</h2> 
          <div className="blockDop blockDopdayNumber">
          <div>
         
          
        </div>

            <div>
            <label htmlFor="numberDay">Укажите количество дней аренды авто</label>
            </div>
            
            <div className="container_price_number_day">
                <div>
                 <input type="number" max={ this.state.tarif === 0 ? 30 : 3 } min={0} name="numberDay" id="numberDay"  onChange={(e)=>this.handleNumberDay(e)} placeholder="0" />
                </div>
              <div className="dop__price">
                Цена: {this.state.price}₽
              </div>
            </div>
            
          </div>
          <div className="blockDop blockDopcheckbox">
            <DopsRender handleCheck={this.handleCheck.bind(this)} numday={this.state.numberDay} >
              <RenderSelectParams childChairPrice={this.state.childchairChild} numberDay={this.state.numberDay} listDopParams={this.parametr} priceCar={this.state.price} priceParams={this.state.priceParams}   />
              <div className="orderService">
                <div onClick={()=>this.handleCallBackFeed()}>
                Заказать услуг
                </div>
              </div>
              </DopsRender > 
          </div>  

         

        </div>
        
      </div>
        
      <div className={this.state.isvisibleCallback ? "isvisibleCallback" : "isvisibleCallback-dis"}>
      <CallBack handlerGetValue={this.handlerGetValue.bind(this)}  handleInputText={this.handleInputText.bind(this)} />
      </div>


      </div>
      </div>
    )
  }
}



export default App;
