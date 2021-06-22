import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Alert, Dimensions } from 'react-native'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { DataTable, Modal, Provider, Portal, ProgressBar, Colors, Divider, Button, Dialog, Avatar, Title } from 'react-native-paper';
import HomeScreen from './HomeScreen';
import ExchangeRequestScreen from './ExchangeRequestScreen';
import HistoryScreen from './HistoryScreen';
import LogoutScreen from './LogoutScreen';
import MainScreen from './MainScreen';
import MyToysScreen from './MyToysScreen';
import ProfileScreen from './ProfileScreen';
// import LoginScreen from './LoginScreen';

export default class DrawerContent extends Component {
  // componentDidMount() {
  //   console.log(this.props.data_user);
  //   console.log(this.props.route.params)
  // }
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      ava: '',
      data_user: ''
    }
  }
  componentDidMount() {

    if (this.props.data_user) {
      this.setState({
        data_user: this.props.data_user

      })
      console.log("hi")
      // console.log(this.props.data_user.Username)
    }
    // console.log(this.props.data)


  }
  componentDidUpdate(pre) {
    // console.log(this.props.data_user.Username)
    if (this.props.data_user != pre.data_user) {
      this.setState({
        name: this.props.data_user.Name,
        ava: this.props.data_user.Avatar,
        data_user: this.props.data_user
      })
    }
    // console.log("hi")
  }
  CustomDrawerContent = ({ navigation, route }) => {
    var avatar;
    if (this.props.data_user) {
      avatar = <Avatar.Image style={{ backgroundColor: 'white', margin: 40 }} size={Dimensions.get('window').width / 3} source={{ uri: 'data:image/jpeg;base64,' + this.props.data_user.Avatar.base64 }} />
    }
    else {
      avatar = <Avatar.Image style={{ backgroundColor: 'white' }} size={Dimensions.get('window').width / 2} source={require('../images/empty_avatar.png')} />
    }
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <DrawerContentScrollView
          style={{ backgroundColor: 'white' }}
        >
          <View style={{ margin: 20, flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            {avatar}
            <Title style={{ margin: 20 }}>{this.state.name}</Title>
          </View>
          <DrawerItem
            icon={({ color, size }) => (
              <Icon
                name="home-outline"
                color={color}
                size={size}
              />
            )}
            label="Home"
            onPress={() => {
              navigation.navigate('Homem',
                {
                  data_user: this.props.data_user
                })
            }}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <Icon
                name="subdirectory-arrow-left"
                color={color}
                size={size}
              />
            )}
            label="Exchange Request"
            onPress={() => { navigation.navigate('ExchangeRequest',
            {
              data_user: this.props.data_user
            }) }}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <Icon
                name="dog"
                color={color}
                size={size}
              />
            )}
            label="My Toys"
            onPress={() => {
              navigation.navigate('MyToys',
                {
                  data_user: this.props.data_user
                })
            }}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <Icon
                name="heart-outline"
                color={color}
                size={size}
              />
            )}
            label="My Profile"
            onPress={() => {
              navigation.navigate('MyProfile',
                {
                  data_user: this.props.data_user
                })
            }}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <Icon
                name="history"
                color={color}
                size={size}
              />
            )}
            label="History"
            onPress={() => { navigation.navigate('History') }}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <Icon
                name="logout"
                color={color}
                size={size}
              />
            )}
            label="Logout"
            onPress={() => {
              navigation.navigate('Logout', {
                visibleDialog: true
              })
            }}
          />
        </DrawerContentScrollView>
      </View>

    );
  }

  render() {
    const Drawer = createDrawerNavigator();
    // console.log(this.props.data_user)
    return (
      <Drawer.Navigator
        style={{ backgroundColor: 'white' }}
        sceneContainerStyle={{ backgroundColor: 'white' }}
        initialRouteName="Home"
        // openByDefault
        data_user={this.props.data_user}
        drawerContent={this.CustomDrawerContent} >
        <Drawer.Screen name="Toys Exchange" component={DrawerContent} data_user={this.props.data_user} />
        <Drawer.Screen name="Home" component={HomeScreen}/>
        <Drawer.Screen name="Homem" component={HomeScreen}/>
        <Drawer.Screen name="ExchangeRequest" component={ExchangeRequestScreen} />
        <Drawer.Screen name="History" component={HistoryScreen} />
        <Drawer.Screen name="MyToys" component={MyToysScreen} />
        <Drawer.Screen name="MyProfile" component={ProfileScreen} />
        <Drawer.Screen name="Logout" component={LogoutScreen} />
      </Drawer.Navigator>
    )
  }
}
