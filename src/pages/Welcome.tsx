import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-black bg-opacity-90 text-white">
      <div className="container mx-auto px-4">
        <header className="flex justify-between items-center py-6">
          <h1 className="text-red-600 text-4xl font-bold">NETFLIX</h1>
          <button onClick={()=>navigate('/home')} className="bg-red-600 px-4 py-2 rounded">
            Get Started
          </button>
        </header>
        
        <div className="text-center mt-32">
          <h2 className="text-5xl font-bold mb-4">
            Unlimited movies,<br />TV shows and more
          </h2>
          <p className="text-xl mb-8">Watch anywhere. Cancel at any time.</p>
          
          <div className="max-w-xl mx-auto">
            <p className="text-lg mb-4">Ready to watch? Enter your email to create or restart your membership.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email address" 
                className="flex-1 px-4 py-3 bg-black bg-opacity-50 border border-gray-600 rounded"
              />
              <button 
                onClick={()=>navigate('/home')}
                className="bg-red-600 px-8 py-3 rounded flex items-center"
              >
                Get Started <ChevronRight className="ml-2" />
              </button>
            </div>
          </div>
        </div>
        
        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-24">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-purple-600 rounded-lg flex items-center justify-center">
              <img src="/api/placeholder/64/64" alt="TV" className="w-8 h-8" />
            </div>
            <p>Enjoy on your TV</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-purple-600 rounded-lg flex items-center justify-center">
              <img src="/api/placeholder/64/64" alt="Download" className="w-8 h-8" />
            </div>
            <p>Download your shows</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-purple-600 rounded-lg flex items-center justify-center">
              <img src="/api/placeholder/64/64" alt="Watch" className="w-8 h-8" />
            </div>
            <p>Watch everywhere</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-purple-600 rounded-lg flex items-center justify-center">
              <img src="/api/placeholder/64/64" alt="Profile" className="w-8 h-8" />
            </div>
            <p>Create profiles for kids</p>
          </div>
        </div> */}
      </div>
    </div>
  );
};



export default WelcomePage;