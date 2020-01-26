import React from 'react'

interface Istatus{
    textstatus:string
}


const StatusRequest = (props:Istatus) =>{

    setTimeout((e)=>{
        document.getElementById("status-indent")?.classList.remove("statusStyle")
        const textStatus = document.getElementById("text-status")
        if(textStatus){
            textStatus.innerHTML=""
        }

    },5000)


    return (
      
                <div className="container-status statusStyle" id="status-indent">
                    <div id="text-status">
                        {props.textstatus}
                    </div>
                </div>
     
        
    )
}

export default StatusRequest