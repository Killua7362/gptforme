import {combineReducers} from 'redux'
import {configureStore} from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const persistConfig = {
    key:'root',
    storage
}


const ADD_TASK= "ADD_TASK"

export const addChats = (task)=>{
    return{
        type:ADD_TASK,
        payload:task,
    }
}

const initialState = {
    chats:[
        
    ]
}

const taskReducer = (state=initialState,action)=>{
    switch(action.type){
        case ADD_TASK:
            return{
                ...state,
                chats:[...state.chats,action.payload]
            }
        default:
            return state
    }
}

const rootReducer = combineReducers({task:taskReducer})
const persistedReducer = persistReducer(persistConfig,rootReducer)

const store = configureStore({reducer:persistedReducer})

export default store