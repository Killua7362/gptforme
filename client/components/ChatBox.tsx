import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import * as z from 'zod';

const ChatSchema = z.object({
    chat:z.string().max(150),
})

type ChatInput = z.infer<typeof ChatSchema>;

const ChatBox = () => {
    const {
        register,
        handleSubmit,
        formState:{errors},
        resetField,
    } = useForm<ChatInput>({
        resolver:zodResolver(ChatSchema),
    })

    return (
        <div className='w-6/12 '>
            <form className='w-full' 
            onSubmit={handleSubmit((d)=>{
                console.log(d)
                resetField('chat')
            }
            )}
            >
                    <div className='w-full flex items-center justify-center'>
                        <input id='chat-box' alt='chat-box' content='text'
                         className={`h-14 w-full focus:outline-none rounded-xl shadow-lg shadow-black p-4 ${errors?.chat?.message && 'border-solid border-2 border-red-600'} `}
                         {...register('chat')} autoComplete='off'/>
                        <button type='submit' className='m-2 '>
                            <FontAwesomeIcon icon={faArrowRight} className='ml-2'/>
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