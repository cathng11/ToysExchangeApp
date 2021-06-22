import React, { Component } from 'react'
import { Text, View, Image, Dimensions, SafeAreaView } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context';
export default class SplashScreen extends Component {
    render() {
        let width = Dimensions.get('window').width;
        let height = Dimensions.get('window').height
        return (
            <SafeAreaProvider>
                <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center',backgroundColor:'white' }}>
                    <Image
                        style=
                        {{
                            width: width / 2,
                            height: height / 4,
                            resizeMode: 'contain',
                        }}
                        source={require('../images/logo_toysexchange.png')}
                    />
                </View>
            </SafeAreaProvider>
        )
    }
}
