import WebCam from "react-webcam";
import {
    CircleStop,
    Loader,
    Mic,
    RefreshCw,
    Save,
    Video,
    VideoOff,
    WebcamIcon,
} from "lucide-react";
import useSpeechToText, { ResultType } from "react-hook-speech-to-text";
import { TooltipButton } from "@/components/tooltip-button";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { chatSession } from "@/scripts";
import { SaveModal } from "./saveModel";
import {
    addDoc,
    collection,
    doc,
    getDocs,
    query,
    serverTimestamp,
    updateDoc,
    where,
} from "firebase/firestore";
import { db } from "@/config/firebase.config";
import { useAuth } from "@clerk/clerk-react";
import { useParams } from "react-router-dom";

interface RecordAnswerProps {
    question: { question: string; answer: string };
    isWebCam: boolean;
    setIsWebCam: (value: boolean) => void;
}

interface AIResponse {
    ratings: number;
    feedback: string;
}

export const RecordAnswer = ({
    question,
    isWebCam,
    setIsWebCam,
}: RecordAnswerProps) => {
    const {
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false,
    });

    const [userAnswer, setUserAnswer] = useState("");
    const [isAiGenerating, setIsAiGenerating] = useState(false);
    const [aiResult, setAiResult] = useState<AIResponse | null>(null);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const { userId } = useAuth();
    const { interviewId } = useParams();

    const cleanJsonResponse = (responseText: string) => {
        let cleanText = responseText.trim();
        cleanText = cleanText.replace(/(json|```|`)/gi, "");
        try {
            return JSON.parse(cleanText);
        } catch (error) {
            throw new Error("Invalid JSON format: " + (error as Error)?.message);
        }
    };

    const generateResult = async (
        qst: string,
        qstAns: string,
        userAns: string
    ): Promise<AIResponse> => {
        setIsAiGenerating(true);

        const prompt = `
      Question: "${qst}"
      User Answer: "${userAns}"
      Correct Answer: "${qstAns}"
      Please compare the user's answer to the correct answer, and provide a rating (from 1 to 10) based on answer quality, and offer feedback for improvement.
      Return the result in JSON format with the fields "ratings" (number) and "feedback" (string).
    `;

        try {
            const aiResult = await chatSession.sendMessage(prompt);
            const text = await aiResult.response.text();
            const parsedResult: AIResponse = cleanJsonResponse(text);
            console.log("AI Parsed Result:", parsedResult);
            return parsedResult;
        } catch (error) {
            console.error("AI Generation Error:", error);
            toast("Error", {
                description: "An error occurred while generating feedback.",
            });
            return { ratings: 0, feedback: "Unable to generate feedback" };
        } finally {
            setIsAiGenerating(false);
        }
    };

    const recordUserAnswer = async () => {
        if (isRecording) {
            stopSpeechToText();

            if (userAnswer.trim().length < 30) {
                toast.error("Error", {
                    description: "Your answer should be more than 30 characters",
                });
                return;
            }

            const result = await generateResult(
                question.question,
                question.answer,
                userAnswer
            );
            console.log(result)
            setAiResult(result);
        } else {
            startSpeechToText();
        }
    };

    const recordNewAnswer = () => {
        setUserAnswer("");
        stopSpeechToText();
        startSpeechToText();
    };

    const saveUserAnswer = async () => {
        console.log(aiResult)
        setLoading(true);

        if (!aiResult) {
            toast.error("Missing AI Feedback", {
                description: "Please generate feedback before saving.",
            });
            return;
        }

        try {
            const currentQuestion = question.question;

            const userAnswerQuery = query(
                collection(db, "userAnswers"),
                where("userId", "==", userId),
                where("question", "==", currentQuestion)
            );

            const querySnap = await getDocs(userAnswerQuery);

            if (!querySnap.empty) {
                toast.info("Already Answered", {
                    description: "You have already answered this question",
                });
                return;
            }

            const docRef = await addDoc(collection(db, "userAnswers"), {
                mockIdRef: interviewId,
                question: question.question,
                correct_ans: question.answer,
                user_ans: userAnswer,
                feedback: aiResult.feedback,
                rating: aiResult.ratings,
                userId,
                createdAt: serverTimestamp(),
            });

            await updateDoc(doc(db, "userAnswers", docRef.id), {
                id: docRef.id,
                updatedAt: serverTimestamp(),
            });

            toast("Saved", { description: "Your answer has been saved." });
            setUserAnswer("");
            stopSpeechToText();
        } catch (error) {
            console.error("Save Error:", error);
            toast("Error", {
                description: "An error occurred while saving your answer.",
            });
        } finally {
            setLoading(false);
            setOpen(false);
        }
    };

    useEffect(() => {
        const combinedTranscripts = results
            .filter((result): result is ResultType => typeof result !== "string")
            .map((result) => result.transcript)
            .join(" ");
        setUserAnswer(combinedTranscripts);
    }, [results]);

    return (
        <div className="w-full flex flex-col items-center gap-8 mt-4">
            <SaveModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={saveUserAnswer}
                loading={loading}
            />

            <div className="w-full h-[400px] md:w-96 flex flex-col items-center justify-center border p-4 bg-gray-50 rounded-md">
                {isWebCam ? (
                    <WebCam
                        onUserMedia={() => setIsWebCam(true)}
                        onUserMediaError={() => setIsWebCam(false)}
                        className="w-full h-full object-cover rounded-md"
                    />
                ) : (
                    <WebcamIcon className="min-w-24 min-h-24 text-muted-foreground" />
                )}
            </div>

            <div className="flex items-center justify-center gap-3">
                <TooltipButton
                    content={isWebCam ? "Turn Off" : "Turn On"}
                    icon={
                        isWebCam ? (
                            <VideoOff className="min-w-5 min-h-5" />
                        ) : (
                            <Video className="min-w-5 min-h-5" />
                        )
                    }
                    onClick={() => setIsWebCam(!isWebCam)}
                />

                <TooltipButton
                    content={isRecording ? "Stop Recording" : "Start Recording"}
                    icon={
                        isRecording ? (
                            <CircleStop className="min-w-5 min-h-5" />
                        ) : (
                            <Mic className="min-w-5 min-h-5" />
                        )
                    }
                    onClick={recordUserAnswer}
                />

                <TooltipButton
                    content="Record Again"
                    icon={<RefreshCw className="min-w-5 min-h-5" />}
                    onClick={recordNewAnswer}
                />

                <TooltipButton
                    content="Save Result"
                    icon={
                        isAiGenerating ? (
                            <Loader className="min-w-5 min-h-5 animate-spin" />
                        ) : (
                            <Save className="min-w-5 min-h-5" />
                        )
                    }
                    onClick={() => setOpen(!open)}
                    disbaled={!aiResult}
                />
            </div>

            <div className="w-full mt-4 p-4 border rounded-md bg-gray-50">
                <h2 className="text-lg font-semibold">Your Answer:</h2>
                <p className="text-sm mt-2 text-gray-700 whitespace-normal">
                    {userAnswer || "Start recording to see your answer here."}
                </p>

                {interimResult && (
                    <p className="text-sm text-gray-500 mt-2">
                        <strong>Current Speech:</strong> {interimResult}
                    </p>
                )}
            </div>
        </div>
    );
};
