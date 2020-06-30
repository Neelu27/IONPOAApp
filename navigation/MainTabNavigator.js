import React from 'react';
import { Platform ,Image,View,TouchableOpacity} from 'react-native';
import { FontAwesome ,Ionicons,MaterialCommunityIcons,MaterialIcons,SimpleLineIcons} from '@expo/vector-icons';

import { createAppContainer,createSwitchNavigator,withNavigation} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator,DrawerItems } from 'react-navigation-drawer';
import { createBottomTabNavigator } from 'react-navigation-tabs';


import HomeScreen from '../screens/HomeScreen';
import DrawerContent from '../components/DrawerContent';
import SearchScreen from '../screens/SearchScreen';
import LogInScreen from '../screens/LogInScreen';
import Register from '../screens/Register';
import OtpScreen from '../screens/OtpScreen';
import ProductDetails from '../screens/ProductDetails';
import ProductList from '../screens/ProductList';
import ServiceRepair from '../screens/ServiceRepair';
import MyCart from '../screens/MyCart';
import MyOrder from '../screens/MyOrder';
import ServicesDetails from '../screens/ServicesDetails';
import FilterDetails from '../screens/FilterDetails';
import HealthDeaclare from '../screens/HealthDeaclare';
import InstallUninstall from '../screens/InstallUninstall';
import MyWishlist from '../screens/MyWishlist';
import  SlotAllotment from '../screens/SlotAllotment';
import Paymentscreen from '../screens/Paymentscreen';
import MyAddress from '../screens/MyAddress';
import Address from '../screens/Address';
import BookingAccepted from '../screens/BookingAccepted';
import Bookings from '../screens/Bookings';
import ReferEarn from '../screens/ReferEarn';
import HelpScreen from '../screens/HelpScreen';
import PurifierScreen from '../screens/PurifierScreen';
import RaiseConcern from '../screens/RaiseConcern';
import SelectVarient from '../screens/SelectVarient';
import CheckoutScreen from '../screens/CheckoutScreen';
import OrderPlaced from '../screens/OrderPlaced';
import OrderPlacedv2 from '../screens/OrderPlacedv2';
import RegisterV2 from '../screens/RegisterV2';
import ProfileScreen from '../screens/ProfileScreen';

import { createSharedElementStackNavigator } from 'react-navigation-shared-element'
import { createFluidNavigator, Transition } from 'react-navigation-fluid-transitions';
// import { useScreens as enableScreens } from 'react-native-screens';
import { enableScreens } from 'react-native-screens';

const stackNavigator = createStackNavigator(
  {
    HomeScreen: HomeScreen,
    SearchScreen:SearchScreen,
    ProductDetails: ProductDetails,
    ProductList:ProductList,
    ServiceRepair:ServiceRepair,
    MyCart:MyCart,
    MyOrder:MyOrder,
    ServicesDetails:ServicesDetails,
    FilterDetails:FilterDetails,
    HealthDeaclare:HealthDeaclare,
    InstallUninstall:InstallUninstall,
    SlotAllotment:SlotAllotment,
    Paymentscreen:Paymentscreen,
    MyAddress:MyAddress,
    Address:Address,
    BookingAccepted:BookingAccepted,
    Bookings:Bookings,
    ReferEarn:ReferEarn,
    HelpScreen:HelpScreen,
    PurifierScreen:PurifierScreen,
    RaiseConcern:RaiseConcern,
    SelectVarient:SelectVarient,
    CheckoutScreen:CheckoutScreen,
    OrderPlaced:OrderPlaced,
    OrderPlacedv2:OrderPlacedv2,
  },
  {
    initialRouteName: 'HomeScreen',
    headerMode:'none',
    defaultNavigationOptions:{
      cardStyle:{
        backgroundColor:'transparent'
      }
    }
  }
);

stackNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = false;
  return {
    tabBarVisible,
  };
};

const wishlistNavigator = createStackNavigator(
  {
    MyWishlist:MyWishlist,
  },
  {
    initialRouteName: 'MyWishlist',
  }
);

wishlistNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = false;
  return {
    tabBarVisible,
  };
};

const cartNavigator = createStackNavigator(
  {
    MyCart:MyCart,
  },
  {
    initialRouteName: 'MyCart',
  }
);

cartNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = false;
  return {
    tabBarVisible,
  };
};

const TabNavigator = createBottomTabNavigator({
  HomeScreen: stackNavigator,
  MyWishlist: wishlistNavigator,
  MyCart:cartNavigator,
});

const LogInStack = createStackNavigator({
   LogInScreen:LogInScreen,
   OtpScreen: OtpScreen,
   // Register:Register,
   RegisterV2:RegisterV2,
   ProfileScreen:ProfileScreen
},
{
  initialRouteName: 'LogInScreen',
});

const drawerNavigator = createDrawerNavigator({
  LogInStack:{
    screen:LogInStack,

    navigationOptions:{
      drawerLabel:()=>null
    }
  },

    TabNavigator:{
      screen:TabNavigator,

      navigationOptions:{
        drawerLabel:()=>null
      }
    },
    Home:{
        screen:stackNavigator,
        navigationOptions: {
              drawerLabel: () => null

        }
    } ,

    MyOrder:{
        screen: HomeScreen,
        navigationOptions: {
            drawerLabel: () => null
       }
    },

    MyAddress:{
        screen: MyWishlist,
        navigationOptions: {
            drawerLabel: () => null
       }
    },
  },

  {
    drawerBackgroundColor:'#fff',
    drawerPosition:'left',
    drawerType:'slide',
    hideStatusBar:false,
    contentComponent:props =><DrawerContent  {...props}  />,
    contentOptions: {
        activeTintColor: '#ee5034',
        inactiveTintColor: '#efa834',
        itemsContainerStyle: {
            marginVertical: 0,
            paddingVertical:0
        },
        iconContainerStyle: {
            opacity: 1
        }
    },
    initialRouteName:'LogInStack'
  }
);

export default createAppContainer(drawerNavigator);
