import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { addChats } from "../redux_store/chats";
import { useNavigate } from "react-router-dom";
import CreateChat from './CreateChat'

const SideBar = () => {
    const [expand,setExpand] = useState<String>(localStorage.getItem('expand') || 'false')
    const chats = useSelector(state=>state.task.chats)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [createChat,setCreateChat] = useState(false)
    
    const createChatWindowHandler = ()=>{
      setCreateChat(!createChat)
    }

    useEffect(()=>{
      localStorage.setItem('expand',String(expand))
    },[expand])

    const expandButtonHandler = ()=>{
      expand === 'false'?setExpand('true'):setExpand('false')      
    }    

    const newChatHandler = () => {
        dispatch(addChats('testing'))
    }

    
    return (
        <div className={ `fixed z-50 h-full flex ${expand === 'true'?'w-64 bg-secondary shadow-lg shadow-white/10':''}`}>
          <div className="w-full">
            <div className="flex justify-between items-center w-full shadow-lg shadow-white/10 p-2">
            <button className="p-0 m-0 w-full" onClick={()=>setCreateChat(true)}>
              <div className={ `w-full font-bold border-solid border-[0.5px] border-white rounded-md p-2 ${expand === 'true'?'':'hidden'}` }>
                  New Conversation
              </div>
                </button>
                <CreateChat openModal={createChatWindowHandler} state={createChat}/>
              <button className="w-fit h-fit border-white ml-2 p-2" onClick={expandButtonHandler}>
                <FontAwesomeIcon icon={faRightFromBracket} className="text-base"/>
              </button>
            </div>
            <div className={ `w-full h-full ${expand === 'true'?"":"hidden"}` }>
              <div>
                {chats && chats.map((val,i)=>{
                  return(
                    <div onClick={()=>{

                    }}>
                      {val}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      );
}
 
export default SideBar;