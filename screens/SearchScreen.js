import React from 'react';
import {
  Image,Platform,Switch,
  ScrollView,StyleSheet,
  Text,Button,TextInput,
  TouchableOpacity,View,
  Slider,ImageBackground,
  Dimensions, Alert,StatusBar,
  FlatList, AppState, BackHandler ,
  AsyncStorage,ActivityIndicator,Keyboard,
  ToastAndroid,RefreshControl,NativeModules,LayoutAnimation,Animated,TouchableWithoutFeedback} from 'react-native';
import { createDrawerNavigator,DrawerItems, } from 'react-navigation-drawer';
import {SearchBar,Card}from 'react-native-elements';
import {Fontisto, FontAwesome,Entypo,SimpleLineIcons,MaterialCommunityIcons,Ionicons } from '@expo/vector-icons';
import  Constants  from 'expo-constants';
import { Searchbar } from 'react-native-paper';
import { withNavigationFocus,DrawerActions ,DrawerNavigator} from 'react-navigation';
import settings from '../constants/Settings.js';
import Toast, {DURATION} from 'react-native-easy-toast';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import * as actionTypes from '../actions/actionTypes';
import { SharedElement } from 'react-navigation-shared-element';
import Modal from "react-native-modal";
import TabComponent  from '../components/TabComponent.js';

const { width } = Dimensions.get('window');
const height = width * 0.8
const SERVER_URL = settings.url
const themeColor = settings.themeColor

const { UIManager } = NativeModules;
UIManager.setLayoutAnimationEnabledExperimental &&
UIManager.setLayoutAnimationEnabledExperimental(true);

class SearchScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {header:null}
  };

  constructor(props) {
    super(props);
    this.state={
      keyboardOffset:0,
      keyboardOpen:false,
      }
      willFocus = props.navigation.addListener(
       'didFocus',
        payload => {
          }
     );
     Keyboard.addListener(
       'keyboardDidHide',
       this.keyboardDidHide
      )
      Keyboard.addListener(
         'keyboardDidShow', this.keyboardDidShow
      )
    }

    componentDidMount(){
      const willFocus = this.props.navigation.addListener(
     'didFocus',
       payload => {
         this.focusinput()
         }
      );
       // this.focusinput()
    }
    componentWillUnmount=()=>{
      willFocus.remove()
    }

  focusinput=()=>{
    this.search.focus();
  }

  keyboardDidShow=(event)=> {
  LayoutAnimation.easeInEaseOut();
      this.setState({
          keyboardOpen:true,keyboardOffset: event.endCoordinates.height+27,
      })
  }

  keyboardDidHide=()=> {
    LayoutAnimation.easeInEaseOut();
      this.setState({
          keyboardOpen:false,keyboardOffset: 27,
      })
 }



  render() {
    return (
      <View style={{flex:1,backgroundColor:'#fff'}}>
            <View style={{height:Constants.statusBarHeight,backgroundColor:'#EF2929'}}>
                <StatusBar  translucent={true} barStyle="dark-content" backgroundColor={'#EF2929'} networkActivityIndicatorVisible={false}    />
            </View>
            <View style={{height:width*0.2,backgroundColor:'#EF2929',width:width,alignItems:'center',padding:0}}>
                <View style={{paddingVertical:10,width:width*0.93,flexDirection:'row',alignItems:'center'}}>
                  <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                    <Ionicons name={'md-arrow-back'} style={{tintColor:'#fff',paddingTop:10}} size={22} color={'#fff'}/>
                  </TouchableOpacity>
                  <View style={{flex:1,marginHorizontal:0}}>
                                <Searchbar
                                ref={search => this.search = search}
                                placeholder="Search"
                                onChangeText={(text)=>{this.setState({searchText:text})}}
                                searchIcon={{
                                  size:30,
                                  color:'#424242'
                                }}
                                iconColor={'#424242'}

                                onIconPress ={()=>{this.props.navigation.goBack()}}
                                clearIcon={{
                                  size:30,
                                  color:'#424242'
                                }}
                                value={this.state.searchText}
                                onSubmitEditing={()=>{this.searchAll(this.state.searchText)}}
                                onCancel={() => {this.setState({search:false});}}
                                containerStyle={[styles.shadow,{borderWidth:1,borderRadius:0,backgroundColor:'#fff',borderColor:'#fff',borderBottomColor: '#fff',borderTopColor:'#fff',borderRadius:17,width:width*0.6}]}
                                inputContainerStyle={{borderWidth:1,backgroundColor:'#fff',borderColor:'#fff',borderBottomWidth:1,borderBottomColor: '#fff',borderTopColor:'#fff',borderRadius:17,width:width*0.6}}
                                inputStyle={{color:'#000',borderRadius:17}}
                                style={{height:1.8*Constants.statusBarHeight,borderRadius:17,width:width*0.7,alignSelf:'flex-end'}}
                                />
                  </View>
                </View>
            </View>
            <View style={{flex:1}}>

            </View>
            <TabComponent navigation={this.props.navigation}  />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 0,
  },
  modalView: {
     backgroundColor: '#fff',
     marginHorizontal: width*0.1 ,
     borderRadius:5,
  },

});

const mapStateToProps =(state) => {
    return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);
