import React from 'react';
import {
  Image,Platform,Switch,
  ScrollView,StyleSheet,
  Text,Button,TextInput,NativeModules,
  TouchableOpacity,View,Animated,
  Slider,ImageBackground,LayoutAnimation,
  Dimensions, Alert,StatusBar,
  FlatList, AppState, BackHandler ,
  AsyncStorage,ActivityIndicator,
  ToastAndroid,RefreshControl,TouchableWithoutFeedback} from 'react-native';
import { createDrawerNavigator,DrawerItems, } from 'react-navigation-drawer';
import {SearchBar,Card}from 'react-native-elements';
import {Fontisto, FontAwesome,Entypo,SimpleLineIcons,MaterialCommunityIcons,Feather, } from '@expo/vector-icons';
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
import Carousel, { Pagination } from 'react-native-snap-carousel';

const { width } = Dimensions.get('window');
const height = width * 0.8
const SERVER_URL = settings.url
const themeColor = settings.themeColor

const { UIManager } = NativeModules;
UIManager.setLayoutAnimationEnabledExperimental &&
UIManager.setLayoutAnimationEnabledExperimental(true);

const data = [
  {
    img:require('../assets/images/1.png'),
    images:[require('../assets/images/1.png'),require('../assets/images/amaze.195_1.png')],
    name:'Fusion Hot N Ambient N Cold Water Purifier',
    mrp:850,
    price:700,
  },
  {
    img:require('../assets/images/2.png'),
    images:[require('../assets/images/2.png'),require('../assets/images/amaze.195_1.png')],
    name:'Fusion Hot N Ambient N Cold Water Purifier',
    mrp:850,
    price:700,
  },
  {
    img:require('../assets/images/3.png'),
    images:[require('../assets/images/3.png'),require('../assets/images/amaze.195_1.png')],
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
]

class HomeScreen extends React.Component {

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

  waterProduct=()=>{
    return(
      <View style={{flex:1,paddingHorizontal:0,marginTop:10}}>
        <View style={{alignItems:'center',flexDirection:'row',paddingHorizontal:15,backgroundColor:'#fff',paddingVertical:6,justifyContent:'space-between'}}>
            <Text style={{fontSize:18,color:'#000',fontWeight:'700'}}>Water products</Text>
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('ProductList')}}>
              <Text style={{fontSize:14,color:'#EF2929',fontWeight:'400'}}>SEE ALL</Text>
            </TouchableOpacity>
        </View>
        <View style={{marginHorizontal:10,}}>
        <FlatList style={{ borderWidth:0,margin:0,backgroundColor:'#f2f2f2',marginVertical: 0,paddingBottom:0,}}
        contentContainerStyle={{paddingBottom:15,paddingTop:20,}}
            data={this.state.data}
            keyExtractor={(item,index) => {
              return index.toString();
            }}
            horizontal={true}
            extraData={this.state.data}
            nestedScrollEnabled={true}
            renderItem={({item, index}) =>{
              return(
                <Card containerStyle={[styles.shadow, {borderWidth: 0,backgroundColor:'#fff', borderColor: '#fff',borderRadius:10,borderBottomLeftRadius:10,width:width*0.45,height:width*0.5,margin:0,padding:0,margin:0,marginHorizontal:10,marginBottom:15}]}>
                   <TouchableWithoutFeedback onPress={()=>{this.gotoDetails(item,index)}} style={{height:'100%'}}>
                     <View style={{height:'100%',margin:25}}>
                         <View style={{height:width*0.25,width:'100%',alignItems:'center',justifyContent:'center',overflow:'hidden'}}>
                              <Image source={item.img} style={{height:width*0.25,height:width*0.25,}} />
                         </View>
                       <View style={{height:width*0.2}}>
                           <Text style={{color:'#000',fontSize:14,fontWeight:'600',textAlign:'center',paddingHorizontal:10,paddingTop:15}} numberOfLines={2}>{item.name}</Text>
                       </View>
                     </View>
                   </TouchableWithoutFeedback>
                </Card>
              )
           }}
         />
       </View>
      </View>
    )
  }

  service_Repair=()=>{
    return(
      <View style={{}}>
        <View style={{alignItems:'center',flexDirection:'row',paddingHorizontal:15,backgroundColor:'#fff',paddingVertical:6,justifyContent:'space-between'}}>
            <Text style={{fontSize:18,color:'#000',fontWeight:'700'}}>Services & Repair</Text>
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('ServiceRepair')}}>
                <Text style={{fontSize:14,color:'#EF2929',fontWeight:'400'}}>SEE ALL</Text>
            </TouchableOpacity>
        </View>
        <View style={{paddingHorizontal:10, margin:0,backgroundColor:'#f2f2f2',paddingVertical:10,paddingBottom:0,paddingVertical:10}}>
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
       </View>
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

            <View style={{height:width*0.35,backgroundColor:'#EF2929',width:width,alignItems:'center',padding:10}}>
                <View style={{flexDirection:'row',alignSelf:'flex-start',borderWidth:0,paddingBottom:10,alignItems:'center',width:width*0.93,paddingHorizontal:8}}>
                     <TouchableOpacity onPress={()=>{this.props.navigation.openDrawer();}}>
                       <Image source={require('../assets/images/Menu.png')} style={{height:25,width:25,}}/>
                     </TouchableOpacity>
                    <Text style={{color:'#fff',fontSize:22,fontWeight:'700',paddingHorizontal:20,marginLeft:width*0.2}}>Ion Exacense</Text>
                </View>
                <View style={{paddingVertical:20,width:width*0.93}}>
                  <TouchableOpacity style={{borderWidth:0,borderRadius:12,flexDirection:'row',marginTop:0,
                                alignItems:'center',paddingVertical:12,
                                paddingHorizontal:10,backgroundColor:'#fff',borderColor:'#fff'}}
                                onPress={()=>{this.props.navigation.navigate('SearchScreen')}}>
                        <Image source={require('../assets/images/search.png')} style={{height:18,width:18,marginTop:0}}resizeMode={'contain'}/>
                        <Text style={{color:'#C0C0C0',fontSize:12,fontWeight:'400',paddingHorizontal:10}}>How can we help you with today?</Text>
                  </TouchableOpacity>
                </View>
            </View>

            <ScrollView style={{flex:1}}>
                <View  style={{paddingTop:10}}>
                   <MyCarousel/>
                   <View style={{flexDirection:'row',backgroundColor:'#EF2929',alignItems:'center',paddingVertical:10,marginVertical:10}}>
                     <View style={{flex:0.2}}>
                       <Image/>
                     </View>
                     <View style={{flex:0.8}}>
                       <Text style={{fontSize:16,color:'#fff'}}>Technician is on the way</Text>
                       <Text style={{color:'#fff',fontSize:12,paddingVertical:6}} numberOfLines={2}>He will reach the location shortly</Text>
                     </View>
                     <View style={{height:width*0.1,borderWidth:0.5,marginRight:20,borderColor:'#fff'}}/>
                     <View style={{flex:0.2}}>
                     <Text style={{color:'#fff',fontSize:12}}>VIEW</Text></View>
                   </View>
                   {this.waterProduct()}
                   {this.service_Repair()}
                   <TouchableOpacity onPress={()=>this.props.navigation.navigate('InstallUninstall')}>
                   <View style={{borderWidth:0,borderRadius:12,
                                flexDirection:'row',justifyContent:'space-between',
                                alignItems:'center',marginHorizontal:20,
                                paddingVertical:10,backgroundColor:'#fff'}}>
                     <Text style={{fontSize:19,color:'#000',paddingVertical:15,paddingHorizontal:15,fontWeight:'700'}}>Installation / Uninstallation</Text>
                     <Image source={require('../assets/images/arrowcircle.png')} style={{paddingRight:10,height:25,width:25,marginRight:10}}/>
                   </View></TouchableOpacity>
               </View>
               <View style={{height:150}}/>
            </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
class MyCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      activeSlide:0,
      entries : [{img:require('../assets/images/banner1.png')},
                 {img:require('../assets/images/banner2.png')},]
      }
    }
    _renderItem ({item, index}) {
        return <View
                  style={{width:width*0.95,height:width*0.27,borderWidth:0,
                          justifyContent:'center',backgroundColor:'#0f0f0f',
                          borderRadius:0,alignItems:'center',marginVertical:10}}>
                  <View style={{width:width*0.95,height:width*0.27,borderWidth:0,borderColor:'#fff',alignSelf:'center',marginLeft:0}}>
                      <Image  source={item.img} style={{width:'100%',height:'100%'}}/>
                  </View>
          </View>
    }
    get pagination () {
        const { entries, activeSlide } = this.state;
        return (
            <Pagination
              dotsLength={entries.length}
              activeDotIndex={activeSlide}
              containerStyle={{ backgroundColor: 'trasnparent' }}
              dotStyle={{
                  width: 8,
                  height: 8,
                  borderRadius:4,
                  marginHorizontal:1,
                  backgroundColor: '#d21850',
                  borderWidth:0.2
              }}
              inactiveDotStyle={{
                  width: 8,
                  height: 8,
                  borderRadius:4,
                  marginHorizontal:1,
                  backgroundColor: '#cfcfcf',
                  borderWidth:0.5
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
            />
        );
    }
    render () {
        return (
            <View>
                <Carousel
                  data={this.state.entries}
                  renderItem={this._renderItem}
                  onSnapToItem={(index) => this.setState({ activeSlide: index }) }
                  sliderWidth={sliderWidth}
                  itemWidth={itemWidth}
                />
            </View>
        );
    }
  }
  const sliderWidth=width*1;
const itemWidth=width*0.92;


{/* <View style={{height:width*0.5,backgroundColor:'#EF2929',width:width,alignItems:'center',padding:10}}>
    <View style={{flexDirection:'row',alignSelf:'flex-start',borderWidth:0,paddingBottom:10,alignItems:'center',width:width*0.93,paddingHorizontal:8}}>
        <FontAwesome name={'bars'} style={{}} size={25} color={'#fff'}/>
         <TouchableOpacity onPress={()=>{this.props.navigation.openDrawer();}}>
           <Image source={require('../assets/images/Menu.png')} style={{height:25,width:25,}}/>
         </TouchableOpacity>
        <Text style={{color:'#fff',fontSize:22,fontWeight:'700',paddingHorizontal:20}}>Ion Exacense</Text>
    </View>
    <View style={{paddingVertical:20,width:width*0.93}}>
        <View style={{flexDirection:'row',alignItems:'center',}}>
            <Fontisto name={'navigate'} style={{tintColor:'#fff',paddingTop:10}} size={22} color={'#fff'}/>
            <Image source={require('../assets/images/navigate.png')} style={{height:25,width:25,marginTop:10}}/>
            <Text style={{color:'#fff',fontSize:18,fontWeight:'400',paddingHorizontal:10,paddingTop:15}}>10th cross street , jayanagar 4th blok.</Text>
        </View>
      <View style={{borderWidth:0.5,borderColor:'#fff'}}/>
      <View style={{borderWidth:0,borderRadius:12,flexDirection:'row',marginTop:30,
                    alignItems:'center',paddingVertical:12,
                    paddingHorizontal:10,backgroundColor:'#fff',borderColor:'#fff'}}>
            <FontAwesome name={'search'} style={{}} size={20} color={'#C0C0C0'}/>
            <Image source={require('../assets/images/search.png')} style={{height:20,width:20,marginTop:0}}resizeMode={'contain'}/>
            <Text style={{color:'#C0C0C0',fontSize:16,fontWeight:'400',paddingHorizontal:10}}>How can we help you with today?</Text>
      </View>
    </View>
</View> */}

{/* <View style={{flexDirection:'row',flex:1}}>
   <View style={{flex:1,alignItems:'flex-start',justifyContent:'center',paddingLeft:15}}>
       <FontAwesome name={"heart-o"} size={25} color={'#000'} />
   </View>
   <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
   <Text style={{color:'red',fontSize:16,fontWeight:'700',textAlign:'center',textDecorationLine: 'line-through', textDecorationStyle: 'solid'}} numberOfLines={1}>&#8377; {item.mrp}</Text>
   <Text style={{color:'#000',fontSize:16,fontWeight:'700',textAlign:'center'}} numberOfLines={1}>&#8377; {item.price}</Text>
   </View>
   <View style={{flex:1,alignItems:'flex-end',justifyContent:'center',paddingRight:15}}>
     <Image source={require('../assets/images/shopping-basketplus.png')}  style={{height:30,width:30}} />
   </View>
</View> */}
