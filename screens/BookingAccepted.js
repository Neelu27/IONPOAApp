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

class BookingAccepted extends React.Component {

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

  componentDidMount(){
    Animated.timing(this.state.AnimatedValue,{
      toValue:1,
      duration:600,
      useNativeDriver:true
    }).start()
  }

  handlePageChange=(e)=>{
    var offset = e.nativeEvent.contentOffset;
    if(offset) {
      var page = Math.round(offset.x / width) ;
      this.setState({selectdImgTab:page})
    }
  }


  setModal=()=>{
    Animated.timing(this.state.AnimatedValue,{
      toValue:0,
      duration:300,
      useNativeDriver:true
    }).start()
    this.setState({show:true})
  }
  hideModal=()=>{
    Animated.timing(this.state.AnimatedValue,{
      toValue:1,
      duration:300,
      useNativeDriver:true
    }).start()
    this.setState({show:false})
  }


minus=()=>{
  if(this.state.count>0){
    this.setState({count:this.state.count-1})
  }else{
    return
  }

}
plus=()=>{
    this.setState({count:this.state.count+1})
}

viewDesign=()=>{
  return(
    <ScrollView style={{flex:1}}>
      <View style={{height:width*0.35,width:width,borderWidth:0,borderColor:'#666666'}}>
      </View>

      <View style={{padding:15}}>
        <Text style={{fontSize:16,fontWeight:'600',color:'#000',paddingBottom:10}}>Booking description</Text>
        <View style={{flexDirection:'row',justifyContent:'space-between',paddingVertical:6,borderWidth:0}}>
          <Text style={{fontSize:14,fontWeight:'400',color:'#262626'}}>AMC ( 1 Year)</Text>
          <Text style={{fontSize:14,fontWeight:'400',color:'#262626'}}>Normal RO Filter</Text>
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between',paddingVertical:6,borderWidth:0}}>
          <Text style={{fontSize:14,fontWeight:'400',color:'#262626'}}>Booked on</Text>
          <Text style={{fontSize:14,fontWeight:'400',color:'#262626'}}>8 May 2020, 10:00 AM</Text>
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between',paddingVertical:6,borderWidth:0}}>
          <Text style={{fontSize:14,fontWeight:'400',color:'#262626'}}>Free services</Text>
          <Text style={{fontSize:14,fontWeight:'400',color:'#262626'}}>0/3</Text>
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between',paddingVertical:6,borderWidth:0}}>
          <Text style={{fontSize:14,fontWeight:'400',color:'#262626'}}>Filter replacement</Text>
          <Text style={{fontSize:14,fontWeight:'400',color:'#262626'}}>0/1</Text>
        </View>
      </View>

<View style={{borderWidth:0.5,borderColor:'#666666'}}/>

      <View style={{padding:15}}>
        <Text style={{fontSize:16,fontWeight:'600',color:'#000',paddingBottom:10}}>Address</Text>
        <View style={{flexDirection:'row',justifyContent:'space-between',paddingVertical:6,borderWidth:0}}>
          <Text style={{fontSize:14,fontWeight:'400',color:'#262626'}}>Service location</Text>
        </View>
        <View style={{justifyContent:'space-between',paddingVertical:6,borderWidth:0}}>
          <Text style={{fontSize:14,fontWeight:'400',color:'#777777'}}>Naveen kumar ,10th cross street, jayanagar</Text>
          <Text style={{fontSize:14,fontWeight:'400',color:'#777777'}}>4th block, Bengaluru-560068</Text>
        </View>
      </View>

      <View style={{borderWidth:0.5,borderColor:'#666666'}}/>

            <View style={{padding:15}}>
              <Text style={{fontSize:16,fontWeight:'600',color:'#000',paddingBottom:10}}>Technician details</Text>
              <View style={{flexDirection:'row',justifyContent:'space-between',paddingVertical:6,borderWidth:0}}>
                <Text style={{fontSize:14,fontWeight:'400',color:'#262626'}}>Mr. Nages</Text>
              </View>
              <View style={{flexDirection:'row',justifyContent:'space-between',paddingVertical:6,borderWidth:0}}>
                <Text style={{fontSize:14,fontWeight:'400',color:'#777777'}}>9876543210</Text>
                <FontAwesome name={'phone'} size={22}/>
              </View>
            </View>

      <View style={{borderWidth:0.5,borderColor:'#666666'}}/>

      <View style={{padding:15}}>
        <Text style={{fontSize:16,fontWeight:'600',color:'#000',paddingBottom:10}}>Booking details</Text>
        <View style={{flexDirection:'row',justifyContent:'space-between',paddingVertical:6,borderWidth:0}}>
          <Text style={{fontSize:14,fontWeight:'400',color:'#262626'}}>Total Price</Text>
          <Text style={{fontSize:14,fontWeight:'400',color:'#262626'}}>&#8377; 5530</Text>
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between',paddingVertical:6,borderWidth:0}}>
          <Text style={{fontSize:14,fontWeight:'400',color:'#262626'}}>Service charge</Text>
          <Text style={{fontSize:14,fontWeight:'400',color:'#262626'}}>&#8377; 350</Text>
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between',paddingVertical:6,borderWidth:0}}>
          <Text style={{fontSize:14,fontWeight:'400',color:'#262626'}}>Coupon Discount</Text>
          <Text style={{fontSize:14,fontWeight:'400',color:'#EF2929'}}>APPLIED</Text>
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between',paddingVertical:6,borderWidth:0}}>
          <Text style={{fontSize:14,fontWeight:'400',color:'#262626'}}>Discount</Text>
          <Text style={{fontSize:14,fontWeight:'400',color:'#EF2929'}}>- &#8377; 350</Text>
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between',paddingVertical:6,borderWidth:0}}>
          <Text style={{fontSize:14,fontWeight:'400',color:'#262626'}}>Amount Payable</Text>
          <Text style={{fontSize:14,fontWeight:'400',color:'#262626'}}>&#8377; 5530</Text>
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between',paddingVertical:6,borderWidth:0}}>
          <Text style={{fontSize:14,fontWeight:'400',color:'#262626'}}>Total</Text>
          <Text style={{fontSize:14,fontWeight:'400',color:'#29ee54'}}>Paid</Text>
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between',paddingVertical:6,borderWidth:0}}>
          <Text style={{fontSize:14,fontWeight:'400',color:'#262626'}}>Payment type</Text>
          <Text style={{fontSize:14,fontWeight:'400',color:'#000'}}>Card</Text>
        </View>
      </View>
    </ScrollView>
  )
}

  render() {
    const item=this.props.navigation.getParam('item',false)
    var transform = [{
      translateY:this.state.AnimatedValue.interpolate({
        inputRange:[0,1],
        outputRange:[1,0],
      })
    }]
    const opacity = this.state.AnimatedValue.interpolate({
      inputRange:[0,0.99,0.995],
      outputRange:[0,0,1]
    })
    const imageStyle = {
      position:'absolute',
      width:width,
      height:width*0.9,
      left:0,
      top:0,
    }
    const viewTranform ={
      transform:[
        {
          translateY:this.state.AnimatedValue.interpolate({
            inputRange:[0,0.5,1],
            outputRange:[100,100,0],
          })
      },
    ]
    }
    return (
      <View style={[{flex:1,backgroundColor:'#fff',}]}>
            <View style={{height:Constants.statusBarHeight,backgroundColor:'#EF2929'}}>
                <StatusBar  translucent={true} barStyle="dark-content" backgroundColor={'#EF2929'} networkActivityIndicatorVisible={false}    />
            </View>
            <View style={{height:width*0.17,backgroundColor:'#EF2929',width:width,alignItems:'center',padding:0}}>
                <View style={{paddingVertical:10,width:width*0.93}}>
                    <View style={{flexDirection:'row',alignItems:'center',}}>
                        {item==true&&<TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                          <Ionicons name={'md-arrow-back'} style={{tintColor:'#fff',paddingTop:10}} size={22} color={'#fff'}/>
                        </TouchableOpacity> }
                        {/* <Image source={require('../assets/images/navigate.png')} style={{height:25,width:25,marginTop:10}}/> */}
                        <Text style={{color:'#fff',fontSize:18,fontWeight:'400',paddingHorizontal:10,paddingTop:15,paddingLeft:width*0.3}}>{item==true?'Booking':'Booking created'}</Text>
                    </View>
                </View>
            </View>

            <ScrollView style={[{flex:1}]}>

              {this.viewDesign()}

              <View style={{height:100}}/>
            </ScrollView>
            {item==true?<View style={[styles.shadow,{borderColor:'#f5f5f5',borderTopWidth:0.5,position:'absolute',left:0,right:0,bottom:0,alignItems:'center',justifyContent:'center',backgroundColor:'#fff'}]}>
              <View style={{justifyContent:'center',flexDirection:'row',alignItems:'center',paddingVertical:15}}>
                <Image source={require('../assets/images/bookingaccepted.png')} style={{height:22,width:22,marginRight:20}}/>
                <View>
                  <Text style={{fontSize:14,color:'#777777',}}>RO SERVICES</Text>
                  <Text style={{fontSize:16,color:'#000',}}>Booking accepted</Text>
                </View>
              </View>
            </View>:<View style={{borderWidth:0,position:'absolute',left:0,right:0,bottom:0,alignItems:'center',justifyContent:'center',backgroundColor:'#033285',}}>
              <TouchableOpacity style={{borderRadius:17,justifyContent:'center',borderWidth:0,backgroundColor:'#033285',}}
                onPress={()=>{this.props.navigation.navigate('Bookings')}}>
                <Text style={{color:'#fff',paddingVertical:10,fontSize:16,textAlign:'center',paddingHorizontal:25}}>Go to Bookings</Text>
              </TouchableOpacity>
            </View>}
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

export default connect(mapStateToProps, mapDispatchToProps)(BookingAccepted);
