import { createContext, useState, useContext } from 'react';

export const SearchParamsContext = createContext();
export const useSearchParams = () => useContext(SearchParamsContext)

export default function SearchParamsProvider(props) {
  const [tester,setTester] = useState({key:"Whatsapo",key2: {p:"hah",k:"rgr"}})
  // const [SearchParams, setSearchParams] = useState({search:'',query:{city:'',state:'',price:'',categories:'',features:''}})
  const [searchParams, setSearchParams] = useState({
    search: '',
    query: {
      city: '',
      state: '',
      price: '',
      categories: '',
      features: ''
    }
  });
  return (
    <SearchParamsContext.Provider
      value={{
        searchParams,
        setSearchParams,
        tester,
        setTester
      }}
    >
      {props.children}
    </SearchParamsContext.Provider>
  )
}
