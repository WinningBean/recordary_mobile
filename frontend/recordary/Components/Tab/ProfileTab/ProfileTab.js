import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import Profile from './Profile';

const Stack = createStackNavigator();

const ProfileTab = ({user}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="profile"
        component={Profile}
        initialParams={{
          user: user,
        }}
      />
    </Stack.Navigator>
  );
};

export default ProfileTab;
