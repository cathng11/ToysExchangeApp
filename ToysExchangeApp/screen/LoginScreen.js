import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native';
import { Text, View, Dimensions, Image } from 'react-native'
import { Provider, TextInput, Title, Button, HelperText, Avatar, Portal, Modal, ProgressBar } from 'react-native-paper'
import { signIn } from '../service/UserService';
import App from '../App'
import { AppRegistry } from 'react-native';
import { name as appName } from '../app.json';
import { Keyboard } from 'react-native'

export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            username: '',
            mes: '',
            visible: false
        }
    }
    signUp = () => {
        this.props.signup();
    }
    signIn = async () => {
        this.setState(
            {
                visible: true
            })
        Keyboard.dismiss();
        await signIn(this.state.username, this.state.password)
            .then(res => {
                if (res != null) {
                    this.props.data(res)
                }
                else {
                    this.setState({
                        mes: 'Username or Password is invalid'
                    })
                }
            })
            .catch(err => console.log(err));
        this.setState(
            {
                visible: false
            })
    }
    render() {
        return (
            <Provider>
                <Portal>
                    <Modal visible={this.state.visible} dismissable contentContainerStyle={{ backgroundColor: 'white', padding: 20, margin: 20 }}>
                        <Text style={{ marginBottom: 10 }}>Please waiting ...</Text>
                        <ProgressBar progress={0.2} color={'#00552E'} indeterminate={true} />
                    </Modal>
                </Portal>
                <View style={{ backgroundColor: 'white', flex: 1, justifyContent: 'center' }}>
                    <View style={{ flex: 30, justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            source={require('../images/logo_toysexchange.png')}
                            style={{
                                width: Dimensions.get('window').width,
                                height: Dimensions.get('window').height / 3,
                                resizeMode: 'contain'
                            }} />
                    </View>
                    <View style={{ flex: 30 }}>
                        <TextInput
                            placeholder='Username'
                            mode='outlined'
                            left={<TextInput.Icon name="account" />}
                            theme={{ colors: { primary: '#134563', underlineColor: 'transparent', placeholder: '#134563' } }}
                            style={{ padding: 20 }}
                            value={this.state.username}
                            onChangeText={username => { this.setState({ username: username }) }}
                        />
                        <TextInput
                            placeholder='Password'
                            mode='outlined'
                            secureTextEntry
                            left={<TextInput.Icon name="lock" />}
                            theme={{ colors: { primary: '#134563', underlineColor: 'transparent', placeholder: '#134563' } }}
                            style={{ padding: 20 }}
                            value={this.state.password}
                            onChangeText={password => { this.setState({ password: password }) }}
                        />
                        <TouchableOpacity
                            style={{
                                bottom: 0,
                                marginRight: 20,
                                justifyContent: 'flex-end',
                                alignItems: 'flex-end'
                            }}>
                            <Text style={{ color: 'grey' }}>Forgot Password ?</Text>
                        </TouchableOpacity>
                        <Text style={{ color: 'red', marginLeft: 40 }}>{this.state.mes}</Text>
                    </View>
                    <View style={{ flex: 30, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Button
                            mode="contained"
                            onPress={this.signUp}
                            color='#DFF0EA'
                            style={{
                                width: Dimensions.get('window').width / 3,
                                height: Dimensions.get('window').height / 16,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginRight: 20
                            }}>
                            Sign Up
                    </Button>
                        <Button
                            mode="contained"
                            onPress={this.signIn}
                            color='#134563'
                            style={{
                                width: Dimensions.get('window').width / 3,
                                height: Dimensions.get('window').height / 16,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginLeft: 20
                            }}>
                            Sign In
                    </Button>
                    </View>
                </View>
            </Provider>

        )
    }
}
