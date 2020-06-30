import React from 'react';
import {
  Image,Platform,Switch,
  ScrollView,StyleSheet,
  Text,Button,TextInput,Animated,
  TouchableOpacity,View,TouchableHighlight,
  Slider,ImageBackground,NativeModules,
  Dimensions, Alert,StatusBar,
  FlatList, AppState, BackHandler,
  AsyncStorage,ActivityIndicator,LayoutAnimation,
  ToastAndroid,RefreshControl,TouchableWithoutFeedback,} from 'react-native';
import { createDrawerNavigator,DrawerItems, } from 'react-navigation-drawer';
import {SearchBar,Card}from 'react-native-elements';
import {Fontisto, FontAwesome,Entypo,SimpleLineIcons,MaterialCommunityIcons,Ionicons } from '@expo/vector-icons';
import  Constants  from 'expo-constants';
import { withNavigationFocus,DrawerActions ,DrawerNavigator} from 'react-navigation';
import settings from '../constants/Settings.js';
import Toast, {DURATION} from 'react-native-easy-toast';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import * as actionTypes from '../actions/actionTypes';
import { SharedElement } from 'react-navigation-shared-element';
import Modal from "react-native-modal";
import  ModalBox from 'react-native-modalbox';
import TabComponent  from '../components/TabComponent.js';
import ModalComponent  from '../components/ModalComponent.js';
import { createFluidNavigator, Transition } from 'react-navigation-fluid-transitions';
import { RectButton } from 'react-native-gesture-handler';

const { width,height } = Dimensions.get('window');
const SERVER_URL = settings.url
const themeColor = settings.themeColor
const { UIManager } = NativeModules;
UIManager.setLayoutAnimationEnabledExperimental &&
UIManager.setLayoutAnimationEnabledExperimental(true);

class ProfileScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {header:null}
  };

  constructor(props) {
    super(props);
    var item = props.navigation.getParam('item',null)
    this.state={
      AnimatedValue:new Animated.Value(0),
      show:false,
      underlay:false,
      selectedindex:0,
      selectdImgTab:0,
      scrollX : new Animated.Value(0),
      count:0,
    }
  }

  componentDidMount=()=>{}

  editProfile=()=>{
    return(
      <View style={{flex:1}}>
        <ScrollView style={{flex:1}}>
            <View style={{justifyContent:'center',alignItems:'center',marginVertical:30}}>
              <Image source={require('../assets/images/1.jpg')} style={{height:width*0.2,width:width*0.2,borderRadius:width*0.1,}}/>
            </View>
            <View style={{marginHorizontal:10,paddingHorizontal:15}}>
              <Text style={{fontSize:16,fontWeight:'400',paddingTop:10}}>First name</Text>
              <TextInput style={{borderBottomWidth:1,paddingVertical:6,}}
                value={this.state.firstname}
                placeholder={'naveen'}
                onChangeText={()=>{this.setState({firstname})}}>
              </TextInput>
              <Text style={{fontSize:16,fontWeight:'400',paddingTop:15}}>Last name</Text>
              <TextInput style={{borderBottomWidth:1,paddingVertical:6,}}
                value={this.state.lastname}
                placeholder={'Kumar'}
                onChangeText={()=>{this.setState({lastname})}}>
              </TextInput>
              <Text style={{fontSize:16,fontWeight:'400',paddingTop:15}}>Mobile no</Text>
              <TextInput style={{borderBottomWidth:1,paddingVertical:6,}}
                value={this.state.name}
                placeholder={'63456456'}
                onChangeText={()=>{this.setState({name})}}>
              </TextInput>
              <Text style={{fontSize:16,fontWeight:'400',paddingTop:15}}>Email</Text>
              <TextInput style={{borderBottomWidth:1,paddingVertical:6,}}
                value={this.state.name}
                placeholder={'naveen123@gmail.com'}
                onChangeText={()=>{this.setState({name})}}>
              </TextInput>
            </View>

            <View style={{marginVertical:30}}>
              <TouchableOpacity style={{backgroundColor:'#033285',alignSelf:'center',paddingHorizontal:width*0.2,borderRadius:15}}>
                <Text style={{fontSize:18,fontWeight:'400',textAlign:'center',color:'#fff',paddingVertical:6}}>Save</Text>
              </TouchableOpacity>
            </View>

        </ScrollView>
      </View>
    )
  }

  render() {
    return (
      <View style={[{flex:1,backgroundColor:'#fff',}]}>
            <View style={{height:Constants.statusBarHeight,backgroundColor:'#EF2929'}}>
                <StatusBar
                    translucent={true}
                    barStyle="dark-content"
                    backgroundColor={'#EF2929'}
                    networkActivityIndicatorVisible={false}    />
            </View>
            <View style={{height:width*0.17,backgroundColor:'#EF2929',width:width,alignItems:'center',padding:0}}>
                <View style={{paddingVertical:10,width:width*0.93}}>
                    <View style={{flexDirection:'row',alignItems:'center',}}>
                        <TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={{paddingTop:15}}>
                          <Ionicons name={'md-arrow-back'} style={{tintColor:'#fff',paddingTop:0}} size={22} color={'#fff'}/>
                        </TouchableOpacity>
                        <Text style={{color:'#fff',fontSize:18,fontWeight:'400',paddingHorizontal:10,paddingTop:10,paddingLeft:width*0.35}}>Edit profile</Text>
                    </View>
                </View>
            </View>
            <ScrollView style={[{flex:1,backgroundColor:'#fff'}]}>
              {this.editProfile()}
              <View style={{height:150}}/>
            </ScrollView>
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
    elevation: 3.84,
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
