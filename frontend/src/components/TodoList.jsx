import React, {useState, useEffect} from 'react'; 
import {
    Flex,
    Heading,
    Input, 
    Button,
    Text,
    Box,
    Stack,
    Checkbox
} from '@chakra-ui/react';
import { CheckboxCard } from "../components/ui/checkbox-card"
import {
    NativeSelectField,
    NativeSelectRoot,
  } from "../components/ui/native-select"

function TodoList() {
    const [tasks, setTasks] = useState([]); 
    const [newTask, setNewTask] = useState("");
    const [priority, setPriority] = useState("");
    const [dueDate, setDueDate] = useState(new Date());

    const token = localStorage.getItem('token'); 

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

    useEffect(() => {
        fetchTasks()}, [token]); 


    const handleSubmit = async (e) => {
        e.preventDefault(); 
        const newTodo = {
            task: newTask, 
            priority: priority, 
            dueDate: dueDate
        }

        try {
            console.log("creating a task")
            const response = await fetch('http://localhost:3000/api/tasks', {
                method: 'POST', 
                headers: {Authorization: `Bearer: ${token}`, 'Content-Type': 'application/json'},
                body: JSON.stringify(newTodo)
            })
            if(!response.ok) {
                throw new Error("Error adding a todo");
            }
            setNewTask(" ");
            setPriority("Select Priority");
            setDueDate(new Date());
            fetchTasks();
        } catch(e) {
            console.error("Failed to add todo: ", e)
        };
    };


    return(
        <Flex  
            height="100vh"              // Full viewport height
            justifyContent="center"     // Centers horizontally
            alignItems="center"         // Centers vertically
            bg="black"               // Optional background color
        >
            <Stack align="center">
                <Box bg="pink.200" borderRadius="md" p="8" w="600px">
                    <Heading color="pink.700">My To-Do List</Heading>
                </Box>
                <Flex bg="white" p="8" w="600px" justifyContent="center" borderRadius="md">
                    
                    <Box bg="white" p="10" border="solid" borderRadius="md" borderColor="pink.200" borderWidth="0.1px" w="500px">
                    <form onSubmit={handleSubmit}>
                        <Box pb="10">
                            <Stack>
                            <Heading color="pink.700">Add Task</Heading>
                            <Input placeholder="Type to add new task" type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} colorPalette="pink"></Input>
                            <NativeSelectRoot size="sm" width="240px" colorPalette="pink" value={priority} onChange={(e) => setPriority(e.target.value)}>
                            <NativeSelectField placeholder="Select Priority">
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </NativeSelectField>
                            </NativeSelectRoot>
                            <Input type="datetime-local" value={dueDate} onChange={(e) => setDueDate(e.target.value)}/>
                            <Button type="submit" size="sm" colorPalette="pink">Create Task</Button>
                            </Stack>
                        </Box>
                    </form>
                        <Stack>
                        <Heading color="pink.700">Tasks</Heading>
                        <Box overflowY="auto" maxHeight="300px">
                            {tasks.map((task, index) => {
                                const dateObj = new Date(task.dueDate)
                                const readableDate = dateObj.toLocaleDateString("en-US", {
                                    month: "long",
                                    day: "numeric",
                                    hour: "numeric",
                                    minute: "numeric"
                                });
                                return (
                                    <CheckboxCard
                                        margin="1"
                                        key={index}
                                        colorPalette="pink"
                                        variant="surface"
                                        label={task.task}
                                        description={`Due date: ${readableDate}`}
                                    />
                                );
                            })}
                        </Box>
                        </Stack>
  
                    </Box>
                </Flex>

            </Stack>
        </Flex>
   )
}

export default TodoList;