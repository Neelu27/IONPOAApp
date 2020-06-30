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

class HealthDeaclare extends React.Component {

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
      select:true,
    }
      willFocus = props.navigation.addListener(
       'didFocus',
        payload => {
          }
     );
    }

  render() {
  const filter=this.props.navigation.getParam('item',null)
    return (
      <View style={[{flex:1,backgroundColor:'#f5f5f5',}]}>
            <View style={{height:Constants.statusBarHeight,backgroundColor:'#EF2929'}}>
                <StatusBar  translucent={true} barStyle="dark-content" backgroundColor={'#EF2929'} networkActivityIndicatorVisible={false}    />
            </View>
            <View style={{height:width*0.17,backgroundColor:'#EF2929',width:width,alignItems:'center',padding:0}}>
                <View style={{paddingVertical:10,width:width*0.93}}>
                    <View style={{flexDirection:'row',alignItems:'center',}}>
                        <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                          <Ionicons name={'md-arrow-back'} style={{tintColor:'#fff',paddingTop:10}} size={22} color={'#fff'}/>
                        </TouchableOpacity>
                        {/* <Image source={require('../assets/images/navigate.png')} style={{height:25,width:25,marginTop:10}}/> */}
                        <Text style={{color:'#fff',fontSize:18,fontWeight:'400',paddingHorizontal:10,paddingTop:15,paddingLeft:width*0.15}}>Health Declaration</Text>
                    </View>
                </View>
            </View>
            <ScrollView style={[{flex:1}]}>
              <Text style={{fontSize:20,color:'#000',textAlign:'center',marginTop:25,fontWeight:'400'}}>I am healthy & Safe</Text>
              <Text style={{fontSize:14,color:'#919191',paddingHorizontal:15,
                            textAlign:'center',marginVertical:15,
                            marginHorizontal:width*0.15}}
                            numberOfLines={3}
                >Here by i declare that i am safe here:We record your response and ensure safety to our professionals</Text>

                <View style={{marginVertical:width*0.1,borderWidth:0,
                              flexDirection:'row',justifyContent:'space-between',
                              alignItems:'center',alignSelf:'center'}}>
                      <View style={{height:width*0.13,width:width*0.13}}>
                        <Image source={require('../assets/images/healthdeclaration.png')} style={{height:'100%',width:'100%'}}/>
                      </View>
                     <Text style={{color:'#000',fontSize:18,fontWeight:'600',paddingHorizontal:10,}}>Help stop coronavirus</Text>
                </View>

                <View style={{borderWidth:0,justifyContent:'center',marginTop:20,alignSelf:'center',alignItems:'center'}}>

                  <View style={{paddingLeft:width*0.2,alignSelf:'center',borderWidth:0,marginHorizontal:25}}>
                    <View style={{position:'absolute',top:0,left:30,paddingBottom:10,borderWidth:0}}>
                            <TouchableOpacity style={{justifyContent:'center',alignItems:'center',paddingHorizontal:10}}
                              onPress={()=>this.setState({select:!this.state.select})}>
                              {!this.state.select?<Ionicons name={'md-radio-button-on'} size={22}/>:<Ionicons name={'md-radio-button-off'} size={22}/>}
                              </TouchableOpacity>

                    </View>
                    <Text style={{fontWeight:'600',color:'#000',fontSize:18,paddingHorizontal:10,}}>I assure to confirm that</Text>
                      <Text style={{fontWeight:'600',color:'#a8a8a8',fontSize:14,paddingHorizontal:10,paddingVertical:4}}numberOfLines={2}>&#8226;I was hands often </Text>
                      <Text style={{fontWeight:'600',color:'#a8a8a8',fontSize:14,paddingHorizontal:10,paddingVertical:4}}numberOfLines={2}>&#8226;I maintain social distancing </Text>
                      <Text style={{fontWeight:'600',color:'#a8a8a8',fontSize:14,paddingHorizontal:10,paddingVertical:4}}numberOfLines={2}>&#8226;I wear masks,apply hand sanitizer frequently </Text>
                      <Text style={{fontWeight:'600',color:'#a8a8a8',fontSize:14,paddingHorizontal:10,paddingVertical:4}}numberOfLines={2}>&#8226;I cover while cough </Text>
                      <Text style={{fontWeight:'600',color:'#a8a8a8',fontSize:14,paddingHorizontal:10,paddingVertical:4}}numberOfLines={2}>&#8226;I dint percieve any disease in the past 14 days </Text>
                  </View>
                </View>
                {!this.state.select&&<View style={{marginTop:40}}>
                  <TouchableOpacity style={{backgroundColor:'#033285',alignSelf:'center',borderRadius:17}}
                    onPress={()=>{this.props.navigation.navigate('SlotAllotment')}}>
                    <Text style={{fontWeight:'400',color:'#fff',fontSize:16,paddingHorizontal:width*0.22,paddingVertical:12}}>Proceed</Text>
                  </TouchableOpacity>
                </View>}
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

export default connect(mapStateToProps, mapDispatchToProps)(HealthDeaclare);
