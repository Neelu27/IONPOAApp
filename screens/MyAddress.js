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
const address=[
  {
    year:'1',
    price:'5530',
    free:'3',
  },

]
class MyAddress extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {header:null}
  };

  constructor(props) {
    super(props);
    var item = props.navigation.getParam('item',null)
    this.state={
      item:item,
      address:address,
      AnimatedValue:new Animated.Value(0),
      show:false,
      underlay:false,
      selectedindex:0,
      selectdImgTab:0,
      scrollX : new Animated.Value(0),
      count:0,
      select:false
    }
      willFocus = props.navigation.addListener(
       'didFocus',
        payload => {
          }
     );
    }

  componentDidMount(){}

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

  goBack=()=> {

   this.props.navigation.goBack();
   this.props.navigation.state.params.onSelect({ selected: true });
 }

 delete=()=>{

 }

  myOrder=()=>{
    return(
      <View>
        <FlatList style={[{ borderWidth:0,margin:0,backgroundColor:'#fff',marginVertical: 0,paddingBottom:0,}]}
        contentContainerStyle={{paddingBottom:15,paddingTop:8,}}
            data={this.state.address}
            keyExtractor={(item,index) => {
              return index.toString();
            }}
            horizontal={false}
            numColumns={1}
            extraData={this.state.address}
            nestedScrollEnabled={true}
            renderItem={({item, index}) =>{
              return(
              <TouchableOpacity onPress={()=>{this.setState({select:!this.state.select});this.goBack()}}>
                <View style={[styles.shadow,{flexDirection:'row',borderWidth:0,marginTop:15,marginLeft:15,marginRight:15,padding:15,backgroundColor:'#fff',borderRadius:0}]}>
                  <View style={{flex:0.15,borderWidth:0,justifyContent:'center'}}>
                    {!this.state.select?<Image source={require('../assets/images/Addressunchecked.png')} style={{height:18,width:18}}/>:<Image source={require('../assets/images/greenselect.png')} style={{height:18,width:18}}/>}
                  </View>
                  <View style={{flex:0.85}}>
                  <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={{color:'#000',fontSize:16,textAlign:'left',fontWeight:'600',paddingBottom:10}}>Home</Text>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                      <TouchableOpacity onPress={()=>this.props.navigation.navigate('Address')}>
                        <Image source={require('../assets/images/addressedit.png')} style={{height:22,width:22,marginRight:10}}/>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={()=>this.delete()}>
                        <Image source={require('../assets/images/addressdelete.png')} style={{height:22,width:22,marginRight:10}}/>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={{borderWidth:0}}>
                      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <Text style={{color:'#000',fontSize:14,textAlign:'left',fontWeight:'600'}}>Shipping address</Text>
                      </View>
                      <View>
                        <Text style={{color:'#4f4f4f',fontSize:12,textAlign:'left',paddingTop:8}}>Naveen kumar,10th cross street,jayanagar 4th block,Bengaluru-560068</Text>
                      </View>
                      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <Text style={{color:'#000',fontSize:14,textAlign:'left',fontWeight:'600',paddingTop:8}}>Billing address</Text>
                      </View>
                      <View>
                        <Text style={{color:'#4f4f4f',fontSize:12,textAlign:'left',paddingTop:8}}>Naveen kumar,10th cross street,jayanagar 4th block,Bengaluru-560068</Text>
                      </View>
                    </View>
              </View>
            </View>
            </TouchableOpacity>
            )}}/>
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
                        <TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={{paddingTop:15}}>
                          {/* <Image source={require('../assets/images/Menu.png')} style={{height:25,width:25,}}/> */}
                          <Ionicons name={'md-arrow-back'} style={{tintColor:'#fff',paddingTop:0}} size={22} color={'#fff'}/>
                        </TouchableOpacity>
                        {/* <Image source={require('../assets/images/navigate.png')} style={{height:25,width:25,marginTop:10}}/> */}
                        <Text style={{color:'#fff',fontSize:18,fontWeight:'400',paddingHorizontal:10,paddingTop:10,paddingLeft:width*0.15}}>My address</Text>
                    </View>
                </View>
            </View>
            <View style={{paddingVertical:20,width:width*0.93,alignSelf:'center'}}>
              <TouchableOpacity style={{borderWidth:0,flexDirection:'row',alignItems:'center',alignSelf:'flex-start'}}
                onPress={()=>this.props.navigation.navigate('Address')}>
                  <View style={{height:width*0.08,width:width*0.08}}>
                    <Image source={require('../assets/images/newaddress.png')} style={{height:'100%',width:'100%'}}resizeMode={'contain'}/>
                  </View>
                  <Text style={{fontSize:18,color:'#EF2929',paddingHorizontal:10}}>Add new address</Text>
              </TouchableOpacity>
            </View>
            <ScrollView style={[{flex:1,backgroundColor:'#fff'}]}>


                {this.myOrder()}

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

export default connect(mapStateToProps, mapDispatchToProps)(MyAddress);
