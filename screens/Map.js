import React, { useState } from "react";
import { View, Text,Image } from "react-native";

import MapView, { Marker ,PROVIDER_GOOGLE} from "react-native-maps";

const CustomMarker = () => (
  <View
    style={{

    }}
  >
    <Image source={require('../assets/images/maplocation.png')} style={{height:25,width:25}}resizeMode={'contain'}/>
  </View>
);

const Map = () => {
  const [region, setRegion] = useState({
    latitude: 52.5200066,
    longitude: 13.404954,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005
  });

  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={{ flex: 1 }}
      region={region}
      showsUserLocation
      onRegionChangeComplete={region => setRegion(region)}
    >
      <Marker coordinate={{ latitude: 52.5200066, longitude: 13.404954 }}>
        <CustomMarker />
      </Marker>
    </MapView>
  );
};

export default Map;
