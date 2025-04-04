import Header from "@/components/header"
import Container from "@/components/ui/container"
import Footer from "@/components/ui/footer"
import { Outlet } from "react-router"

export const MainLayout = () => {
    return (
        <div className="w-full">
            <Header />
            <Container className="flex-grow">
                <main className="flex-grow">
                    <Outlet />
                </main>
            </Container>
            <Footer />
        </div>
    )
}

export default MainLayout
