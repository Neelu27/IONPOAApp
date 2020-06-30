import React from 'react';
import {
  Image,Platform,Switch,
  ScrollView,StyleSheet,
  Text,Button,TextInput,
  TouchableOpacity,View,
  Slider,ImageBackground,
  Dimensions, Alert,StatusBar,
  FlatList, AppState, BackHandler ,
  AsyncStorage,ActivityIndicator,
  ToastAndroid,RefreshControl,NativeModules,LayoutAnimation,Animated,TouchableWithoutFeedback} from 'react-native';
import { createDrawerNavigator,DrawerItems, } from 'react-navigation-drawer';
import {SearchBar,Card}from 'react-native-elements';
import {Fontisto, FontAwesome,Entypo,SimpleLineIcons,MaterialCommunityIcons ,Ionicons} from '@expo/vector-icons';
import  Constants  from 'expo-constants';
import { withNavigationFocus,DrawerActions ,DrawerNavigator} from 'react-navigation';
import settings from '../constants/Settings.js';
import Toast, {DURATION} from 'react-native-easy-toast';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import * as actionTypes from '../actions/actionTypes';
import { SharedElement } from 'react-navigation-shared-element';
import Modal from "react-native-modal";
import TabComponent  from '../components/TabComponent.js';
import { createFluidNavigator, Transition } from 'react-navigation-fluid-transitions';

const { width } = Dimensions.get('window');
const height = width * 0.8
const SERVER_URL = settings.url
const themeColor = settings.themeColor

const { UIManager } = NativeModules;
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);


const data = [
  {
    img:require('../assets/images/ag_marvel_image.jpg'),
    images:[require('../assets/images/ag_marvel_image.jpg'),require('../assets/images/amaze.195_1.png')],
    name:'Fusion Hot N Ambient N Cold Water Purifier',
    mrp:850,
    price:700,
  },
  {
    img:require('../assets/images/amaze.195_1.png'),
    images:[require('../assets/images/amaze.195_1.png'),require('../assets/images/amaze.195_1.png')],
    name:'Fusion Hot N Ambient N Cold Water Purifier',
    mrp:850,
    price:700,
  },
  {
    img:require('../assets/images/glass.jpg'),
    images:[require('../assets/images/glass.jpg'),require('../assets/images/amaze.195_1.png')],
    name:'Fusion Hot N Ambient N Cold Water Purifier',
    mrp:850,
    price:700,
  },
  {
    img:require('../assets/images/crystal_nxt.jpg'),
    images:[require('../assets/images/crystal_nxt.jpg'),require('../assets/images/amaze.195_1.png')],
    name:'Fusion Hot N Ambient N Cold Water Purifier',
    mrp:850,
    price:700,
  },
  {
    img:require('../assets/images/mtds.jpg'),
    images:[require('../assets/images/mtds.jpg'),require('../assets/images/amaze.195_1.png')],
    name:'Fusion Hot N Ambient N Cold Water Purifier',
    mrp:850,
    price:700,
  },

]

const service=[
  {
    img:require('../assets/images/UV.png'),
    img1:require('../assets/services/UV.png'),
    name:'UV Services',
    filter1:'UV Normal filter',
    filter2:'UV Chip filter',
  },
  {
    img:require('../assets/images/RO.png'),
    img1:require('../assets/services/RO.png'),
    name:'RO Services',
    filter1:'RO Normal filter',
    filter2:'RO Chip filter',
  },
  {
    img:require('../assets/images/UVRO.png'),
    img1:require('../assets/services/UVRO.png'),
    name:'UV + RO',
    filter1:'UV + RO Normal filter',
    filter2:'UV + RO Chip filter',
  },
  {
    img:require('../assets/images/tap.png'),
    img1:require('../assets/services/Tap.png'),
    name:'Tap',
    filter1:'Tap Normal filter',
    filter2:'Tap Chip filter',
  },
  {
    img:require('../assets/images/Bowlset.png'),
    img1:require('../assets/services/Bowlset.png'),
    name:'Bowlset',
    filter1:'Bowlset Normal filter',
    filter2:'Bowlset Chip filter',
  },
  {
    img:require('../assets/images/Pump.png'),
    img1:require('../assets/services/pump.png'),
    name:'Pump',
    filter1:'Pump Normal filter',
    filter2:'Pump Chip filter',
  },
  {
    img:require('../assets/images/Dualcartridge.png'),
    img1:require('../assets/services/Dualcartridge.png'),
    name:'Dual cartridge',
    filter1:'Dualcartridge Normal filter',
    filter2:'Dualcartridge Chip filter',
  },
  {
    img:require('../assets/images/adapter.png'),
    img1:require('../assets/services/adapter.png'),
    name:'Adapter',
    filter1:'Adapter Normal filter',
    filter2:'Adapter Chip filter',
  },
  {
    img:require('../assets/images/SVCOILS.png'),
    img1:require('../assets/services/SVCOILS.png'),
    name:'SV coils',
    filter1:'SV coils Normal filter',
    filter2:'SV coils Chip filter',
  },
  {
    img:require('../assets/images/PCboard.png'),
    img1:require('../assets/services/PCboard.png'),
    name:'PC board',
    filter1:'PC board Normal filter',
    filter2:'PC board Chip filter',
  },
]


class ServiceRepair extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {header:null}
  };

  constructor(props) {
    super(props);
    this.state={
        data:data,
        service:service,
        AnimatedValue:new Animated.Value(0)
      }
      willFocus = props.navigation.addListener(
       'didFocus',
        payload => {
          this.setValue()
          }
     );
    }

  setValue=()=>{
    Animated.timing(this.state.AnimatedValue,{
      toValue:0,
      duration:500,
      useNativeDriver:true
    }).start()
  }

  componentDidMount(){

  }

  gotoDetails=(item,index)=>{
    Animated.timing(this.state.AnimatedValue,{
      toValue:1,
      duration:300,
      useNativeDriver:true
    }).start()
    this.props.navigation.navigate('ProductDetails',{item:item,id:index})
  }

  service_Repair=()=>{
    return(
      <View style={{}}>
        <ScrollView style={{paddingHorizontal:10, margin:0,backgroundColor:'#f2f2f2',paddingVertical:10,paddingBottom:0,paddingVertical:10}}>
        <FlatList style={{ borderWidth:0,margin:0,backgroundColor:'#f2f2f2',marginVertical: 0,paddingBottom:0,}}
        contentContainerStyle={{paddingBottom:15,paddingTop:20,}}
            data={this.state.service}
            keyExtractor={(item,index) => {
              return index.toString();
            }}
            horizontal={false}
            numColumns={3}
            extraData={this.state.service}
            nestedScrollEnabled={true}
            renderItem={({item, index}) =>{
              return(
              <TouchableWithoutFeedback >
                <Card containerStyle={[styles.shadow, {borderWidth: 0,backgroundColor:'#fff', borderColor: '#fff',borderRadius:10,borderBottomLeftRadius:10,width:width*0.27,height:width*0.27,margin:0,padding:0,margin:0,marginHorizontal:10,marginBottom:15}]}>
                   <TouchableWithoutFeedback  style={{height:'100%'}}
                     onPress={()=>{this.props.navigation.navigate('ServicesDetails',{item:item})}}>
                     <View style={{height:'100%',margin:25}}>
                         <View style={{height:width*0.1,width:'100%',alignItems:'center',justifyContent:'center',overflow:'hidden'}}>
                              <Image source={item.img} style={{height:width*0.1,height:width*0.1,}} />
                         </View>
                       <View style={{height:width*0.2}}>
                           <Text style={{color:'#000',fontSize:12,fontWeight:'600',textAlign:'center',paddingHorizontal:4,paddingTop:15}} numberOfLines={1}>{item.name}</Text>
                       </View>
                     </View>
                   </TouchableWithoutFeedback>
                </Card>
              </TouchableWithoutFeedback>
              )
            }}
          />
          <View style={{height:150}}/>
        </ScrollView>
      </View>
    )
  }


  render() {
    var myCustomTransitionFunction = (transitionInfo) => {
        const { progress, start, end } = transitionInfo;
        const scaleInterpolation = progress.interpolate({
          inputRange: [0, start, end, 1],
          outputRange: [88, 80, 1, 1],
        });
        return { transform: [{ scale: scaleInterpolation }] };
      }
    const opacity = this.state.AnimatedValue.interpolate({
      inputRange:[0,1],
      outputRange:[1,0]
    })
    return (
      <View style={{flex:1,backgroundColor:'#f2f2f2',}}>
            <View style={{height:Constants.statusBarHeight,backgroundColor:'#EF2929'}}>
                <StatusBar  translucent={true} barStyle="dark-content" backgroundColor={'#EF2929'} networkActivityIndicatorVisible={false}    />
            </View>

            <View style={{height:width*0.3,backgroundColor:'#EF2929',width:width,alignItems:'center',padding:0}}>

                <View style={{paddingVertical:10,width:width*0.93}}>
                    <View style={{flexDirection:'row',alignItems:'center',}}>
                        <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                          <Ionicons name={'md-arrow-back'} style={{tintColor:'#fff',paddingTop:10}} size={22} color={'#fff'}/>
                        </TouchableOpacity>
                        {/* <Image source={require('../assets/images/navigate.png')} style={{height:25,width:25,marginTop:10}}/> */}
                        <Text style={{color:'#fff',fontSize:18,fontWeight:'400',paddingHorizontal:10,paddingTop:15}}>Services & Repair</Text>
                    </View>
                  <View style={{borderWidth:0,borderRadius:12,flexDirection:'row',marginTop:10,
                                alignItems:'center',paddingVertical:12,
                                paddingHorizontal:10,backgroundColor:'#fff',borderColor:'#fff'}}>
                        {/* <FontAwesome name={'search'} style={{}} size={20} color={'#C0C0C0'}/> */}
                        <Image source={require('../assets/images/search.png')} style={{height:20,width:20,marginTop:0}}resizeMode={'contain'}/>
                        <Text style={{color:'#C0C0C0',fontSize:16,fontWeight:'400',paddingHorizontal:10}}>How can we help you with today?</Text>
                  </View>
                </View>
            </View>
            <View style={{flex:1}}>

            <View  style={{}}>

            {this.service_Repair()}
           </View>

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
    elevation: 0,
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

export default connect(mapStateToProps, mapDispatchToProps)(ServiceRepair);
