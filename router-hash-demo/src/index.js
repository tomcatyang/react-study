import React,{Component, useCallback, useEffect} from 'react';
import ReactDom from 'react-dom';

import {  BrowserRouter,
    useNavigate} from 'react-router-dom';

const App1 = () => {
    // const navigate = useNavigate();

    const _wr = useCallback((type) => {
        let orig = history[type];
        return function() {
            let rv = orig.apply(this, arguments);
            let e = new Event(type);
            e.arguments = arguments;
            window.dispatchEvent(e);
            return rv;
        };
    });



    const locationHashChanged  = useCallback((event)=> {
        console.log(event.oldURL);
        console.log(event.newURL);
        console.log(location.hash);
    });

    useEffect(()=>{
        history.pushState = _wr('pushState');
        history.replaceState = _wr('replaceState');

        console.log('componentDidMount');
        // window.location.hash = window.location.hash || '/'
        window.addEventListener('pushState', () => {
            console.log("pushState111111");
        });

        window.addEventListener('replaceState', () => {
            console.log("replaceState111111");
        });

        window.addEventListener('hashchange', () => {
            console.log("hashchange111111");
        });
        window.addEventListener('popstate', () => {
            console.log("popstate2222222");
            console.log(window.location.state)
        });
          
        window.onhashchange = locationHashChanged;
    },[]);



    const setLocationPath = useCallback(()=>{
        window.location = '/new_hash';
        // window.history.pushState({data:'new_hash'}, '', '/new_hash');
        // navigate('/new_hash',{data:'new_hash'});
    },[]);

    const setLocationHash = useCallback(()=>{
        // console.log('setLocationHash')
        // window.location.hash = '/new_hash';
        window.location = '#/new_hash';
        //window.history.pushState({data:'new_hash'}, '', '/#/new_hash');
        // navigate('/new_hash',{data:'new_hash'});
    },[]);

    const goback = useCallback(()=>{
        window.history.back();
    },[]);

    return (
        <div style={{flexDirection:'row', flex:1, justifyContent: 'center',}}>
            <h1><a href='./hash_router/'>jump hash_router</a></h1>
            <h1><a href='./browser_router/'>jump browser_router</a></h1>

            <h1><a href="#/active">#/active</a></h1>
            <h1><a href="/completed">/completed</a></h1>
            <h1><button onClick={setLocationHash}>set hash</button></h1>
            <h1><button onClick={setLocationPath}>set path</button></h1>
            
            <h1><button onClick={goback}>go back</button></h1>
        </div>

    )
}

class App extends React.Component {
    constructor(props){
        super(props);
        console.log("first App",props);

        this.state = {
            msg:'first page'
        }
    }

    //这些will类型的方法不推荐使用 unsafe
    componentWillMount() {
        console.log('first App  WILL MOUNT!')
    }
   
    componentWillUnmount() {
        console.log("first App componentWillUnmount");
    }

    componentWillReceiveProps(newProps) {
        console.log('first App Component WILL RECEIVE PROPS!')
    }

    componentWillUpdate(nextProps, nextState) {
        console.log('first App Component WILL UPDATE!');
    }

    locationHashChanged() {
        console.log("You're visiting a cool feature!");
    }
    
      // url路径变化 改变location
    componentDidMount() {
        console.log('componentDidMount');
        // window.location.hash = window.location.hash || '/'
        window.addEventListener('hashchange', () => {
            console.log("hashchange111111");
        })
    
        window.addEventListener('popstate', () => {
            console.log("popstate2222222");
        },{ once: true })
          
        window.onhashchange = this.locationHashChanged;
    }
    

    shouldComponentUpdate(newProps, newState) {
            return true;
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('first App Component DID UPDATE!')
    }
    

    setLocationHash(){
        console.log('setLocationHash')
        // window.location.hash = '/new_hash';
        // window.location.pathname = '/new_hash';
        //window.history.pushState({}, '', '/new_hash');



        navigate('/new_hash',{});
    }

    render() {
        const {msg} = this.state;
        return (
            <div style={{flexDirection:'row', flex:1, justifyContent: 'center',}}>
                <h1>
                    {msg}
                </h1>
                <h1><a href='./hash_router'>jump hash_router</a></h1>
                <h1><a href='./browser_router'>jump browser_router</a></h1>

                <h1><a href="#/active">#/active</a></h1>
                <h1><a href="/completed">/completed</a></h1>
                <h1><a href="#/new_hash" onClick={this.setLocationHash}>set hash</a></h1>
            </div>

        )
    }
}

  
ReactDom.render(
    // <BrowserRouter><App1 /></BrowserRouter>,
    <App1 />,
    document.getElementById('app')

);