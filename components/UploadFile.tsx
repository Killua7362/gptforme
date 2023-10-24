import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from 'zod';
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateContext, updateName } from "../redux_store/chats";

const formSchema = z.object({
    file:z
        .any()
        .refine((files)=>files?.length == 1, 'Text file is required')
        .refine((files)=>files?.[0]?.size<=100000, 'Max size of a file is 1 mb')
        .refine((files)=>files?.[0]?.type === 'text/plain','Only .txt files are allowed')
})

const file2base64 = (file:File)=>{
return new Promise<string>((res,rej)=>{
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () =>res(reader.result);
    reader.onerror = error => rej(error)
})
}

type NameInput = z.infer<typeof formSchema>
const UploadFile = (state,setState) => {
  const [params]= useSearchParams()
const dispatch = useDispatch()
  const chatid = params.get('id')
    const escapeFun= useCallback((e)=>{
            if(e.key === 'Escape'){
                state.setState(false)
            }
    },[])

    const {
        register,
        handleSubmit,
        formState:{errors},
        resetField
    } = useForm<NameInput>({
        resolver:zodResolver(formSchema)
    })
    useEffect(()=>{
        document.addEventListener('keydown',escapeFun)
        return ()=>document.removeEventListener('keydown',escapeFun)
    },[escapeFun])
    return (
    state.state && <div className={`bg-background/90 w-screen h-screen fixed top-0 left-0 z-50 flex justify-center items-center`}>
        <div className="w-screen h-screen fixed z-40" onClick={(e)=>{
           e.preventDefault()
           state.setState(false)
        }}/>
        <div className="w-2/12 bg-white min-h-[10.66%] text-black flex flex-col gap-y-2 p-2 z-50">
            <div className="text-lg">
                Select your files
            </div>
            <form onSubmit={handleSubmit(async (d)=>{
                const result = await file2base64(d.file[0])
                dispatch(updateContext(chatid,result))
                resetField('file')
                state.setState(false)
            })}>
                <input type="file" {...register('file')}/>
                <button type='submit' className="w-full bg-gray-400 rounded-xl p-1">
                    Upload
                </button>
            </form>
        </div>
    </div>
      );
}
 
export default UploadFile;