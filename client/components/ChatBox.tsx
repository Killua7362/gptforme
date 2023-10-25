import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faFolderPlus } from '@fortawesome/free-solid-svg-icons';
import * as z from 'zod';
import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChatsDataState, rootState, updateChatsBots, updateChatsUser } from '../redux_store/chats';
import { useSearchParams } from 'react-router-dom';
import UploadFile from './UploadFile'

const ChatSchema = z.object({
    chat:z.string().max(150),
})

type ChatInput = z.infer<typeof ChatSchema>;

const ChatBox = (activate) => {
    const formRef = useRef<HTMLFormElement>(null)
    const dispatch = useDispatch()
    const [params]= useSearchParams()
    const chatid = params.get('id')
    const [openUpload,setOpenUpload] = useState(false)
    const c:ChatsDataState = useSelector((state:rootState)=>state.task)

    const {
        register,
        handleSubmit,
        formState:{errors},
        resetField,
    } = useForm<ChatInput>({
        resolver:zodResolver(ChatSchema),
    })
    const handleTextAreaSubmit = (e:KeyboardEvent<HTMLTextAreaElement>)=>{
        if(e.key == 'Enter' && e.shiftKey == false && activate.activate) {
            e.preventDefault();
            formRef?.current?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
          }
    }
    return (
         <div className='w-7/12 pt-4 flex'>
            <div className='px-4 mx-2 my-4'>
                <FontAwesomeIcon icon={faFolderPlus} className='text-2xl cursor-pointer' onClick={()=>setOpenUpload(true)}/>
                <UploadFile state={openUpload} setState={setOpenUpload}/>
            </div>
            <form className='w-full'
            ref = {formRef} 
            onSubmit={handleSubmit((d)=>{
                dispatch(updateChatsUser(chatid!,d.chat))
                const dataForGPT = {
                    context:c.chats[chatid!].chats.context,
                    user:c.chats[chatid!].chats.user,
                    bot:c.chats[chatid!].chats.bot,
                    question:d.chat
                }
                fetch('/api/home',{
                    'method':'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify(dataForGPT)
                }).then(
                    res=>res.json()
                ).then(
                    data =>{
                        dispatch(updateChatsBots(chatid,data.result))}
                )
                resetField('chat')
            }
            )}
            >
                    <div className='w-full flex items-center justify-center'>
                        <textarea id='chat-box' content='text'
                         className={`overflow-y-hidden h-14 w-full focus:outline-none rounded-xl  p-4 ${errors?.chat?.message && 'border-solid border-2 border-red-600'} `}
                         onKeyDown={handleTextAreaSubmit}
                         {...register('chat')} autoComplete='off'/>
                        <button type='submit' className='px-4 mx-2' disabled={!activate.activate}>
                            <FontAwesomeIcon icon={faArrowRight}/>
                        </button>
                    </div>
            </form>
            <div className='h-4 pt-2 pl-4'>
                {errors?.chat?.message && <p className='text-sm text-white/50'>{errors.chat.message}</p>}
            </div>
        </div>
      );
}
 
export default ChatBox;