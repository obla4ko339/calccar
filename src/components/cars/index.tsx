import React from 'react'


interface IpCarInterface {
    cars: [],
    carName : String,
    carImg : String,
    carPrice? : number
    // (name : string, price : number) : boolean
}

class Cars extends React.Component<IpCarInterface>{

   


    render(){
        return(
            <div>

                {
                    this.props.cars.map((items,id)=>(
                        <div>
                            {items}
                        </div>
                    ))
                }

            </div>
        )
    }

}

