import React from 'react'
import {interfaceCall} from './interfaceCall'

const CallBack = (props:interfaceCall)=>{

    return(
        <div className="container_call_back">
            <form action="#" method="post">
            <div>
                <input type="text" name="name_user" id="id_name_user" placeholder="Ваше имя:" data-name="name" onChange={(e)=>props.handleInputText(e.currentTarget)}  />
            </div>
            <div>
                <input type="text" name="tel_user" id="id_tel_user" placeholder="Ваше телефон:" data-name="telephone" onChange={(e)=>props.handleInputText(e.currentTarget)} />
            </div>
            <div className="container_btn">
                <input type="submit" name="btn_name" id="id_btn_user" value="Заказать звонок" onClick={(e)=>props.handlerGetValue(e)} />
            </div>
            </form>
        </div>
    )
}

export default CallBack