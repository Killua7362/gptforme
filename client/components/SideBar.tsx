import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from "react";
import {  useSelector} from "react-redux";
import CreateChat from './CreateChat'
import {  useNavigate } from "react-router-dom";
import { rootState } from "redux_store/chats";

export interface ChatsType extends rootState{
  chats:Record<string,Record<string,string[]>>
}

const SideBar = () => {
    const [expand,setExpand] = useState<String>(localStorage.getItem('expand') || 'false')
    const chats:ChatsType= useSelector(( state:rootState )=>state.task)
    const [createChat,setCreateChat] = useState(false)
    const navigate = useNavigate()

    useEffect(()=>{
      localStorage.setItem('expand',String(expand))
    },[expand])

    const expandButtonHandler = ()=>{
      expand === 'false'?setExpand('true'):setExpand('false')      
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
                <CreateChat openModal={setCreateChat} state={createChat}/>
              <button className="w-fit h-fit border-white ml-2 p-2" onClick={expandButtonHandler}>
                <FontAwesomeIcon icon={faRightFromBracket} className="text-base"/>
              </button>
            </div>
            <div className={ `w-full h-full ${expand === 'true'?"":"hidden"}` }>
              <div className="flex flex-col gap-y-2 items-center">
                {chats.chats && Object.keys(chats.chats).map((val,i:number)=>{
                  return(
                    <div
                    id={val}
                     onClick={()=>{
                      navigate(`/chatpage/${val}`,{replace:true})
                    }}
                    className="w-10/12 h-12 text-center py-2 border-solid border-white border-[0.5px] rounded-xl"
                    >
                      {chats.chats[val].name}
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