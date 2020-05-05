import React from 'react';
import { FiMail, FiLock, FiUser, FiArrowLeft } from 'react-icons/fi';
import { Form } from '@unform/web';
import logo from '../../assets/logo.svg';
import { Container, Content, Background } from './styles';
import Button from '../../components/Button';
import Input from '../../components/Input';

const SignUp: React.FC = () => {
  function handleSubmit(data: object): void {}

  return (
    <Container>
      <Background />
      <Content>
        <img src={logo} alt="GoBarber" />
        <Form onSubmit={handleSubmit}>
          <h1>Faça seu Logon</h1>
          <Input name="name" icon={FiUser} placeholder="Nome" />
          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />
          <Button type="submit">Cdastrar</Button>
        </Form>
        <a href="teste">
          <FiArrowLeft />
          Voltar para logon
        </a>
      </Content>
    </Container>
  );
};

export default SignUp;
