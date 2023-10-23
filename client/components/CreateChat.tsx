import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from 'zod';
import { addChats } from "../redux_store/chats";
import { useDispatch } from "react-redux";

const formSchema = z.object({
    name:z.string().max(10)
})

type NameInput = z.infer<typeof formSchema>
type EscapeEventHandler = (e:KeyboardEvent) => void;
interface FormHandler{
    name:string
}

const CreateChat = ({openModal,state}:{openModal:React.Dispatch<React.SetStateAction<boolean>>,state:boolean}) => {
    const dispatch = useDispatch()
    const {
        register,
        handleSubmit,
        formState:{errors},
        resetField
    } = useForm<NameInput>({
        resolver:zodResolver(formSchema)
    })

    const escapeFun:EscapeEventHandler= useCallback((e)=>{
            if(e.key === 'Escape'){
                openModal(false)
            }
    },[])

    useEffect(()=>{
        document.addEventListener('keydown',escapeFun)
        return ()=>document.removeEventListener('keydown',escapeFun)
    },[escapeFun])
    
    const newChatHandler = (d:FormHandler) => {
        const id = String(Date.now())
        dispatch(addChats(id,d.name))
    }

    return (
        state &&
        <div className="w-screen h-screen fixed flex items-center justify-center top-0 left-0 text-black">
            <div className="fixed w-full h-full bg-background/90 top-0 left-0 "
             onClick={(e)=>{
                openModal(false)
            }
             }
             ></div>
            <div className="min-h-[16.66%] w-2/12 bg-white relative flex flex-col items-center rounded-xl p-4">
                <div className="w-full text-start font-serif">
                    Name
                </div>
                <div className="text-xs text-start w-full text-black/80 pb-4">
                    Type name of the conversation
                </div>
                <form
                onSubmit={handleSubmit((d)=>{
                    newChatHandler(d)
                    resetField('name')
                    openModal(false)
                })}
                >
                    <input className="w-full h-10 rounded-lg p-2 mb-2 text-white"
                    {...register('name')}
                    autoComplete="false"
                    />
                    <button className="bg-black w-fit text-white ml-auto text-sm" type="submit">
                        Submit
                    </button>
                </form>
            </div>
        </div>
      );
}
 
export default CreateChat;