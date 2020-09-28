import React from 'react';
import {
 BrowserRouter as Router,
 Switch,
 Route
} from  'react-router-dom';


import List from './Screens/list';
import Indexwithdb from './Screens/TestingwithDB/indexwithdb';
import Addwithdb from './Screens/TestingwithDB/addwithdb';
import Indexwithoutdb from './Screens/TestingwithoutDB/indexwithoutdb';
import Addwithoutdb from './Screens/TestingwithoutDB/addwithoutdb';

function App() {
  return (
      <Router>
        <div className="container-fluid w-100 m-auto p-0 h-100">
          <div className="row w-100 m-auto p-0 h-100">
              <Switch>
                  <Route exact 
                    path="/"
                    component={List}
                  />                  
                  <Route exact 
                    path="/indexwithdb/"
                    component={Indexwithdb}
                  />
                  <Route exact 
                    path="/addwithdb/"
                    component={Addwithdb}
                  />
                  <Route exact 
                    path="/indexwithoutdb/"
                    component={Indexwithoutdb}
                  />
                  <Route exact 
                    path="/addwithoutdb/"
                    component={Addwithoutdb}
                  />                                                                                                                                                                                                                                  
              </Switch>
          </div>
        </div>
      </Router>
    );
}

export default App;
