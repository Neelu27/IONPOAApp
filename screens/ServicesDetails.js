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

class ServicesDetails extends React.Component {

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


  renderImages=(services)=>{
    return(
      <View style={{flex:1,borderWidth:0}}>
      <ScrollView
              horizontal={true}
              pagingEnabled={true}
              showsHorizontalScrollIndicator={false}
              ref={(node) => {this.scrollImage = node}}
              onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: this.state.scrollX } } }] )}
              scrollEventThrottle={16}
              onMomentumScrollEnd={this.handlePageChange}>
                    <View style={{backgroundColor:'#f5f5f5',width:width*1,paddingVertical: 4,paddingHorizontal: 25,paddingTop: 0,alignItems: 'center',justifyContent: 'center'}}>
                      <ImageBackground source={require('../assets/services/Vector.png')} style={{height:width*0.47,width:width*0.47}}>
                        <TouchableWithoutFeedback >
                         <Image  style={{width:width*0.5,height:width*0.5,resizeMode: 'contain'}}   source={services.img1} resizeMode={'contain'}/>
                        </TouchableWithoutFeedback>
                      </ImageBackground>
                    </View>
            </ScrollView>

      </View>
    )
  }

  render() {
    const services=this.props.navigation.getParam('item',null)
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
                        <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                          <Ionicons name={'md-arrow-back'} style={{tintColor:'#fff',paddingTop:10}} size={22} color={'#fff'}/>
                        </TouchableOpacity>
                        {/* <Image source={require('../assets/images/navigate.png')} style={{height:25,width:25,marginTop:10}}/> */}
                        <Text style={{color:'#fff',fontSize:18,fontWeight:'400',paddingHorizontal:10,paddingTop:15,paddingLeft:width*0.15}}>{services.name}</Text>
                    </View>
                </View>
            </View>

            <ScrollView style={[{flex:1}]}>
              <View style={[{height:height-(width*1),borderWidth:0,backgroundColor:'#f5f5f5'}]}>
                {this.renderImages(services)}
              </View>
              <Text style={{fontSize:18,fontWeight:'400',textAlign:'center',color:'#00000',paddingBottom:10}}>Select the type of filter</Text>
              <Text style={{fontSize:16,fontWeight:'400',textAlign:'center',paddingHorizontal:25,color:'#B9B9B9',marginVertical:10}} numberOfLines={3}>We ensure to be healthy and protective Our technicians follow social distancing to ensure maximum hygiene</Text>
              <TouchableOpacity style={{borderWidth:0,borderRadius:12,marginVertical:10,
                           flexDirection:'row',justifyContent:'space-between',
                           alignItems:'center',marginHorizontal:20,
                           paddingVertical:10,backgroundColor:'#fff'}}
                           onPress={()=>{this.props.navigation.navigate('FilterDetails',{item:services.filter1})}}>
                <Text style={{fontSize:19,color:'#000',paddingVertical:15,paddingHorizontal:15,fontWeight:'600'}}>{services.filter1}</Text>
                <Image source={require('../assets/images/arrowcircle.png')} style={{paddingRight:10,height:25,width:25,marginRight:10}}/>
              </TouchableOpacity>
              <TouchableOpacity style={{borderWidth:0,borderRadius:12,
                           flexDirection:'row',justifyContent:'space-between',
                           alignItems:'center',marginHorizontal:20,
                           paddingVertical:10,backgroundColor:'#fff'}}
                           onPress={()=>{this.props.navigation.navigate('FilterDetails',{item:services.filter2})}}>
                <Text style={{fontSize:19,color:'#000',paddingVertical:15,paddingHorizontal:15,fontWeight:'600'}}>{services.filter2}</Text>
                <Image source={require('../assets/images/arrowcircle.png')} style={{paddingRight:10,height:25,width:25,marginRight:10}}/>
              </TouchableOpacity>
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

export default connect(mapStateToProps, mapDispatchToProps)(ServicesDetails);
