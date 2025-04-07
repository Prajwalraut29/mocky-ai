
const Service = () => {
    return (
        <main className="max-w-5xl mx-auto py-16 px-4">
            <h1 className="text-4xl font-bold text-center mb-10 text-green-600">Our Services</h1>

            <div className="grid md:grid-cols-3 gap-8">
                {/* Service Card 1 */}
                <div className="bg-gray-50 shadow-md rounded-lg p-6 hover:shadow-xl transition duration-300">
                    <h2 className="text-xl font-semibold mb-2 text-green-600">Interview Preparation</h2>
                    <p className="text-gray-700 text-sm">
                        Get mock interviews, AI feedback, and personalized coaching to ace your next job interview.
                    </p>
                </div>

                {/* Service Card 2 */}
                <div className="bg-gray-50 shadow-md rounded-lg p-6 hover:shadow-xl transition duration-300">
                    <h2 className="text-xl font-semibold mb-2 text-green-600">Career Coaching</h2>
                    <p className="text-gray-700 text-sm">
                        One-on-one sessions with top industry mentors to help you navigate your career path.
                    </p>
                </div>

                {/* Service Card 3 */}
                <div className="bg-gray-50 shadow-md rounded-lg p-6 hover:shadow-xl transition duration-300">
                    <h2 className="text-xl font-semibold mb-2 text-green-600">Resume Building</h2>
                    <p className="text-gray-700 text-sm">
                        Build a professional resume that stands out, powered by AI formatting and expert guidance.
                    </p>
                </div>
            </div>
        </main>

    )
}

export default Service
