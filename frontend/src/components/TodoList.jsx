import React, {useState, useEffect} from 'react'; 

function TodoList() {
    const [tasks, setTasks] = useState([]); 
    const [newTask, setNewTask] = useState("");
    const [priotiy, setPriority] = useState("");
    const [dueDate, setDueDate] = useState("");

    const token = localStorage.getItem('token'); 

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/tasks', {
                    headers: {Authorization: `Bearer: ${token}`}
                });
                if(!response.ok) {
                    throw new Error('failed to fetch tasks');
                }
                const data = await response.json(); 
                setTasks(data); 
            } catch(e) {
                console.error(e);
            }
        }
        fetchTasks(); 
    }, [token]); 

   return(
        <div>
            <h2>Your To-Do's</h2>
            <input
                type="text"
                name="username"
                value={newTask}
                onChange = {e => setNewTask(e.target.value)}
            />
            <select name="priority" value={priority}>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
            </select>
            <input type="datetime-local" value={dueDate}/>
            <button type="submit">submit</button>
                <ul>
                    {tasks.map((task) => (
                        <li>{task.task}</li>
                    ))}
                </ul>
        </div>
   )
}

export default TodoList;