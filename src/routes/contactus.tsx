import React from 'react'

const ContactUs = () => {
    return (
        < main className="max-w-5xl mx-auto py-10 px-4" >
            <h1 className="text-3xl font-semibold mb-6">Contact Us</h1>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                    type="text"
                    placeholder="Full Name"
                    className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
                <input
                    type="email"
                    placeholder="Email Address"
                    className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
                <input
                    type="text"
                    placeholder="Subject"
                    className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 col-span-1 md:col-span-2"
                />
                <textarea
                    rows={5}
                    placeholder="Your Message"
                    className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 col-span-1 md:col-span-2"
                ></textarea>
                <button
                    type="submit"
                    className="bg-gray-900 text-white py-3 px-6 rounded-md hover:bg-gray-700 col-span-1 md:col-span-2"
                >
                    Send Message
                </button>
            </form>
        </main >
    )
}

export default ContactUs
