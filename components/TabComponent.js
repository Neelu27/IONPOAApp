import * as React from 'react';
import {Animated, StatusBar ,View,FlatList,StyleSheet,TouchableOpacity,TouchableHighlight,Text,Dimensions,Image,AppState,BackHandler,AsyncStorage , TextInput, ScrollView ,TouchableWithoutFeedback, KeyboardAvoidingView, Platform, Button, Alert,ActivityIndicator, ToastAndroid , WebView,Easing} from 'react-native';
import  Constants  from 'expo-constants';
import { FontAwesome ,MaterialCommunityIcons,MaterialIcons,SimpleLineIcons,Entypo,Fontisto,Feather} from '@expo/vector-icons';
import settings from '../constants/Settings.js';
const { width } = Dimensions.get('window');
import constants  from '../constants/Settings.js';
import { StackActions, NavigationActions } from 'react-navigation';

const serverURL = constants.url;
const themeColor = constants.themeColor;
const mainUrl = constants.mainUrl;

export default class TabComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activeColor:'#EF2929',
      inactiveColor:'#000',
      scale: new Animated.Value(0),
      color:'#f2f2f2',
      size:30

    };

  }



  start=() =>{
  	this.setState({
      color: '#c2c2c2'
    }, () => {
      this.animate();
    });
}

  animate = ()=> {
  Animated.timing(this.state.scale, {
    toValue: 1,
    duration: 500,
    easing: Easing.linear
  }).start(() => {
    this.hideCircle();
  });
}

hideCircle () {
  this.setState({
    scale: new Animated.Value(0),
  });
}

  openModal=(routeName)=>{
    this.props.navigation.navigate('ForumForm')
    return
  }

  componentDidMount(){
  this.start()
  }

  navigate=(nav,route)=>{
    this.props.navigation.navigate(nav);
    // this.props.navigation.navigate(nav, {}, NavigationActions.navigate({ routeName: route }))
  }

  render(){
    var routeName = this.props.navigation.state.routeName
    var home = ['HomeScreen']
    var cart = ['MyCart']
    var wish = ['MyWishlist']
    var booking = ['Bookings']

    return (
    <View style={{position: 'absolute',bottom:0,height:55,left:0,width:'100%',borderTopWidth:1,borderColor:'transparent',backgroundColor:'transparent'}}>
    <View style={{flex:1,flexDirection:'row',backgroundColor:'rgba(255,255,255,0.95)',alignItems: 'center',justifyContent:'space-between'}}>


    <View style={{flex:1}} >
     <Animated.View style={[{borderRadius:30,height:'100%',}]} >
      <TouchableOpacity onPress={()=>{this.navigate('HomeScreen')}} style={{borderRadius:20,justifyContent: 'center',alignItems: 'center',height:'100%'}}>
       <MaterialCommunityIcons name={home.includes(routeName)?"home":"home-outline"} size={this.state.size} color={home.includes(routeName)?this.state.activeColor:this.state.inactiveColor} />
      </TouchableOpacity>
     </Animated.View>
    </View>


      {/* <View style={{flex:1}} >
       <Animated.View style={[{borderRadius:30,height:'100%',}]} >
        <TouchableOpacity onPress={()=>{this.navigate('MyWishlist')}} style={{borderRadius:20,justifyContent: 'center',alignItems: 'center',height:'100%'}}>
         <FontAwesome name={wish.includes(routeName)?"heart":"heart-o"} size={25} color={wish.includes(routeName)?this.state.activeColor:this.state.inactiveColor} />
        </TouchableOpacity>
       </Animated.View>
      </View> */}

      <View style={{flex:1}} >
       <Animated.View style={[{borderRadius:30,height:'100%',}]} >
        <TouchableOpacity onPress={()=>{this.navigate('Bookings')}} style={{borderRadius:20,justifyContent: 'center',alignItems: 'center',height:'100%'}}>
         <Image source={booking.includes(routeName)?require('../assets/images/bookingfooter.png'):require('../assets/images/Mybokingfooter.png')}  style={{height:30,width:30}}resizeMode={'contain'} />
        </TouchableOpacity>
       </Animated.View>
      </View>



      <View style={{flex:1}} >
       <Animated.View style={[{borderRadius:30,height:'100%',}]} >
        <TouchableOpacity onPress={()=>{this.navigate('MyCart')}} style={{borderRadius:20,justifyContent: 'center',alignItems: 'center',height:'100%'}}>
         <Image source={cart.includes(routeName)?require('../assets/images/shopping-basket.png'):require('../assets/images/shopping-basketblack.png')}  style={{height:30,width:30}} />
        </TouchableOpacity>
       </Animated.View>
      </View>
    </View>
    </View>
    )
  }
}
