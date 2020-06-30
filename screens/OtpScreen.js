import React from 'react';
import {
  ActivityIndicator,
  Image,Platform,
  ScrollView,StyleSheet,
  Text,ToastAndroid,
  TouchableOpacity,
  View,PermissionsAndroid,
  Slider,Alert, Linking,
  Dimensions,ImageBackground,
  TextInput, FlatList, AsyncStorage,
} from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast';
import { FontAwesome,MaterialIcons } from '@expo/vector-icons';
import { MonoText } from '../components/StyledText';
import  Constants  from 'expo-constants';
import SmsListener from 'react-native-android-sms-listener'
import * as Expo from 'expo';
import * as Permissions from 'expo-permissions';
import * as Google from 'expo-google-app-auth';
import * as Facebook from 'expo-facebook';
import settings from '../constants/Settings.js';
const { width ,height} = Dimensions.get('window');
const SERVER_URL = settings.url
const themeColor = settings.themeColor
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import * as actionTypes from '../actions/actionTypes';
import Floating from '../components/Floating';
import FloatingInput from '../components/FloatingInput';
import { LinearGradient } from 'expo-linear-gradient';
import { createBottomTabNavigator,createAppContainer,createSwitchNavigator,NavigationActions } from 'react-navigation';

class OtpScreen extends React.Component {

  static navigationOptions = {
    header:null,
  }

  constructor(props) {
    super(props);
    this.state = {
      username:'',
      otp:'',
      needOTP:true,
      text:'',
      screen:'',
      mobileNo:'',
      checked:true,
      csrf:null,
      sessionid:null,
      loadingVisible:false,
       otp:[],
    }
    this.otpTextInput = []
  }


  componentDidMount=()=>{
    var screen = this.props.navigation.getParam('screen',null)
    var username = this.props.navigation.getParam('username',null)
    var userPk = this.props.navigation.getParam('userPk',null)
    var token = this.props.navigation.getParam('token',null)
    var mobile = this.props.navigation.getParam('mobile',null)
    var csrf = this.props.navigation.getParam('csrf',null)
    console.log(this.state.cartItems,'ghjjjjjjjjj');
    if(screen == 'LogInScreen'){
        this.setState({text:'Login',screen:'login',username:username})
    }else{
        this.setState({text:'Register',screen:'register',username:username,mobileNo:username})
        this.setState({userPk: userPk,token:token,mobile:mobile,mobileNo:username,csrf:csrf})
    }
  }

  resend=()=>{
    console.log('ffffffffffffffffffffffffffffffff')
    var data = new FormData();
    data.append("id", this.state.username);
    fetch(SERVER_URL + '/generateOTP/', {
      method: 'POST',
      body: data
    })
    .then((response) => {
      if (response.status == 200) {
        this.setState({ username: this.state.username })
        this.setState({ needOTP: true })
        return response.json()
      }
    })
    .then((responseJson) => {
      if (responseJson == undefined){
      }else{
        return
      }
    })
    .catch((error) => {
      ToastAndroid.show(error.toString());
      return
    });
    // }else{
    //   var data = new FormData();
    //   data.append( "mobile", this.state.username );
    //   fetch( SERVER_URL + '/api/homepage/registration/', {
    //     method: 'POST',
    //     body: data
    //   })
    //   .then((response) =>{
    //     if(response.status == 200 || response.status==201 ){
    //       var d = response.json()
    //       this.setState({ needOTP: true })
    //       return d
    //     }else{
    //
    //     }
    //   })
    //   .then((responseJson) => {
    //     this.setState({ userPk: responseJson.pk,token:responseJson.token,mobile:responseJson.mobile,username:this.state.mobileNo })
    //   })
    //   .catch((error) => {
    //     return
    //   });
    // }
  }

  verify=() =>{
    var otp = this.state.otp.join('')
    if(otp.length < 4){
      // this.refs.toast.show('Enter 4 digits OTP');
      return
    }
    this.setState({loadingVisible:true})
    var data = new FormData();
    data.append("username", this.state.username);
    data.append("otp", otp);
    console.log(data)
    fetch(SERVER_URL + '/login/?otpMode=True&mode=api', {
      method: 'POST',
      body: data,
    })
    .then((response) => {
      this.setState({loadingVisible:false})
      if (response.status == 200) {
        var sessionid = response.headers.get('set-cookie').split('sessionid=')[1].split(';')[0]
        this.setState({ sessionid: sessionid })
        AsyncStorage.setItem("sessionid", sessionid)
       return response.json()
      }
      Alert.alert('hhhhhhhhhhhhhhhhhhhh');
    })
    .then((responseJson) => {
      console.log(responseJson)
      var csrf = responseJson.csrf_token
      var url = SERVER_URL
      AsyncStorage.setItem("SERVER_URL", SERVER_URL)
      AsyncStorage.setItem("csrf", responseJson.csrf_token)
      AsyncStorage.setItem("user_name", JSON.stringify(this.state.username))
      AsyncStorage.setItem("userpk", JSON.stringify(responseJson.pk))
      AsyncStorage.setItem("login", JSON.stringify(true))
      this.props.navigation.navigate('HomeScreen')
    })
    .catch((error) => {
      this.setState({loadingVisible:false})
    });
  }


  renderLogin=()=>{
    return(
      <View style={{alignItems: 'center',justifyContent:'center',marginBottom:15,}}>
        <TouchableOpacity onPress={()=>this.verify()} style={{ borderRadius:13,borderWidth:1,borderColor:'#EF2929',height:45,alignItems:'center',justifyContent:'center',marginHorizontal:20,backgroundColor:'#EF2929',alignSelf:'center'}}>
          <Text style={{color:'#fff',fontWeight:'700',fontSize:20,paddingHorizontal:width*0.15}}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderHeader=()=>{
    return(
      <View style={{flexDirection: 'row',height:55,alignItems: 'center',}}>
        <TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={{ position:'absolute',left:0,top:0,bottom:0, justifyContent: 'center', alignItems: 'center',width:width*0.15,}}>
          <MaterialIcons name={'keyboard-backspace'} size={30} color={'#000'} />
        </TouchableOpacity>
      </View>
    )
  }

  focusPrevious=(key, index)=>{
    if (key === 'Backspace' && index !== 0)
      this.otpTextInput[index - 1].focus();
  }

  focusNext=(index, value)=>{
    if (index < this.otpTextInput.length - 1 && value) {
      this.otpTextInput[index + 1].focus();
    }
    if (index === this.otpTextInput.length - 1) {
      this.otpTextInput[index].blur();
    }
    const otp = this.state.otp;
    otp[index] = value;
    this.setState({ otp });
    console.log(this.state.otp,'ggggggggg');
    // this.props.getOtp(otp.join(''));
  }

  renderInputs=()=>{
    const inputs = Array(4).fill(0);
    const txt = inputs.map(
      (i, j) => <View key={j} style={{paddingHorizontal:10}}>
          <TextInput
            style={[ { borderWidth:1,height:40,width:40,borderRadius:0,backgroundColor:'#fff',borderRadius:7}]}
            keyboardType="numeric"
            selectionColor={'#ffffff'}
            textAlign={'center'}
            maxLength={1}
            onChangeText={v => this.focusNext(j, v)}
            onKeyPress={e => this.focusPrevious(e.nativeEvent.key, j)}
            ref={input => { this.otpTextInput[j] = input}}
          />
        </View>
    );
    return txt;
  }

 render() {
   const { navigation } = this.props;
   return (
     <View style={{flex:1,backgroundColor:'#f2f2f2'}}>
       <View style={{height:Constants.statusBarHeight,backgroundColor:themeColor}}></View>
       {this.renderHeader()}
       <View style={{flex:1}}>
           <ScrollView contentContainerStyle={{paddingVertical:20,paddingBottom:20}}>
              <View style={{height:height*0.3,alignItems:'center',justifyContent:'center'}}>
                <Image source={require('../assets/images/forbes.jpeg')} style={{height:width*0.2,width:width*0.4}}resizeMode={'contain'}/>
              </View>
              <View style={{marginHorizontal:20,marginBottom:15}}>
                    <Text style={{textAlign:'center',fontSize:20,color:'#000',marginBottom:40,fontWeight:'600'}}>Enter OTP</Text>
                    <Text style={{textAlign:'center',fontSize:16,color:'#747474',marginBottom:0,fontWeight:'400'}}>OTP has been sent to mobile</Text>
                    <Text style={{textAlign:'center',fontSize:16,color:'#747474',marginBottom:20,fontWeight:'400'}}>no +{this.state.username}</Text>
                    <View style={{borderWidth:0,width:width*0.6,alignSelf:'center',
                                  flexDirection:'row',justifyContent:'space-between',marginTop:20}}>
                         {this.renderInputs()}
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'center'}}>
                        <Text style={{textAlign:'center',fontSize:14,color:'#000',marginVertical:20,fontWeight:'600'}}>You still dint recieve the OTP?</Text>
                        <TouchableOpacity onPress={()=>this.resend()}>
                          <Text style={{textAlign:'center',fontSize:14,color:'#EF2929',marginVertical:20,fontWeight:'600'}}> RESEND</Text>
                        </TouchableOpacity>
                    </View>
              </View>
              <View style={{alignItems:'center',justifyContent:'center',marginTop:10}}>
                 {this.renderLogin()}
              </View>
           </ScrollView>
       </View>
     </View>
   );
 }
}

//   render() {
//     const { navigation } = this.props;
//
//     return (
//       <View style={{flex:1,backgroundColor:'#f2f2f2'}}>
//
//         <View style={{height:Constants.statusBarHeight,backgroundColor:themeColor}}></View>
//
//
//         <View style={{flex:1}}>
//
//             <ScrollView contentContainerStyle={{paddingBottom:20}}>
//
//               {this.renderHeader()}
//
//               <Text style={{color:'#000',fontSize: 22,fontWeight:'700', marginTop: 15,marginHorizontal:20}}>Hi! </Text>
//               <Text style={{color:'grey',fontSize: 22,fontWeight:'700',marginHorizontal:20}}>{this.state.username}</Text>
//
//
//                <View style={{marginHorizontal:20,marginBottom:15,marginTop:100}}>
//                  {/*<Text style={{color:'#000',fontSize:16,fontWeight:'600',marginBottom:10}}>Enter OTP</Text>*/}
//                  <TouchableOpacity onPress={()=>this.otpRef.focus()} activeOpacity={1.0} style={[styles.inputStyle,{borderRadius: 5,borderTopWidth: 1,borderTopColor: '#f2f2f2',backgroundColor:'#f2f2f2',borderBottomWidth:2,borderColor:themeColor}]}>
//
//                    <View style={{flex:1,alignItems: 'center',justifyContent: 'center',marginHorizontal:5,height:'100%'}}>
//                      <Floating
//                        label="Enter OTP"
//                        value={this.state.otp}
//                        onChangeText={text => this.setState({otp:text})}
//                        outputRange = {'#a2a2a2'}
//                        passWord={false}
//                        email={false}
//                        type={false}
//                        onRef={(ref) =>{this.otpRef = ref}}
//                      />
//                   </View>
//                  </TouchableOpacity>
//                </View>
//                {/*<View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
//                     <Text style={{textAlign:'center',fontSize:18,color:'#525353'}}>New store?</Text>
//                     <TouchableOpacity  onPress={()=>this.props.navigation.navigate('Register')}>
//                       <Text style={{textAlign:'center',fontSize:20,paddingHorizontal:6,fontWeight:'600'}}>Register</Text>
//                     </TouchableOpacity>
//               </View>*/}
//
//               <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:10}}>
//                 {this.renderVerify()}
//               </View>
//
//
//             </ScrollView>
//
//         </View>
//
//       </View>
//     );
//   }
// }



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',

  },
  inputStyle:{
  height: 50,
  width:'100%',
  borderRadius:5,
  paddingHorizontal: 5,
  paddingVertical: 5,
  fontSize: 16,
  flexDirection: 'row',
},
shadow: {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 3,
},
});

const mapStateToProps =(state) => {
    return {
    // counter: state.cartItems.counter,
    // cart : state.cartItems.cartItem,
    // store:state.cartItems.store
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // addTocartFunction:  (args) => dispatch(actions.addToCart(args)),
    // decreaseFromCartFunction:  (args) => dispatch(actions.decreaseFromCart(args)),
    // increaseCartFunction:  (args) => dispatch(actions.increaseCart(args)),
    // setInitialFunction:  (cart,counter) => dispatch(actions.setInitial(cart,counter)),
    // emptyCartFunction:()=>dispatch(actions.emptyCart()),


  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OtpScreen);

//
// <View style={{flex:0.1,alignItems: 'center',justifyContent: 'center'}}>
//  <FontAwesome name="mobile" size={30} color='grey'  />
// </View>
