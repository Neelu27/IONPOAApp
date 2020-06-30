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
const tabs = [{name:'Ongoing',},{name:'History',},]
const items = ['Variant 1','Variant 2','variant 3','variant 4','variant 5']

class Bookings extends React.Component {

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
      selectedTab:0
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
      <TouchableOpacity onPress={()=>{this.props.navigation.navigate('BookingAccepted',{item:true})}}>
      <View style={{height:width*0.25,borderWidth:0.1,flexDirection:'row',margin:10,padding:10,backgroundColor:'#fff',borderRadius:10}}>
        <View style={{flex:0.3,borderWidth:0}}>
          <Image source={require('../assets/images/ag_marvel_image.jpg')} style={{height:'100%',width:'100%'}}/>
        </View>
        <View style={{flex:0.5,borderWidth:0,paddingHorizontal:4}}>
          <Text style={{color:'#000',fontSize:16,textAlign:'left',}}>Automatic ABS plastic </Text>
          <Text style={{color:'#000',fontSize:16,textAlign:'left',}}>Eutoriia Water purifier </Text>
          {/* <Text style={{color:'#000',fontSize:14,textAlign:'left',textDecorationStyle: 'solid',paddingTop:4}}>&#8377; 20,000</Text> */}
          <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',}}>
            <Text style={{flex:0.5,color:'#000',fontSize:16,textAlign:'left', textDecorationStyle: 'solid',paddingTop:12}}>&#8377; 21,000</Text>

          </View>
        </View>
        <View style={{flex:0.2,borderWidth:0}}>
          <View style={{borderWidth:0,flexDirection:'row',justifyContent:'flex-end',paddingHorizontal:4}}>
              <TouchableOpacity style={{borderWidth:0,borderColor:'red',paddingHorizontal:4}}
              >
                <Text style={{fontSize:12,color:'#737373'}}>ongoing</Text>
              </TouchableOpacity>
          </View>

        </View>
        <View style={{position:'absolute',right:15,bottom:15}}>
          <Text style={{flex:0.5,color:'#777777',fontSize:12,textAlign:'right', textDecorationStyle: 'solid',paddingTop:12}}>Expires on 23 May 2021</Text>
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
                        <TouchableOpacity onPress={()=>this.props.navigation.openDrawer()}style={{paddingTop:10}}>
                          {/* <Ionicons name={'md-arrow-back'} style={{tintColor:'#fff',paddingTop:10}} size={22} color={'#fff'}/> */}
                           <Image source={require('../assets/images/Menu.png')} style={{height:25,width:25,}}/>
                        </TouchableOpacity>
                        {/* <Image source={require('../assets/images/navigate.png')} style={{height:25,width:25,marginTop:10}}/> */}
                        <Text style={{color:'#fff',fontSize:18,fontWeight:'400',paddingHorizontal:10,paddingTop:10,paddingLeft:width*0.3}}>Bookings</Text>
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

                     {this.myCart()}
                   </ScrollView>

                  </View>
                }
                </View>
              );
            })}

        </ScrollView>

            {/* <ScrollView style={[{flex:1}]}>
              <View style={[{height:height-(width*0.92),}]}>
                {this.myCart()}
              </View>
              <View style={{height:150}}/>
            </ScrollView> */}

            <TabComponent navigation={this.props.navigation}  />
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

export default connect(mapStateToProps, mapDispatchToProps)(Bookings);
