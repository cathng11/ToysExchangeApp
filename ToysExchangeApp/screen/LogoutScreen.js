import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Provider, Button, Dialog, Portal, Divider } from 'react-native-paper'
import { NativeModules } from "react-native";

export default class LogoutScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            setVisible: false
        }
    }
    hideDialog = () => {
        this.setState({
            setVisible: false
        })
        this.props.navigation.goBack()
    }
    componentDidMount() {
        // console.log(this.props.route.params.visibleDialog)
        this.setState({
            setVisible: this.props.route.params.visibleDialog
        })
    }
    logOut=()=>
    {
        NativeModules.DevSettings.reload();
    }
    render() {

        return (
            <Provider >
                <Portal >
                    <Dialog visible={this.state.setVisible} onDismiss={this.hideDialog}>
                        <Text style={{ margin: 20, fontSize: 16, textAlign: 'center' }}>Do you wanna logout ?</Text>
                        <Divider style={{ marginLeft: 20, marginRight: 20 }} />
                        <Dialog.Actions>
                            <Button onPress={this.hideDialog} color='grey'>Cancel</Button>
                            <Button onPress={this.logOut} color='#134563'>Ok</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </Provider>
        )
    }
}
