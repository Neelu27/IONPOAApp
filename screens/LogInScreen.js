import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Slider,
  Dimensions,ImageBackground,
  TextInput, FlatList, AsyncStorage, Alert, Linking, PermissionsAndroid, ToastAndroid,ActivityIndicator
} from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast';
import { FontAwesome,MaterialIcons ,Feather} from '@expo/vector-icons';
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
import FloatingInput from '../components/FloatingInput';
import { LinearGradient } from 'expo-linear-gradient';
class LogInScreen extends React.Component {

  static navigationOptions = {
    header:null,
  }


  constructor(props) {
    super(props);
    this.state = {
      mobile:'',
      username:'',
      OTP:''
    }
  }


  getOtp() {
    if(this.state.mobile == undefined){
      ToastAndroid.show('Mobile no was incorrect ');
    }
    else{
      var data = new FormData();
      data.append( "mobile", this.state.mobile );
      console.log(SERVER_URL + '/api/homepage/registration/');
      fetch( SERVER_URL + '/api/homepage/registration/', {
        method: 'POST',
        body: data
      }).then((response)=>{
        if(response.status == 200 || response.status==201 ){
          var d = response.json()
          return d
        }else{
          ToastAndroid.show('Mobile No Already register with user ');
        }
      })
      .then((responseJson) => {
        this.setState({ userPk: responseJson.pk,token:responseJson.token,mobile:responseJson.mobile,username:this.state.mobile });
        AsyncStorage.setItem("userpk", responseJson.pk + '')
        this.props.navigation.navigate('OtpScreen',{
          username:this.state.mobileNo,
          screen:'',
          userPk:responseJson.pk,
          token:responseJson.token,
          mobile:responseJson.mobile,
          csrf:responseJson.csrf,
          mobileOTP:'',
        });
      })
      .catch((error) => {
        return
      });
    }
  }


  logIn=async()=>{
    var mob = /^[1-9]{1}[0-9]{9}$/;
    if (this.state.mobile == undefined || mob.test(this.state.mobile) == false) {
      ToastAndroid.show('Enter Correct Mobile No');
    }
    else {
      var data = new FormData();
      data.append("id", this.state.mobile);
      console.log(this.state.mobile)
      fetch(SERVER_URL + '/generateOTP/', {
        method: 'POST',
        body: data,
          // headers: {
          //    'Content-Type': 'multipart/form-data',
          //    'Accept': 'application/json',
          //    'Referer': SERVER_URL
          //  },
      })
      .then((response) => {
        console.log(response.status,'status')
        if (response.status == 200) {
          this.setState({ username: this.state.mobile })
          return response.json()
        }
      })
      .then((responseJson) => {
        console.log(responseJson,'lllllllll');
        if (responseJson == undefined){
          // this.getOtp()
        }else{
        // ToastAndroid.show('OTP request sent.');
          this.setState({ OTP: responseJson })
          this.props.navigation.navigate('OtpScreen',{
            screen:'LogInScreen',
            username:this.state.mobile,
          });
          return
        }
      })
      .catch((error) => {
        return
      });
    }
  }
//this.logIn();
  renderLogin=()=>{
    return(
      <View style={{alignItems: 'center',justifyContent:'center',marginBottom:15,}}>
       <TouchableOpacity onPress={()=>{this.logIn()}} style={{ borderRadius:13,borderWidth:1,borderColor:'#EF2929',height:45,alignItems:'center',justifyContent:'center',marginHorizontal:20,backgroundColor:'#EF2929',alignSelf:'center'}}>
         <Text style={{color:'#fff',fontWeight:'400',fontSize:18,paddingHorizontal:width*0.15}}>SEND OTP</Text>
       </TouchableOpacity>
    </View>
    )
  }

  renderHeader=()=>{
    return(
      <View style={{flexDirection: 'row',height:55,alignItems: 'center',}}>
         <TouchableOpacity onPress={()=>this.props.navigation.navigate('Home')}
           style={{ position:'absolute',left:0,top:0,bottom:0, justifyContent: 'center', alignItems: 'center',width:width*0.15,}}>
           <MaterialIcons name={'keyboard-backspace'} size={30} color={'#000'} />
         </TouchableOpacity>
      </View>
    )
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={{flex:1,backgroundColor:'#f2f2f2'}}>
        <View style={{height:Constants.statusBarHeight,backgroundColor:themeColor}}></View>
        {/* {this.renderHeader()} */}
        <View style={{flex:1}}>
            <ScrollView contentContainerStyle={{paddingVertical:20,paddingBottom:20}}>
                <View style={{height:height*0.3,alignItems:'center',justifyContent:'center',backgroundColor:'transparent'}}>
                    <Image source={require('../assets/images/forbes.jpeg')} style={{height:width*0.2,width:width*0.4}}resizeMode={'contain'}/>
                </View>
                <View style={{marginHorizontal:20,marginBottom:15}}>
                    <Text style={{textAlign:'center',fontSize:20,color:'#000',marginBottom:50,fontWeight:'700'}}>Login</Text>
                    <TouchableOpacity onPress={()=>this.mobileRef.focus()}
                        activeOpacity={1.0}
                        style={[styles.inputStyle,{borderRadius: 3,borderBottomWidth: 1,borderColor: '#717171',}]}>
                        <View style={{flex:0.15,alignItems: 'center',
                                            justifyContent: 'center',borderTopLeftRadius:3,borderBottomLeftRadius: 3,
                                            borderRightWidth:0,borderColor:'grey'}}>
                          <Feather name={'phone'} size={20} color={'#EF2929'}/>
                        </View>
                        <View style={{flex:0.85,alignItems: 'center',
                                      justifyContent: 'center',height:'100%',
                                      paddingHorizontal: 10, paddingVertical: 3}}>
                           <FloatingInput
                             label="Mobile"
                             value={this.state.mobile}
                             onChangeText={text => this.setState({mobile:text})}
                             outputRange = {'#a2a2a2'}
                             passWord={false}
                             email={false}
                             type={false}
                             onRef={(ref) =>{this.mobileRef = ref}}
                           />
                      </View>
                    </TouchableOpacity>
                    <View style={{flexDirection:'row',justifyContent:'center'}}>
                        <Text style={{textAlign:'center',fontSize:14,color:'#000',
                                      marginVertical:20,fontWeight:'600'}}>Are you a new user?</Text>
                        <TouchableOpacity  onPress={()=>this.props.navigation.navigate('RegisterV2')}>
                           <Text style={{textAlign:'center',fontSize:14,color:'#EF2929',marginVertical:20,fontWeight:'600'}}> REGISTER</Text>
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LogInScreen);
