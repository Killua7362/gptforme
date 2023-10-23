
import NavBar from './NavBar'
import SideBar from './SideBar'
import ChatPage from './ChatPage'
import Welcome from './Welcome'
import NotFound from './404'
import { BrowserRouter, Routes, Route } from "react-router-dom";

const BasePage = () => {
    return (
        <BrowserRouter>
            <div>
                <NavBar/>
                <SideBar/>
                <div className='p-20 pb-8 h-screen w-screen flex flex-col justify-between items-center'>
                    <Routes>
                        <Route path='/' element={<Welcome/>}/>
                        <Route path='/chats' element={<ChatPage/>}/>
                        <Route path='*' element={<NotFound/>}/>
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
      );
}

export default BasePage;