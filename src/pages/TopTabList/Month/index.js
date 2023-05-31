import React, { useState, useEffect} from 'react';
import { Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { YearArea, InputArea, InputText, AddButton, Input} from './styles';
import firestore from '@react-native-firebase/firestore';
import { create } from 'react-test-renderer';

export default function Month() {
  const [yearText, setYearText] = useState();
  const [createYear, setCreateYear] = useState({});

  useEffect(()=>{
    async function loadYear(){
      const getYear = await firestore().collection('ano').get();


    }
    
    loadYear();
  },[])

  async function handleCreate(){
    if(yearText === '' || yearText <= 2) return;
    await firestore().collection('ano').doc(`${yearText}`).set({});
  }

  return (
    <LinearGradient colors={['#090909', '#181D25', '#171B21', '#0F1318', '#0B0D10']}
    style={{flex: 1, alignItems: 'center', backgroundColor: "#181D25"}}
    >
      
    <YearArea>

      <Text style={{fontSize: 24, color: '#ccc', marginBottom: 10, fontWeight: '300'}}
      >Criar Ano</Text>

      <InputArea>
        <Input
          placeholder='digite algum ano...'
          placeholderTextColor="#ccc"
          onChangeText={(text)=> setYearText(text)}
        />
        <AddButton onPress={handleCreate}>
          <Text style={{fontSize: 30, color: '#000'}}>+</Text>
        </AddButton>
      </InputArea>

    </YearArea>
  
    </LinearGradient>
  );
}