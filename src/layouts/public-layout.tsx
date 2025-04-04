import Header from "@/components/header"
import Footer from "@/components/ui/footer"
import { Outlet } from "react-router"

export const PublicLayout = () => {
    return (
        <div className="w-full">
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}

export default PublicLayout
