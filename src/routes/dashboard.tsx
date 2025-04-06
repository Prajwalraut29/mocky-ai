import Headings from "@/components/headings"
import { Plus } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Separator } from "@radix-ui/react-separator"
import { useEffect, useState } from "react"
import { Interview } from "@/types"
import { useAuth } from "@clerk/clerk-react"
import { collection, onSnapshot, query, where } from "firebase/firestore"
import { db } from "@/config/firebase.config"
import { snapshot } from "node:test"
import { error } from "console"
import { toast } from "sonner"
import { unsubscribe } from "diagnostics_channel"
import { InterviewPin } from "@/components/pin"
import { Skeleton } from "@/components/ui/skeleton"
const Dashboard = () => {

    const [interviews, setInterview] = useState<Interview[]>([])
    const [loading, setLoading] = useState(false)
    const { userId } = useAuth()

    useEffect(() => {
        setLoading(true)
        const interviewQuery = query(
            collection(db, "interviews"),
            where("userId", "==", userId)
        )
        const unsubsribe = onSnapshot(interviewQuery, (snapshot) => {
            const interviewList: Interview[] = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            })) as Interview[];
            setInterview(interviewList);
            setLoading(false);
        }, (error) => {
            console.log("error on fetching :", error)
            toast.error("Error...", {
                description: "Something went wrong... Try again later"
            })
            setLoading(false)
        })
        return () => unsubsribe()


    }, [userId])

    return (
        <>
            <div className="flex w-full items-center justify-between">
                {/* heading */}
                <Headings
                    title="Dashboard"
                    description="Create and start you AI Mock interview"
                />
                {/* action button */}

                <Link to={"/generate/create"}>
                    <Button size={"sm"}>
                        <Plus className="min-w-5 min-h-5 mr-1" />
                        Add new
                    </Button>
                </Link>
            </div>

            <Separator className="my-8" />

            <div className="md:grid md:grid-cols-3 gap-3 py-4">
                {loading ? (
                    Array.from({ length: 6 }).map((_, index) => (
                        <Skeleton key={index} className="h-24 md:h-32 rounded-md" />
                    ))
                ) : interviews.length > 0 ? (
                    interviews.map((interview) => (
                        <InterviewPin key={interview.id} data={interview} />
                    ))
                ) : (
                    <div className="md:col-span-3 w-full flex flex-grow items-center justify-center h-96 flex-col">
                        <img
                            src="/svg/not-found.svg"
                            className="w-44 h-44 object-contain"
                            alt=""
                        />

                        <h2 className="text-lg font-semibold text-muted-foreground">
                            No Data Found
                        </h2>

                        <p className="w-full md:w-96 text-center text-sm text-neutral-400 mt-4">
                            There is no available data to show. Please add some new mock
                            interviews
                        </p>

                        <Link to={"/generate/create"} className="mt-4">
                            <Button size={"sm"}>
                                <Plus className="min-w-5 min-h-5 mr-1" />
                                Add New
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </>
    )
}

export default Dashboard
