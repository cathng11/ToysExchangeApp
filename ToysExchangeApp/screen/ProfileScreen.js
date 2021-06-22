import React, { Component } from 'react'
import { ScrollView } from 'react-native';
import { Dimensions, Image } from 'react-native'
import { Text, View } from 'react-native'
import { TextInput, Title, Button, HelperText, Avatar } from 'react-native-paper'
import { getProfile, updateProfile } from '../service/UserService';

export default class ProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            parent_phone: '',
            parent_email: '',
            country: ''
        }
    }

    async componentDidMount() {
        await getProfile(this.props.route.params.data_user._id)
            .then(res => {
                this.setState({
                    name: res[0].Name,
                    parent_phone: res[0].Phone,
                    parent_email: res[0].Email,
                    country: res[0].Country
                })
            })
    }

    update = () => {
        var { name, parent_email, parent_phone, country } = this.state;
        updateProfile([this.props.route.params.data_user._id, name, country, parent_phone, parent_email])
            .then(res => {
                this.setState({
                    name: res[0].Name,
                    parent_phone: res[0].Phone,
                    parent_email: res[0].Email,
                    country: res[0].Country
                });
                this.props.navigation.navigate('Home')
            })
    }
    render() {
        return (
            <ScrollView>
                <View style={{ backgroundColor: 'white', flex: 1, justifyContent: 'center' }}>
                    <View style={{ flex: 20, justifyContent: 'center', alignItems: 'center' }}>
                        <Avatar.Image style={{ backgroundColor: 'white' }} size={200} source={require('../images/empty_avatar.png')} />
                        <Title>{this.props.route.params.data_user.Username}</Title>
                    </View>
                    <View style={{ flex: 70, margin: 20 }}>
                        <TextInput
                            label='Name'
                            placeholder='Name'
                            mode='outlined'
                            theme={{ colors: { primary: '#134563', underlineColor: 'transparent', placeholder: '#134563' } }}
                            style={{ marginBottom: 5, backgroundColor: 'white' }}
                            value={this.state.name}
                            onChangeText={name => { this.setState({ name: name }) }}
                        />
                        <TextInput
                            label='Country'
                            placeholder='Country'
                            mode='outlined'
                            theme={{ colors: { primary: '#134563', underlineColor: 'transparent', placeholder: '#134563' } }}
                            style={{ marginBottom: 5, backgroundColor: 'white' }}
                            value={this.state.country}
                            onChangeText={country => { this.setState({ country: country }) }}
                        />
                        <TextInput
                            label='Parent Phone'
                            placeholder='Parent Phone'
                            mode='outlined'
                            theme={{ colors: { primary: '#134563', underlineColor: 'transparent', placeholder: '#134563' } }}
                            style={{ marginBottom: 5, backgroundColor: 'white' }}
                            value={this.state.parent_phone}
                            onChangeText={parent_name => { this.setState({ parent_name: parent_name }) }}
                        />
                        <TextInput
                            label='Parent Email'
                            placeholder='Parent Email'
                            mode='outlined'
                            theme={{ colors: { primary: '#134563', underlineColor: 'transparent', placeholder: '#134563' } }}
                            style={{ marginBottom: 5, backgroundColor: 'white' }}
                            value={this.state.parent_email}
                            onChangeText={parent_email => { this.setState({ parent_email: parent_email }) }}
                        />
                    </View>
                    <View style={{ flex: 10 }}>
                        <Button
                            mode="contained"
                            onPress={this.update}
                            color='#134563'
                            style={{
                                margin: 40,
                                marginHorizontal: Dimensions.get('window').height / 6,
                                justifyContent: 'center',
                                alignItems: 'center',
                                position: 'relative'
                            }}>
                            Update
                </Button>
                    </View>

                </View>
            </ScrollView >

        )
    }
}
