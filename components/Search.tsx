// ABOUTME: Search component that provides client-side search functionality using Fuse.js
// ABOUTME: Fetches search index and displays matching results with links

import { useState, useEffect } from 'react'
import Fuse from 'fuse.js'
import Link from 'next/link'

interface SearchItem {
  id: string;
  title: string;
  date?: string;
  tags?: string[];
  type: string;
  url: string;
  year?: number;
  month?: number;
}

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchIndex, setSearchIndex] = useState<SearchItem[]>([])
  const [searchResults, setSearchResults] = useState<SearchItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Fetch search index on component mount
  useEffect(() => {
    fetch('/search.json')
      .then(response => response.json())
      .then(data => {
        setSearchIndex(data)
        setIsLoading(false)
      })
      .catch(error => {
        console.error('Error loading search index:', error)
        setIsLoading(false)
      })
  }, [])

  // Perform search when search term changes
  useEffect(() => {
    if (!searchTerm.trim() || searchIndex.length === 0) {
      setSearchResults([])
      return
    }

    const fuse = new Fuse(searchIndex, {
      keys: ['title', 'tags', 'id'],
      threshold: 0.3,
      includeScore: true
    })

    const results = fuse.search(searchTerm)
    setSearchResults(results.map(result => result.item))
  }, [searchTerm, searchIndex])

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'post':
        return 'Blog'
      case 'fitness':
        return 'Fitness'
      case 'recipe':
        return 'Recipe'
      default:
        return type
    }
  }

  return (
    <div className="search-container mb-8">
      <div className="relative">
        <input
          type="text"
          placeholder="Search posts, recipes, fitness..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            ✕
          </button>
        )}
      </div>
      
      {searchResults.length > 0 && (
        <div className="mt-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {searchResults.map((result) => (
              <li key={`${result.type}-${result.id}`} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700">
                <Link href={result.url} className="block">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                        {result.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1 text-sm text-gray-600 dark:text-gray-400">
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">
                          {getTypeLabel(result.type)}
                        </span>
                        {result.date && <span>{result.date}</span>}
                        {result.year && result.month && (
                          <span>{result.year}-{String(result.month).padStart(2, '0')}</span>
                        )}
                      </div>
                      {result.tags && result.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {result.tags.map(tag => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {searchTerm && searchResults.length === 0 && !isLoading && (
        <div className="mt-4 text-center text-gray-600 dark:text-gray-400">
          No results found for "{searchTerm}"
        </div>
      )}
    </div>
  )
}

export default Search