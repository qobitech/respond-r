
export const useStrictLoader = ( currentAction : string , ...pageActions : string[] ) => {
    let isLoad : boolean = false;
    for( let key in pageActions ){
        if( pageActions[ key ] === currentAction ){
            isLoad = true;
            break;
        }  
    }
    return isLoad;
}

