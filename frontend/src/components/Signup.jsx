import React, {useState} from 'react';
import { useNavigate } from "react-router";
import {
    Flex,
    Heading,
    Input, 
    Button,
    Text,
    Link
} from '@chakra-ui/react';

function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState(""); 
    const [confirmPass, setConfirmPass] = useState(""); 

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(confirmPass !== password) {
            setPassword("")
            setConfirmPass("")
            alert("Passwords need to match!")
        } else {
            try {
                console.log("Sign up attempt");
                    const response = await fetch('http://localhost:3000/api/signup', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({username: username, password: password})
                    });
                    if(!response.ok) {
                        const errorMsg = await response.json();
                        console.log("Error: ", errorMsg);
                        throw new Error('Signup failed!');
                    }
                    navigate('/login');
            } catch(e) {
                console.log(e);
            };
        };
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <Flex h="100vh" alignItems="center" justifyContent="center">
                <Flex flexDirection="column" bg="pink" p={12} borderRadius={8} boxShadow="lg">
                    <Heading mb={6}>Signup</Heading>
                    <Input variant="filled" placeholder="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} mb={3}/>
                    <Input variant="filled" placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} mb={3}/>
                    <Input variant="filled" placeholder="confirm password" type="password" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} mb={6}/>
                    <Button type="submit" mb={6}>Signup</Button>
                    <Text textStyle="sm">Have an account? <Link href="/login">Login Here!</Link></Text>
                </Flex>
            </Flex>
        </form>
    )
}

export default Signup;