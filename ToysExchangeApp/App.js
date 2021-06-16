import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Alert, Dimensions } from 'react-native'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screen/HomeScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { DataTable, Modal, Provider, Portal, ProgressBar, Colors, Divider, Button, Dialog, Avatar, Title, BottomNavigation } from 'react-native-paper';
import ExchangeRequestScreen from './screen/ExchangeRequestScreen';
import HistoryScreen from './screen/HistoryScreen';
import DrawerContent from './screen/DrawerContent';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MyToysScreen from './screen/MyToysScreen';
import ProfileScreen from './screen/ProfileScreen';
import NotificationScreen from './screen/NotificationScreen';
import DetailsScreen from './screen/DetailsScreen';
import { ThemeConsumer } from 'react-native-elements';
import AddToysScreen from './screen/AddToysScreen';
// import LoginScreen from './screen/LoginScreen';
import SignUpScreen from './screen/SignUpScreen';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      data_user: []
    }
  }

  componentDidMount() {
    if (this.props.data) {
      this.state.data_user.push(this.props.data)
    
    }
    // console.log(this.state.data_user[0])
  }
  render() {
    const Tab = createMaterialBottomTabNavigator();
    const Stack = createStackNavigator();
    const Drawer = createDrawerNavigator();
    return (
      <NavigationContainer>
        <Stack.Navigator>

          <Stack.Screen
            name="Toys Exchange"
            // component={DrawerContent}
            children={() => <DrawerContent data_user={this.state.data_user[0]} hi={'hi'} />}
            options={({ navigation, route }) => ({

              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer(),
                {
                  data_user: this.props.data
                })}>
                  <Icon name={'menu'} size={24} color="gray" style={{ paddingLeft: 10 }} >
                  </Icon>
                </TouchableOpacity>
              ),
              headerRight: () => (
                <TouchableOpacity onPress={() =>
                  navigation.navigate('Notification')
                }>
                  <Icon name={'bell-outline'} size={24} color="gray" style={{ paddingRight: 10 }} >
                  </Icon>
                </TouchableOpacity>
              ),
              headerStyle: {
                backgroundColor: '#134563',
                elevation: 0,
                borderBottomWidth: 1,
                borderBottomColor: 'black'
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            })}
          />
          {/* <Stack.Screen name="BottomTab" component={this.tab} /> */}
          <Stack.Screen
            name="Notification"
            // component={HomeScreen}
            component={NotificationScreen}
            options={({ navigation, route }) => ({
              // name: route.params.name,
              headerLeftContainerStyle:
              {
                color: 'white'
              },
              headerStyle: {
                backgroundColor: '#134563',
                elevation: 0,
                borderBottomWidth: 1,
                borderBottomColor: 'black'
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            })}
          />
          <Stack.Screen
            name="Details"
            component={DetailsScreen}
            options={({ navigation, route }) => ({
              title: route.params.name,
              // data_user: this.state.data_user,
              headerLeftContainerStyle:
              {
                color: 'white'
              },
              headerStyle: {
                backgroundColor: '#134563',
                elevation: 0,
                borderBottomWidth: 1,
                borderBottomColor: 'black'
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            })}
          />
          <Stack.Screen
            name="AddToys"
            component={AddToysScreen}
            options={({ navigation, route }) => ({
              title: 'Add Toy',
              data_user: this.state.data_user[0],
              headerLeftContainerStyle:
              {
                color: 'white'
              },
              headerStyle: {
                backgroundColor: '#134563',
                elevation: 0,
                borderBottomWidth: 1,
                borderBottomColor: 'black'
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            })}
          />
          <Stack.Screen
            name="MyProfile"
            component={ProfileScreen}
            options={({ navigation, route }) => ({
              title: 'Profile',
              data_user: this.state.data_user[0],
              headerLeftContainerStyle:
              {
                color: 'white'
              },
              headerStyle: {
                backgroundColor: '#134563',
                elevation: 0,
                borderBottomWidth: 1,
                borderBottomColor: 'black'
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            })}
          />
          <Stack.Screen
            name="ExchangeRequest"
            component={ExchangeRequestScreen}
            options={({ navigation, route }) => ({
              headerLeftContainerStyle:
              {
                color: 'white'
              },
              headerStyle: {
                backgroundColor: '#134563',
                elevation: 0,
                borderBottomWidth: 1,
                borderBottomColor: 'black'
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            })}
          />
          <Stack.Screen
            name="History"
            component={HistoryScreen}
            options={({ navigation, route }) => ({
              headerLeftContainerStyle:
              {
                color: 'white'
              },
              headerStyle: {
                backgroundColor: '#134563',
                elevation: 0,
                borderBottomWidth: 1,
                borderBottomColor: 'black'
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            })}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={({ navigation, route }) => ({
              headerLeftContainerStyle:
              {
                color: 'white'
              },
              headerStyle: {
                backgroundColor: '#134563',
                elevation: 0,
                borderBottomWidth: 1,
                borderBottomColor: 'black'
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            })}
          />

        </Stack.Navigator>

      </NavigationContainer >
    );
  }
}