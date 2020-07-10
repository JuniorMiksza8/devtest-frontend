import React,{createContext,useState,useContext} from 'react';

const PageContext = createContext();

export default function PageProvider({children}){
    const [page,setPage] = useState('Produtos');

    return(
      <PageContext.Provider 
      value={{
        page,
        setPage
      }}>
        
          {children}
        
      </PageContext.Provider>
    );
}

export function usePage(){
  const context = useContext(PageContext);
  if (!context) throw new Error("useCount must be used within a CountProvider");
  const {page,setPage} = context;
  return {page,setPage};
}