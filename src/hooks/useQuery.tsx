import { useState, useEffect, useCallback } from 'react'

interface IProps {
    loading : boolean;
    request : Array<{ [ key : string ] : any }>;
    requestBySearch? : Array<{ [ key : string ] : any }>;
    cancelfunc? : () => void; 
}

type USearch = [ { [ key : string ] : any }[], boolean, boolean, React.Dispatch<React.SetStateAction<boolean>>, boolean, ()=> void ]

export const useSearch = <T extends IProps> ( props : T ) => {
    
    const { loading, request, requestBySearch, cancelfunc } = props;
    const [ veh, setVeh ] = useState<{ [ key : string ] : any }[]>()
    const [ isSearch, setIsSearch ] = useState( false )
    const [ isSearchEmpty, setIsSearchEmpty ] = useState( false )
    const [ searchMode, setSearchMode ] = useState( false )

    useEffect(()=>{
        if(searchMode){
            setVeh( requestBySearch );
            setIsSearch( true );
            setIsSearchEmpty( false );             
        }else{
            if( request.length > 0 ){
                setVeh( request );
                setIsSearch( false );
                setIsSearchEmpty( false );
            }
        }   
    },[ requestBySearch, searchMode, loading, request ]);

    const cancelQuery = useCallback((  ) => {
        setSearchMode( false );
        setIsSearch( false );
        setIsSearchEmpty( false );
        typeof cancelfunc === 'function' ? cancelfunc!() : void(0);
    // eslint-disable-next-line
    },[])

    return [ veh, isSearch, isSearchEmpty, setSearchMode, searchMode, cancelQuery ] as USearch
}