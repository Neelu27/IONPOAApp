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
import {Fontisto, FontAwesome,Entypo,SimpleLineIcons,MaterialCommunityIcons,Ionicons ,Feather} from '@expo/vector-icons';
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
const tabs = [{name:'Active',},{name:'Resolved',},]
const items = ['Variant 1','Variant 2','variant 3','variant 4','variant 5']

class HelpScreen extends React.Component {

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
      selectedTab:0,
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


handlePageChange=(e)=>{
    var offset = e.nativeEvent.contentOffset;
    if(offset) {
      var page = Math.round(offset.x / width) ;
      this.setState({selectedTab:page})
    }
    this.setState({scrollY:new Animated.Value(0)})
  }

  onLayout = event => {
    if (this.state.dimensions) return
    let {width, height} = event.nativeEvent.layout
    this.setState({dimensions: {width, height}})
  }

myCart=()=>{
  return(
    <View>
      <TouchableOpacity onPress={()=>{this.props.navigation.navigate('PurifierScreen')}}>
      <View style={{borderWidth:0.1,margin:10,padding:10,backgroundColor:'#fff',borderRadius:10}}>
        <View style={{borderWidth:0,paddingHorizontal:4,flexDirection:'row',justifyContent:'space-between',width:'100%'}}>
          <Text style={{color:'#000',fontSize:16,textAlign:'left',alignSelf:'flex-start'}}>Purifier service</Text>
          <View style={{backgroundColor:'#d6d0d0',alignItems:'center',paddingVertical:4,paddingHorizontal:15,borderRadius:12,alignSelf:'flex-end'}}>
            <Text style={{color:'#000',fontSize:12,textAlign:'center',fontWeight:'400'}}>order_related</Text>
          </View>
        </View>
        <View style={{borderWidth:0,paddingHorizontal:4,flexDirection:'row',justifyContent:'space-between',width:'100%',paddingVertical:4}}>
          <Text style={{color:'#000',fontSize:12,textAlign:'left',alignSelf:'flex-start'}}>Need service for the filter change</Text>
        </View>
        <View style={{borderWidth:0,paddingHorizontal:4,flexDirection:'row',justifyContent:'space-between',width:'100%',paddingVertical:4}}>
          <Text style={{color:'#878787',fontSize:12,textAlign:'left',alignSelf:'flex-start'}}>0 new message</Text>
          <Text style={{color:'#878787',fontSize:12,textAlign:'left',alignSelf:'flex-start'}}>05:00 PM</Text>
        </View>
      </View>
    </TouchableOpacity>
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
                        <TouchableOpacity onPress={()=>this.props.navigation.goBack()}style={{paddingTop:10}}>
                          <Ionicons name={'md-arrow-back'} style={{tintColor:'#fff',paddingTop:0}} size={22} color={'#fff'}/>
                           {/* <Image source={require('../assets/images/Menu.png')} style={{height:25,width:25,}}/> */}
                        </TouchableOpacity>
                        {/* <Image source={require('../assets/images/navigate.png')} style={{height:25,width:25,marginTop:10}}/> */}
                        <Text style={{color:'#fff',fontSize:18,fontWeight:'400',paddingHorizontal:10,paddingTop:10,paddingLeft:width*0.3}}>Help</Text>
                    </View>
                </View>
            </View>

            <Animated.View style={{flexDirection: 'row',backgroundColor:'#fff'}}>
        {tabs.map((item, i) => {
            return (
              <TouchableOpacity key={i} onPress={()=>{this.setState({selectedTab:i});this.scroll.scrollTo({ x: (i)*width });this.setState({scrollY:new Animated.Value(0)})}} style={{flex:1,borderBottomWidth: 1,borderColor:'#fff',alignItems: 'center',justifyContent: 'center',height:45}} >
               <Text   style={{fontSize:16,fontWeight:'700',color:this.state.selectedTab==i?'#000':'grey'}}>{item.name}</Text>
               <Animated.View
               style={{ height: 2, width: '100%', backgroundColor: this.state.selectedTab==i?'grey':'#fff',position: 'absolute',bottom: 0,left:0,
               }}
               />
              </TouchableOpacity>

            );
          })}

        </Animated.View>

        <ScrollView
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: this.state.scrollX } } }]  )}
          scrollEventThrottle={16}
          onMomentumScrollEnd={this.handlePageChange}
          ref={(node) => {this.scroll = node}}
          style={{flex:1}}
          onContentSizeChange={() =>this.scroll.scrollTo({ x: (this.state.selectedTab)*width })}
          >

          {tabs.map((item, i) => {
              return (
                <View key={i} style={{flex:1,backgroundColor: '#fff',width:width*1,}} >
                {i==0&&this.state.selectedTab==0&&
                   <View style={{flex:1,backgroundColor:'#f5f5f5'}}>
                    <ScrollView>
                      {this.myCart()}
                    </ScrollView>
                   </View>
                }
                {i==1&&this.state.selectedTab==1&&
                  <View style={{flex:1,backgroundColor:'#f5f5f5'}}>
                   <ScrollView>

                     {/* {this.myCart()} */}
                   </ScrollView>

                  </View>
                }
                </View>
              );
            })}

        </ScrollView>

            <View style={{position:'absolute',right:width*0.08,bottom:width*0.08}}>
              <TouchableOpacity style={{backgroundColor:'#EF2929',borderRadius:50,borderWidth:0,alignItems:'center',justifyContent:'center'}}
                onPress={()=>{this.props.navigation.navigate('RaiseConcern')}}>
                <Feather name={'plus'} style={{paddingHorizontal:14,paddingVertical:14}} size={25} color={'#fff'}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(HelpScreen);
