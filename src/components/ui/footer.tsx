import {
    BrainCircuitIcon,
    FacebookIcon,
    TwitterIcon,
    InstagramIcon,
    LinkedinIcon,
} from 'lucide-react'
import Container from './container'
const Footer = () => {
    return (
        <footer className="w-full">
            <footer className="w-full bg-black text-white py-12 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Quick Links Section */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-300 hover:text-white transition-colors"
                                >
                                    Home
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-300 hover:text-white transition-colors"
                                >
                                    Contact Us
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-300 hover:text-white transition-colors"
                                >
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-300 hover:text-white transition-colors"
                                >
                                    Services
                                </a>
                            </li>
                        </ul>
                    </div>
                    {/* About Us Section */}
                    <div className="md:col-span-2">
                        <h3 className="text-lg font-bold mb-4">About Us</h3>
                        <p className="text-gray-300">
                            We are committed to helping you unlock your full potential with
                            AI-powered tools. Our platform offers a wide range of resources to
                            improve your interview skills and chances of success.
                        </p>
                    </div>
                    {/* Services Section */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Services</h3>
                        <ul className="space-y-2">
                            <li className="text-gray-300">Interview Preparation</li>
                            <li className="text-gray-300">Career Coaching</li>
                            <li className="text-gray-300">Resume Building</li>
                        </ul>
                    </div>
                    {/* Contact and Social Section */}
                    <div className="md:col-span-4 border-t border-gray-800 pt-8 mt-8">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <div className="flex items-center mb-4 md:mb-0">
                                <div className="h-8 w-8 bg-emerald-500 rounded-md flex items-center justify-center mr-2">
                                    <BrainCircuitIcon className="text-white" size={16} />
                                </div>
                                <span className="font-bold">AI Superpower</span>
                            </div>
                            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0">
                                <div className="text-gray-300 mr-8">
                                    123 AI Street, Tech City, 12345
                                </div>
                                <div className="flex space-x-4">
                                    <a
                                        href="#"
                                        className="text-gray-300 hover:text-white transition-colors"
                                    >
                                        <FacebookIcon size={20} />
                                    </a>
                                    <a
                                        href="#"
                                        className="text-gray-300 hover:text-white transition-colors"
                                    >
                                        <TwitterIcon size={20} />
                                    </a>
                                    <a
                                        href="#"
                                        className="text-gray-300 hover:text-white transition-colors"
                                    >
                                        <InstagramIcon size={20} />
                                    </a>
                                    <a
                                        href="#"
                                        className="text-gray-300 hover:text-white transition-colors"
                                    >
                                        <LinkedinIcon size={20} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </footer>
    )
}

export default Footer
