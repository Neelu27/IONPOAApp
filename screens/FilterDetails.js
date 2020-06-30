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
class FilterDetails extends React.Component {

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
    }
      willFocus = props.navigation.addListener(
       'didFocus',
        payload => {
          }
     );
    }






myCart=()=>{
  return(
    <View>
      <FlatList style={{ borderWidth:0,margin:0,backgroundColor:'#f2f2f2',marginVertical: 0,paddingBottom:0,}}
      contentContainerStyle={{paddingBottom:15,paddingTop:8,}}
          data={this.state.filter}
          keyExtractor={(item,index) => {
            return index.toString();
          }}
          horizontal={false}
          numColumns={1}
          extraData={this.state.filter}
          nestedScrollEnabled={true}
          renderItem={({item, index}) =>{
            return(
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('HealthDeaclare')}>
              <View style={{borderWidth:0,marginTop:15,marginLeft:15,marginRight:15,padding:15,backgroundColor:'#fff',borderRadius:10}}>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{color:'#000',fontSize:17,textAlign:'left',fontWeight:'600'}}>AMC for {item.year} year</Text>
                  <Text style={{color:'#000',fontSize:17,textAlign:'left',fontWeight:'600'}}>&#8377;{item.price}</Text>
                </View>
                <View>
                  <Text style={{color:'#a19f9f',fontSize:14,textAlign:'left',paddingTop:4}}>- Normal filter</Text>
                  <Text style={{color:'#a19f9f',fontSize:14,textAlign:'left',paddingTop:4}}>- One time filter replacement</Text>
                  <Text style={{color:'#a19f9f',fontSize:14,textAlign:'left',textDecorationStyle: 'solid',paddingTop:4}}>- Includes {item.free} free service once in 3.5 months</Text>
                </View>
              </View>
          </TouchableOpacity>
          )}}/>
    </View>
  )
}

  render() {
  const filter=this.props.navigation.getParam('item',null)
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
                        <Text style={{color:'#fff',fontSize:18,fontWeight:'400',paddingHorizontal:10,paddingTop:15,paddingLeft:width*0.15}}>{filter}</Text>
                    </View>
                </View>
            </View>
            <View style={[styles.shadow,{height:width*0.17,backgroundColor:'#fff',width:width,alignItems:'center',padding:0,
              borderBottomWidth:0.2,borderColor:'#adadad'}]}>
                <View style={{paddingVertical:5,width:width*0.93}}>
                    <View style={{flexDirection:'row',alignItems:'center',}}>
                        <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                          <Image source={require('../assets/images/info.png')} style={{height:22,width:22,paddingTop:10,marginLeft:10}}/>
                        </TouchableOpacity>
                        {/* <Image source={require('../assets/images/navigate.png')} style={{height:25,width:25,marginTop:10}}/> */}
                        <Text style={{color:'#000',fontSize:13,fontWeight:'400',paddingHorizontal:10,paddingRight:width*0.1,paddingTop:15,paddingLeft:width*0.06}}numberOfLines={2}>User buying filter with AMC's get 50% offer on other parts replacement</Text>
                    </View>
                </View>
            </View>

            <ScrollView style={[{flex:1}]}>
              {this.myCart()}

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

export default connect(mapStateToProps, mapDispatchToProps)(FilterDetails);
