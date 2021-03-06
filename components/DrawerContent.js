import React from 'react';
import { Platform,
  AsyncStorage,
  StyleSheet,ScrollView,
  View,Image,Dimensions,
  StatusBar,Alert,TouchableOpacity,
  TouchableNativeFeedback} from 'react-native';
import {createBottomTabNavigator,
        createAppContainer,
        createSwitchNavigator,
        NavigationActions } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator,DrawerItems } from 'react-navigation-drawer';
import Constants from 'expo-constants';
import SafeAreaView from 'react-native-safe-area-view';
import { FontAwesome ,MaterialCommunityIcons,MaterialIcons,SimpleLineIcons} from '@expo/vector-icons';
import constants  from '../constants/Settings.js';
import { Text, TouchableRipple } from 'react-native-paper';
const mainUrl = constants.url;
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import * as actionTypes from '../actions/actionTypes';
import settings from '../constants/Settings';
const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
const SERVER_URL = settings.url
const themeColor = settings.themeColor

class DrawerContent  extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
         login:true,
         first_name:'',
         last_name:'',

         mobile:''
        }
    }

    getUserAsync = async () => {
    const userToken = await AsyncStorage.getItem('userpk');
    const sessionid = await AsyncStorage.getItem('sessionid');
    const csrf = await AsyncStorage.getItem('csrf');
    if(userToken == null){
      AsyncStorage.clear();
      AsyncStorage.setItem("login", JSON.stringify(false))
      this.setState({login:false})
      return
    }
    fetch(SERVER_URL+'/api/HR/users/'+ userToken + '/', {
      headers: {
         "Cookie" :"csrf="+csrf+"; sessionid=" + sessionid +";",
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         'Referer': SERVER_URL,
         'X-CSRFToken': csrf
      }
    }).then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson,'fffffffffff')
         this.setState({userinfo:responseJson,first_name:responseJson.first_name,last_name:responseJson.last_name,mobile:responseJson.username})
      })
      .catch((error) => {
        AsyncStorage.clear();
        AsyncStorage.setItem("login", JSON.stringify(false))
        this.setState({login:false})
        return
      });
    }

    logout = ()=>{
      Alert.alert(
          'Log out',
          'Do you want to logout?',
          [
            {text: 'Cancel', onPress: () => {
              console.log(this.props.navigation);
              // this.props.navigation.

              return null
            }},
            {text: 'Confirm', onPress: () => {
              AsyncStorage.clear();
              AsyncStorage.setItem("login", JSON.stringify(false))
              this.setState({login:false})
              this.getUserAsync()
              // this.props.navigation.setParams({  });

              // this.props.navigation.navigate('Courses',{'login':false})
              this.props.navigation.navigate('LogInScreen')
              // const navigateAction = NavigationActions.navigate({ routeName: 'Courses' });
              // this.props.navigation.closeDrawer();
              // this.props.navigation.dispatch(navigateAction);
              // this.props.navigation.closeDrawer();
            }},
          ],
          { cancelable: false }
        )
    }

    componentDidMount(){
    AsyncStorage.getItem('login').then(login => {
      if(JSON.parse(login) == 'true' || JSON.parse(login) == true){
        this.setState({login:true})
        this.getUserAsync()
      }else{
        AsyncStorage.clear();
        AsyncStorage.setItem("login", JSON.stringify(false))
        this.setState({login:false})
        return
      }
    }).done();

  }

  UNSAFE_componentWillReceiveProps() {
      AsyncStorage.getItem('login').then(userToken => {
        if(userToken == 'true' || userToken == true){
          this.setState({login:true})
          this.getUserAsync()
        }else{
          this.setState({login:false})
        }
      }).done();
    }


    render(){

      return(
        <ScrollView containerStyle={{backgroundColor: '#EF2929'}} showsVerticalScrollIndicator={false}>
            <SafeAreaView style={{backgroundColor: '#EF2929'}} forceInset={{ }}>
                <View style={{height: Constants.statusBarHeight,  backgroundColor: '#EF2929',}}>
                    <StatusBar  translucent={true} barStyle="light-content" networkActivityIndicatorVisible={false}/>
                </View>
                <View style={{backgroundColor: '#EF2929',
                               height: 120,
                               alignItems: 'center',
                               justifyContent: 'center',flexDirection:'row'}}>
                      {/* // <Text style={{color:'#fff',fontSize:22,paddingRight:30}}>General</Text> */}
                      <Image source={require('../assets/images/1.jpg')} style={{height:45,width:45,borderRadius:50,}}/>
                      <View style={{paddingLeft:15}}>
                         <Text style={{color:'#fff',fontSize:16,paddingRight:30}}>{this.state.first_name}</Text>
                         <Text style={{color:'#fff',fontSize:16,paddingRight:30}}>{this.state.mobile}</Text>
                      </View>
                      <Text style={{color:'#fff'}}>Edit</Text>
                      {/* <View style={{position:'absolute',right:20,top:20}}>
                        <TouchableOpacity onPress={()=>{this.props.navigation.closeDrawer();}}>
                            <FontAwesome name={'bars'} size={20} style={{height:20,width:20,tintColor:'#fff'}} color={'#fff'} />
                        </TouchableOpacity>
                      </View> */}
                </View>
                <View style={{minHeight: height-180,backgroundColor:'#fff', alignItems: 'center',}}>
                   <DrawerItems {...this.props}
                         inactiveTintColor={'#b83655'}
                         iconContainerStyle={{color:'#CF4F07',opacity:1}}/>

                    {Platform.OS === 'android' &&
                       <TouchableNativeFeedback
                            centered={true}
                            background={TouchableNativeFeedback.Ripple('grey')}
                            onPress={()=>this.props.navigation.navigate('HomeScreen')}>
                           <View style={{flexDirection: 'row',paddingVertical:20,paddingBottom: 10,
                                         backgroundColor: 'transparent', alignItems: 'center',}}>
                                         <View style={{flex:0.22,justifyContent: 'center',alignItems: 'center',}}>
                                             <Image
                                                 source={require('../assets/images/home.png')} style={{height:22,width:22,tintColor:'#000'}}/>
                                                 {/* <FontAwesome  name={'cutlery'} size={22} color={'#fff'}/> */}
                                         </View>
                               <View style={{flex:0.75,justifyContent: 'center',alignItems: 'flex-start',marginLeft:14}}>
                                   <Text style={{color:'#000',fontWeight:'400',fontSize:16,}} >Home</Text>
                               </View>
                           </View>
                       </TouchableNativeFeedback>}

                    {Platform.OS === 'android' &&
                       <TouchableNativeFeedback
                            centered={true}
                            background={TouchableNativeFeedback.Ripple('grey')}
                            onPress={()=>this.props.navigation.navigate('MyOrder')}>
                           <View style={{flexDirection: 'row',paddingVertical:20,paddingBottom: 10,
                                          backgroundColor:'transparent', alignItems: 'center',}}>
                                <View style={{flex:0.22,justifyContent: 'center',alignItems: 'center',}}>
                                    <Image
                                        source={require('../assets/images/myorders.png')} style={{height:22,width:22,tintColor:'#000'}}/>
                                        {/* <FontAwesome  name={'cutlery'} size={22} color={'#fff'}/> */}
                                </View>
                                <View style={{flex:0.75,justifyContent: 'center',alignItems: 'flex-start',marginLeft:14}}>
                                    <Text style={{color:'#000',fontWeight:'400',fontSize:16}} >My orders</Text>
                                </View>
                         </View>
                     </TouchableNativeFeedback>}

                     {Platform.OS === 'android' &&
                       <TouchableNativeFeedback
                             centered={true}
                             background={TouchableNativeFeedback.Ripple('grey')}
                             onPress={()=>this.props.navigation.navigate('MyWishlist')}>
                             <View style={{flexDirection: 'row',paddingVertical:20,paddingBottom: 10,
                                            backgroundColor: 'transparent', alignItems: 'center',}}>
                                  <View style={{flex:0.22,justifyContent: 'center',alignItems: 'center',}}>
                                      <Image
                                          source={require('../assets/images/heart.png')} style={{height:22,width:22,tintColor:'#000'}}/>
                                          {/* <FontAwesome  name={'list-alt'} size={22} color={'#fff'}/> */}
                                 </View>
                                 <View style={{flex:0.75,justifyContent: 'center',alignItems: 'flex-start',marginLeft:14}}>
                                      <Text style={{color:'#000',fontWeight:'400',fontSize:16}} >My wishlist</Text>
                                </View>
                            </View>
                      </TouchableNativeFeedback>}

                   {Platform.OS === 'android' &&
                     <TouchableNativeFeedback
                           centered={true}
                           background={TouchableNativeFeedback.Ripple('grey')}
                           onPress={()=>this.props.navigation.navigate('MyAddress')}>
                           <View style={{flexDirection: 'row',paddingVertical:20,paddingBottom: 10,
                                          backgroundColor: 'transparent', alignItems: 'center',}}>
                                <View style={{flex:0.22,justifyContent: 'center',alignItems: 'center',}}>
                                    <Image
                                        source={require('../assets/images/nav.png')} style={{height:22,width:22,tintColor:'#000'}}/>
                                        {/* <FontAwesome  name={'list-alt'} size={22} color={'#fff'}/> */}
                               </View>
                               <View style={{flex:0.75,justifyContent: 'center',alignItems: 'flex-start',marginLeft:14}}>
                                    <Text style={{color:'#000',fontWeight:'400',fontSize:16}} >My address</Text>
                              </View>
                          </View>
                    </TouchableNativeFeedback>}

                    {Platform.OS === 'android' &&
                      <TouchableNativeFeedback
                            centered={true}
                            background={TouchableNativeFeedback.Ripple('grey')}
                            onPress={()=>this.props.navigation.navigate('HelpScreen')}>
                            <View style={{flexDirection: 'row',paddingVertical:20,paddingBottom: 10,
                                           backgroundColor: 'transparent', alignItems: 'center',}}>
                                 <View style={{flex:0.22,justifyContent: 'center',alignItems: 'center',}}>
                                     <Image
                                         source={require('../assets/images/Help.png')} style={{height:22,width:22,tintColor:'#000'}}/>
                                         {/* <FontAwesome  name={'list-alt'} size={22} color={'#fff'}/> */}
                                </View>
                                <View style={{flex:0.75,justifyContent: 'center',alignItems: 'flex-start',marginLeft:14}}>
                                     <Text style={{color:'#000',fontWeight:'400',fontSize:16}} >Help</Text>
                               </View>
                           </View>
                     </TouchableNativeFeedback>}

                    {Platform.OS === 'android' &&
                      <TouchableNativeFeedback
                            centered={true}
                            background={TouchableNativeFeedback.Ripple('grey')}
                            onPress={()=>this.props.navigation.navigate('ReferEarn')}>
                            <View style={{flexDirection: 'row',paddingVertical:20,paddingBottom: 10,
                                           backgroundColor: 'transparent', alignItems: 'center',}}>
                                 <View style={{flex:0.22,justifyContent: 'center',alignItems: 'center',}}>
                                     <Image
                                         source={require('../assets/images/referandearn.png')} style={{height:22,width:22,tintColor:'#000'}}/>
                                         {/* <FontAwesome  name={'list-alt'} size={22} color={'#fff'}/> */}
                                </View>
                                <View style={{flex:0.75,justifyContent: 'center',alignItems: 'flex-start',marginLeft:14}}>
                                     <Text style={{color:'#000',fontWeight:'400',fontSize:16}} >Refer and Earn</Text>
                               </View>
                           </View>
                     </TouchableNativeFeedback>}





             </View>
             <View style={{position:'absolute',bottom:150,left:20,flexDirection:'column',
                            justifyContent: 'flex-end',backgroundColor:'#fff',}}>
                 {/* <TouchableOpacity style={{  alignItems: 'center',justifyContent: 'flex-end' ,borderWidth:1,borderColor:'#fff'}}>
                     <Text style={{fontSize:20,color:'#fff',paddingHorizontal:10,paddingVertical:2}}>Kanada</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={{  alignItems: 'center',justifyContent: 'flex-end' ,borderWidth:1,borderColor:'#fff'}}>
                     <Text style={{fontSize:20,color:'#fff',paddingHorizontal:10,paddingVertical:2}}>Kanada</Text>
                 </TouchableOpacity> */}
                  <Text style={{fontSize:18,color:'#fff',paddingHorizontal:0,paddingVertical:2}}>Powered by mAbler</Text>
                  {/* <View style={{  alignItems: 'center',justifyContent: 'flex-end' }}>
                      <Text style={{fontSize:18,color:'#ebebeb'}}>App version {Constants.manifest.version}</Text>
                  </View> */}
                  {Platform.OS === 'android' &&
                     <TouchableNativeFeedback
                           centered={true}
                           background={TouchableNativeFeedback.Ripple('grey')}
                           onPress={()=>{this.logout()}}  >
                          <View style={{flexDirection: 'row',paddingVertical:20,paddingBottom: 10,
                                        backgroundColor: 'transparent', alignItems: 'center',}}>
                               <View style={{flex:0.22,justifyContent: 'center',alignItems: 'center',}}>
                                    <Image
                                        source={require('../assets/images/logout.png')} style={{height:25,width:25,tintColor:'#000'}}/>
                                         {/* // <FontAwesome  name={'qrcode'} size={22} color={'#000'}/>  */}
                               </View>
                             <View style={{flex:0.75,justifyContent: 'center',alignItems: 'flex-start',marginLeft:0}}>
                                 <Text style={{color:'#000',fontWeight:'400',fontSize:16}} >Logout</Text>
                             </View>
                         </View>
                     </TouchableNativeFeedback>}
             </View>
             <View style={{justifyContent: 'flex-end',backgroundColor:'#fff',paddingBottom:150}}>

             </View>




         </SafeAreaView>
     </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar:{
    height:Constants.statusBarHeight,
  }
});

const mapStateToProps =(state) => {
    return {
      counter: state.cartItems.counter,
      cart : state.cartItems.cartItem,
      store:state.cartItems.store
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addTocartFunction:  (args) => dispatch(actions.addToCart(args)),
    decreaseFromCartFunction:  (args) => dispatch(actions.decreaseFromCart(args)),
    increaseCartFunction:  (args) => dispatch(actions.increaseCart(args)),
    setInitialFunction:  (cart,counter) => dispatch(actions.setInitial(cart,counter)),
    emptyCartFunction:()=>dispatch(actions.emptyCart()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);
