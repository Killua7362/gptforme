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

export const addChats = (id:string,name:string)=>{
    return{
        type:ADD_TASK,
        payload:{
            id:id,
            chatData:{
                name:name,
                chats:{
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

type Action = ActionAdd | ActionUpdateBotMessage | ActionUpdateUserMessage | ActionUpdateName

export interface ChatsDataState{
    chats:Record<string,Record<string,Record<string,string[]>>>
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
        default:
            return state
    }
}

export const rootReducer = combineReducers({task:taskReducer})
const persistedReducer = persistReducer(persistConfig,rootReducer)
const store = configureStore({reducer:persistedReducer})
export type rootState = ReturnType<typeof store.getState>

export default store