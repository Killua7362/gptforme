import { useCallback, useEffect } from "react";


const CreateChat = ({openModal,state}) => {

    const escapeFun = useCallback((e)=>{
            if(e.key === 'Escape'){
                openModal()
            }
    },[])

    useEffect(()=>{
        document.addEventListener('keydown',escapeFun)
        return ()=>document.removeEventListener('keydown',escapeFun)
    },[escapeFun])
    
    return (
        state &&
        <div className="w-screen h-screen fixed flex items-center justify-center top-0 left-0 text-black">
            <div className="fixed w-full h-full bg-background/90 top-0 left-0 "
             onClick={(e)=>{
                openModal()
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
                <input className="w-full h-10 rounded-lg p-2 mb-2 text-white"/>
                <button className="bg-black w-fit text-white ml-auto text-sm">
                    Submit
                </button>
            </div>
        </div>
      );
}
 
export default CreateChat;