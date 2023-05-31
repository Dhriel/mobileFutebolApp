import React, { createContext, useState, useEffect } from 'react';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({});


// BamvA5kI3iUjeVM3czwfrECKwCj2
function AuthProvider({children}){
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [signError, setSignError] = useState(null);

    const [loadingAuth, setLoadingAuth] = useState(false);

    // Logar ao entrar
    useEffect(()=>{
        async function loadUser(){
            const userLoad = await AsyncStorage.getItem("@user");
            if(userLoad){
                setUser(JSON.parse(userLoad));
                setLoading(false);
            }
            setLoading(false);
        }
        loadUser();

    },[])

    // Criar Conta
    async function signUp(name, email, password){
        setLoadingAuth(true);
        auth().createUserWithEmailAndPassword(email,password)
        .then(async value=>{
            let uid = value.user.uid;
            await firestore().collection('users').doc(uid).set({
                nome: name,
                apelido: '',
                bio: '',
                gols: 0,
                partidas: 0,
                pos: '',
            })
            .then(()=>{
                let data ={
                    nome: name,
                    apelido: 'null',
                    bio: 'null',
                    gols: 0,
                    partidas: 0,
                    pos: 'null',
                }
                setUser(data);
                storageUser(data);
                setLoadingAuth(false);
            })
            .catch(error=>{
                alert('Deu erro: ' + error);
                setLoadingAuth(false);
            })
        })
        .catch(error=>{
            let errorMessage = error.code
            console.log(errorMessage)
            switch(errorMessage){
                case 'auth/email-already-exists':
                    setSignError('Esse email já existe');
                    break;
                case 'auth/invalid-email':
                    setSignError('E-mail é inválido');
                    break;
                case 'auth/weak-password':
                    setSignError('Sua senha precisa ter pelo menos 6 letras');
                    break;
                case 'auth/email-already-in-use':
                    setSignError('Esse email já existe');
                    break;
                case 'auth/too-many-requests':
                    setSignError('Número de requisições elevados no momento, aguarde um pouco e tente novamente');
                    break;
                }
            setLoadingAuth(false);
        })

    }

    // Logar
    async function signIn(email, password){
        setLoadingAuth(true);
        auth().signInWithEmailAndPassword(email, password)
        .then(async value=>{
            let uid = value.user.uid;

            const userProfile = await firestore().collection('users').doc(uid).get()
            let data = {
                nome: userProfile.data().nome,
                apelido: userProfile.data().apelido,
                bio: userProfile.data().bio,
                gols: userProfile.data().gols,
                partidas: userProfile.data().partidas,
                pos: userProfile.data().pos,
            }
            setUser(data);
            storageUser(data);
            setLoadingAuth(false);
            setSignError(null)
        })
        .catch(error=>{
            let errorMessage = error.code
            switch(errorMessage){
                case 'auth/invalid-email':
                    setSignError('Email fora dos padrões, verifique novamente.');
                    break;
                case 'auth/user-not-found':
                    setSignError('Este email não existe');
                    break;
                case 'auth/wrong-password':
                    setSignError('Senha inválida/errada');
                    break;
                case 'auth/too-many-requests':
                    setSignError('Número de requisições elevados no momento, aguarde um pouco e tente novamente');
                    break;
                }
            setLoadingAuth(false);
        })
    }

    // Salvar usuário logado
    async function storageUser(data){
        await AsyncStorage.setItem("@user", JSON.stringify(data));
    }
    
    //Deslogar usuário
    async function signOut(){
        await auth().signOut();
        AsyncStorage.clear()
        .then(()=>{
            setUser(null)
        });

    }

    return(
        <AuthContext.Provider 
        value={{
            signed: !!user,
            user,
            signUp,
            signIn,
            signOut,
            loadingAuth,
            signError,
            setSignError
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;