import Container from '@/components/ui/container'
import {
    ArrowRightIcon,
    BrainCircuitIcon,
    AwardIcon,
    BarChartIcon,
    SparklesIcon,
} from 'lucide-react'
import { Link } from 'react-router-dom'
const HomePage = () => {
    return (
        <Container>
            <section className="w-full bg-gradient-to-br bg-white py-16 px-6 border-b border-b-gray-200 shadow">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h1 className="text-5xl font-bold text-gray-900 leading-tight">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">
                                    Mocky AI
                                </span>
                                <span className="block mt-2">
                                    A better way to improve your interview chances and skills
                                </span>
                            </h1>
                            <p className="mt-6 text-lg text-gray-600">
                                Boost your interview skills and increase your success rate with
                                AI-driven insights. Discover a smarter way to prepare, practice,
                                and stand out.
                            </p>
                            <div className="mt-8 flex flex-col sm:flex-row gap-4">
                                <Link to={"/generate"}>
                                    <button className="bg-gray-900 text-white px-6 py-3 rounded-md font-medium flex items-center justify-center">
                                        Try Mock Interview{' '}
                                        <ArrowRightIcon size={18} className="ml-2" />
                                    </button>
                                </Link>
                                <button className="border border-gray-300 bg-white text-gray-700 px-6 py-3 rounded-md font-medium">
                                    Learn More
                                </button>
                            </div>
                        </div>
                        <div className="relative">
                            <img
                                src="https://blog.suitebriar.com/hs-fs/hubfs/using-google-meet-for-personal-calls.jpeg?width=960&name=using-google-meet-for-personal-calls.jpeg"
                                alt="AI Interview Assistant Robot"
                                className="rounded-lg shadow-xl w-full"
                            />
                            <div className="absolute -bottom-5 -left-5 bg-white p-4 rounded-lg shadow-lg">
                                <div className="flex items-center space-x-2">
                                    <AwardIcon className="text-emerald-500" />
                                    <span className="font-medium">
                                        Trusted by 10,000+ professionals
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Stats Section */}
            <section className="w-full bg-white py-16 px-6 border-b border-b-gray-200 shadow mt-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">
                                Unleash your potential with personalized AI insights and
                                targeted interview practice.
                            </h2>
                            <p className="mt-4 text-lg text-gray-600">
                                Transform the way you prepare, gain confidence, and boost your
                                chances of landing your dream job. Let AI be your edge in
                                today's competitive job market.
                            </p>
                            <Link to={"/generate"}>
                                <button className="mt-8 bg-gray-900 text-white px-6 py-3 rounded-md font-medium flex items-center justify-center">
                                    Generate <SparklesIcon size={18} className="ml-2" />
                                </button>
                            </Link>
                        </div>
                        <div className="relative">
                            <img
                                src="https://blog.suitebriar.com/hubfs/google-meet-for-personal-use.jpeg"
                                alt="AI Interview Workspace"
                                className="rounded-lg shadow-xl w-full"
                            />
                            <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4">
                                <div className="bg-white p-6 rounded-full shadow-xl">
                                    <div className="text-center">
                                        <div className="text-4xl font-bold text-gray-900">
                                            250k+
                                        </div>
                                        <div className="text-sm text-gray-500">Offers Received</div>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4">
                                <div className="bg-white p-6 rounded-full shadow-xl">
                                    <div className="text-center">
                                        <div className="text-4xl font-bold text-gray-900">
                                            1.2M+
                                        </div>
                                        <div className="text-sm text-gray-500">Interviews Aced</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Features Section */}
            <section className="w-full bg-white py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900">
                            How Mocky Ai Works
                        </h2>
                        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                            Our advanced AI technology simulates real interview scenarios,
                            provides personalized feedback, and helps you improve with every
                            practice session.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-lg shadow-md">
                            <div className="h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                                <BrainCircuitIcon className="text-emerald-600" size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                                AI-Driven Interviews
                            </h3>
                            <p className="text-gray-600">
                                Practice with our AI interviewer that adapts to your responses
                                and simulates realistic interview scenarios.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-lg shadow-md">
                            <div className="h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                                <BarChartIcon className="text-emerald-600" size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                                Detailed Analytics
                            </h3>
                            <p className="text-gray-600">
                                Get comprehensive feedback on your performance, including
                                communication skills, technical knowledge, and areas for
                                improvement.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-lg shadow-md">
                            <div className="h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                                <SparklesIcon className="text-emerald-600" size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                                Personalized Coaching
                            </h3>
                            <p className="text-gray-600">
                                Receive tailored recommendations and practice exercises based on
                                your specific strengths and weaknesses.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            {/* CTA Section */}
            <section className="w-full  text-dark py-16 px-6 shadow-xl bg-white">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4">
                        Ready to ace your next interview?
                    </h2>
                    <p className="text-lg text-dark-300 mb-8 max-w-2xl mx-auto">
                        Join thousands of professionals who have transformed their interview
                        skills and landed their dream jobs.
                    </p>
                    <Link to={"/generate"}>
                        <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-md font-medium text-lg">
                            Get Started Now
                        </button>
                    </Link>
                </div>
            </section>
        </Container>
    )
}

export default HomePage
