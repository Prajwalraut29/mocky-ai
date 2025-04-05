import Header from "@/components/header"
import Footer from "@/components/ui/footer"
import AuthHandler from "@/handler/auth-handler"
import { Outlet } from "react-router"

export const PublicLayout = () => {
    return (
        <div className="w-full">
            <AuthHandler />
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}

export default PublicLayout
