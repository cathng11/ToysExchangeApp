import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MyToysScreen from './MyToysScreen';
import ProfileScreen from './ProfileScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from './HomeScreen';

// import HomeScreen from './HomeScreen';

export default class MainScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            par: 'ddd',
            deleteRowKey: 0,
            route: ''
        }
    }
    refreshFlatList = (deleteKey) => {
        this.setState((prevState) => {
            return {
                deleteRowKey: deleteKey
            }
        })
    }
    // componentDidMount()
    // {
    //     // this.setState({
    //     //     par: "22"

    //     // })
    //     // console.log(this.state.par)
    //     // this.refreshFlatList(this.state.deleteRowKey+1)
    //     // console.log(this.props.route)

    // }
    componentDidMount() {
        console.log(this.props.data_user)

    }
    // componentDidUpdate(prev) {
    //     if (this.props.data_user != prev.data_user) {
    //         // this.setState({
    //         //     route: this.props.data_ser
    //         // })
    //         console.log(this.props.data_user)

    //     }

    // }
    render() {
        const Tab = createMaterialBottomTabNavigator();

        return (
            // <View>
            <Tab.Navigator
                initialRouteName='Home'
                barStyle={{
                    backgroundColor: 'white',
                    shadowOpacity: 120
                }}
                activeColor='#134563'
                inactiveColor='#CDCDCD'>
                <Tab.Screen name="Home"
                    // initialParams={{params: this.state.par}} 
                    // component={HomeScreen} 
                    children={() => <HomeScreen 
                        par={this.state.par} 
                        route={this.state.route} 
                        navigation={this.props.navigation} 
                        />}
                    options={({ navigation, route }) => ({
                        // params: route.params.params!='underfined'?route.params.params:'nothing',
                        tabBarIcon: ({ color }) => (
                            <Icon
                                name="home-outline"
                                color={color}
                                size={24}
                            />
                        )

                    })} />
                <Tab.Screen name="My Toys"
                    children={() => <MyToysScreen navigation={this.props.navigation} />}
                    options={({ navigation }) => ({
                        tabBarIcon: ({ color }) => (
                            <Icon
                                name="dog"
                                color={color}
                                size={24}
                            />
                        )

                    })} />
                <Tab.Screen name="Profile" component={ProfileScreen}
                    options={({ navigation }) => ({
                        tabBarIcon: ({ color }) => (
                            <Icon
                                name="heart-outline"
                                color={color}
                                size={24}
                            />
                        )

                    })} />

            </Tab.Navigator>

        )
    }
}
