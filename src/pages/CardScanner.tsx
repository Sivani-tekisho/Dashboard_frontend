import { useNavigate } from 'react-router-dom'

const CardScanner = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Go back"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-3xl font-bold text-gray-800">Card Scanner</h1>
          </div>
          <p className="text-gray-600 ml-11">Scan and extract information from business cards</p>
        </div>

        <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-brand-light rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-12 h-12 text-brand-primary"
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
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Card Scanner</h2>
            <p className="text-gray-600 mb-8">Upload or scan a business card to extract contact information</p>
            
            <button className="bg-brand-primary hover:bg-brand-primary/90 text-white font-medium px-6 py-3 rounded-lg transition-colors">
              Upload Card
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardScanner

