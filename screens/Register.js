import React from 'react';
import {
  Image,Platform,
  ScrollView,StyleSheet,
  Text,Button,TextInput,
  TouchableOpacity,View,
  Slider,ImageBackground,
  Dimensions, Alert,StatusBar,
  FlatList, AppState, BackHandler ,
  AsyncStorage,ActivityIndicator,
  ToastAndroid,RefreshControl,TouchableNativeFeedback,TouchableWithoutFeedback,Keyboard,Picker} from 'react-native';
import { createDrawerNavigator,DrawerItems, } from 'react-navigation-drawer';
import { FontAwesome,Entypo,MaterialIcons,Foundation } from '@expo/vector-icons';
import { MonoText } from '../components/StyledText';
import  Constants  from 'expo-constants';
import { withNavigationFocus,DrawerActions ,DrawerNavigator} from 'react-navigation';
import settings from '../constants/Settings.js';
import Toast, {DURATION} from 'react-native-easy-toast';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import * as actionTypes from '../actions/actionTypes';
import { LinearGradient } from 'expo-linear-gradient';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Card } from 'react-native-elements';
import  ModalBox from 'react-native-modalbox';

const { width,height } = Dimensions.get('window');
const SERVER_URL = settings.url
const themeColor = settings.themeColor

const Hours = ['7 AM','8 AM','9 AM','10 AM','11 AM','12 AM','1 PM','2 PM','3 PM','4 PM','5 PM','6 PM','7 PM','8 PM','9 PM','10 PM','11 PM','12 PM',]

const Mode = ['Dine In','Take Away','Both']

class Register extends React.Component {

  static navigationOptions = ({ navigation }) => {
       const { params = {} } = navigation.state
       return {header:null}
  };

  constructor(props) {
    super(props);
    this.state={
      name:'',
      mobile:'',
      restaurentName:'',
      address:'',
      pincode:'',
      fssaiLicense:'',
      openingHours:Hours[0],
      keyboardOffset:0,
      mode:Mode[0],
      about:'',
      keyboardOffset:0,
      keyboardOpen:false,
    }
    Keyboard.addListener('keyboardDidHide',this.keyboardDidHide)
    Keyboard.addListener( 'keyboardDidShow', this.keyboardDidShow)
  }

  keyboardDidShow=(event)=> {
          this.setState({
              keyboardOffset: event.endCoordinates.height+27,
              keyboardOpen:true,
          })
      }

      keyboardDidHide=()=> {
          this.setState({
              keyboardOffset: 27,
              keyboardOpen:false,
          })
    }

renderHeader=()=>{
  return(
    <View style={{flexDirection: 'row',height:55,alignItems: 'center',}}>
       <TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={{ position:'absolute',left:0,top:0,bottom:0, justifyContent: 'center', alignItems: 'center',width:width*0.15,}}>
         <MaterialIcons name={'keyboard-backspace'} size={30} color={'#000'} />
       </TouchableOpacity>
       <View style={{  justifyContent: 'center', alignItems: 'center',position:'absolute',left:width*0.15,top:0,bottom:0,right:width*0.15}}>
         <Text style={{color:'#000',fontWeight:'900',fontSize:22,}} numberOfLines={1}>STORE  REGISTER</Text>
       </View>
 </View>
  )
}


  renderTextInput = (showText,stateData,data)=>{
    return(
      <View style={{marginHorizontal:20,}}>
          <Text style={{color:'#000',fontSize:16,fontWeight:'600',}}>{showText}</Text>
          <TextInput
                   style={{ height: 40,backgroundColor:'#fff',marginTop:5,borderRadius:5,paddingHorizontal:15 }}
                   onChangeText={(text)=>{this.setState({data:text})}}
                   value={stateData}

           />
       </View>
    )
  }


  renderRegister=()=>{
    return(
      <View style={{flexDirection: 'row',width:width,alignItems: 'center',justifyContent:'center',marginVertical:15}}>
         <TouchableOpacity onPress={()=>this.props.navigation.navigate('Main')} style={{ paddingVertical:5,paddingHorizontal:20,borderRadius:10,borderWidth:1,borderColor:'#000'}}>
           <Text style={{color:'#000',fontWeight:'600',fontSize:20,}}>Register</Text>
         </TouchableOpacity>
    </View>
    )
  }



componentDidMount(){}

render() {
    let mode = Mode.map( (s, i) => {
      return <Picker.Item key={i} value={s} label={s}  ></Picker.Item>
    });
    let hours = Hours.map( (s, i) => {
        return <Picker.Item key={i} value={s} label={s}  ></Picker.Item>
    });

    return (
      <View style={{flex:1,backgroundColor:'#f2f2f2'}}>

        <View style={{height:Constants.statusBarHeight,backgroundColor:'#142e5c'}}></View>

        {this.renderHeader()}

        <View style={{flex:1}}>

            <ScrollView contentContainerStyle={{paddingVertical:20,paddingBottom:this.state.keyboardOffset+20}}>

              <View style={{marginHorizontal:20,}}>
                  <Text style={{color:'#000',fontSize:16,fontWeight:'600',}}>Name</Text>
                  <TextInput
                           style={{ height: 40,backgroundColor:'#fff',marginTop:5,borderRadius:5,paddingHorizontal:15 ,fontSize:16,}}
                           onChangeText={(text)=>{this.setState({name:text})}}
                           value={this.state.name}
                           placeholder={'Enter Name'}
                   />
               </View>

              <View style={{marginHorizontal:20,marginTop:15}}>
                  <Text style={{color:'#000',fontSize:16,fontWeight:'600',}}>Mobile</Text>
                  <TextInput
                           style={{ height: 40,backgroundColor:'#fff',marginTop:5,borderRadius:5,paddingHorizontal:15,fontSize:16, }}
                           onChangeText={(text)=>{this.setState({mobile:text})}}
                           value={this.state.mobile} keyboardType={'numeric'}
                           placeholder={'Enter Mobile'}
                   />
               </View>

              <View style={{marginHorizontal:20,marginTop:15}}>
                  <Text style={{color:'#000',fontSize:16,fontWeight:'600',}}>Restaurent Name</Text>
                  <TextInput
                           style={{ height: 40,backgroundColor:'#fff',marginTop:5,borderRadius:5,paddingHorizontal:15,fontSize:16, }}
                           onChangeText={(text)=>{this.setState({restaurentName:text})}}
                           value={this.state.restaurentName}
                           placeholder={'Enter Restaurent Name'}
                   />
               </View>

              <View style={{marginHorizontal:20,marginTop:15}}>
                  <Text style={{color:'#000',fontSize:16,fontWeight:'600',}}>Address</Text>
                  <TextInput
                           style={{ height: 40,backgroundColor:'#fff',marginTop:5,borderRadius:5,paddingHorizontal:15,fontSize:16, }}
                           onChangeText={(text)=>{this.setState({address:text})}}
                           value={this.state.address}
                           placeholder={'Enter Address'}
                   />
               </View>

              <View style={{marginHorizontal:20,marginTop:15}}>
                  <Text style={{color:'#000',fontSize:16,fontWeight:'600',}}>Pincode</Text>
                  <TextInput
                           style={{ height: 40,backgroundColor:'#fff',marginTop:5,borderRadius:5,paddingHorizontal:15,fontSize:16, }}
                           onChangeText={(text)=>{this.setState({pincode:text})}}
                           value={this.state.pincode} keyboardType={'numeric'}
                           placeholder={'Enter Pincode'}
                   />
               </View>

              <View style={{marginHorizontal:20,marginTop:15}}>
                  <Text style={{color:'#000',fontSize:16,fontWeight:'600',}}>Fssai License</Text>
                  <TextInput
                           style={{ height: 40,backgroundColor:'#fff',marginTop:5,borderRadius:5,paddingHorizontal:15,fontSize:16, }}
                           onChangeText={(text)=>{this.setState({fssaiLicense:text})}}
                           value={this.state.fssaiLicense} keyboardType={'numeric'}
                           placeholder={'Enter Fssai License'}
                   />
               </View>

              <View style={{marginHorizontal:20,marginTop:15}}>
                  <Text style={{color:'#000',fontSize:16,fontWeight:'600',}}>Openning Hours</Text>
                  <View style={{backgroundColor:'#fff',marginTop:5,fontSize:16,borderRadius:5}}>
                    <Picker
                       selectedValue={this.state.openingHours}
                       mode="dropdown"
                       style={{ flex:1,height:40, width:'100%'}}
                       onValueChange={(itemValue, itemIndex)=>this.setState({openingHours:itemValue})}>
                       {hours}
                     </Picker>
                   </View>
               </View>

              <View style={{marginHorizontal:20,marginTop:15}}>
                  <Text style={{color:'#000',fontSize:16,fontWeight:'600',}}>Mode</Text>
                  <View style={{backgroundColor:'#fff',marginTop:5,fontSize:16,borderRadius:5}}>
                    <Picker
                       selectedValue={this.state.mode}
                       mode="dropdown"
                       style={{ flex:1,height:40, width:'100%'}}
                       onValueChange={(itemValue, itemIndex)=>this.setState({mode:itemValue})}>
                       {mode}
                     </Picker>
                  </View>
               </View>

               <View style={{marginHorizontal:20,marginTop:15}}>
                   <Text style={{color:'#000',fontSize:16,fontWeight:'600',}}>About</Text>
                   <TextInput
                            style={{ height: 40,backgroundColor:'#fff',marginTop:5,borderRadius:5,paddingHorizontal:15,fontSize:16,height:100,textAlignVertical:'top',paddingVertical:5 }}
                            onChangeText={(text)=>{this.setState({about:text})}} numberOfLines={3}
                            value={this.state.about} multiline={true}
                            placeholder={'About'}
                    />
                </View>
                <View style={{marginTOp:5}}>
                  {this.renderRegister()}
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

});

const mapStateToProps =(state) => {
    return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
