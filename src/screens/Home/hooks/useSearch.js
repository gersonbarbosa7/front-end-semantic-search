import { useQuery } from '@tanstack/react-query';
import api from '../../../services/api';

const search = async (query, search_type) => {

    if(!query || query === ''){
        return []
    }

    const body = {
        query: query ? query.toLowerCase() : '',
        search_type: search_type ? search_type.toLowerCase() : '',
        page: 0,
        limit: 10
    };
    const response = await api.post(
        `/search`,
        body
    );

    if (!response) {
        throw new Error('Network response was not ok');
    }

    return response.data.results;
}

function useSearch(query, search_type) {
  return useQuery({
    queryKey: ['apiSearch', query, search_type],
    queryFn: () => search(query, search_type),
    staleTime: 5000,
    cacheTime: 10000
  });
}

export default useSearch;