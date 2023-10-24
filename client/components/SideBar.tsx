import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from "react";
import {  useSelector} from "react-redux";
import CreateChat from './CreateChat'
import {  createSearchParams, useNavigate } from "react-router-dom";
import { rootState } from "redux_store/chats";

export interface ChatsType extends rootState{
  chats:Record<string,Record<string,string[]>>
}

const SideBar = () => {
    const [expand,setExpand] = useState<String>(localStorage.getItem('expand') || 'false')
    const chats:ChatsType= useSelector(( state:rootState )=>state.task)
    const [createChat,setCreateChat] = useState(false)
    const navigate = useNavigate()
    const [activeConversation,setActiveConversation] = useState<string>()
    
    useEffect(()=>{
      localStorage.setItem('expand',String(expand))
      return ()=>{localStorage.removeItem('expand')}
    },[expand])

    const expandButtonHandler = ()=>{
      expand === 'false'?setExpand('true'):setExpand('false')      
    }    

    return (
        <div className={ `fixed z-50 h-full flex ${expand === 'true'?'w-64 bg-secondary shadow-lg shadow-white/10':''}`}>
          <div className="w-full">
            <div className="flex justify-around items-center w-full shadow-lg shadow-white/10 p-2">
              <div 
              onClick={()=>setCreateChat(true)}
              className={ `w-10/12 text-sm text-start font-bold bg-[#2b2b2b] hover:bg-[#404040] rounded-md p-3 cursor-pointer ${expand === 'true'?'':'hidden'}` }>
                  New Conversation
              </div>
              <button className="w-fit h-fit border-none ml-2 p-2 bg-[#2b2b2b] hover:bg-[#404040]" onClick={expandButtonHandler} >
                <FontAwesomeIcon icon={faRightFromBracket} className="text-base" />
              </button>
                <CreateChat openModal={setCreateChat} state={createChat}/>
            </div>
            <div className={ `w-full h-full ${expand === 'true'?"":"hidden"}` }>
              <div className="flex flex-col gap-y-2 items-center mt-4">
                {chats.chats && Object.keys(chats.chats).map((val,i:number)=>{
                  return(
                    <div
                    key={`${i}-names`}
                     onClick={()=>{
                      setActiveConversation(val)
                      navigate({pathname:'/chats',
                      search:createSearchParams({
                        id:val
                      }).toString()
                    })
                    }}
                    className={`w-11/12 h-12 text-center py-2 rounded-md ${val===activeConversation?"bg-[#404040]":" bg-[#2b2b2b] hover:bg-[#404040] cursor-pointer"}`}
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