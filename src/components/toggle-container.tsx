import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { useAuth } from "@clerk/clerk-react"
import { Menu } from "lucide-react"
import { NavLink } from "react-router-dom"
import { cn } from "@/lib/utils"
import NavigationRoutes from "./navigation-routes"
const ToggleContainer = () => {
    const { userId } = useAuth()
    return (
        <Sheet>
            <SheetTrigger className="block md:hidden">
                <Menu />
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle />
                </SheetHeader>
                <nav className="gap-3 flex flex-col items-center">
                    <NavigationRoutes isMobile />
                    {userId && <NavLink to={"/generate"} className={(isActive) => cn("text-base text-neutral-600 ", isActive && "text-neutral-900 font-semibold")}>
                        Take An Interview
                    </NavLink>}
                </nav>

            </SheetContent>
        </Sheet>

    )
}

export default ToggleContainer
