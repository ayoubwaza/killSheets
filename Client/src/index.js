import React,{lazy,Suspense} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard';
var App = lazy(() => import ('./App'));
var Data = lazy(() => import ('./data'));

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={false}>
      <Router>
        <Switch>
          <Route exact path="/" component={App}/>
          <Route exact path="/data" component={Data}/>
          <Route exact path="/dashboard" component={Dashboard}/>
        </Switch>
      </Router>
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
