import React from 'react';
import ReactDom from 'react-dom';



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

    componentDidMount() {
        console.log("first App componentDidMount");
    }
    

    shouldComponentUpdate(newProps, newState) {
            return true;
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('first App Component DID UPDATE!')
    }
    

    render() {
        const {msg} = this.state;
        return (
            <div style={{flexDirection:'row', flex:1, justifyContent: 'center',}}>
                <h1>
                    {msg}
                </h1>
                <h1><a href='./two'>jump two</a></h1>
                <h1><a href='./three'>jump three</a></h1>
            </div>

        )
    }
}

  
ReactDom.render(
    <App />,
    document.getElementById('app')

);