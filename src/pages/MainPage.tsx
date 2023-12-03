import React, { useState } from 'react';
import { Container, Navbar } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import LoginForm from '@/features/AuthByUserName/ui/LoginForm';
import RegistrationForm from '@/features/Registration/ui/RegistrationForm';

const MainPage = () => {
    const [ isLoginActive, setIsLoginActive ] = useState(true);

    let currentForm = <LoginForm />;
    if (!isLoginActive) currentForm = <RegistrationForm />;

    return (
        <>
            <Navbar className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="/">Authorization page</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Button
                            variant="primary"
                            className="me-3"
                            disabled={ isLoginActive }
                            onClick={ () => setIsLoginActive(true) }
                        >
                            Login
                        </Button>
                        <Button
                            variant="primary"
                            disabled={ !isLoginActive }
                            onClick={ () => setIsLoginActive(false) }
                        >
                            Registration
                        </Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container className="mt-4">
                {currentForm}
            </Container>
        </>
    );
};

export default MainPage;
