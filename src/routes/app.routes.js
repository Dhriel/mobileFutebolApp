import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Tab = createBottomTabNavigator();
const Stack  = createNativeStackNavigator();
const TopTab = createMaterialTopTabNavigator();

//Stack
import Home from './../pages/Home';

// Tab
import Search from '../pages/Search';
import Profile from '../pages/Profile';
import More from '../pages/More'

// TopTab 
import Month from '../pages/TopTabList/Month';
import Photos from '../pages/TopTabList/Photos';
import Total from '../pages/TopTabList/Total';
import Year from '../pages/TopTabList/Year';


function TopTabRoutes(){
  return(
    <TopTab.Navigator 
  
      screenOptions={{
        tabBarStyle:{backgroundColor: '#121212'},
        tabBarActiveTintColor: '#FCA311',
        tabBarInactiveTintColor: '#fff',
        tabBarIndicatorStyle:{backgroundColor: "#FCA311"},
        tabBarLabel: '21312'
      }}
    >
      <TopTab.Screen name={'Month'} component={Month}
        options={{
          tabBarLabel: 'Por Mês'
        }}
      />
      <TopTab.Screen name={'Total'} component={Total}
        options={{
          tabBarLabel: 'TOTAL'
        }}
      />
      <TopTab.Screen name={'Photos'} component={Photos}
        options={{
          tabBarLabel: 'FOTOS'
        }}
      />
      <TopTab.Screen name={'Year'} component={Year}
        options={{
          tabBarLabel: 'Por Mês'
        }}
      />
    </TopTab.Navigator>
  )

}

function StackRoutes(){
  return(
    <Stack.Navigator>
      <Stack.Screen name='Home' component={Home}/>
    </Stack.Navigator>
  )
}

export default function AppRoutes(){
 return (
    <Tab.Navigator 
      screenOptions={{
        tabBarActiveTintColor: '#FCA311',
        tabBarStyle: {backgroundColor: '#121212',borderTopWidth: 0}
      }}
    >
      <Tab.Screen name='HomeTab' component={StackRoutes} options={{headerShown: false}}/>
      <Tab.Screen name='Search' component={Search}/>
      <Tab.Screen name='TopTabRoutes' component={TopTabRoutes} 
        options={{
          headerShown:false,
          title: 'ARTILHARIAS',
        }}
      />
      <Tab.Screen name='Profile' component={Profile}/>
      <Tab.Screen name='More' component={More}/>
    </Tab.Navigator>
  );
}