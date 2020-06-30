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

class ProductList extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {header:null}
  };

  constructor(props) {
    super(props);
    this.state={
        data:data,
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

            <View style={{height:width*0.2,backgroundColor:'#EF2929',width:width,alignItems:'center',padding:0}}>

                <View style={{paddingVertical:10,width:width*0.93,flexDirection:'row',alignItems:'center'}}>
                    {/* <View style={{flexDirection:'row',alignItems:'center',}}>
                        {/* <Fontisto name={'navigate'} style={{tintColor:'#fff',paddingTop:10}} size={22} color={'#fff'}/> */}
                        {/* <Image source={require('../assets/images/navigate.png')} style={{height:25,width:25,marginTop:10}}/>
                        <Text style={{color:'#fff',fontSize:18,fontWeight:'400',paddingHorizontal:10,paddingTop:15}}>10th cross street , jayanagar 4th blok.</Text>
                    </View> */}
                  {/* <View style={{borderWidth:0.5,borderColor:'#fff'}}/> */}
                  <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                    <Ionicons name={'md-arrow-back'} style={{tintColor:'#fff',paddingTop:10}} size={22} color={'#fff'}/>
                  </TouchableOpacity>
                  <View style={{borderWidth:0,borderRadius:12,flexDirection:'row',marginTop:10,
                                alignItems:'center',paddingVertical:12,marginLeft:20,width:width*0.8,
                                paddingHorizontal:10,backgroundColor:'#fff',borderColor:'#fff'}}>
                        {/* <FontAwesome name={'search'} style={{}} size={20} color={'#C0C0C0'}/> */}
                        <Image source={require('../assets/images/search.png')} style={{height:18,width:18,marginTop:0}}resizeMode={'contain'}/>
                        <Text style={{color:'#C0C0C0',fontSize:12,fontWeight:'400',paddingHorizontal:10}}>How can we help you with today?</Text>
                  </View>
                </View>
            </View>
            <View style={{flex:1}}>

            <View  style={{}}>

            <FlatList style={{borderColor : '#fff' , borderWidth:2,margin:0,backgroundColor:'#f2f2f2',marginVertical: 0,paddingBottom:0}}
            contentContainerStyle={{paddingBottom:55,paddingTop:15}}
                data={this.state.data}
                keyExtractor={(item,index) => {
                  return index.toString();
                }}
                extraData={this.state.data}
                nestedScrollEnabled={true}
                renderItem={({item, index}) =>{
                  return(
                    <Card containerStyle={[styles.shadow, {borderWidth: 0,backgroundColor:'#fff', borderColor: '#fff',borderRadius:10,borderBottomLeftRadius:10,width:width-60,height:width,margin:0,padding:0,margin:0,marginHorizontal:30,marginBottom:15}]}>
                       <TouchableWithoutFeedback onPress={()=>{this.gotoDetails(item,index)}} style={{height:'100%'}}>
                         <View style={{height:'100%',}}>
                             <View style={{height:width*0.7,width:'100%',alignItems:'center',justifyContent:'center',overflow:'hidden'}}>
                                  <Image source={item.img} style={{height:width*0.6,height:width*0.6,}} />
                             </View>
                           <View style={{height:width*0.3}}>
                               <Text style={{color:'grey',fontSize:16,fontWeight:'600',textAlign:'center',paddingHorizontal:40}} numberOfLines={2}>{item.name}</Text>
                               <View style={{flexDirection:'row',flex:1}}>
                                  <View style={{flex:1,alignItems:'flex-start',justifyContent:'center',paddingLeft:25}}>
                                      <FontAwesome name={"heart-o"} size={22} color={'#000'} />
                                  </View>
                                  <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                                    <Text style={{color:'#000',fontSize:18,fontWeight:'700',textAlign:'center'}} numberOfLines={1}>&#8377; {item.price}</Text>
                                  <Text style={{color:'#9a9a9a',fontSize:14,fontWeight:'700',textAlign:'center',textDecorationLine: 'line-through', textDecorationStyle: 'solid'}} numberOfLines={1}>&#8377; {item.mrp}</Text>

                                  </View>
                                  <View style={{flex:1,alignItems:'flex-end',justifyContent:'center',paddingRight:25}}>
                                    <Image source={require('../assets/images/shopping-basketplus.png')}  style={{height:25,width:25}} />
                                  </View>
                               </View>
                           </View>
                         </View>
                       </TouchableWithoutFeedback>
                    </Card>
                  )
               }}
               />
           </View>
            </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);

{/* <View style={{height:width*0.3,backgroundColor:'#EF2929',width:width,alignItems:'center',padding:0}}>

    <View style={{paddingVertical:10,width:width*0.93}}>
        <View style={{flexDirection:'row',alignItems:'center',}}>
            {/* <Fontisto name={'navigate'} style={{tintColor:'#fff',paddingTop:10}} size={22} color={'#fff'}/> */}
      //       <Image source={require('../assets/images/navigate.png')} style={{height:25,width:25,marginTop:10}}/>
      //       <Text style={{color:'#fff',fontSize:18,fontWeight:'400',paddingHorizontal:10,paddingTop:15}}>10th cross street , jayanagar 4th blok.</Text>
      //   </View>
      // <View style={{borderWidth:0.5,borderColor:'#fff'}}/>
      // <View style={{borderWidth:0,borderRadius:12,flexDirection:'row',marginTop:10,
      //               alignItems:'center',paddingVertical:12,
      //               paddingHorizontal:10,backgroundColor:'#fff',borderColor:'#fff'}}>
            {/* <FontAwesome name={'search'} style={{}} size={20} color={'#C0C0C0'}/> */}
//             <Image source={require('../assets/images/search.png')} style={{height:18,width:18,marginTop:0}}resizeMode={'contain'}/>
//             <Text style={{color:'#C0C0C0',fontSize:12,fontWeight:'400',paddingHorizontal:10}}>How can we help you with today?</Text>
//       </View>
//     </View>
// </View> */}
