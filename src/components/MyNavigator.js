import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, BottomNavigation } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CommonActions } from '@react-navigation/native';

import MyContactsScreen from './MyContactsScreen';
import ReceivedContactsScreen from './ReceivedContactsScreen';

const Tab = createBottomTabNavigator();

export default function MyNavigator(props) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={({ navigation, state, descriptors, insets }) => (
        <BottomNavigation.Bar
          navigationState={state}
         safeAreaInsets={insets}
          onTabPress={({ route, preventDefault }) => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (event.defaultPrevented) {
              preventDefault();
            } else {
             navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key,
              });
            }
          }}
          renderIcon={({ route, focused, color }) => {
            const { options } = descriptors[route.key];
            if (options.tabBarIcon) {
              return options.tabBarIcon({ focused, color, size: 24 });
            }

            return null;
          }}
          getLabelText={({ route }) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.title;

            return label;
          }}
        />
      )}
    >
      <Tab.Screen
        name="MyContacts"
        children={() => <MyContactsScreen changeTheme={props.changeTheme} />}
        options={{
          tabBarLabel: 'Meine Kontakte',
          tabBarIcon: ({ color, size }) => {
            return <Icon name="account-group" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="ReceivedContacts"
        children={() => <ReceivedContactsScreen changeTheme={props.changeTheme} />}
        options={{
          tabBarLabel: 'Empfangene Kontakte',
          tabBarIcon: ({ color, size }) => {
            return <Icon name="account-plus" size={size} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}