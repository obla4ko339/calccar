import React from 'react';
import Cars from './components/cars'
import './static/css/style.css'
import DopsRender from './components/DopsRender'
import CallBack from './components/CallBack'
import RenderSelectParams from './components/RenderSelectParams'


interface InInterface{
  cars:any,
  indexCar:any,
  dopParamas:any,
  numberDay:string,
  nameCallBack:string,
  telCalBack:number,
  selectCar:any
}


class App extends React.Component<{},InInterface>{

  private listDop:any = ""
  public params:Array<any> = []

  constructor(props:any){
    super(props)
    this.state = {cars:0, indexCar:0, dopParamas:0, numberDay:"0", nameCallBack:"", telCalBack:0, selectCar:"" }
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

  handlerCarIndex<T>(index:T){
    console.log(index)
   
    this.setState({indexCar:index})
  }

  // Dop params kreslo, moyka
  handleCheck(data:HTMLElement){
    
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
    
    for(let param in this.listDop){
      this.params = [
          ...this.params, this.listDop[param]
      ]
     
    }
   
      console.log( this.params )   
  
  }

  handlerGetValue<T>(data:T){
  
  }

  handleNumberDay(e:React.ChangeEvent<HTMLInputElement>):void{
    console.log(e.currentTarget.value)
    this.setState({numberDay:e.currentTarget.value})
  }

  

  public render(){
    if(!this.state.cars) return false
    

    return(
      <div className="container-car-calc">
      { console.log(this.state)}

      <div className="car-calc-blocks">
        <div>
          {
            <Cars carName="Logon" carImg="img" listCars={this.state.cars} handlerCarIndex={this.handlerCarIndex.bind(this)} /> 
          }
        </div>
        
        <div className="bigImg">
          <img src={ this.state.cars[this.state.indexCar].featured_media_url } alt=""/>
          <div className="selectParams">
            <div>
              <h2>
                Выбранные Вами параметры
              </h2>
            </div>
            <div>
              <div>
                <div>Количество дней аренды</div>
                <div>{this.state.numberDay}</div>
              </div>
              <div>
                <div>Выбранные дополнительные параметры</div>
                <div>
                 
                </div>
              </div>
            </div>

            <RenderSelectParams  numberDay={this.state.numberDay} listDopParams={this.state.dopParamas}   />

          </div>
        </div>

        <div>
          <h1>Дополнительные услуги</h1> 
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
          <CallBack handlerGetValue={this.handlerGetValue.bind(this)} />
          </div>

        </div>
        
      </div>
        

      
      </div>
    )
  }
}



export default App;
