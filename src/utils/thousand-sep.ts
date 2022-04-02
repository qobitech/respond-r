
export const handleAmount = ( amount : number ) => {
    if(amount){
        var am = amount.toString() ;
        const toNumber = parseFloat(am.replace(/\D/g, ''));
        const toLocale = "₦" +toNumber.toLocaleString( );
        return toLocale;
    } else {return '₦0'} 
}