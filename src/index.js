/*
 * @Author:author
 * @Date: 2021-08-02 15:26:24
 * @describe:
 */

import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css'; // 清除部分浏览器默认样式
import './style/index.less'
import './style/global.less'
import reportWebVitals from './reportWebVitals';
import IndexRouter from './router';
import 'antd/dist/antd.css';
ReactDOM.render(
    <IndexRouter/>,
  document.getElementById('root')
);

// <React.StrictMode>
// 	<IndexRouter/>
// </React.StrictMode>,

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
