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
const filter=[
  {
    year:'1',
    price:'5530',
    free:'3',
  },
  {
    year:'2',
    price:'8530',
    free:'6',
  },
  {
    year:'3',
    price:'11500',
    free:'9',
  },
  {
    year:'4',
    price:'5530',
    free:'9',
  },
]
class OrderPlaced extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {header:null}
  };

  constructor(props) {
    super(props);
    var item = props.navigation.getParam('item',null)
    this.state={
      item:item,
      filter:filter,
      AnimatedValue:new Animated.Value(0),
      show:false,
      underlay:false,
      // items:items,
      selectedindex:0,
      // selected:items[0],
      selectdImgTab:0,
      scrollX : new Animated.Value(0),
      count:0,
      selected: true
    }
      willFocus = props.navigation.addListener(
       'didFocus',
        payload => {
          }
     );
    }

    orderDetails=()=>{
      return(
        <View style={[styles.shadow,{borderTopWidth:0,borderBottomWidth:0,padding:15}]}>
        <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
          <Text style={{fontSize:16,textAlign:'left'}}>Order id: #101</Text>
          <Text style={{fontSize:16,color:'#7c7c7c',fontWeight:'400'}}>Completed</Text>
        </View>
          {/* <View style={{borderWidth:0.2}}/> */}
          <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
            <Text style={{fontSize:12,textAlign:'left'}}>Total price</Text>
            <Text style={{fontSize:16,color:'#000',fontWeight:'400'}}>&#8377; 350</Text>
          </View>
          <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
            <Text style={{fontSize:12,textAlign:'left'}}>Service charge</Text>
            <Text style={{fontSize:16,color:'#000',fontWeight:'400'}}>&#8377; 350</Text>
          </View>
          <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
            <Text style={{fontSize:12,textAlign:'left'}}>Coupon discount</Text>
            <Text style={{fontSize:12,color:'red',fontWeight:'400'}}>APPLY</Text>
          </View>
          <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
            <Text style={{fontSize:12,textAlign:'left'}}>Amount payable</Text>
            <Text style={{fontSize:16,color:'#000',fontWeight:'400'}}>&#8377; 700</Text>
          </View>
          <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
            <Text style={{fontSize:12,textAlign:'left'}}>Total</Text>
            <Text style={{fontSize:16,color:'#000',fontWeight:'400'}}>&#8377; 20,500</Text>
          </View>
          <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
            <Text style={{fontSize:12,textAlign:'left'}}>Payment type</Text>
            <Text style={{fontSize:16,color:'#000',fontWeight:'400'}}>Cash</Text>
          </View>
        </View>
      )
    }

    gstInVoice=()=>{
      return(
        <View style={[styles.shadow,{borderTopWidth:0,borderBottomWidth:0,padding:15}]}>
          <Text style={{fontSize:16,color:'#000',fontWeight:'400',paddingBottom:10}}>GST invoice (optional)</Text>
          {/* <View style={{borderWidth:0.2}}/> */}
          <TextInput style={{paddingVertical:10,borderWidth:0.5,borderRadius:12,marginTop:10,paddingHorizontal:10}}
            value={this.state.gst}
            onChangeText={(gst)=>{this.setState({gst})}}>
          </TextInput>
        </View>
      )
    }
    onSelect = data => {
        this.setState(data);
      };
    address=()=>{
      return(

            <View style={[styles.shadow,{borderTopWidth:0,borderBottomWidth:0,padding:15}]}>
              <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <View style={{flexDirection:'row'}}>
                <Image source={require('../assets/images/location.png')} style={{height:20,width:20,marginRight:15}}resizeMode={'contain'}/>
                <Text style={{fontSize:16,color:'#000',fontWeight:'400',paddingBottom:10}}>Address</Text>
              </View>
    
            </View>


              {this.state.selected==true?<View >
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{color:'#000',fontSize:14,textAlign:'left',fontWeight:'600'}}>Shipping address</Text>
                </View>
                <View>
                  <Text style={{color:'#4f4f4f',fontSize:12,textAlign:'left',paddingTop:8}}>Naveen kumar,10th cross street,jayanagar 4th block,Bengaluru-560068</Text>
                </View>

              </View>:<Text style={{textAlign:'center',fontSize:12,marginVertical:width*0.06}}>Tap here to set the Address</Text>}
            </View>

      )
    }

    items=()=>{
      return(
        <View style={[styles.shadow,{borderTopWidth:0,borderBottomWidth:0,padding:15}]}>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <Text style={{fontSize:16,color:'#000',fontWeight:'400',paddingBottom:10}}>Items</Text>
        </View>


        <View style={{height:width*0.15,borderWidth:0,flexDirection:'row',margin:0,padding:10,backgroundColor:'transparent',borderRadius:0}}>
          <View style={{flex:0.3,borderWidth:0 ,backgroundColor:'transparent',}}>
            <Image source={require('../assets/images/ag_marvel_image.jpg')} style={{height:'100%',width:'100%'}}/>
          </View>
          <View style={{flex:0.5,borderWidth:0,paddingHorizontal:4}}>
            <Text style={{color:'#000',fontSize:14,textAlign:'left',}}>Automatic ABS plastic </Text>
            <Text style={{color:'#000',fontSize:14,textAlign:'left',}}>Eutoriia Water purifier </Text>
          </View>
          <View style={{flex:0.2,borderWidth:0}}>
            <Text style={{position:'absolute',top:0,right:0,color:'#000',fontSize:12,textAlign:'right',textDecorationStyle: 'solid',justifyContent:'flex-end'}}>Qty 1</Text>
          </View>
        </View>
        </View>
      )
    }


    payNow=()=>{
     return(
       <Modal isVisible={this.state.model} animationIn="fadeIn" animationOut="fadeOut" hasBackdrop={true} backdropColor={'#3b3b3b'} >
             <View style={[
                   {borderRadius:17,backgroundColor:'#fff',justifyContent:'center',
                   alignSelf:'center',padding:width*0.06,backdropColor:'#fff',borderWidth:0,height:width*0.6}]}>
                   <View style={{alignItems:'center',borderWidth:0,alignSelf:'center',padding:6,width:'100%',height:'100%'}}>
                       <Text  style={{fontSize:14,color:'#000',fontWeight:'490',textAlign:'center'}}>Select your mode of payment</Text>
                       <View style={{flexDirection:'row',borderWidth:0,marginVertical:10,paddingHorizontal:10,paddingVertical:10,alignItems:'center',justifyContent:'space-between'}}>
                         <Image source={require('../assets/images/select.png')} style={{height:22,width:22,marginRight:10}}/>
                         <Image source={require('../assets/images/payonline.png')} style={{height:22,width:22,marginRight:10}}/>
                         <View>
                           <Text style={{fontSize:12,color:'#000'}}>Pay Online</Text>
                           <Text style={{fontSize:10,color:'#2d2d2d'}}>Use Netbanking,Debit Card/Creadit Card</Text>
                         </View>
                       </View>
                       <View style={{flexDirection:'row',borderWidth:0,marginVertical:10,paddingHorizontal:10,paddingVertical:10,alignItems:'center',justifyContent:'space-between'}}>
                         <Image source={require('../assets/images/select.png')} style={{height:22,width:22,marginRight:10}}/>
                         <Image source={require('../assets/images/cashinhand.png')} style={{height:22,width:22,marginRight:10}}/>
                         <View>
                           <Text style={{fontSize:12,color:'#000'}}>Cash in hand</Text>
                           <Text style={{fontSize:10,color:'#2d2d2d'}}>Pay by Cash / Cash when product arrives</Text>
                         </View>
                       </View>
                       <View style={{borderWidth:0.5,width:width*0.7}}/>
                       <View style={{paddingHorizontal:0,flexDirection:'row',borderWidth:0,justifyContent:'flex-end',alignSelf:'flex-end'}}>
                           <TouchableOpacity  onPress={()=>{this.setState({model:false})}}
                               style={{borderRadius:17,paddingHorizontal:10,paddingVertical:6,alignSelf:'flex-start',marginRight:0}}>
                               <Text  style={{fontSize:12,color:'#000',fontWeight:'600',alignSelf:'center',}}>CANCEL</Text>
                           </TouchableOpacity>
                           <TouchableOpacity onPress={()=>{this.setState({model:false});this.props.navigation.navigate('OrderPlaced')}}
                             style={{borderRadius:17,paddingHorizontal:10,paddingVertical:6,alignSelf:'flex-end',marginLeft:0,}}>
                               <Text  style={{fontSize:12,color:'#EF2929',fontWeight:'600',alignSelf:'center',}}>PLACE ORDER</Text>
                           </TouchableOpacity>
                       </View>
               </View>
               </View>
         </Modal>
     )
   }
   pay=()=>{
     if(this.state.selected==true){
       this.setState({model:true})
     }else{
        this.refs.toast.show('please set the address');

     }
   }

  render(){
  // const item=this.props.navigation.onGoBack()
  const filter=this.props.navigation.getParam('item',null)
    return (
      <View style={[{flex:1,backgroundColor:'#f5f5f5',}]}>
            <View style={{height:Constants.statusBarHeight,backgroundColor:'#EF2929'}}>
                <StatusBar  translucent={true} barStyle="dark-content" backgroundColor={'#EF2929'} networkActivityIndicatorVisible={false}    />
            </View>
                    <Toast style={{backgroundColor: '#7e7e7e'}} textStyle={{color: '#fff'}} ref="toast" position = 'bottom'/>
            <View style={{height:width*0.17,backgroundColor:'#EF2929',width:width,alignItems:'center',padding:0}}>
                <View style={{paddingVertical:10,width:width*0.93}}>
                    <View style={{flexDirection:'row',alignItems:'center',}}>
                        <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                          <Ionicons name={'md-arrow-back'} style={{tintColor:'#fff',paddingTop:10}} size={22} color={'#fff'}/>
                        </TouchableOpacity>
                        {/* <Image source={require('../assets/images/navigate.png')} style={{height:25,width:25,marginTop:10}}/> */}
                        <Text style={{color:'#fff',fontSize:18,fontWeight:'400',paddingHorizontal:10,paddingTop:15,paddingLeft:width*0.15}}>Order placed successfully</Text>
                    </View>
                </View>
            </View>
            {/* <View style={[styles.shadow,{height:width*0.17,backgroundColor:'#fff',width:width,alignItems:'center',padding:0,
              borderBottomWidth:0.2,borderColor:'#adadad'}]}>
                <View style={{paddingVertical:5,width:width*0.93}}>
                    <View style={{flexDirection:'row',alignItems:'center',}}>
                        <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                          <Image source={require('../assets/images/info.png')} style={{height:22,width:22,paddingTop:10,marginLeft:10}}/>
                        </TouchableOpacity>
                        {/* <Image source={require('../assets/images/navigate.png')} style={{height:25,width:25,marginTop:10}}/> */}
                        {/*<Text style={{color:'#000',fontSize:13,fontWeight:'400',paddingHorizontal:10,paddingRight:width*0.1,paddingTop:15,paddingLeft:width*0.06}}numberOfLines={2}>User buying filter with AMC's get 50% offer on other parts replacement</Text>
                    </View>
                </View>
            </View> */}

            <ScrollView style={[{flex:1}]}>
              {this.orderDetails()}
              {/* // {this.gstInVoice()} */}
              {this.address()}
              {this.items()}
              <View style={{height:150}}/>
            </ScrollView>
            <View style={{position:'absolute',left:0,right:0,bottom:-2,backgroundColor:'#033285'}}>
              <TouchableOpacity onPress={()=>{this.props.navigation.navigate('MyOrder')}} style={{alignSelf:'center',justifyContent:'center',borderTopWidth:0.5,backgroundColor:'#033285s',borderColor:'gray'}}>
                <Text style={{color:'#fff',paddingVertical:15,fontSize:16,textAlign:'center'}}>Go to My orders</Text>
              </TouchableOpacity>
            </View>
            {this.payNow()}
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

export default connect(mapStateToProps, mapDispatchToProps)(OrderPlaced);
