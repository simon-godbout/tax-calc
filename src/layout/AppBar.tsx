import React from 'react';
import { Container, Navbar } from 'react-bootstrap';

export const AppBar: React.FC = () => 
  <Navbar expand='lg' className='bg-body-secondary'>
    <Container>
      <Navbar.Brand>Tax Calculator</Navbar.Brand>
    </Container>
  </Navbar>