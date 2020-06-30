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
const contact=[
  {
    name:'Abhi',
    mobile:'9876543210'
  },
  {
    name:'Adharsh',
    mobile:'9876543210'
  },
  {
    name:'Anand',
    mobile:'9876543210'
  },
  {
    name:'Anu',
    mobile:'9876543210'
  },
  {
    name:'Aravind',
    mobile:'9876543210'
  },
  {
    name:'Aslam',
    mobile:'9876543210'
  },
  {
    name:'Asin',
    mobile:'9876543210'
  },
  {
    name:'Asfaq',
    mobile:'9876543210'
  },
]
class ReferEarn extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {header:null}
  };

  constructor(props) {
    super(props);
    var item = props.navigation.getParam('item',null)
    this.state={
      item:item,
      contact:contact,
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






myCart=()=>{
  return(
    <View style={{backgroundColor:'#fff'}}>
      <Text style={{marginHorizontal:20,marginTop:10,fontSize:13}}>Your contacts</Text>
      <FlatList style={{ borderWidth:0,margin:0,backgroundColor:'#fff',marginVertical: 0,paddingBottom:0,}}
      contentContainerStyle={{paddingBottom:15,paddingTop:8,}}
          data={this.state.contact}
          keyExtractor={(item,index) => {
            return index.toString();
          }}
          horizontal={false}
          numColumns={1}
          extraData={this.state.contact}
          nestedScrollEnabled={true}
          renderItem={({item, index}) =>{
            return(

              <View style={{borderWidth:0,marginTop:0,marginLeft:0,marginRight:0,paddingHorizontal:15,paddingVertical:6,backgroundColor:'#fff',borderRadius:10}}>
                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                    <View style={{flex:0.2,borderWidth:0,alignItems:'center'}}>
                      <View style={{justifyContent:'center',height:width*0.1,width:width*0.1,borderRadius:50,backgroundColor:'#EF2929',alignItems:'center'}}>
                        <Text style={{textAlign:'center',color:'#fff'}}>A</Text>
                      </View>
                    </View>
                    <View style={{flex:0.6,borderWidth:0}}>
                      <Text style={{color:'#000',fontSize:14,textAlign:'left',fontWeight:'600'}}>{item.name}</Text>
                      <Text style={{color:'#000',fontSize:12,textAlign:'left',fontWeight:'600'}}>{item.mobile}</Text>
                    </View>
                    <View style={{flex:0.2,borderWidth:0}}>
                      <Text style={{color:'#EF2929',fontSize:14,textAlign:'center',fontWeight:'600'}}>Invite</Text>
                    </View>
                </View>
              </View>

          )}}/>
    </View>
  )
}
// <Text style={{color:'#000',fontSize:17,textAlign:'left',fontWeight:'600'}}>AMC for {item.year} year</Text>
// <Text style={{color:'#000',fontSize:17,textAlign:'left',fontWeight:'600'}}>&#8377;{item.price}</Text>

  render() {
  const filter=this.props.navigation.getParam('item',null)
    return (
      <View style={[{flex:1,backgroundColor:'#fff',}]}>
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
                        <Text style={{color:'#fff',fontSize:18,fontWeight:'400',paddingHorizontal:10,paddingTop:15,paddingLeft:width*0.25}}>Refer and Earn</Text>
                    </View>
                </View>
            </View>
            <View style={[{height:width*0.3,backgroundColor:'#fff',width:width,alignItems:'center',padding:0,
              borderBottomWidth:0,borderColor:'#adadad'}]}>
                <View style={{padding:5,width:width,borderWidth:0}}>
                    <View style={{alignItems:'center',flexDirection:'row',borderWidth:0,justifyContent:'space-between',paddingHorizontal:10}}>
                      <View style={{alignSelf:'flex-start',flex:0.7,borderWidth:0}}><Text style={{color:'#000',fontSize:13,fontWeight:'400',paddingHorizontal:0,paddingRight:0,paddingTop:15,paddingLeft:10}}numberOfLines={2}>Earn exciting offers and rewards when your friend do first transaction</Text></View>
                        <TouchableOpacity style={{flex:0.2,borderWidth:0,alignItems:'center'}}>
                          <Image source={require('../assets/images/gift.png')} style={{height:32,width:32,paddingTop:10,marginLeft:0}}/>
                        </TouchableOpacity>
                        {/* <Image source={require('../assets/images/navigate.png')} style={{height:25,width:25,marginTop:10}}/> */}

                    </View>
                </View>
                <View style={{borderWidth:0.5,width:width*0.9,borderColor:'#a2a2a2'}}/>
                <View style={{padding:5,width:width,borderWidth:0}}>
                    <View style={{alignItems:'center',flexDirection:'row',borderWidth:0,justifyContent:'space-between',paddingHorizontal:10}}>
                      <View style={{alignSelf:'flex-start',flex:0.7,borderWidth:0}}><Text style={{color:'#000',fontSize:16,fontWeight:'400',paddingHorizontal:10,paddingRight:0,paddingTop:15,paddingLeft:10}}numberOfLines={2}>My Earnings</Text></View>
                        <TouchableOpacity style={{flex:0.2,borderWidth:0,alignItems:'center',paddingTop:10,}}>
                          <Image source={require('../assets/images/arrowcircle.png')} style={{height:22,width:22,marginLeft:0}}/>
                        </TouchableOpacity>
                        {/* <Image source={require('../assets/images/navigate.png')} style={{height:25,width:25,marginTop:10}}/> */}

                    </View>
                </View>
                <View style={[styles.shadow,{borderWidth:0.2,width:width*0.9,position:'absolute',bottom:0,borderColor:'#a2a2a2'}]}/>
            </View>

            <ScrollView style={[{flex:1}]}>
              {this.myCart()}

              <View style={{height:150}}/>
            </ScrollView>

            <View style={[styles.shadow,{borderWidth:0,marginTop:0,marginLeft:0,marginRight:0,paddingHorizontal:15,paddingVertical:6,backgroundColor:'#fff',borderRadius:0,borderTopWidth:1.5,borderColor:'#CCCCCC'}]}>
              <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingVertical:10}}>
                  <View style={{flex:0.2,borderWidth:0,alignItems:'center'}}>
                    {/* <View style={{justifyContent:'center',height:width*0.1,width:width*0.1,borderRadius:50,backgroundColor:'#EF2929',alignItems:'center'}}>
                      <Text style={{textAlign:'center',color:'#fff'}}></Text>
                    </View> */}
                    <Image source={require('../assets/images/code.png')} style={{height:40,width:40}}/>
                  </View>
                  <View style={{flex:0.6,borderWidth:0}}>
                    <Text style={{color:'#000',fontSize:14,textAlign:'left',fontWeight:'600'}}>801qYtw22</Text>
                    <Text style={{color:'#000',fontSize:12,textAlign:'left',fontWeight:'600'}}>your referral code</Text>
                  </View>
                  <View style={{flex:0.2,borderWidth:0}}>
                  <Image source={require('../assets/images/share.png')} style={{height:30,width:30}}resizeMode={'contain'}/>
                  </View>
              </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(ReferEarn);
