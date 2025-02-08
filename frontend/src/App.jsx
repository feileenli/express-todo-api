import React from 'react'; 
import Login from './components/Login'; 
import TodoList from './components/TodoList';
import Signup from './components/Signup';
import {Router, Routes, Route} from 'react-router-dom';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Signup/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/tasks" element={<TodoList/>}/>
        </Routes>
    )
}

export default App