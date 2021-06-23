import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MyToysScreen from './MyToysScreen';
import ProfileScreen from './ProfileScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ListItem, Avatar, SearchBar, Rating } from 'react-native-elements'
import { FlatList } from 'react-native';
import Swipeout from 'react-native-swipeout';
import { TouchableOpacity } from 'react-native';
import { FAB } from 'react-native-paper'
import { getAllToy } from '../service/UserService';
import { ProgressBar } from 'react-native-paper'

class FlatListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRowKey: null,
      numberOfRefresh: 0,
    }
  }
  refreshFlatListItem = () => {
    this.setState((prevState) => {
      return {
        numberOfRefresh: prevState.numberOfRefresh + 1
      }
    })

  }

  render() {
    const flatListData = this.props.parentFlatList;
    const swipeSettings = {
      autoClose: true,

      onClose: (secId, rowId, direction) => {
        if (this.state.activeRowKey != null) {
          this.setState({ activeRowKey: null });
        }
      },
      onOpen: (secId, rowId, direction) => {
        this.setState({ activeRowKey: this.props.item.key });
      },
      right: [
        {
          onPress: () => {
            this.props.parentFlatList.refs.editModal.showEditModal(flatListData[this.props.index], this);
          },
          text: 'Edit', type: 'primary'
        },
        {
          onPress: () => {
            const deletingRow = this.state.activeRowKey;
            Alert.alert(
              'Alert',
              'Are you sure you want to delete ?',
              [
                { text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                {
                  text: 'Yes', onPress: () => {
                    flatListData.splice(this.props.index, 1);
                    this.props.parentFlatList.refreshFlatList(deletingRow)
                  }
                },
              ],
              { cancelable: true });
          },
          text: 'Delete', type: 'delete'
        }]
    }
    var item = this.props.item;
    // console.log(item)
    return (

      <Swipeout
        {...swipeSettings}
        style={{ backgroundColor: 'white' }}>
        <ListItem
          onPress={() => this.props.navigation.navigate('Details', {
            id: item._id,
            name: item.Name,
            image: item.Image,
            category: item.Category[0].Name,
            name_user: item.User[0].Name,
            id_receiver: item.User[0]._id,
            rating: item.Rating,
            datetime: item.Datetime,
            description: item.Description,
            address: item.Address,
            screen: 'home',
            id_sender: this.props.data_user._id
          })}
          underlayColor='#134563'
          bottomDivider
          containerStyle={{ marginLeft: 10, borderBottomColor: '#95ACB9', borderBottomWidth: 1, marginRight: 10 }}>
          <Avatar source={{ uri: 'data:image/jpeg;base64,' + item.Image.base64 }} size='large' />
          <ListItem.Content>
            <ListItem.Title style={{ fontSize: 16, fontWeight: 'bold' }}>{item.Name}</ListItem.Title>
            <ListItem.Title style={{ fontSize: 14 }}>{item.Category[0].Name}</ListItem.Title>
            <ListItem.Subtitle>Add by: {item.User[0].Name}</ListItem.Subtitle>
            <Rating imageSize={20} readonly startingValue={item.Rating} />
            <ListItem.Subtitle>{item.Datetime}</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </Swipeout >
    );
  }
}
export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      list: '',
      par: '',
      id: '',
      name: '',
      visible: false
    }
  }
  // getBackData=(data)=>
  // {
  //   console.log(data)
  // }
  onChangeSearch = (search) => {
    this.setState({
      search: search
    })
  }
  componentDidMount() {
    if(this.props.route.params)
    {
      this.setState({
        visible: true
      })
      this.getListData();
    }
    this.setState({
      visible: true
    })
    this.getListData();
  }
  componentDidUpdate(prev) {
    if (this.props.route != prev.route)
    {
      this.setState({
        visible: true
      })
      this.getListData();
    }

  }
  getListData = async () => {
    await getAllToy()
      .then(res => {
        this.setState({
          list: res
        })
        // console.log(this.state.list[0].Category[0].Name)
      })
      .catch(err => console.log(err));
    this.setState({
      visible: false
    })
  }
  render() {

    var { list } = this.state;
    if (this.state.search) {
      list = list.filter((l) => {
        return l.name.toLowerCase().indexOf(this.state.search) !== -1
          || l.timestamp.toLowerCase().indexOf(this.state.search) !== -1
      })
    }
    var data;
    if (this.props.route.params)
    {
      data=this.props.route.params.data_user;
      // console.log(data._id)
    }
    else
      data=''
    return (
      <View style={{
        flex: 1,
        backgroundColor: 'white'
      }}>
        <SearchBar
          inputContainerStyle={{ backgroundColor: '#95ACB9', marginLeft: 30, marginRight: 30, marginBottom: 5, marginTop: 5 }}
          leftIconContainerStyle={{ backgroundColor: '#95ACB9', padding: 10 }}
          inputStyle={{ backgroundColor: '#95ACB9', padding: 0, fontSize: 14 }}
          containerStyle={{
            backgroundColor: '#134563',
            justifyContent: 'space-around',
            borderTopWidth: 0,
            borderBottomWidth: 0,

          }}
          placeholderTextColor='black'
          searchIcon={{ type: 'material-community-icons', color: 'black', name: 'search', style: { padding: 2 } }}
          style={{ borderBottomWidth: 1, borderColor: '#95ACB9' }}
          placeholder="Search"
          onChangeText={this.onChangeSearch}
          value={this.state.search}
        />
        <ProgressBar progress={0.2} color={'#00552E'} indeterminate={true} visible={this.state.visible} />
        <FlatList
          keyExtractor={item => item._id}
          data={list}
          renderItem={({ item, index }) => {
            return (
              <FlatListItem
                data_user={data}
                navigation={this.props.navigation}
                item={item}
                index={index}
                parentFlatList={this}>

              </FlatListItem>
            )
          }}
        />
        {/* <FAB
          style={{
            position: 'absolute',
            margin: 20,
            right: 0,
            bottom: 0,
            backgroundColor: '#134563'
          }}
          large
          icon="plus"
          onPress={() => this.props.navigation.navigate('AddToys')}
        /> */}
      </View>
    )
  }
}
