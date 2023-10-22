import { useSelector } from 'react-redux'
import ChatBox from './ChatBox'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const ChatPage = () => {
    const [chats,setChats] = useState<Record<string,string>[]>([{'user':'lorem epsum entoardnetnieartneirnten','bot':'testing this page'}])
    const [isMounted,setIsMounted] = useState(false)
    const c = useSelector(state=>state.task.chats)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        if(c.includes(params.chatid)){
            setIsMounted(true)
        }else{
            navigate('/*',{replace:true})
        }
        return ()=>setIsMounted(false)
    },[c])
    
    return (
        isMounted && <>
            <div className='w-6/12 h-full flex flex-col space-y-4'>
                    {
                        chats?.map((value,i)=>{
                            return (
                                <>
                                <div
                                key={`${i}user`}
                                className='min-h-20'
                                >{value.user}</div>
                                <div
                                key={`${i}bot`}
                                className='min-h-20'
                                >{value.bot}</div>
                                </>
                            )
                        })
                    }
                </div>
                <ChatBox onSubmittingChat={setChats}/>

        </>
      );
}
 
export default ChatPage;