import logo from './logo.svg';
import './App.css';
import Header from './components/header/header';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import ExcelFile from './components/ExcelFile/excelfile';
// import Filename from './components/filename';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
  <Route path="/" element={<><Header/> <ExcelFile/></>}/>
  {/* <Route path="filename" element={ <Filename/>}/> */}

    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
