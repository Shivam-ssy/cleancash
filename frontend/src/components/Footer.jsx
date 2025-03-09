import React from 'react'

function Footer() {
  return (
    <footer className="bg-blue-950 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="bg-white p-1 rounded-full shadow-lg">
                  <img className="h-10 w-10 rounded-full" src="/do.jpg" alt="CleanCash Logo" />
                </div>
                <div className="text-xl font-bold text-white ml-3">
                  Clean<span className="text-green-400">Cash</span>
                </div>
              </div>
              <p className="text-gray-400">
                Empowering citizens to fight pollution while earning rewards for their contributions.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {['Home', 'Report', 'About Us', 'Contact', 'FAQ'].map((item) => (
                  <li key={item}>
                    <button 
                      onClick={() => console.log(`Navigate to ${item}`)}
                      className="hover:text-green-400 transition-colors duration-300"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-white mb-4">Legal</h3>
              <ul className="space-y-2">
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR Compliance'].map((item) => (
                  <li key={item}>
                    <button 
                      onClick={() => console.log(`Navigate to legal/${item.toLowerCase().replace(/\s+/g, '-')}`)}
                      className="hover:text-green-400 transition-colors duration-300"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-white mb-4">Connect With Us</h3>
              <div className="flex space-x-4 mb-4">
                {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                  <button 
                    key={social} 
                    onClick={() => console.log(`Navigate to social/${social}`)}
                    className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center hover:bg-green-600 transition-colors duration-300"
                  >
                    <span className="sr-only">{social}</span>
                    {/* Placeholder for social icons */}
                    <div className="w-5 h-5 bg-white rounded-full"></div>
                  </button>
                ))}
              </div>
              <p className="text-gray-400">
                Email: contact@cleancash.com<br />
                Phone: +1 (555) 123-4567
              </p>
            </div>
          </div>
          
          <div className="border-t border-blue-900 mt-12 pt-6 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} CleanCash. All rights reserved.</p>
          </div>
        </div>
      </footer>
  )
}

export default Footer
