import { useSelector } from 'react-redux'
import ChatBox from './ChatBox'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ChatsDataState, rootState} from 'redux_store/chats'

const ChatPage = () => {
    const [isMounted,setIsMounted] = useState(false)
    const c:ChatsDataState = useSelector((state:rootState)=>state.task)
    const chatid = useParams().chatid
    const navigate = useNavigate()

    useEffect(()=>{
        if(Object.keys(c.chats).includes(chatid!)){
            setIsMounted(true)
        }else{
            navigate('/*',{replace:true})
        }
        return ()=>setIsMounted(false)
    },[c])
    
    return (
        isMounted &&  <>
            <div className='w-6/12 h-full flex flex-col space-y-4'>
                    {
                        c.chats[chatid!].chats.user?.map((value,i)=>{
                            return (
                                <>
                                <div
                                key={`${i}user`}
                                className='min-h-20'
                                >{value}</div>
                                <div
                                key={`${i}bot`}
                                className='min-h-20'
                                >{c.chats[chatid!].chats.bot[i]}</div>
                                </>
                            )
                        })
                    }
                </div>
                <ChatBox/>

        </>
      );
}
 
export default ChatPage;