import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import { Interview } from "@/types"
import CustomBreadCrumb from "./custom-bread-crumb"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@clerk/clerk-react"
import { toast } from "sonner"
import Headings from "./headings"
import { Button } from "./ui/button"
import { Loader, Trash2 } from "lucide-react"
import { Separator } from "@radix-ui/react-separator"
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { ChatSession } from "@google/generative-ai"
import { chartSession } from "@/scripts"
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore"
import { db } from "@/config/firebase.config"

interface FormMockInterviewProps {
    initialData: Interview | null
}

const formSchema = z.object({
    position: z.string().min(1, "Position is required").max(100, "Max 100 characters"),
    description: z.string().min(10, "Description is required"),
    experience: z.coerce.number().min(0, "Experience cannot be negative"),
    techStack: z.string().min(1, "Tech stack is required"),
})

type FormData = z.infer<typeof formSchema>

const FormMockInterview = ({ initialData }: FormMockInterviewProps) => {
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            position: "",
            description: "",
            experience: 0,
            techStack: "",
        },
    })

    const { isValid, isSubmitted } = form.formState
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { userId } = useAuth()

    const title = initialData?.position || "Create a new Mock Interview"
    const BreadcrumbPage = initialData ? initialData.position : "Create"
    const actions = initialData ? "Save Changes" : "Create"
    const toastMessage = initialData
        ? { title: "Updated..!", description: "Changes saved successfully..." }
        : { title: "Created..!", description: "New Mock Interview created..." }

    const cleanAIResponse = (responseText: string) => {
        let cleanText = responseText.trim()
        cleanText = cleanText.replace(/(json|```|`)/g, "");
        const jsonArrayMatch = cleanText.match(/\[.*\]/s);
        if (jsonArrayMatch) {
            cleanText = jsonArrayMatch[0];
        } else {
            throw new Error("No JSON array found in response");
        }
        try {
            return JSON.parse(cleanText);
        } catch (error) {
            throw new Error("Invalid JSON format: " + (error as Error)?.message);
        }
    }
    const generateAiResponse = async (data: FormData) => {
        const prompt = `
        As an experienced prompt engineer, generate a JSON array containing 5 technical interview questions along with detailed answers based on the following job information. Each object in the array should have the fields "question" and "answer", formatted as follows:

        [
          { "question": "<Question text>", "answer": "<Answer text>" },
          ...
        ]

        Job Information:
        - Job Position: ${data?.position}
        - Job Description: ${data?.description}
        - Years of Experience Required: ${data?.experience}
        - Tech Stacks: ${data?.techStack}

        The questions should assess skills in ${data?.techStack} development and best practices, problem-solving, and experience handling complex requirements. Please format the output strictly as an array of JSON objects without any additional labels, code blocks, or explanations. Return only the JSON array with questions and answers.
        `;

        const aiResult = await chartSession.sendMessage(prompt)
        const cleanedResponse = cleanAIResponse(aiResult.response.text())
        return cleanedResponse;
    }
    const onSubmit = async (data: FormData) => {
        try {
            setLoading(true)
            if (initialData) {
                if (isValid) {
                    // create a new mock interview
                    const aiResult = await generateAiResponse(data);

                    await updateDoc(doc(db, "interviews", initialData?.id), {
                        questions: aiResult,
                        ...data,
                        updatedAt: serverTimestamp(),
                    });

                    toast(toastMessage.title, { description: toastMessage.description });
                }
            } else {
                if (isValid) {
                    const aiResult = await generateAiResponse(data)
                    await addDoc(collection(db, "interviews"), {
                        ...data,
                        userId,
                        questions: aiResult,
                        createdAt: serverTimestamp()
                    })
                    // toast(toastMessage.title, { description: toastMessage.description });
                }
            }
            navigate("/generate", { replace: true })
            // TODO: Handle your API call here

            toast.success(toastMessage.title, {
                description: toastMessage.description,
            })

            // navigate("/generate") or wherever after submission
        } catch (error) {
            console.error(error)
            toast.error("Error...", {
                description: "Something went wrong, please try again later",
            })
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (initialData) {
            form.reset({
                position: initialData.position,
                description: initialData.description,
                experience: initialData.experience,
                techStack: initialData.techStack,
            })
        }
    }, [initialData, form])

    return (
        <div className="w-full flex-col space-y-4">
            <CustomBreadCrumb
                breadCrumbPage={BreadcrumbPage}
                breadCrumbItems={[{ label: "Mock Interview", link: "/generate" }]}
            />

            <div className="mt-4 flex items-center justify-between w-full">
                <Headings title={title} isSubHeading />
                {initialData && (
                    <Button size="icon" variant="ghost">
                        <Trash2 className="min-w-4 min-h-4 text-red-500" />
                    </Button>
                )}
            </div>

            <Separator className="my-4" />

            <FormProvider {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full p-8 rounded-lg flex flex-col items-start justify-start gap-6 shadow-md"
                >
                    {/* Position */}
                    <FormField
                        control={form.control}
                        name="position"
                        render={({ field }) => (
                            <FormItem className="w-full space-y-4">
                                <div className="w-full flex items-center justify-between">
                                    <FormLabel>Job Role / Job Position</FormLabel>
                                    <FormMessage className="text-sm" />
                                </div>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={loading}
                                        value={field.value || ""}
                                        className="h-12"
                                        placeholder="eg: Full Stack Developer"
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {/* Description */}
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem className="w-full space-y-4">
                                <div className="w-full flex items-center justify-between">
                                    <FormLabel>Description</FormLabel>
                                    <FormMessage className="text-sm" />
                                </div>
                                <FormControl>
                                    <Textarea
                                        {...field}
                                        disabled={loading}
                                        value={field.value || ""}
                                        className="h-24"
                                        placeholder="eg: Describe your job role or position..."
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {/* Experience */}
                    <FormField
                        control={form.control}
                        name="experience"
                        render={({ field }) => (
                            <FormItem className="w-full space-y-4">
                                <div className="w-full flex items-center justify-between">
                                    <FormLabel>Year Of Experience</FormLabel>
                                    <FormMessage className="text-sm" />
                                </div>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="number"
                                        disabled={loading}
                                        value={field.value || ""}
                                        className="h-12"
                                        placeholder="eg: 1"
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {/* Tech Stack */}
                    <FormField
                        control={form.control}
                        name="techStack"
                        render={({ field }) => (
                            <FormItem className="w-full space-y-4">
                                <div className="w-full flex items-center justify-between">
                                    <FormLabel>Tech Stack</FormLabel>
                                    <FormMessage className="text-sm" />
                                </div>
                                <FormControl>
                                    <Textarea
                                        {...field}
                                        disabled={loading}
                                        value={field.value || ""}
                                        className="h-20"
                                        placeholder="eg: JavaScript, React, Angular..."
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {/* Buttons */}
                    <div className="w-full flex items-center justify-end gap-6">
                        <Button
                            type="reset"
                            size="sm"
                            variant="outline"
                            disabled={isSubmitted || loading}
                        >
                            Reset
                        </Button>
                        <Button
                            type="submit"
                            size="sm"
                            disabled={isSubmitted || loading || !isValid}
                        >
                            {loading ? (
                                <Loader className="text-gray-50 animate-spin" />
                            ) : (
                                actions
                            )}
                        </Button>
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}

export default FormMockInterview
