import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import store from './store';
import Notification from './components/notification';
import loader from './extras/images/loader/loader.svg'
import RouteList from './routes';
import DashNav from 'components/dashboard/dashboardwrapper/dashboard-nav';
import './index.scss';
import * as serviceWorker from './serviceWorker';

const Routes = () => (
  <Router>
    <Notification/>
      <DashNav />
      <Suspense fallback={ <div className="loader-container"><img src={ loader } alt="loader icon" /></div> } >  
        {/* <AuthRoute exact path={url.LOGIN} Component={Login} /> */}
        <RouteList />
      </Suspense>
  </Router>
);


const root = ReactDOM.createRoot(document.getElementById("root")as HTMLElement);

root.render(
  <Provider store={store}>
    <React.StrictMode>
        <Routes />
    </React.StrictMode>
  </Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();