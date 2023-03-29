import React, { FC } from 'react';
import { useState } from 'react';
import Modal from 'utils/modal';

export const useModal = ( Component: JSX.Element, action: string ) => {

    const [ modal, setModal ] = useState({ [action] : false });

    const setValueFunc = ( name : string, value : boolean ) => {
        setModal( e => ( { ...e, [ name ] : value } ) )
    }
    
    const mainModal = 
                <Modal show={modal[action]} handleClose={()=> setValueFunc( action, false)} >
                    <div>
                        {Component}
                    </div>
                </Modal>

    return [ mainModal, setValueFunc ];
}

type UseModalProps = [
    (name: string, value: boolean) => void,
    JSX.Element[]
] 


type GenericObject = { [ key : string ]: boolean}

export const useCRUDModal = 
    <T extends GenericObject, Y > 
    ( 
        Component: Array<FC>, 
        initialValues: T,
        childArg?: Y
    ): UseModalProps  => {

    const [ modal, setModal ] = useState( initialValues );

    const setValueFunc = ( name : string, value : boolean ) => setModal( e => ( { ...e, [ name ] : value } ) )
    
    const ModalComponent = 
        Component.map(( FCComponent, index ) => {
            return(
                <Modal show={ Object.values(modal)[index] } 
                    handleClose={ ( )=> setModal( e => ( { ...e, [ Object.keys(modal)[index] ] : false } ) ) } key={index} >
                    <FCComponent {...childArg!} />
                </Modal>
            )
    } )                
    return [ setValueFunc, ModalComponent ];
}

type UseModalArgProps = [
    (name: string, value: boolean) => void,
    JSX.Element[]
]

export const useModalWithArg =  <T extends GenericObject> ( 
        Component: Array<JSX.Element>, 
        initialValues: T,
        style?:Array<{[key: string]: any}>,
        onClose?: () => void,
    ): UseModalArgProps  => {

    const [ modal, setModal ] = useState( initialValues );

    const setValueFunc = ( name : string, value : boolean ) => setModal( e => ( { ...e, [ name ] : value } ) )
    
    const ModalComponent = 
        Component.map(( FCComponent, index ) => {
            return(
                <Modal show={ Object.values(modal)[index] } style={style!== undefined ? style![index] : {}}
                    handleClose={ ( ) => {setModal( e => ( { ...e, [ Object.keys( modal )[ index ] ] : false }));
                    typeof onClose === 'function' && onClose!() }} 
                    key={index} > 
                    {FCComponent}
                </Modal>
            )
    } )                
    return [ setValueFunc, ModalComponent ];
}