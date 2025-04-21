import React, { useState } from 'react';
import styled from 'styled-components';
import usersData from '../login/users.json';

const Proof = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Datos enviados:', { username, password });

        if (usersData.user.userName === username && usersData.user.password === password) {
            console.log('Succesful login');
            localStorage.setItem('logged', true);
        } else {
            console.log('Wrong username or password')
        }
    };

    return (
        <FormContainer>
            <FormTitle>Login</FormTitle>
            <StyledForm onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="username">User2:</Label>
                    <Input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Write your username"
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password">Password2:</Label>
                    <Input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Write your password"
                        required
                    />
                </FormGroup>
                <SubmitButton type="submit">Send</SubmitButton>
            </StyledForm>
        </FormContainer>
    );
};

// Estilos con Styled Components
const FormContainer = styled.div`
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h2`
  color: #333;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 600;
  color: #495057;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;

  &:focus {
    border-color: #80bdff;
    outline: none;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

const SubmitButton = styled.button`
  padding: 0.75rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }

  &:active {
    background-color: #004085;
  }
`;

export default Proof;