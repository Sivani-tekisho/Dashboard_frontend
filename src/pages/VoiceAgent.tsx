import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const VoiceAgent = () => {
  const navigate = useNavigate()
  const [isRecording, setIsRecording] = useState(false)

  const toggleRecording = () => {
    setIsRecording(!isRecording)
  }

  return (
    <div className="min-h-screen p-8 bg-slate-50/50">
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
            <h1 className="text-3xl font-bold text-slate-900">Voice Agent</h1>
          </div>
          <p className="text-slate-600 text-sm ml-11">AI-powered voice assistant for lead interactions</p>
        </div>

        {/* Voice Agent Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Voice Control Panel */}
          <div className="glass-card p-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-6">Voice Control</h2>
            
            {/* Recording Status */}
            <div className="flex flex-col items-center justify-center py-12">
              <div className={`relative w-32 h-32 rounded-full flex items-center justify-center transition-all ${
                isRecording ? 'bg-blue-100 animate-pulse' : 'bg-blue-50'
              }`}>
                <button
                  onClick={toggleRecording}
                  className={`w-24 h-24 rounded-full flex items-center justify-center transition-all shadow-lg ${
                    isRecording 
                      ? 'bg-blue-600 hover:bg-blue-700' 
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {isRecording ? (
                    <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <rect x="6" y="6" width="12" height="12" rx="2" />
                    </svg>
                  ) : (
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                  )}
                </button>
                {isRecording && (
                  <div className="absolute inset-0 rounded-full border-4 border-blue-400 animate-ping"></div>
                )}
              </div>
              
              <p className="mt-6 text-lg font-medium text-slate-800">
                {isRecording ? 'Recording...' : 'Click to start voice interaction'}
              </p>
              <p className="mt-2 text-sm text-slate-500">
                {isRecording ? 'AI is listening and analyzing' : 'Voice agent is ready'}
              </p>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3 mt-8">
              <button className="px-4 py-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium">
                Start Call
              </button>
              <button className="px-4 py-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium">
                Schedule Follow-up
              </button>
              <button className="px-4 py-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium">
                View Transcript
              </button>
              <button className="px-4 py-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium">
                Save Notes
              </button>
            </div>
          </div>

          {/* Conversation Insights */}
          <div className="glass-card p-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-6">Conversation Insights</h2>
            
            <div className="space-y-4">
              {/* AI Analysis */}
              <div className="bg-blue-50/50 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-slate-800 mb-1">Sentiment Analysis</h3>
                    <p className="text-sm text-slate-600">Positive tone detected. Lead is engaged and interested.</p>
                  </div>
                </div>
              </div>

              {/* Key Topics */}
              <div className="bg-blue-50/50 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-slate-800 mb-2">Key Topics Discussed</h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-white text-blue-600 text-xs rounded-full border border-blue-200">Pricing</span>
                      <span className="px-3 py-1 bg-white text-blue-600 text-xs rounded-full border border-blue-200">Features</span>
                      <span className="px-3 py-1 bg-white text-blue-600 text-xs rounded-full border border-blue-200">Timeline</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Suggestions */}
              <div className="bg-blue-50/50 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-slate-800 mb-2">AI Suggestions</h3>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>• Highlight ROI benefits in next interaction</li>
                      <li>• Send pricing proposal within 24 hours</li>
                      <li>• Schedule demo for next week</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Conversations */}
        <div className="mt-6 glass-card p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Recent Voice Interactions</h2>
          <div className="space-y-3">
            {[
              { contact: 'John Anderson', time: '2 hours ago', duration: '12:34', status: 'Completed' },
              { contact: 'Sarah Mitchell', time: '1 day ago', duration: '8:15', status: 'Follow-up Required' },
              { contact: 'Mike Johnson', time: '2 days ago', duration: '15:42', status: 'Completed' },
            ].map((conversation, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">{conversation.contact}</p>
                    <p className="text-sm text-slate-500">{conversation.time} • {conversation.duration}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 text-xs rounded-full ${
                    conversation.status === 'Completed' 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'bg-blue-100 text-blue-600'
                  }`}>
                    {conversation.status}
                  </span>
                  <button className="text-blue-600 hover:text-blue-700">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default VoiceAgent


