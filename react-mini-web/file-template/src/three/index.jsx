import React,{useCallback, useEffect, useMemo, useState} from 'react';
import ReactDom from 'react-dom';

//使用react hook方式创建组件

const Three = (props)=>{
    //使用传入的参数
    const {tab} = props;

    //使用state
    //msgOneObject为一个数组，0为属性值，1为设置数据方法
    const msgOneObject = useState('');
    //直接获取属性值和设置数据方法
    const [msgTwo,setMsgTwo] = useState('');
    
    //缓存method
    const onClickHandler = useCallback(()=>{
        console.log('onClickHandler');
        msgOneObject[1]('click one time');
    });

    const onTwoClickHandler = useCallback(()=>{
        console.log('onTwoClickHandler');
        setMsgTwo('click two time');
    });


    // 缓存变量
    const memoProp = useMemo(() => ({ test: 1 }), []);
    useEffect(() => {
        console.log('useEffect msgOneObject', memoProp)
    }, [memoProp]);

    useEffect(()=>{
        console.log('useEffect')
    },[props]);

    return (
        <div style={{flexDirection:'row', flex:1, justifyContent: 'center',}}>
        <h1 onClick={onClickHandler}>
           {tab}
        </h1>

        <h1 onClick={onTwoClickHandler}>
           twoClick
        </h1>

        <h1 >
           {msgOneObject[0]}
        </h1>

        <h1 >
           {msgTwo}
        </h1>
    </div>
    );
}


// ReactDom.render(
//     <Three />,
//     document.getElementById('app')

// );


// After
import { createRoot } from 'react-dom/client';
const container = document.getElementById('app');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<Three tab="home" />);