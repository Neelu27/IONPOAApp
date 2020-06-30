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

const items = ['Variant 1','Variant 2','variant 3','variant 4','variant 5']

class RaiseConcern extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {header:null}
  };

  constructor(props) {
    super(props);
    var item = props.navigation.getParam('item',null)
    this.state={
      item:item,
      AnimatedValue:new Animated.Value(0),
      show:false,
      underlay:false,
      // items:items,
      selectedindex:0,
      // selected:items[0],
      selectdImgTab:0,
      scrollX : new Animated.Value(0),
      count:0,
    }
      willFocus = props.navigation.addListener(
       'didFocus',
        payload => {
          }
     );
    }


    fullView=()=>{
      return(
        <View style={{flex:1}}>
          <View style={{borderWidth:0,padding:15}}>
            <Text style={{fontSize:16,color:'#000',fontWeight:'400',paddingTop:20}}>Title</Text>
            <TextInput
              style={{borderBottomWidth:1,borderColor:'#787878',paddingVertical:4,paddingHorizontal:10}}
              value={this.state.title}
              placeholder={'title'}
              onChangeText={()=>{this.setState({title})}}>
            </TextInput>
            <Text style={{fontSize:16,color:'#000',fontWeight:'400',paddingTop:20}}>Order Id</Text>
            <TextInput
              style={{borderBottomWidth:1,borderColor:'#787878',paddingVertical:4,paddingHorizontal:10}}
              value={this.state.orderid}
              placeholder={'eg #O101,#S101'}
              onChangeText={()=>{this.setState({orderid})}}>
            </TextInput>
            <Text style={{fontSize:16,color:'#000',fontWeight:'400',paddingTop:20}}>Select concern type</Text>
            <TextInput
              style={{borderBottomWidth:1,borderColor:'#787878',paddingVertical:4,paddingHorizontal:10}}
              value={this.state.orderid}
              placeholder={'Order_related'}
              onChangeText={()=>{this.setState({orderid})}}>
            </TextInput>
            <Text style={{fontSize:16,color:'#000',fontWeight:'400',paddingTop:20}}>Add photos(optional)</Text>
            <Image source={require('../assets/images/newaddress.png')} style={{height:40,width:40,marginVertical:10}} resizeMode={'contain'}/>
            <Text style={{fontSize:16,color:'#000',fontWeight:'400',paddingTop:20}}>Add videos(optional)</Text>
            <Image source={require('../assets/images/newaddress.png')} style={{height:40,width:40,marginVertical:10}} resizeMode={'contain'}/>
            <Text style={{fontSize:16,color:'#000',fontWeight:'400',paddingTop:20}}>Comments / Feedback</Text>
            <TextInput
              style={{marginVertical:10,borderWidth:1,borderColor:'#787878',paddingVertical:4,paddingHorizontal:10,borderRadius:12,height:width*0.3}}
              value={this.state.orderid}
              placeholder={'Order_related'}
              onChangeText={()=>{this.setState({orderid})}}>
            </TextInput>
          </View>
        </View>
      )
    }

  render() {
  const filter=this.props.navigation.getParam('item',null)
    return (
      <View style={[{flex:1,backgroundColor:'#f5f5f5',}]}>
            <View style={{height:Constants.statusBarHeight,backgroundColor:'#EF2929'}}>
                <StatusBar  translucent={true} barStyle="dark-content" backgroundColor={'#EF2929'}
                  networkActivityIndicatorVisible={false}/>
            </View>
            <View style={{height:width*0.17,backgroundColor:'#EF2929',width:width,alignItems:'center',padding:0}}>
                <View style={{paddingVertical:10,width:width*0.93}}>
                    <View style={{flexDirection:'row',alignItems:'center',}}>
                        <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                          <Ionicons name={'md-arrow-back'} style={{tintColor:'#fff',paddingTop:10}} size={22} color={'#fff'}/>
                        </TouchableOpacity>
                        {/* <Image source={require('../assets/images/navigate.png')} style={{height:25,width:25,marginTop:10}}/> */}
                        <Text style={{color:'#fff',fontSize:18,fontWeight:'400',paddingHorizontal:10,paddingTop:15,paddingLeft:width*0.25}}>Raise Concern</Text>
                    </View>
                </View>
            </View>
            <ScrollView style={[{flex:1}]}>
              {this.fullView()}
              <View style={{height:150}}/>
            </ScrollView>
            <View style={[styles.shadow,{borderWidth:0,marginTop:0,marginLeft:0,marginRight:0,paddingHorizontal:15,paddingVertical:6,backgroundColor:'#033285',borderRadius:0,borderTopWidth:0.5,borderColor:'#707070'}]}>
              <TouchableOpacity style={{flexDirection:'row',justifyContent:'center',alignItems:'center',paddingVertical:6}}
                onPress={()=>{this.props.navigation.goBack()}}>
                    <Text style={{color:'#fff',fontSize:16,textAlign:'center',fontWeight:'600'}}>Submit</Text>
              </TouchableOpacity>
            </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(RaiseConcern);
