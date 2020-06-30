import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import initialNavigator from './MainTabNavigator';
import { createStackNavigator } from 'react-navigation-stack';


export default createAppContainer(createSwitchNavigator({
  Main: initialNavigator,
 },{
  initialRouteName:'Main'
}
));
