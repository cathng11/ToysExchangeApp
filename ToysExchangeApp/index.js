import React, { Component } from 'react'
import { AppRegistry } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import App from './App';
import {name as appName} from './app.json';
import LoginScreen from './screen/LoginScreen';
import SignUpScreen from './screen/SignUpScreen';
import SplashScreen from './screen/SplashScreen';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentScreen: 'SplashScreen',
            data:''
        };
        setTimeout(() => {
            this.setState({
                currentScreen: 'LoginScreen'
            })
        }, 500);
    }
    data=(params)=>
    {
        this.setState({
            currentScreen: 'App',
            data: params
        })
    }
    signup=()=>
    {
        this.setState({
            currentScreen: 'SignUp',
        })
    }
    goToLogin=()=>
    {
        this.setState({
            currentScreen: 'LoginScreen'
        })
    }
    render() {
        const { currentScreen } = this.state;

        let mainScreen = currentScreen === 'SplashScreen' ? <SplashScreen /> : <LoginScreen data={this.data} signup={this.signup}/>;
        if (currentScreen==='App') 
        {
            mainScreen=<App data={this.state.data}/>
        }
        
        if (currentScreen==='SignUp') mainScreen=<SignUpScreen goToLogin={this.goToLogin}/>
        return <SafeAreaProvider >{mainScreen}</SafeAreaProvider>;
    }
}
AppRegistry.registerComponent(appName, () => Main);
