import { Link } from "react-router-dom"
import logo from "../assets/svg/logo.svg"
const LogoContainer = () => {
    return (
        <Link to={"/"}>
            <img src={logo} alt="" className="min-w-10 min-h-10 object-contain" />
        </Link>
    )
}

export default LogoContainer
