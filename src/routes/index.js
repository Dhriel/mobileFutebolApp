import React, { useState, useContext } from 'react';
import {View, ActivityIndicator} from 'react-native';
import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

import { AuthContext } from '../contexts/auth';

export default function Routes() {
  const {signed, loading } = useContext(AuthContext);

  if(loading){
    return(
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#181D25'}}>
        <ActivityIndicator size={50} color='#F5AF19'/>
      </View>
    )
  }
  return (
    signed ? <AppRoutes/> : <AuthRoutes/>
  );
}