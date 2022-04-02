import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';
import * as serviceWorker from './serviceWorker';
import Notification from './components/notification';
// import ProtectedRoute from './utils/protectedRoute';
// import AuthRoute from 'utils/protectedRoute/auth';
import loader from './extras/images/loader/loader.svg'
import RouteList from './routes';
import DashNav from 'components/dashboard/dashboardwrapper/dashboard-nav';
import './index.scss';

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

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
        <Routes />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();