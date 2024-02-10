import {StackNavigationProp} from '@react-navigation/stack';
import {AntDesignIcon} from '../Themes/Icons';
import React, {useState, useEffect, FC, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Pressable,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from '../Themes/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {data} from '../Constants/data';
import RBSheet from 'react-native-raw-bottom-sheet';

interface Home {
  navigation: StackNavigationProp<any>;
  route?: any;
}

const homeIcon = AntDesignIcon({
  name: 'home',
  color: Colors.infoMessage,
  size: wp(4),
});

export const Home: FC<Home> = ({navigation}: Home) => {
  const refRBSheet = useRef();
  const [imageTrack, setImageTrack] = useState(true);
  useEffect(() => {
    // refRBSheet.current.open();
    setTimeout(() => {
      setImageTrack(false);
    }, 5000);
  }, []);
  const mapRef = useRef(null);
  const [dark, setDark] = useState(true);
  const [curLoc, setCurLoc] = useState({
    latitude: 30.7993,
    longitude: 76.9149,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const handlePress = () => {
    console.log('I am clicked!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          backgroundColor: 'white',
          height: hp(2),
          width: wp(2),
          position: 'absolute',
        }}
      />
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        height={hp(20)}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          container: {
            backgroundColor: '#22052C',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
        <View></View>
      </RBSheet>
      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          customMapStyle={dark ? mapStyle : null}
          initialRegion={curLoc}>
          {data.map((val, i) => {
            return (
              <Marker
                key={i}
                coordinate={val.coords}
                tracksViewChanges={imageTrack}>
                <Pressable onPress={handlePress}>
                  <Image
                    source={{uri: val.img}}
                    style={{width: hp(8), height: hp(8), borderRadius: 4}}
                    resizeMode="center"
                    resizeMethod="resize"
                  />
                </Pressable>
              </Marker>
            );
          })}
        </MapView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
    height: hp(100),
    marginBottom: hp(1),
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

const mapStyle = [
  {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
  {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
  {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{color: '#263c3f'}],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{color: '#6b9a76'}],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{color: '#38414e'}],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{color: '#212a37'}],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{color: '#9ca5b3'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{color: '#746855'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{color: '#1f2835'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{color: '#f3d19c'}],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{color: '#2f3948'}],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{color: '#17263c'}],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{color: '#515c6d'}],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{color: '#17263c'}],
  },
];

// const mapStyle = [
//   {
//     elementType: 'geometry',
//     stylers: [
//       {
//         color: '#242f3e',
//       },
//     ],
//   },
//   {
//     elementType: 'geometry.fill',
//     stylers: [
//       {
//         saturation: -5,
//       },
//       {
//         lightness: -5,
//       },
//     ],
//   },
//   {
//     elementType: 'labels.icon',
//     stylers: [
//       {
//         visibility: 'on',
//       },
//     ],
//   },
//   {
//     elementType: 'labels.text.fill',
//     stylers: [
//       {
//         color: '#757575',
//       },
//     ],
//   },
//   {
//     elementType: 'labels.text.stroke',
//     stylers: [
//       {
//         color: '#242f3e',
//       },
//     ],
//   },
//   {
//     featureType: 'administrative',
//     elementType: 'geometry',
//     stylers: [
//       {
//         color: '#757575',
//       },
//     ],
//   },
//   {
//     featureType: 'administrative.country',
//     elementType: 'labels.text.fill',
//     stylers: [
//       {
//         color: '#746855',
//       },
//     ],
//   },
//   {
//     featureType: 'administrative.land_parcel',
//     stylers: [
//       {
//         visibility: 'on',
//       },
//     ],
//   },
//   {
//     featureType: 'administrative.locality',
//     elementType: 'labels.text.fill',
//     stylers: [
//       {
//         color: '#d59563',
//       },
//     ],
//   },
//   {
//     featureType: 'poi',
//     elementType: 'labels.text.fill',
//     stylers: [
//       {
//         color: '#d59563',
//       },
//     ],
//   },
//   {
//     featureType: 'poi.business',
//     stylers: [
//       {
//         visibility: 'on',
//       },
//     ],
//   },
//   {
//     featureType: 'poi.park',
//     elementType: 'geometry',
//     stylers: [
//       {
//         color: '#263c3f',
//       },
//     ],
//   },
//   {
//     featureType: 'poi.park',
//     elementType: 'labels.text',
//     stylers: [
//       {
//         visibility: 'on',
//       },
//     ],
//   },
//   {
//     featureType: 'poi.park',
//     elementType: 'labels.text.fill',
//     stylers: [
//       {
//         color: '#6b9a76',
//       },
//     ],
//   },
//   {
//     featureType: 'poi.park',
//     elementType: 'labels.text.stroke',
//     stylers: [
//       {
//         color: '#1B1B1B',
//       },
//     ],
//   },
//   {
//     featureType: 'road',
//     stylers: [
//       {
//         visibility: 'on',
//       },
//     ],
//   },
//   {
//     featureType: 'road',
//     elementType: 'geometry.fill',
//     stylers: [
//       {
//         color: '#2C2C2C',
//       },
//     ],
//   },
//   {
//     featureType: 'road',
//     elementType: 'labels.text.fill',
//     stylers: [
//       {
//         color: '#8A8A8A',
//       },
//     ],
//   },
//   {
//     featureType: 'road.arterial',
//     elementType: 'geometry',
//     stylers: [
//       {
//         color: '#373737',
//       },
//     ],
//   },
//   {
//     featureType: 'road.highway',
//     elementType: 'geometry',
//     stylers: [
//       {
//         color: '#3C3C3C',
//       },
//     ],
//   },
//   {
//     featureType: 'road.highway.controlled_access',
//     elementType: 'geometry',
//     stylers: [
//       {
//         color: '#4E4E4E',
//       },
//     ],
//   },
//   {
//     featureType: 'road.local',
//     elementType: 'labels.text.fill',
//     stylers: [
//       {
//         color: '#616161',
//       },
//     ],
//   },
//   {
//     featureType: 'transit',
//     elementType: 'labels.text.fill',
//     stylers: [
//       {
//         color: '#757575',
//       },
//     ],
//   },
//   {
//     featureType: 'water',
//     elementType: 'geometry',
//     stylers: [
//       {
//         color: '#17263c',
//       },
//     ],
//   },
//   {
//     featureType: 'water',
//     elementType: 'labels.text.fill',
//     stylers: [
//       {
//         color: '#3D3D3D',
//       },
//     ],
//   },
// ];
