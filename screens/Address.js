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
import Map from '../screens/Map';
import MapExample from '../screens/MapExample';
import { MonoText } from '../components/StyledText';
import { Modalize } from 'react-native-modalize';
 // import MapView, { Marker } from "react-native-maps";
import FloatingInput from '../components/FloatingInput';

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

// const region=[{
// latitude: 51.5078788,
// longitude: -0.0877321,
// latitudeDelta: 0.009,
// longitudeDelta: 0.009
// }]
class Address extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {header:null}
  };

  constructor(props) {
    super(props);
    var item = props.navigation.getParam('item',null)

    this.state={
      item:item,
      address:'10th cross street,jayanagar 4th block,Bengaluru-560068',
      flat:'',
      name:'naveen kumar',
      AnimatedValue:new Animated.Value(0),
      show:false,
      underlay:false,
      selectedindex:0,
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
    // this.modalizeRef.open()
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

  address=()=>{
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
              <TouchableOpacity >
                <View style={[styles.shadow,{borderWidth:0,marginTop:15,marginLeft:15,marginRight:15,padding:15,backgroundColor:'#fff',borderRadius:0}]}>
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
            </TouchableOpacity>
            )}}/>
      </View>
    )
  }


  renderModal=()=>{

    return(
    <Modalize ref={(ref) =>{this.modalizeRef = ref}} modalStyle={styles.content__modal} handleStyle={{alignSelf: 'center',
       top: width*0.35,
       width: 45,
       height: 5,
       borderRadius: 5,alignItems:'center',
       backgroundColor: 'transparent',
     backDropColor:'transparent'}}

       alwaysOpen={width*0}
       onBackButtonPress={()=>{this.modalizeRef.close();this.props.navigation.goBack();}}
       handlePosition="inside">
          <View style={{}}>
            <View style={{marginVertical:15}}>
                      <View style={{flexDirection:'row',marginTop:25}}>
                        <View  style={[{width: width,alignItems:'center',justifyContent:'center',}]}>
                         <TouchableWithoutFeedback >
                          <Card containerStyle={[styles.shadow,{ width: width*0.7,margin:0,padding:5,height:height*0.35,borderRadius:5,borderWidth:0}]}>
                             <View style={{height:'100%',width:'100%'}}>
                                 <View style={{flex:1,alignItems:'center',justifyContent:'center',zIndex:1,}}>
                                  <FontAwesome name="check-circle" size={80} color="green" />
                               </View>
                               <View style={{flex:1,alignItems:'center',justifyContent:'center',marginBottom:10}}>
                                 <Text   style={{color:'#fff',fontSize:20,fontWeight:'700',paddingVertical:5,paddingHorizontal:15,}}>rrrrrrrrrrrrrrr</Text>
                                 <Text   style={{marginTop:10,fontSize:22,fontWeight:'700',marginTop:10}}>&#8377; 500</Text>
                               </View>
                             </View>
                          </Card>
                          </TouchableWithoutFeedback>
                        </View>
                      </View>
            <View style={{flex:1,marginTop:20,marginHorizontal:15}}>
                <TouchableOpacity onPress={()=>{this.modalizeRef.close();this.getUser();}} style={{backgroundColor:'#292a88',borderRadius:15,height:40,alignItems:'center',justifyContent:'center'}}>
                    <Text style={{fontSize:18,color:'#fff',fontWeight:'700'}}>Save Address</Text>
                </TouchableOpacity>
            </View>
           </View>
          </View>
          </Modalize>
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
                        <Text style={{color:'#fff',fontSize:18,fontWeight:'400',paddingHorizontal:10,paddingTop:10,paddingLeft:width*0.15}}>Address</Text>
                    </View>
                </View>
            </View>
            <View style={{paddingVertical:0,width:width,alignSelf:'center',borderWidth:0,height:width*0.35}}>
            <Map/>
            </View>
            {/* <View style={{paddingVertical:0,width:width,alignSelf:'center',borderWidth:0,height:width*0.35}}>
              <MapExample/>
            </View> */}

            {/* {this.renderModal()} */}
            <ScrollView style={[{flex:1,backgroundColor:'#fff'}]}>
              <View style={{flex:1,padding:20}}>
                <Text style={{fontSize:16,paddingVertical:20}}>Shipping Address</Text>
                {/* <View style={{flexDirection:'row',justifyContent:'space-between',margin:0}}>
                  <View>
                  <Text style={{fontSize:12,color:'#666666'}}numberOfLines={1}>10th cross street,jayanagar 4th block,</Text>
                  <Text style={{fontSize:12,color:'#666666'}}numberOfLines={1}>Bengaluru-560068</Text>
                 </View>
                  <Text style={{fontSize:12,color:'#224C94'}}>CHANGE</Text>
                </View> */}
                <TouchableOpacity onPress={()=>this.addressRef.focus()} activeOpacity={1.0} style={[styles.inputStyle,{flexDirection:'row',borderBottomWidth:1,marginTop:0,borderBottomLeftRadius:0,borderBottomRightRadius:0,backgroundColor:'#fff',padding:0}]}>

                   <View style={{flex:0.7,alignItems: 'flex-start',justifyContent: 'flex-start',marginLeft:0,height:'100%'}}>
                     <FloatingInput
                       value={this.state.address}
                       onChangeText={address => this.onChangeText(address)}
                       outputRange = {'#ffffff'}
                       passWord={false}
                       email={false}
                       type={true}
                       numberOfLines={2}
                       onRef={(ref) =>{this.addressRef = ref}}
                     />
                   </View>
                   <View style={{flex:0.3,alignItems: 'center',justifyContent: 'center'}}>
                     <Text style={{fontSize:12,color:'#224C94'}}>CHANGE</Text>
                   </View>

                 </TouchableOpacity>


                 <TouchableOpacity onPress={()=>this.flatRef.focus()} activeOpacity={1.0} style={[styles.inputStyle,{marginTop:0,borderBottomWidth:0.5,borderBottomLeftRadius:0,borderBottomRightRadius:0,backgroundColor:'#fff',padding:0}]}>

                    <View style={{flex:1,alignItems: 'flex-end',justifyContent: 'flex-end',marginLeft:0,height:'100%'}}>
                      <FloatingInput
                        label="Flat/building/Street"
                        value={this.state.flat}
                        onChangeText={flat => this.onChangeText(flat)}
                        outputRange = {'#ffffff'}
                        passWord={false}
                        email={false}
                        type={true}
                        onRef={(ref) =>{this.flatRef = ref}}
                      />
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={()=>this.nameRef.focus()} activeOpacity={1.0} style={[styles.inputStyle,{marginTop:0,borderBottomWidth:0.5,borderBottomLeftRadius:0,borderBottomRightRadius:0,backgroundColor:'#fff',padding:0}]}>
                     <View style={{flex:0.1,alignItems: 'center',justifyContent: 'center'}}>
                       <FloatingInput
                         value={'Mr'}

                         outputRange = {'#ffffff'}
                         passWord={false}
                         email={false}
                         type={true}
                         onRef={(ref) =>{this.nameRef = ref}}
                       />
                     </View>
                     <View style={{flex:0.9,alignItems: 'flex-end',justifyContent: 'flex-end',marginLeft:0,height:'100%'}}>
                       <FloatingInput
                         value={this.state.name}
                         onChangeText={name => this.onChangeText(name)}
                         outputRange = {'#ffffff'}
                         passWord={false}
                         email={false}
                         type={true}
                         onRef={(ref) =>{this.nameRef = ref}}
                       />
                     </View>
                   </TouchableOpacity>

                   <Text style={{fontSize:16,paddingVertical:20}}>Title</Text>
                   <TouchableOpacity onPress={()=>this.addressRef.focus()} activeOpacity={1.0} style={[styles.inputStyle,{flexDirection:'row',borderBottomWidth:1,marginTop:0,borderBottomLeftRadius:0,borderBottomRightRadius:0,backgroundColor:'#fff',padding:0}]}>

                      <View style={{flex:0.7,alignItems: 'flex-start',justifyContent: 'flex-start',marginLeft:0,height:'100%'}}>
                        <FloatingInput
                          value={'Home'}
                          onChangeText={address => this.onChangeText(address)}
                          outputRange = {'#ffffff'}
                          passWord={false}
                          email={false}
                          type={true}
                          numberOfLines={2}
                          onRef={(ref) =>{this.addressRef = ref}}
                        />
                      </View>
                    </TouchableOpacity>

              </View>
              <View style={{flexDirection:'row',justifyContent:'center'}}>
                <Text style={{fontSize:12}}>Billing address same as shipping address</Text>
              </View>
              <View style={{flex:1,marginTop:20,marginHorizontal:15}}>
                  <TouchableOpacity  onPress={()=>{this.props.navigation.goBack()}} style={{backgroundColor:'#033285',borderRadius:20,height:40,alignItems:'center',justifyContent:'center',alignSelf:'center'}}>
                      <Text style={{fontSize:18,color:'#fff',fontWeight:'400',paddingHorizontal:width*0.15}}>Save Address</Text>
                  </TouchableOpacity>
              </View>


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
  content__modal: {
  position:'absolute',
  top:width*0.6,
  left:0,right:0,
   shadowColor: '#000',
   shadowOffset: { width: 0, height: 6 },
   shadowOpacity: 3.84,
   shadowRadius: 16,
 },
 inputStyle:{
    height: 50,
    width:'100%',
    borderRadius:5,
    paddingHorizontal: 0,
    paddingVertical: 4,
    fontSize: 16,
    flexDirection: 'row',
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

export default connect(mapStateToProps, mapDispatchToProps)(Address);
