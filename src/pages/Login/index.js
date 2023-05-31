import React, { useState, useContext, useRef } from 'react';
import { Text, ActivityIndicator } from 'react-native';
import { 
  Container,
  Background,
  Box,
  LogoText, 
  Input, 
  TextArea, 
  Button, 
  SignText, 
  Invalid 
} from './styles';

import * as Animatable from 'react-native-animatable';


const LogoTextAnimated = Animatable.createAnimatableComponent(LogoText);
const InputAnimated = Animatable.createAnimatableComponent(Input);


import { AuthContext } from '../../contexts/auth';

export default function Login(){
    const [login, setLogin] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [wrongLogin, setWrongLogin] = useState('');
    const [lineHeight, setLineHeight] = useState(0);

    const shakeName = useRef(null);
    const shakeEmail = useRef(null);
    const shakePassword = useRef(null);

    const { signIn, signUp, loadingAuth, signError, setSignError } = useContext(AuthContext)

    async function handleLogin(){
      setLineHeight(0);
      if(signError) await setSignError(null);
      setLogin(!login);
      setName('');
      setEmail('');
      setPassword('');
      setWrongLogin('');
    }

    // Cadastrar
    async function handleSignUp(){
      if(name === ''){
        await setSignError('Digite seu nome');
        setLineHeight(20);
        shakeName.current.shake();
        return;
      }
      if(email === ''){
        await setSignError('Preencha o campo de email');
        setLineHeight(20);
        shakeEmail.current.shake();
        return;
      }
      if(password === ''){
        await setSignError('Digite alguma senha');
        setLineHeight(20);
        shakePassword.current.shake();
        return;
      }


      await signUp(name, email, password);
    }

    // Logar
    async function handleSignIn(){

      if(email === ''){
        await setSignError('Preencha o campo de email');
        setLineHeight(20);
        shakeEmail.current.shake();
        return;
      }
      if(password === ''){
        await setSignError('Digite alguma senha');
        setLineHeight(20);
        shakePassword.current.shake();
        return;
      }
      await signIn(email, password);
      if(!signError) setLineHeight(0);
    }

  if(login){
    return(
      <Container>
        <Box behavior={'padding'} enabled>
          <Background 
            source={require('./../../images/backgroundLogin.png')}
          >
            <LogoTextAnimated animation={'fadeIn'}
            duration={3000}
            iterationCount={1}>
              RENOVAR <Text style={{color: "#FCA311"}}>FUTEBOL</Text>
            </LogoTextAnimated>
              <InputAnimated
                placeholder='seuemail@gmail.com'
                placeholderTextColor="#ccc"
                value={email}
                onChangeText={text=> setEmail(text)}
                ref={shakeEmail}
              />
              <InputAnimated
                placeholder='*****************'
                placeholderTextColor="#ccc"
                value={password}
                onChangeText={text=> setPassword(text)}
                ref={shakePassword}
              />

            <Invalid textHeight={lineHeight}>
              {signError && signError}
            </Invalid>

            <Button onPress={handleSignIn}>
            { loadingAuth ? (
              <ActivityIndicator size={30} color={"#fff"}/>
            ) : (
              <SignText>Acessar</SignText>
            )}
            </Button>

            <TextArea onPress={handleLogin}>
              <Text style={{fontSize: 18, color: '#fff', fontWeight: '300', marginTop: 10}}>Criar uma conta</Text>
            </TextArea>
          </Background>
        </Box>
      </Container>
    )
  }else{
    return(
      <Container>
        <Box behavior={'padding'} enabled>
          <Background 
            source={require('./../../images/backgroundLogin.png')}
          >
            <LogoTextAnimated animation={'fadeIn'}
            duration={3000}
            iterationCount={1}>
              RENOVAR <Text style={{color: "#FCA311"}}>FUTEBOL</Text>
            </LogoTextAnimated>
            
              <InputAnimated
                placeholder='digite seu nome...'
                placeholderTextColor="#ccc"
                value={name}
                onChangeText={text=> setName(text)}
                maxLength={40}
                ref={shakeName}
              /> 
              <InputAnimated
                placeholder='seuemail@gmail.com'
                placeholderTextColor="#ccc"
                value={email}
                onChangeText={text=> setEmail(text)}
                ref={shakeEmail}
              />
              <InputAnimated
                placeholder='*****************'
                placeholderTextColor="#ccc"
                value={password}
                onChangeText={text=> setPassword(text)}
                ref={shakePassword}
              />
              <Invalid textHeight={lineHeight}>
                {signError && signError}
              </Invalid>

              <Button onPress={handleSignUp}>
                { loadingAuth ? (
                <ActivityIndicator size={30} color={"#fff"}/>
                ) : (
                <SignText>Cadastrar</SignText>
                )}
              </Button>
              <TextArea onPress={handleLogin}>
                <Text style={{fontSize: 19, color: '#fff', fontWeight: '300', marginTop: 10}}>Ja possuo uma conta</Text>
              </TextArea>
          </Background>
        </Box>
      </Container>
    )
  }
}