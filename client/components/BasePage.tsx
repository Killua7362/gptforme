
import NavBar from './NavBar'
import ChatBox from './ChatBox'
const BasePage = () => {
    return (
        <div>
            <NavBar/>
            <div className='p-20 pb-8 h-screen w-screen flex flex-col justify-between items-center'>
                <div>
                    testing
                </div>
                <ChatBox/>
            </div>
        </div>
      );
}

export default BasePage;