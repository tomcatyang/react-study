import React from 'react';
import ReactDom from 'react-dom';
import {
  HashRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import {Home,About,Dashboard} from '../components/childPage';

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.
const root_path = '';
class App extends React.Component {

  locationHashChanged() {
    console.log("You're visiting a cool feature!");
  }

  // url路径变化 改变location
  componentDidMount() {
    console.log('componentDidMount');
    // window.location.hash = window.location.hash || '/'
    window.addEventListener('hashchange', () => {
        console.log(window);
    })


      
    window.onhashchange = this.locationHashChanged;
  }
  
  render() {
    console.log(`path=${window.path}; hash=${window.history}`,window);
      return (
        <Router>
            <div>
            <ul>
                <li>
                <Link to={root_path}>Home</Link>
                </li>
                <li>
                <Link to={`${root_path}/about`}>About</Link>
                </li>
                <li>
                <Link to={`${root_path}/dashboard`}>Dashboard</Link>
                </li>
            </ul>
    
            <hr />
    
            {/*
                A <Switch> looks through all its children <Route>
                elements and renders the first one whose path
                matches the current URL. Use a <Switch> any time
                you have multiple routes, but you want only one
                of them to render at a time
            */}
            <Routes>
                <Route exact path={root_path} element={<Home/>}>
                </Route>
                <Route path={`${root_path}/about`} element={<About/>}>
                </Route>
                <Route path={`${root_path}/dashboard`} element={<Dashboard/>}>
                </Route>
            </Routes>
            </div>
        </Router>
      )
  }
}


ReactDom.render(
    <App />,
    document.getElementById('app')

);