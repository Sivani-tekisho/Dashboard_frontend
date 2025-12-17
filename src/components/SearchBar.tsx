import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { searchGlobal, DEFAULT_USER_ID } from '../services/api'
import type { SearchItem } from '../services/api'

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchItem[]>([])
  const [loading, setLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (query.length < 1) {
      setResults([])
      setShowResults(false)
      return
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true)
        const data = await searchGlobal(query, DEFAULT_USER_ID)
        setResults(data.results)
        setShowResults(true)
      } catch (err) {
        console.error('Search error', err)
        setResults([])
      } finally {
        setLoading(false)
      }
    }, 400) // debounce

    return () => clearTimeout(timer)
  }, [query])

  const handleItemClick = (item: SearchItem) => {
    // Navigate based on item type
    switch (item.type) {
      case 'contact':
        navigate('/leads') // or a specific contact detail page
        break
      case 'meeting':
        navigate('/meetings')
        break
      case 'email':
        navigate('/emails')
        break
      case 'lead':
        navigate('/leads')
        break
    }
    setQuery('')
    setShowResults(false)
  }

  return (
    <div className="relative w-full">
      <div className="relative">
        <input
          type="text"
          placeholder="Search contacts or companies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setShowResults(true)}
          className="bg-white/60 backdrop-blur-md border border-slate-200/50 rounded-lg pl-10 pr-4 py-2 text-slate-700 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100/50 text-sm w-full"
        />
        <svg 
          className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>

        {loading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
          </div>
        )}
      </div>

      {showResults && results.length > 0 && (
        <>
          {/* Backdrop to close results */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setShowResults(false)}
          />
          
          {/* Results dropdown */}
          <div className="absolute mt-2 w-full rounded-lg bg-white shadow-lg z-50 border border-slate-200 max-h-96 overflow-y-auto">
            {results.map(item => (
              <div
                key={item.id}
                onClick={() => handleItemClick(item)}
                className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-slate-100 last:border-b-0 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">{item.title}</p>
                    {item.subtitle && (
                      <p className="text-xs text-slate-500 mt-1">{item.subtitle}</p>
                    )}
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-600 capitalize">
                    {item.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {showResults && query.length > 0 && results.length === 0 && !loading && (
        <div className="absolute mt-2 w-full rounded-lg bg-white shadow-lg z-50 border border-slate-200 p-4">
          <p className="text-sm text-slate-500 text-center">No results found for "{query}"</p>
        </div>
      )}
    </div>
  )
}
