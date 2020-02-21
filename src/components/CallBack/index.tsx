import React from 'react'
import {interfaceCall} from './interfaceCall'
import InputMask from 'react-input-mask'

const CallBack = (props:interfaceCall)=>{

    return(
        <div className="container_call_back">
          
            <form action="#" method="post">
            <div className="orderArendaAuto">
               
            Заказать аренду авто
        
    </div>
            
            <div>
                <input type="text" name="name_user" id="id_name_user" placeholder="Ваше имя:*" data-name="name" onChange={(e)=>props.handleInputText(e.currentTarget)}  />
            </div>
            
            <div>
            <InputMask mask="+9(999)999-99-99" maskChar={null} name="tel_user" id="id_tel_user"  data-name="telephone" placeholder="Ваше телефон:*" className="inputtelstyle" onChange={(e)=>props.handleInputText(e.currentTarget)}  />

            </div>
            <div className="assignDefault">
                <div>
                    <input type="checkbox" name="" defaultChecked id=""/>
                </div>
                <div>
                    Даю согласие на обработку своих персональных данных
                </div>

            </div>
            <div className="container_btn">
                <input type="submit" name="btn_name" id="id_btn_user" value="Заказать звонок" onClick={(e)=>props.handlerGetValue(e)} />
            </div>
            </form>
        </div>
    )
}

export default CallBack