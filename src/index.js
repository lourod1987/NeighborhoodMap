import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import * as sw from './sw';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// const cachedFiles = [
//         '/',
//         '../public/index.html',
//         '/index.js',
//         '/App.css',
//         '/App.js',
//         '/Components/Header.js',
//         '/Components/Map.js',
//         '/Components/Sidebar.js',
//         '/Utitlities/MapStyle.js',
//         '/Utitlities/Utils.js',
//         '/menu.svg'
//     ];
serviceWorker.register();


// if ('serviceWorker' in navigator) {
//         navigator.serviceWorker
//             .register('/sw.js')
//             .catch( error => {
//                 console.log(error);
//             });
//     }