import {combineReducers} from 'redux'
import {configureStore} from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key:'root',
    storage
}

const ADD_TASK= "ADD_TASK"
const UPDATE_NAME= "UPDATE_NAME"
const UPDATE_CHATS_USER= "UPDATE_CHATS_USER"
const UPDATE_CHATS_BOT= "UPDATE_CHATS_BOT"
const UPDATE_CONTEXT= "UPDATE_CONTEXT"


export const addChats = (id:string,name:string)=>{
    return{
        type:ADD_TASK,
        payload:{
            id:id,
            chatData:{
                name:name,
                chats:{
                    context:"",
                    user:[],
                    bot:[]
                }
            }
        },
    }
}
export const updateChatsUser = (id:string,userMessage:string)=>{
    return{
        type:UPDATE_CHATS_USER,
        payload:{id:id,userMessage:userMessage}
    }
}

export const updateChatsBots= (id:string,botMessage:string)=>{
    return{
        type:UPDATE_CHATS_BOT,
        payload:{id:id,botMessage:botMessage}
    }
}

export const updateName = (id:string,name:string)=>{
    return{
        type:UPDATE_NAME,
        payload:{id:id,name:name}
    }
}

export const updateContext = (id:string,context:string)=>{
    return{
        type:UPDATE_CONTEXT,
        payload:{id:id,context:context}
    }
}

const initialState = {
    chats:{}
}

interface ActionAdd{
    type:'ADD_TASK',
    payload:{
        id:string,
        chatData:{
            name:string,
            chats:{
                context:string,
                user:string[],
                bot:string[]
            }
        }
    },
}
interface ActionUpdateName{
    type:'UPDATE_NAME',
    payload:{
        id:string,
        name:string
    }
}
interface ActionUpdateBotMessage{
    type:"UPDATE_CHATS_BOT",
    payload:{
        id:string,
        botMessage:string
    }
}

interface ActionUpdateUserMessage{
type:"UPDATE_CHATS_USER",
    payload:{
        id:string,
        userMessage:string
    }
}

interface ActionUpdateContext{
    type:"UPDATE_CONTEXT",
    payload:{
        id:string,
        context:string
    }
}

type Action = ActionAdd | ActionUpdateBotMessage | ActionUpdateUserMessage | ActionUpdateName | ActionUpdateContext

export interface ChatsDataState{
    chats:Record<string,Record<string,Record<string,string[] | string>>>
}


const taskReducer = (state:ChatsDataState=initialState,action:Action)=>{
    switch(action.type){
        case ADD_TASK:
            return{
                ...state,
                chats:{
                    ...state.chats,
                    [action.payload.id]:action.payload.chatData
                    }
                }
        case UPDATE_NAME:
            return{
                ...state,
                chats:{
                    ...state.chats,
                    [action.payload.id]:{
                        ...state.chats[action.payload.id],
                        name:action.payload.name,
                        chats:state.chats[action.payload.id].chats
                    }
                    
                }
            }
        case UPDATE_CHATS_USER:
            return{
                ...state,
                chats:{
                    ...state.chats,
                    [action.payload.id]:{
                        ...state.chats[action.payload.id],
                        chats:{
                            ...state.chats[action.payload.id].chats,
                            user:[
                                ...state.chats[action.payload.id].chats.user,
                                action.payload.userMessage
                            ],
                            bot:[
                                ...state.chats[action.payload.id].chats.bot
                            ]
                        }
                    }
                }
            }
        case UPDATE_CHATS_BOT:
            return{
                ...state,
                chats:{
                    ...state.chats,
                    [action.payload.id]:{
                        ...state.chats[action.payload.id],
                        chats:{
                            ...state.chats[action.payload.id].chats,
                            user:[
                                ...state.chats[action.payload.id].chats.user,
                            ],
                            bot:[
                                ...state.chats[action.payload.id].chats.bot,
                                action.payload.botMessage
                            ]
                        }
                    }
                }
            }
        case UPDATE_CONTEXT:
            return{
                ...state,
                chats:{
                    ...state.chats,
                    [action.payload.id]:{
                        ...state.chats[action.payload.id],
                        chats:{
                            ...state.chats[action.payload.id].chats,
                            context:action.payload.context
                        }
                    }
                    
                }
            }
        default:
            return state
    }
}

export const rootReducer = combineReducers({task:taskReducer})
const persistedReducer = persistReducer(persistConfig,rootReducer)
const store = configureStore({reducer:persistedReducer})
export type rootState = ReturnType<typeof store.getState>

export default store