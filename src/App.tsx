import React from 'react';
import Cars from './components/cars'
import './static/css/style.css'
import DopsRender from './components/DopsRender'
import CallBack from './components/CallBack'
import RenderSelectParams from './components/RenderSelectParams'
import StatusRequest from './components/StatusRequest'



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
  statusRequest:boolean

}


class App extends React.Component<{},InInterface>{

  private listDop:any = ""
  public params:Array<any> = []
  public  parametr:any = {}
  

  constructor(props:any){
    super(props)
    this.state = {cars:0, 
                  indexCar:0,
                  dopParamas:0, 
                  numberDay:"0", 
                  nameCallBack:"", 
                  telCalBack:"", 
                  selectCar:"", 
                  photoCar:"",
                  nameCar:"",
                  statusRequest:false }
  }

  getAllCars<T>(data:T){
      
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
   
    this.setState({photoCar:index.currentTarget.getAttribute("src"), nameCar:index.currentTarget.getAttribute("alt")})
    this.setState({indexCar:index.currentTarget.dataset.ar})
  }

  // Dop params kreslo, moyka
  handleCheck(data:HTMLInputElement){
    
    
    const nameobject = data.dataset.nameobject
    const nameParams = data.getAttribute("name")
    const titleField = data.dataset.namefield
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
    
    
    fetch("http://prokatauto72.ru/handlejson/", {
      method:"post",
			headers: {
			 "Content-type": "application/x-www-form-urlencoded; charset=UTF-8" 
      },
      body:"numberday="+this.state.numberDay+"&nameCallBack="+this.state.nameCallBack+"&telCalBack="+this.state.telCalBack+"&dops="+ JSON.stringify(this.state.dopParamas)+"&photoCar="+this.state.photoCar+"&nameCar="+this.state.nameCar
    })
    .then((response)=> response.json())
    .then(result=>{
      setTimeout((result)=>{
        
      },3000)
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

    this.setState({numberDay:e.currentTarget.value})
  }

  

  public render(){
    if(!this.state.cars) return false
    

    return(
      <div className="container-car-calc">
     


      {
        this.state.statusRequest ? <StatusRequest textstatus="Спасибо! Ваше запрос отправлен, Наши менеджеры свяжутся с Вами" /> : ""
      }

      <div className="car-calc-blocks">
        <div>
          {
            <Cars carName="Logon" carImg="img" listCars={this.state.cars} handlerCarIndex={this.handlerCarIndex.bind(this)} /> 
          }
        </div>
        
        <div className="bigImg">
          <img src={ this.state.cars[this.state.indexCar].featured_media_url } alt=""/>
          <div className="selectParams">
          

            <RenderSelectParams  numberDay={this.state.numberDay} listDopParams={this.parametr}   />

          </div>
        </div>

        <div className="dopService">
          <h2>Дополнительные услуги</h2> 
          <div className="blockDop blockDopdayNumber">
            <div>
            <label htmlFor="numberDay">Количество дней аренды</label>
            </div>
            <div>
            <input type="text" name="numberDay" id="numberDay" placeholder="Количество дней аренды" onChange={(e)=>this.handleNumberDay(e)} />
            </div>
          </div>
          <div className="blockDop blockDopcheckbox">
            <DopsRender handleCheck={this.handleCheck.bind(this)} />
          </div>

          <div>
          <CallBack handlerGetValue={this.handlerGetValue.bind(this)}  handleInputText={this.handleInputText.bind(this)} />
          </div>

        </div>
        
      </div>
        

      
      </div>
    )
  }
}



export default App;
