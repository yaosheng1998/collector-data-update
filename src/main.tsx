import ReactDOM from 'react-dom/client';
import App from './App';

// * react18
// 关闭严格模式
ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
// 严格模式
// ReactDOM.createRoot(document.getElementById('root')!).render(
//     <React.StrictMode>
//         <App />
//     </React.StrictMode>
// );
