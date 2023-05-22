import './App.css';
import Navbar from './Components/Navbar';
import TodoList from './Components/TodoList';
import Completed from './Components/Completed'
import UnCompleted from './Components/UnCompleted';
import Rejected from './Components/Rejected'
import { Routes, Route } from 'react-router';

function App() {
  return (
    <div>
    <Navbar/>
    <Routes>
      <Route path='/' element={<TodoList/>}/>
      <Route path='Home' element={<TodoList/>}/>
      <Route path='Completed' element={<Completed/>}/>
      <Route path='UnCompleted' element={<UnCompleted/>}/>
      <Route path='Rejected' element={<Rejected/>}/>
    </Routes>
    </div>
  );
}

export default App;
