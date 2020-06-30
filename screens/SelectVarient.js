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

class SelectVarient extends React.Component {

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

myOrder=()=>{
  return(
    <View>
      <View style={[styles.shadow,{height:width*0.25,borderWidth:0,justifyContent:'center',flexDirection:'row',margin:0,padding:10,backgroundColor:'#fff',borderRadius:0}]}>
        <View style={{flex:0.4,borderWidth:0}}>
          <Image source={require('../assets/images/ag_marvel_image.jpg')} style={{height:'100%',width:'100%'}}/>
        </View>
        <View style={{borderWidth:0,paddingHorizontal:4,alignSelf:'center',justifyContent:'center'}}>
          <Text style={{color:'#000',fontSize:14,textAlign:'left',}}>Automatic ABS plastic </Text>
          <Text style={{color:'#000',fontSize:14,textAlign:'left',}}>Eutoriia Water purifier </Text>

          {/* <Text style={{color:'#9e9e9e',fontSize:14,textAlign:'left',textDecorationStyle: 'solid',paddingTop:20}}>Order id:#101</Text> */}
          <View style={{flexDirection:'row',alignItems:'center',paddingTop:10}}>
              <Text style={{color:'#000',fontSize:14,textAlign:'left',textDecorationStyle: 'solid',paddingTop:4}}>&#8377; 20,000</Text>
              <Text style={{color:'#9e9e9e',fontSize:12,textAlign:'left',textDecorationLine: 'line-through', textDecorationStyle: 'solid',paddingTop:4,paddingLeft:6}}>&#8377; 21,000</Text>
          </View>

        </View>
        {/* <View style={{flex:0.2,borderWidth:0}}>
          <Text style={{position:'absolute',top:0,right:0,color:'#9e9e9e',fontSize:12,textAlign:'right',textDecorationStyle: 'solid',justifyContent:'flex-end'}}>completed</Text>
          <Text style={{position:'absolute',bottom:0,right:0,color:'#EF2929',fontSize:12,textAlign:'right',textDecorationStyle: 'solid',justifyContent:'flex-end'}}>Remove</Text>
        </View> */}
      </View>
    </View>
  )
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

varient=()=>{
  return(
    <View>
      <View style={[styles.shadow,{borderWidth:0,margin:0,padding:10,backgroundColor:'#fff',borderRadius:0,marginTop:10}]}>
          <View style={{flexDirection:'row',borderWidth:0,justifyContent:'space-between',paddingHorizontal:10}}>
            <Text style={{fontSize:16,fontWeight:'400',color:'#000'}}>Variant(in liters)</Text>
            <Text style={{fontSize:16,fontWeight:'400',color:'#000'}}>Set Quantity</Text>
          </View>
          <View style={{flexDirection:'row',borderWidth:0,justifyContent:'space-between',marginVertical:15,paddingHorizontal:10}}>
            <Text style={{fontSize:16,fontWeight:'400'}}>12 L</Text>
            <View style={{borderWidth:0,flexDirection:'row',justifyContent:'space-between',paddingHorizontal:4}}>
                <TouchableOpacity style={{borderWidth:0.5,borderColor:'#000',paddingHorizontal:4}}
                  onPress={()=>{this.minus()}}>
                  <Text style={{fontSize:14,paddingHorizontal:1}}>-</Text></TouchableOpacity>
                <Text style={{fontSize:16,fontWeight:'400',paddingHorizontal:10}}>{this.state.count}</Text>
                <TouchableOpacity style={{borderWidth:0.5,paddingHorizontal:4,borderColor:'#000',}}
                    onPress={()=>{this.plus()}}>
                  <Text style={{fontSize:14,paddingHorizontal:1}}>+</Text></TouchableOpacity>
            </View>
          </View>
          <View style={{borderWidth:0.5,width:width*0.92,marginBottom:6,marginTop:25,alignSelf:'center'}}/>
          <View style={{flexDirection:'row',borderWidth:0,justifyContent:'space-between',marginTop:15,paddingHorizontal:10}}>
            <Text style={{fontSize:16,fontWeight:'400',color:'#000'}}>Total item</Text>
            <Text style={{fontSize:16,fontWeight:'400',color:'#000'}}>1</Text>
          </View>

      </View>
    </View>
  )
}

  render() {
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
      <View style={[{flex:1,backgroundColor:'#f5f5f5',}]}>
            <View style={{height:Constants.statusBarHeight,backgroundColor:'#EF2929'}}>
                <StatusBar  translucent={true} barStyle="dark-content" backgroundColor={'#EF2929'} networkActivityIndicatorVisible={false}    />
            </View>
            <View style={{height:width*0.17,backgroundColor:'#EF2929',width:width,alignItems:'center',padding:0}}>
                <View style={{paddingVertical:10,width:width*0.93}}>
                    <View style={{flexDirection:'row',alignItems:'center',}}>
                        <TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={{paddingTop:15}}>
                          {/* <Image source={require('../assets/images/Menu.png')} style={{height:25,width:25,}}/> */}
                          <Ionicons name={'md-arrow-back'} style={{tintColor:'#fff',paddingTop:10}} size={22} color={'#fff'}/>
                        </TouchableOpacity>
                        {/* <Image source={require('../assets/images/navigate.png')} style={{height:25,width:25,marginTop:10}}/> */}
                        <Text style={{color:'#fff',fontSize:18,fontWeight:'400',paddingHorizontal:10,paddingTop:10,paddingLeft:width*0.3}}>Select Varient</Text>
                    </View>
                </View>
            </View>

            <ScrollView style={[{flex:1,backgroundColor:'#'}]}>
              <View style={[{height:height-(width*0.92),}]}>
                {this.myOrder()}
                {this.varient()}
              </View>
              <View style={{height:150}}/>
            </ScrollView>

            <View style={[styles.shadow,{borderWidth:0,marginTop:0,marginLeft:0,marginRight:0,paddingHorizontal:15,paddingVertical:6,backgroundColor:'#033285',borderRadius:0,borderTopWidth:0.5,borderColor:'#707070'}]}>
              <TouchableOpacity style={{flexDirection:'row',justifyContent:'center',alignItems:'center',paddingVertical:6}}
                onPress={()=>{this.props.navigation.navigate('CheckoutScreen')}}>
                    <Text style={{color:'#fff',fontSize:16,textAlign:'center',fontWeight:'600'}}>Proceed to checkout</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(SelectVarient);
