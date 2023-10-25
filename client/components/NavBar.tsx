import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { ChatsDataState, rootState} from 'redux_store/chats'

const NavBar = () => {
  const [title,setTitle] = useState<string>("")
  const [params]= useSearchParams()
  const c:ChatsDataState = useSelector((state:rootState)=>state.task)
  useEffect(()=>{
    const chatid = params.get('id')
    if(chatid !== null && c.chats[chatid!]){
      setTitle((c.chats[chatid].name).toString())
    }
    return ()=> setTitle('')
  },[params])

    return (
    <div className="fixed z-50 w-full h-14 bg-primary/20 shadow-md shadow-primary/70 flex justify-center items-center">
      <div className="text-white">
        {title}
      </div>
    </div>
      );
}
 
export default NavBar;