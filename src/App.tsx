import React from 'react';
import Cars from './components/cars'



interface InInterface{
  cars:{}
}


class App extends React.Component<{},InInterface>{


  constructor(props:any){
    super(props)
    this.state = {cars:0}
  }

  getAllCars<T>(data:T){
      console.log(data)
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
    console.log(index)
  }

  

  public render(){
    if(!this.state.cars) return false
    console.log(this.state.cars)

    return(
      <div className="container-car-calc">


      <div className="car-calc-blocks">
        <div>
          {
            <Cars carName="Logon" carImg="img" listCars={this.state.cars} handlerCarIndex={this.handlerCarIndex} /> 
          }
        </div>
        <div></div>
        <div></div>
      </div>
        

      
      </div>
    )
  }
}










// const App: React.FC = () => {
//   return (
//     <div className="App">
//       <header className="App-header">
     
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
