import { createContext, useState, useContext } from 'react';

export const SearchParamsContext = createContext();
export const useSearchParams = () => useContext(SearchParamsContext)

export default function SearchParamsProvider(props) {
  const [SearchParams, setSearchParams] = useState('');

  return (
    <SearchParamsContext.Provider
      value={{
        SearchParams,
        setSearchParams
      }}
    >
      {props.children}
    </SearchParamsContext.Provider>
  )
}
