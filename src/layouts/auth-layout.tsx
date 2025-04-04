import { Outlet } from "react-router"
import bgimg from '../assets/img/bg.png'
const AuthLayout = () => {
    return (
        <div className="w-screen h-screen overflow-hidden flex items-center justify-center relative">
            <img src={bgimg} className="absolute w-full h-full object-cover " alt="" />
            <Outlet />
            {/* <Footer />  */}
        </div>
    )
}

export default AuthLayout
