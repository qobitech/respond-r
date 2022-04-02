import React, { useEffect } from 'react'
import {createBrowserHistory} from 'history';

let oldpath = "";

const ScrollIntoView = (props: any) => {  

  let history = createBrowserHistory();
  
  useEffect(()=>{  
    const doit = () => {
      if(history.location.pathname !== oldpath){
        const body = document.querySelector('#root');
        body!.scrollIntoView({behavior: 'smooth'})
        oldpath = history.location.pathname;
      }
    };
    doit();
  })
  return(<>{props.children}</>);
};

export default ScrollIntoView;