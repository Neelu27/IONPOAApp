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

const day=[
  {
    name:'Fri',
    date:'8'
  },
  {
    name:'Sat',
    date:'9'
  },
  {
    name:'Mon',
    date:'10'
  },
  {
    name:'Tue',
    date:'11'
  },
  {
    name:'Wed',
    date:'12'
  },
  {
    name:'Thr',
    date:'13'
  },
]
const time = [
  {
    time:'10 am'
  },
  {
    time:'10:30 am'
  },
  {
    time:'11 am'
  },
  {
    time:'11:30 am'
  },
  {
    time:'12 am'
  },
  {
    time:'12:30 am'
  },
  {
    time:'1 pm'
  },
  {
    time:'1:30 pm'
  },
  {
    time:'2 pm'
  },
  {
    time:'2:30 pm'
  },
  {
    time:'3 pm'
  },
  {
    time:'3:30 pm'
  },



]

class SlotAllotment extends React.Component {

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
      day:day,
      time:time
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

selectDay=()=>{
  return(
    <View>
      <View style={{borderWidth:0,padding:15}}>
        <Text style={{fontSize:16,color:'#000',fontWeight:'400'}}>Select day</Text>
        <View style={{borderWidth:0,}}>
          <FlatList
              data={this.state.day}
              keyExtractor={(item,index) => {
                return index.toString();
              }}
              horizontal={true}
              numColumns={1}
              showsHorizontalScrollIndicator={false}
              extraData={this.state.day}
              nestedScrollEnabled={true}
              renderItem={({item, index}) =>{
                return(
                  <View style={{borderWidth:0.5,margin:4,padding:20,alignItems:'center',borderRadius:17,width:width*0.2,borderColor:'#a2a2a2'}}>
                    <Text style={{fontSize:16,color:'#a2a2a2'}}>{item.name}</Text>
                    <Text style={{fontSize:16,color:'#a2a2a2'}}>{item.date}</Text>
                  </View>
                )}}
              />
        </View>
      </View>
    </View>
  )
}

selectTime=()=>{
  return(
    <View>
      <View style={{borderWidth:0,padding:15}}>
        <Text style={{fontSize:16,color:'#000',fontWeight:'400'}}>Time allocation</Text>
        <View style={{borderWidth:0,alignItems:'center',marginVertical:20}}>
      <FlatList
          data={this.state.time}
          keyExtractor={(item,index) => {
            return index.toString();
          }}
          horizontal={false}
          numColumns={2}
          showsHorizontalScrollIndicator={false}
          extraData={this.state.time}
          nestedScrollEnabled={true}
          renderItem={({item, index}) =>{
            return(
              <View style={{borderWidth:0.5,margin:4,width:width*0.37,alignItems:'center',borderRadius:17,borderColor:'#a2a2a2'}}>
                <Text style={{fontSize:16,color:'#000',paddingVertical:10}}>{item.time}</Text>
              </View>
            )}}
          />
        </View>

      </View>
      <View style={{borderWidth:0,alignItems:'center',justifyContent:'center'}}>
        <TouchableOpacity style={{borderRadius:17,alignSelf:'center',justifyContent:'center',borderWidth:0,backgroundColor:'#033285',}}
          onPress={()=>{this.props.navigation.navigate('Paymentscreen')}}>
          <Text style={{color:'#fff',paddingVertical:10,fontSize:16,textAlign:'center',paddingHorizontal:width*0.2}}>Proceed</Text>
        </TouchableOpacity>
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
      <View style={[{flex:1,backgroundColor:'#fff',}]}>
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
                        <Text style={{color:'#fff',fontSize:18,fontWeight:'400',paddingHorizontal:10,paddingTop:15,paddingLeft:width*0.15}}>Slot allotment</Text>
                    </View>
                </View>
            </View>

            <ScrollView style={[{flex:1}]}>
                <Text style={{fontSize:18,color:'#000',fontWeight:'600',paddingHorizontal:15,paddingVertical:15}}>When would you like our service</Text>
                 {this.selectDay()}
                 {this.selectTime()}
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

export default connect(mapStateToProps, mapDispatchToProps)(SlotAllotment);
