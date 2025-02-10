import React, {useState} from 'react'; 
import { useNavigate } from 'react-router-dom';
import {
    Flex,
    Heading,
    Input, 
    Button,
    Text,
    Link
} from '@chakra-ui/react';


//functional component 
const Login = () => {
    const [formData, setFormData] = useState({username: '', password: ''}); 

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        
        e.preventDefault(); 
        try {
            console.log("login attempt")
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST', 
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formData)
            }); 
            if(!response.ok) {
                throw new Error('Login failed');
            }
            const data = await response.json(); 
            const token = data.token; 

            localStorage.setItem('token', token); 
            navigate('/tasks'); 
        } catch(error) {
            console.error(error); 
        }
    }

//presentational component 
return (
    <form onSubmit={handleSubmit}>
        <Flex h="100vh" alignItems="center" justifyContent="center">
            <Flex flexDirection="column" bg="pink" p={12} borderRadius={8} boxShadow="lg">
                <Heading mb={6}>Log In</Heading>
                <Input name="username" placeholder="username" type="text" variant="filled" value={formData.username} onChange={handleChange} mb={3}/>
                <Input name="password" placeholder="password" type="password" variant="filled" value={formData.password} onChange={handleChange} mb={6}/>
                <Button type="submit" mb={8}>Log In</Button>
                <Text textStyle="sm">Not registered yet? <Link href="/signup">Signup Here!</Link></Text>
            </Flex>
         </Flex>
    </form>
);
}



export default Login;