import React,{useState, useCallback, useEffect} from 'react';
import ReactDom from 'react-dom';
import {
    BrowserRouter ,
    HashRouter,
    Routes,
    Route,
    Link
  } from "react-router-dom";

const App1 = () => {
    const [hash, setHash] = useState('');
    useEffect(()=>{
        window.addEventListener('hashchange', (e) => {
            console.log("hashchange111111",e);
            console.log(location.hash);
            setHash(location.hash);
        });
    },[]);
    
    return (
        <div style={{flexDirection:'row', flex:1, justifyContent: 'center',}}>
            <div>
                <ul>
                    <li>
                    <a href='#/'>Home</a>
                    </li>
                    <li>
                    <a href='#/about'>About</a>
                    </li>
                    <li>
                    <a href='#/dashboard'>Dashboard</a>
                    </li>
                </ul>
                <hr />

                {
                    (hash === '#/') ? <Home/> : (hash === '#/about')?<About/>:<Dashboard/>
                }
            </div>
        </div>

    )
}

function Home() {
    return (
      <div>
        <h2>Home_view</h2>
      </div>
    );
  }
  
  function About() {
    return (
      <div>
        <h2>About</h2>
      </div>
    );
  }
  
  function Dashboard() {
    return (
      <div>
        <h2>Dashboard</h2>
      </div>
    );
  }
  

  

const App2 = () => {

    const [hash, setHash] = useState('#/');

    useEffect(()=>{
        window.addEventListener('hashchange', (e) => {
            setHash(location.hash);
        });
    },[]);
    
    const setLocationHash = useCallback((newHash)=>{
        window.location.hash = newHash;
    });

    return (
        <div style={{flexDirection:'row', flex:1, justifyContent: 'center',}}>
            <div>
                <ul>
                    <li>
                    <a onClick={()=>setLocationHash('#/')}>Home</a>
                    </li>
                    <li>
                    <a onClick={()=>setLocationHash('#/about')}>About</a>
                    </li>
                    <li>
                    <a onClick={()=>setLocationHash('#/dashboard')}>Dashboard</a>
                    </li>
                </ul>
                <hr />

                {
                    (hash === '#/') ? <Home/> : (hash === '#/about')?<About/>:<Dashboard/>
                }
            </div>
        </div>

    )
}


const App3 = () => {

    const [hash, setHash] = useState('#/');

    const hookCallback = useCallback((methodName)=>{
        let method = window.history[methodName];
        return function() {
            let rv = method.apply(this, arguments);
            let e = new Event(methodName);
            e.arguments = arguments;
            window.dispatchEvent(e);
            return rv;
        };
    });

    useEffect(()=>{
        window.history.pushState = hookCallback('pushState')
        window.addEventListener('pushState', (e) => {
            setHash(location.hash);
        });
    },[]);

    const setLocationHash = useCallback((newHash)=>{
        window.history.pushState({},'',newHash);
        //setHash(location.hash);
    });

    return (
        <div style={{flexDirection:'row', flex:1, justifyContent: 'center',}}>
            <div>
                <ul>
                    <li>
                    <a onClick={()=>setLocationHash('#/')}>Home</a>
                    </li>
                    <li>
                    <a onClick={()=>setLocationHash('#/about')}>About</a>
                    </li>
                    <li>
                    <a onClick={()=>setLocationHash('#/dashboard')}>Dashboard</a>
                    </li>
                </ul>
                <hr />

                {
                    (hash === '#/') ? <Home/> : (hash === '#/about')?<About/>:<Dashboard/>
                }
            </div>
        </div>

    )
}


const App4 = () => {

    const [path, setPath] = useState('./');

    const setLocationPath = useCallback((newPath)=>{
        window.history.pushState({},'',newPath);
        setPath(newPath);
    });

    return (
        <div style={{flexDirection:'row', flex:1, justifyContent: 'center',}}>
            <div>
                <ul>
                    <li>
                    <a onClick={()=>setLocationPath('./')}>Home</a>
                    </li>
                    <li>
                    <a onClick={()=>setLocationPath('about')}>About</a>
                    </li>
                    <li>
                    <a onClick={()=>setLocationPath('dashboard')}>Dashboard</a>
                    </li>
                </ul>
                <hr />

                {
                    (path === './') ? <Home/> : (path === 'about')?<About/>:<Dashboard/>
                }
            </div>
        </div>

    )
}

const App5 = () => {
    const root_path = '/hash_router';

    
    return (
        <BrowserRouter>
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
      </BrowserRouter>
      )
  }



const App = () => {

    const hookCallback = useCallback((methodName)=>{
        let method = window.history[methodName];
        return function() {
            let rv = method.apply(this, arguments);
            let e = new Event(methodName);
            e.arguments = arguments;
            window.dispatchEvent(e);
            return rv;
        };
    });

    useEffect(()=>{
        window.history.pushState = hookCallback('pushState')
        window.addEventListener('pushState', (e) => {
            console.log('pushState event',e);
        });
    },[]);


    return (
        <HashRouter>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to={`/about`}>About</Link>
            </li>
            <li>
              <Link to={`/dashboard`}>Dashboard</Link>
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
            <Route exact path="/" element={<Home/>}>
            </Route>
            <Route path={`/about`} element={<About/>}>
            </Route>
            <Route path={`/dashboard`} element={<Dashboard/>}>
            </Route>
          </Routes>
        </div>
      </HashRouter>
      )
  }
ReactDom.render(
    <App />,
    document.getElementById('app')

);