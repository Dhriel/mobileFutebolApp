import React, { useContext } from 'react';
import { View, Button, Text } from 'react-native';

import { AuthContext } from '../../contexts/auth';

export default function Home(){
  const { user, signOut } = useContext(AuthContext);
  return(
    <View>
      <Button
      title='Deslogar'
      onPress={signOut}
      />
      <Text> {user?.nome} </Text>
      <Text> {user?.apelido} </Text>
      <Text> {user?.bio} </Text>
      <Text> {user?.pos} </Text>
      <Text> {user?.gols} </Text>



    </View>
  )
}