import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import useSearch from './hooks/useSearch';

export default function MagazineSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('Semantic');
  const [isBackendRunning] = useState(true);

  const filters = ['Semantic', 'Keywords', 'Hybrid'];

  // Use React Query to fetch data
  const { data, error, isLoading, refetch } = useSearch(searchTerm, filter);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm && filter) {
      // Trigger the query manually when the user clicks search
      refetch();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-green-600 text-white p-4 w-full flex justify-between items-center">
        <div>
          <h1 className="text-lg">API Magazine Search App by Gerson</h1>
        </div>
        {isBackendRunning ? (
            <p
              className="text-green-300 blinking"
            >
              Backend is running
            </p>
          ) : (
            <p
              className="text-red-300 blinking"
            >
              Backend is not running
            </p>
          )}
      </header>

      <main className="mt-10 p-6 bg-white shadow-lg rounded-lg max-w-3xl mx-auto">
        {/* Search Form */}
        <form className="mb-6" onSubmit={handleSearch}>
          <div className="flex items-center border-b border-gray-300 pb-2">
            <FiSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              className="w-full outline-none text-gray-700 rounded-lg p-2 border-0 focus:outline-none focus:ring-0 focus:border-green-500"
              placeholder="What are you looking for today?"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filter Options */}
          <div className="flex space-x-2 mt-4">
            <span className='text-gray-400'>Kind of search: </span>
            {filters.map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                className={`px-3 py-1 rounded-full ${
                  filter === item ? 'bg-green-500 text-white' : 'bg-green-200 text-green-600'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </form>

        {/* Filtered Magazine Results */}
        <div className='mb-5'>
          <h2 className="text-gray-600 font-semibold mb-4">Magazines</h2>
          {isLoading && (
            <div role="status">
                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span className="sr-only">Loading...</span>
            </div>
          )}
          {!isLoading && data && data.length > 0 ? (
            <div className="space-y-4">
              {data.map((result) => (
                <div key={result.id} className="border p-4 rounded-lg mb-4">
                    <h3 className="text-lg font-bold">{result.title}</h3>
                    <p className="text-sm text-gray-500">
                    By {result.author} on {result.publication_date}
                    </p>
                    <p className="mt-2">{result.content}</p>
                </div>
                ))}
            </div>
          ) : !isLoading && (
            <p className="text-gray-500">No results found for "{searchTerm}"</p>
          )}
        </div>
      </main>
    </div>
  );
}
