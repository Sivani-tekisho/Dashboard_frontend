import { useEffect } from 'react'
import { useAppDispatch } from '../store/hooks'
import { navigateTo } from '../store/slices/navigationSlice'

const Home = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(navigateTo({ page: '/' }))
  }, [dispatch])

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-6xl w-full">
        {/* Main Content Panel */}
        <div className="glass-card rounded-2xl p-12">
          {/* Logo Placeholder */}
          <div className="text-center mb-8">
            <div className="text-gray-400 text-sm mb-4">logo</div>
          </div>

          {/* Product Name */}
          <div className="text-center mb-4">
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-brand-primary via-brand-primary to-brand-dark bg-clip-text text-transparent">
              LeadQ.AI
            </h1>
          </div>

          {/* Tagline */}
          <div className="text-center mb-16">
            <p className="text-gray-700 text-xl md:text-2xl">AI Lead Intelligence Suite</p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {/* Smart Scanning Card */}
            <div className="glass-card rounded-xl p-6 hover:bg-white/98 transition-all hover:scale-105">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-brand-light rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-brand-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-gray-800 text-xl font-semibold mb-2 text-center">Smart Scanning</h3>
              <p className="text-gray-600 text-sm text-center">
                AI-powered card detection and text extraction
              </p>
            </div>

            {/* Instant Processing Card */}
            <div className="glass-card rounded-xl p-6 hover:bg-white/98 transition-all hover:scale-105">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-brand-light rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-brand-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-gray-800 text-xl font-semibold mb-2 text-center">Instant Processing</h3>
              <p className="text-gray-600 text-sm text-center">
                Real-time analysis and data organization
              </p>
            </div>

            {/* Secure Storage Card */}
            <div className="glass-card rounded-xl p-6 hover:bg-white/98 transition-all hover:scale-105">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-brand-light rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-brand-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-gray-800 text-xl font-semibold mb-2 text-center">Secure Storage</h3>
              <p className="text-gray-600 text-sm text-center">
                Cloud-based contact management system
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home

