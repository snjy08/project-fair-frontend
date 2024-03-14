
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Home from './Pages/Home';
import Authentication from './Pages/Authentication';
import Dashboard from './Pages/Dashboard';
import Project from './Pages/Project';
import PageNotFound from './Pages/PageNotFound';

function App() {
  return (
    <div className="App">
    
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Authentication/>}/>
      <Route path='/register' element={<Authentication register/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/projects' element={<Project/>}/>
      <Route path='*' element={<PageNotFound/>}/>
    </Routes>
    <Footer/>
    </div>
  );
}

export default App;
