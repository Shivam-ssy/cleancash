import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const LandingPage = () => {
  return (
    <div className="font-sans bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover"
            src="/heroImg.jpg"
            alt="Clean environment"
          />
          <div className="absolute inset-0 bg-black opacity-40"></div>
        </div>

        {/* Navbar */}
        <nav className="relative z-10 container mx-auto flex items-center justify-between py-6 px-4">
          {/* Logo */}
          <div className="flex items-center">
            <div className="bg-white p-1 rounded-full shadow-lg">
              <img className="h-12 w-12 rounded-full" src="/do.jpg" alt="CleanCash Logo" />
            </div>
            <div className="text-2xl md:text-3xl font-extrabold text-white ml-3 tracking-tight">
              Clean<span className="text-green-400">Cash</span>
            </div>
          </div>

          {/* Menu */}
          <div className="hidden md:flex text-white space-x-8">
            {['Home', 'Report', 'About', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => console.log(`Navigate to ${item}`)}
                className="text-lg font-medium hover:text-green-400 transition-colors duration-300"
              >
                {item}
              </button>
            ))}
          </div>

          {/* Login Button */}
          <button className="flex items-center justify-center px-6 py-2 bg-gradient-to-r from-green-600 to-green-500 rounded-full shadow-lg hover:from-green-500 hover:to-green-400 transition-all duration-300 transform hover:scale-105">
            <Link to="/auth" className="text-lg font-bold text-white">Login</Link>
          </button>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto h-full flex items-center px-4">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
              Report Pollution,<br />
              <span className="text-green-400">Earn Rewards</span>,<br />
              Drive Change
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-lg">
              Join our community-driven initiative to clean up our environment while earning rewards for your contributions.
            </p>
            <button className="px-8 py-4 bg-green-600 rounded-full text-xl font-bold text-white shadow-xl hover:bg-green-500 transition-colors duration-300 transform hover:scale-105 flex items-center">
              <span>Report Now</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-20 bg-gradient-to-b from-blue-900 to-blue-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              How <span className="text-green-400">It Works</span>
            </h2>
            <div className="w-24 h-1 bg-green-500 mx-auto"></div>
            <p className="text-xl text-blue-200 mt-6 max-w-2xl mx-auto">
              Make a difference in just four simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {[
              {
                title: "Capture & Upload",
                text: "Take a clear photo of the pollution. Our AI-powered image recognition automatically detects the pollution type and filters duplicate reports.",
                img: "/upload.jpg",
                alt: "Upload pollution photo",
                icon: "📸"
              },
              {
                title: "Submit Report",
                text: "Enter basic details about the pollution type and location. Our streamlined form makes reporting quick and easy.",
                img: "/submit.jpg",
                alt: "Submit pollution report",
                icon: "📝"
              },
              {
                title: "Verification Process",
                text: "Our admin team reviews each report for accuracy. You'll receive live updates throughout the verification process.",
                img: "/vreo.jpg",
                alt: "Report verification",
                icon: "✅"
              },
              {
                title: "Get Rewarded",
                text: "Once your report is verified and action is taken, you earn points that can be converted to real rewards or donations.",
                img: "/re.jpg",
                alt: "Receive rewards",
                icon: "🎁"
              },
            ].map((item, index) => (
              <div key={index} className="bg-blue-800 bg-opacity-30 rounded-xl shadow-xl overflow-hidden transform transition duration-300 hover:scale-105">
                <div className="flex flex-col h-full">
                  <div className="relative h-48">
                    <img 
                      src={item.img} 
                      alt={item.alt} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-green-600 flex items-center justify-center text-2xl">
                      {item.icon}
                    </div>
                  </div>
                  <div className="p-6 flex-grow">
                    <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                    <p className="text-blue-100">{item.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <button className="px-10 py-4 bg-gradient-to-r from-green-600 to-green-500 rounded-full text-xl font-bold text-white shadow-xl hover:from-green-500 hover:to-green-400 transition-all duration-300 transform hover:scale-105">
              Start Reporting Today
            </button>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-green-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Join thousands of environmental champions who are cleaning up our world one report at a time.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-3 bg-white text-green-600 rounded-full text-lg font-bold shadow-lg hover:bg-gray-100 transition-colors duration-300">
              Sign Up Now
            </button>
            <button className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-full text-lg font-bold shadow-lg hover:bg-white hover:text-green-600 transition-colors duration-300">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <Footer/>
    </div>
  );
};

export default LandingPage;