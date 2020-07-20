import React, { useRef, useCallback } from 'react';
import {
  Image,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert,
} from 'react-native';
import * as Yup from 'yup';
import getValidationErros from '../../utils/getValidationErrors';
import logo from '../../assets/logo.png';
import { Container, Title, BackToSignIn, BackToSignInText } from './styles';
import { useNavigation } from '@react-navigation/native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Icon from 'react-native-vector-icons/Feather';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import api from '../../services/api';

interface SingUpFormData {
  name: string;
  emal: string;
  password: string;
}
const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const handleSignUp = useCallback(
    async (data: SingUpFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('O nome é obrigatório'),
          email: Yup.string()
            .email('Insira um e-mail válido')
            .required('O e-mail é obrigatório'),
          password: Yup.string()
            .min(6, 'No mínimo 6 caracteres')
            .required('A senha é obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/users', data);
        Alert.alert(
          'Cadastro realizado com sucesso!',
          'Você já pode fazer login',
        );
        navigation.navigate('SignIn');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const erros = getValidationErros(err);

          formRef.current?.setErrors(erros);
        }
        Alert.alert(
          'Erro no cadastro',
          'Ocorreu um erro ao fazer o cadastro, tente novamente  ',
        );
      }
    },
    [navigation],
  );

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>
            <Image source={logo} />
            <View>
              <Title>Crie sua conta</Title>
            </View>
            <Form ref={formRef} onSubmit={handleSignUp}>
              <Input
                autoCapitalize="words"
                name="name"
                icon="user"
                placeholder="Nome"
                returnKeyType="next"
                onSubmitEditing={() => {
                  emailInputRef.current?.focus();
                }}
              />
              <Input
                ref={emailInputRef}
                keyboardType="email-address"
                name="email"
                icon="mail"
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="E-mail"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />
              <Input
                ref={passwordInputRef}
                secureTextEntry
                textContentType="newPassword"
                name="password"
                icon="lock"
                placeholder="Senha"
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />
              <Button
                onPress={() => {
                  formRef.current?.submitForm();
                }}
              >
                Entrar
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      <BackToSignIn
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Icon name="arrow-left" size={20} color="#ffffff" />
        <BackToSignInText>Voltar para logon</BackToSignInText>
      </BackToSignIn>
    </>
  );
};

export default SignUp;