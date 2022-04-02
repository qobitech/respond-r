const token = localStorage.getItem('CentralDatabaseToken')

// type DT = {
//     certserialnumber: string,
//     email: string,
//     exp: number,
//     groupsid: string,
//     'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/homephone': string,
//     'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/mobilephone': string,
//     iat: number,
//     nameid: string,
//     nbf: number,
//     role: string,
//     unique_name: string
// }

export function parseJwt (token: string) {
    if( token !== null ){
        var base64Url = token.split('.')[1];
        if( base64Url !== undefined ){
            var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            return JSON.parse(jsonPayload);
        }
    }
};

export const decodedToken = parseJwt(token!) || 0