
export interface IMenuData {
    id: number;
    title : string;
    menuicon : string;
    // menuicon: ( status : boolean )=> string;
    toggleicon?: string;
    isChildren : boolean;
    children?: ( children : Array<ISubMenuData> ) => Array<ISubMenuData>;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    url : string;
    suburls?: Array<string>;
    view?: string;
}

export interface ISubMenuData {
    id : number;
    parentid : number;
    title : string;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    url : string;
    view?: string;
}