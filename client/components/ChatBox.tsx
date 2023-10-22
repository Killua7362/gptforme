import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import * as z from 'zod';
import { KeyboardEvent, useRef } from 'react';

const ChatSchema = z.object({
    chat:z.string().max(150),
})

type ChatInput = z.infer<typeof ChatSchema>;

const ChatBox = ({onSubmittingChat}:{onSubmittingChat:CallableFunction}) => {
    const formRef = useRef<HTMLFormElement>(null)
    const {
        register,
        handleSubmit,
        formState:{errors},
        resetField,
    } = useForm<ChatInput>({
        resolver:zodResolver(ChatSchema),
    })

    const handleTextAreaSubmit = (e:KeyboardEvent<HTMLTextAreaElement>)=>{
        if(e.key == 'Enter' && e.shiftKey == false) {
            e.preventDefault();
            formRef?.current?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
          }
    }

    return (
        <div className='w-6/12 pt-4'>
            <form className='w-full'
            ref = {formRef} 
            onSubmit={handleSubmit((d)=>{
                onSubmittingChat((prevState:Record<string,string>[])=>[...prevState,{'user':d.chat,'bot':'after adding'}])
                resetField('chat')
            }
            )}
            >
                    <div className='w-full flex items-center justify-center'>
                        <textarea id='chat-box' content='text'
                         className={`overflow-y-hidden h-14 w-full focus:outline-none rounded-xl  p-4 ${errors?.chat?.message && 'border-solid border-2 border-red-600'} `}
                         onKeyDown={handleTextAreaSubmit}
                         {...register('chat')} autoComplete='off'/>
                        <button type='submit' className='px-4 mx-2'>
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