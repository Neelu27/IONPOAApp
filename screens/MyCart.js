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

class MyCart extends React.Component {

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

//   renderImages=()=>{
//     let position = Animated.divide(this.state.scrollX, width);
//     var rangeOfInput = []
//     var rangeOfOutput= []
//     if(this.state.item.images!=undefined){
//     this.state.item.images.forEach((item,idx)=>{
//       rangeOfInput.push(idx*width)
//       rangeOfOutput.push(idx*12)
//     })
//   }
//   if(rangeOfInput.length<2){
//     var rangeOfInput = [0,1*width]
//     var rangeOfOutput= [0,0]
//   }
//   let left = this.state.scrollX.interpolate({
//     inputRange:rangeOfInput,
//     outputRange: rangeOfOutput,
//     extrapolate: 'clamp',
//     useNativeDriver:true
//   });
//   const viewTranform ={
//     transform:[
//       {
//         translateY:this.state.AnimatedValue.interpolate({
//           inputRange:[0,0.5,1],
//           outputRange:[100,100,0],
//         })
//     },
//   ]
// }
//     return(
//
//       <View style={{flex:1}}>
//       <ScrollView
//               horizontal={true}
//               pagingEnabled={true}
//               showsHorizontalScrollIndicator={false}
//               ref={(node) => {this.scrollImage = node}}
//               onScroll={Animated.event(
//               [{ nativeEvent: { contentOffset: { x: this.state.scrollX } } }] )}
//               scrollEventThrottle={16}
//               onMomentumScrollEnd={this.handlePageChange}
//               >
//               {this.state.item.images.map((item, i) => {
//                   return (
//                     <View key={i} style={{backgroundColor: '#fff',width:width*1,paddingVertical: 5,paddingHorizontal: 25,paddingTop: 0,alignItems: 'center',justifyContent: 'center'}}>
//                     <TouchableWithoutFeedback onPress={()=>{}}>
//                      <Image key={i} style={{width:width*0.7,height:width*0.7,resizeMode: 'contain'}}   source={item}/>
//                     </TouchableWithoutFeedback>
//                     </View>
//                   );
//                 })}
//                 {this.state.item.images.length<1&&
//                   <View style={{backgroundColor: '#fff',width:width*1,height:(width*0.6),paddingVertical: 5,paddingHorizontal: 25,paddingTop: 0,}} >
//                   </View>
//                 }
//             </ScrollView>
//             <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//                 <View
//                 style={{ flexDirection: 'row' }}>
//                 {this.state.item.images.map((_, i) => {
//                   let opacity = position.interpolate({
//                      inputRange: [i - 1, i, i + 1],
//                      outputRange: [0.3, 1, 0.3],
//                      extrapolate: 'clamp'
//                    });
//                   return (
//                     <Animated.View
//                       key={i}
//                       style={{ height: 6, width: 6, backgroundColor: '#595959', margin: 3, borderRadius: 5,opacity:0.3 }}
//                     />
//                   );
//                 })}
//                 {this.state.item.images.length>0&&
//                   <Animated.View style={{position:'absolute',left:0,top:0, height: 6, width: 6, backgroundColor: '#000', margin: 3, borderRadius: 5 ,  transform: [{translateX:left}]}}
//                   />
//
//                 }
//                 </View>
//                 {!this.state.show&&
//                   <Animated.View style={[viewTranform,{position:'absolute',bottom:100,right:60,width:50,height:50,}]}>
//                  <TouchableWithoutFeedback onPress={()=>{this.setState({like:!this.state.like})}}>
//                   <Card containerStyle={[styles.shadow,{justifyContent:'center',alignItems:'center',padding:0,margin:0,borderWidth:0,borderRadius:25,width:50,height:50,}]}>
//                       {this.state.like?<FontAwesome name={"heart"} size={25} color={'#EF2929'} />:<FontAwesome name={"heart-o"} size={25} color={'#000'} />}
//                   </Card>
//                   </TouchableWithoutFeedback>
//                 </Animated.View>
//               }
//               </View>
//       </View>
//     )
//   }

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

//  modalComponent=()=>{
//
//   return(
//
//
//       <ModalBox useNativeDriver={true}
//           style={{height:height*0.75,marginTop:Constants.statusBarHeight,borderTopLeftRadius:15,borderTopRightRadius:15,}}
//           position={'bottom'}
//           ref={'attachModal'}
//           swipeToClose={this.state.show} swipeArea={50}
//           isOpen={this.state.show}
//           onClosed={()=>{this.hideModal()}}>
//           <ScrollView style={{}} contentContainerStyle={{}}>
//              <View style={{flexDirection:'row',paddingVertical:15,borderBottomWidth:1,borderColor:'#f2f2f2'}}>
//                 <View style={{flex:0.4,justifyContent:'center'}}>
//                     <Image source={this.state.item.img} style={{height:width*0.4,width:width*0.4}} />
//                 </View>
//                 <View style={{flex:0.6,justifyContent:'center',paddingHorizontal:10}}>
//                   <Text style={{color:'#000',fontSize:16,fontWeight:'600',}} numberOfLines={2}>{this.state.item.name}</Text>
//                   <Text style={{color:'red',fontSize:16,fontWeight:'600',textDecorationLine: 'line-through', textDecorationStyle: 'solid'}} numberOfLines={1}>&#8377; {this.state.item.mrp}</Text>
//                   <Text style={{color:'#000',fontSize:16,fontWeight:'700',}} numberOfLines={1}>&#8377; {this.state.item.price}</Text>
//                 </View>
//              </View>
//              <View style={{paddingVertical:15}}>
//                 <View style={{paddingHorizontal:15}}>
//                    <Text style={{color:'#000',fontSize:18,textAlign:'center',fontWeight:'700'}}>Select Variant</Text>
//                    {this.state.items.length>0&&
//                     <View style={{flexDirection: 'row',marginVertical: 20,flexWrap: 'wrap'}}>
//                     {this.state.items.map((item,index)=>(
//                       <TouchableOpacity onPress={()=>{this.setState({selcted:item,selectedindex:index})}} style={{backgroundColor:this.state.selectedindex==index?'#000':'#fff',paddingVertical:7,paddingHorizontal:15,borderRadius:15,margin:7,borderWidth:1,borderColor:this.state.selectedindex==index?'#000':'grey'}}>
//                         <Text style={{fontSize:16,color:this.state.selectedindex==index?'#fff':'#000',}} numberOfLines={1}>{item}</Text>
//                       </TouchableOpacity>
//                     ))
//                     }
//                     </View>
//                   }
//                 </View>
//                 <View style={{justifyContent:'center',alignItems:'center',height:55,width:width}} >
//                   <TouchableOpacity onPress={()=>{}} style={{flexDirection:'row',height:40,paddingHorizontal:15,justifyContent:'center',alignItems:'center',backgroundColor:'#000',borderRadius:20,borderWidth:1,borderColor:'#000'}} >
//                       <Text style={{color:'#fff',fontSize:16}}>Add To Cart</Text>
//                       <Image source={require('../assets/images/shopping-basket.png')}  style={{height:20,width:20,marginLeft:10}} />
//                   </TouchableOpacity>
//                 </View>
//              </View>
//           </ScrollView>
//       </ModalBox>
//   )
//
// }

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

myCart=()=>{
  return(
    <View>
      <View style={{height:width*0.25,borderWidth:0.1,flexDirection:'row',margin:10,padding:10,backgroundColor:'#fff',borderRadius:10}}>
        <View style={{flex:0.3,borderWidth:0}}>
          <Image source={require('../assets/images/ag_marvel_image.jpg')} style={{height:'100%',width:'100%'}}/>
        </View>
        <View style={{flex:0.5,borderWidth:0,paddingHorizontal:4}}>
          <Text style={{color:'#000',fontSize:14,textAlign:'left',}}>Automatic ABS plastic </Text>
          <Text style={{color:'#000',fontSize:14,textAlign:'left',}}>Eutoriia Water purifier </Text>
          <Text style={{color:'#000',fontSize:14,textAlign:'left',textDecorationStyle: 'solid',paddingTop:4}}>&#8377; 20,000</Text>
          <Text style={{color:'red',fontSize:12,textAlign:'left',textDecorationLine: 'line-through', textDecorationStyle: 'solid'}}>&#8377; 21,000</Text>
        </View>
        <View style={{flex:0.2,borderWidth:0}}>
          <View style={{borderWidth:0,flexDirection:'row',justifyContent:'space-between',paddingHorizontal:4}}>
              <TouchableOpacity style={{borderWidth:1,borderColor:'red',paddingHorizontal:4}}
                onPress={()=>{this.minus()}}>
                <Text style={{fontSize:14,paddingHorizontal:1}}>-</Text></TouchableOpacity>
              <Text>{this.state.count}</Text>
              <TouchableOpacity style={{borderWidth:1,paddingHorizontal:4,borderColor:'red',}}
                  onPress={()=>{this.plus()}}>
                <Text style={{fontSize:14,paddingHorizontal:1}}>+</Text></TouchableOpacity>
          </View>
          <Text style={{position:'absolute',bottom:0,right:0,color:'red',fontSize:12,textAlign:'right',textDecorationStyle: 'solid',justifyContent:'flex-end'}}>Remove</Text>
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
                        <Text style={{color:'#fff',fontSize:18,fontWeight:'400',paddingHorizontal:10,paddingTop:15,paddingLeft:width*0.37}}>My Cart</Text>
                    </View>
                </View>
            </View>

            <ScrollView style={[{flex:1}]}>
              <View style={[{height:height-(width*0.92),}]}>
                {this.myCart()}
              </View>
              <View style={{height:150}}/>
            </ScrollView>
            <View style={{borderWidth:0,position:'absolute',left:0,right:0,bottom:40,alignItems:'center',justifyContent:'center'}}>
              <TouchableOpacity style={{borderRadius:17,alignSelf:'center',justifyContent:'center',borderWidth:0,backgroundColor:'#033285',}}
                onPress={()=>{this.props.navigation.navigate('MyOrder')}}>
                <Text style={{color:'#fff',paddingVertical:10,fontSize:16,textAlign:'center',paddingHorizontal:25}}>Proceed to checkout</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(MyCart);
