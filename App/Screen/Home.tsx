import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState, useEffect, FC, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableHighlight,
} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from '../Themes/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {data} from '../Constants/data';
import RBSheet from 'react-native-raw-bottom-sheet';
import {mapStyle} from '@constants/constValues';
import {SVGRenderer} from '@components/SVGRenderer';
import MapLayer from '@assets/svg/mapLayers.svg';
import NotificationIcon from '@assets/svg/bell.svg';
import MessageIcon from '@assets/svg/message.svg';
import EarthIcon from '@assets/svg/earth.svg';
import GroceryIcon from '@assets/svg/shop.svg';
import PharmacyIcon from '@assets/svg/pharmacy.svg';
import PeopleIcon from '@assets/svg/people.svg';
import FavoritesIcon from '@assets/svg/favorites.svg';
import {requestMapsPermission} from '@constants/Permission';
import {FeatherIcon, Ionicons, MaterialCommunityIcon} from '@themes/Icons';
import Fonts from '@themes/Fonts';
import {horizontalLine} from './Login';
interface Home {
  navigation: StackNavigationProp<any>;
  route?: any;
}

interface nestedMapViewProps {
  icon: any;
  name: string;
  isChecked: boolean;
  expand?: boolean;
  setCollapse?: React.Dispatch<React.SetStateAction<boolean>>;
  onPress: () => void;
}

const LayerMapNestedView = ({
  icon,
  name,
  isChecked = true,
  expand = false,
  setCollapse,
  onPress,
}: nestedMapViewProps) => {
  return (
    <View style={styles.arrayMapView1Styles}>
      <View style={styles.arrayMapView2Styles}>
        <SVGRenderer touchable={false}>{icon}</SVGRenderer>
        <Text style={styles.arrayMapTextStyles}>{name}</Text>
      </View>
      {expand ? (
        <TouchableHighlight style={{padding: wp(1)}} onPress={onPress}>
          <FeatherIcon name="chevron-right" size={26} color={'white'} />
        </TouchableHighlight>
      ) : (
        <TouchableHighlight style={{padding: wp(1)}} onPress={onPress}>
          <Ionicons
            name="checkmark-circle-sharp"
            size={26}
            color={isChecked ? Colors.checkedGreen : 'white'}
          />
        </TouchableHighlight>
      )}
    </View>
  );
};

export const Home: FC<Home> = ({navigation}: Home) => {
  const refRBSheet = useRef();
  const mapRef = useRef(null);
  const [imageTrack, setImageTrack] = useState(true);
  const [allMap, setAllMap] = useState(true);
  const [open, setOpen] = useState(true);
  const [streaming, setStreaming] = useState(true);
  const [activeHighlights, setActiveHighlights] = useState(true);
  const [groceries, setGroceries] = useState(true);
  const [pharmacy, setPharmacy] = useState(true);
  const [people, setPeople] = useState(true);
  const [favorites, setFavorites] = useState(true);
  const [isExpandable, setExpandable] = useState(false);
  const [nestedExpandableText, setExpandableText] = useState('');
  const [curLoc, setCurLoc] = useState({
    latitude: 30.7993,
    longitude: 76.9149,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const handlePress = () => {
    console.log('I am clicked!');
  };

  useEffect(() => {
    requestMapsPermission();
    setTimeout(() => {
      setImageTrack(false);
    }, 5000);
  }, [isExpandable]);

  function topSearchView() {
    return (
      <TouchableOpacity onPress={() => {}} style={styles.searchBarStyles}>
        <View style={styles.searchViewStyles}>
          <View style={{marginHorizontal: wp(1)}}>
            <FeatherIcon name="search" size={24} color={Colors.lightWhite} />
          </View>
          <View style={styles.textViewStyles} />
          <Text numberOfLines={1} style={styles.searchTextStyles}>
            Search Places
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  function bottomSheetView() {
    return (
      <ScrollView nestedScrollEnabled>
        <View style={{alignItems: 'center'}}>
          <View style={styles.layerTextViewStyles}>
            <Text style={styles.layerTextStyles}>
              {isExpandable ? nestedExpandableText : 'Layers on the map'}
            </Text>
            <TouchableHighlight
              style={{padding: wp(1)}}
              onPress={() => {
                isExpandable
                  ? setExpandable(false)
                  : refRBSheet.current.close();
              }}>
              <MaterialCommunityIcon
                name="close-circle"
                size={28}
                color="white"
              />
            </TouchableHighlight>
          </View>
          {!isExpandable ? (
            <View style={{alignItems: 'center'}}>
              {LayerMapNestedView({
                icon: <EarthIcon />,
                name: 'All Maps',
                isChecked: allMap,
                onPress: () => {
                  setAllMap(!allMap);
                },
              })}
              {LayerMapNestedView({
                icon: <EarthIcon />,
                name: 'Open',
                isChecked: open,
                onPress: () => {
                  setOpen(!open);
                },
              })}
              {LayerMapNestedView({
                icon: <EarthIcon />,
                name: 'Streaming',
                isChecked: streaming,
                onPress: () => {
                  setStreaming(!streaming);
                },
              })}
              {LayerMapNestedView({
                icon: <EarthIcon />,
                name: 'Active Highlights',
                isChecked: activeHighlights,
                onPress: () => {
                  setActiveHighlights(!activeHighlights);
                },
              })}
              {LayerMapNestedView({
                icon: <GroceryIcon />,
                name: 'Groceries',
                isChecked: groceries,
                onPress: () => {
                  setGroceries(!groceries);
                },
              })}
              {LayerMapNestedView({
                icon: <PharmacyIcon />,
                name: 'Pharmacy',
                isChecked: pharmacy,
                onPress: () => {
                  setPharmacy(!pharmacy);
                },
              })}
              <View style={{marginVertical: hp(2)}}>
                {horizontalLine(wp(100))}
              </View>

              {LayerMapNestedView({
                icon: <PeopleIcon />,
                name: 'People',
                isChecked: people,
                expand: true,
                onPress: () => {
                  setExpandable(true);
                  // setPeople(!people);
                  setExpandableText('People');
                },
              })}
              {LayerMapNestedView({
                icon: <FavoritesIcon />,
                name: 'Favorites',
                isChecked: favorites,
                expand: true,
                // setCollapse = true,
                onPress: () => {
                  setExpandable(true);
                  // setFavorites(!favorites);
                  setExpandableText('Favorites');
                },
              })}
            </View>
          ) : (
            <View>
              {LayerMapNestedView({
                icon: <PeopleIcon />,
                name: 'People',
                isChecked: people,
                onPress: () => {
                  setPeople(!people);
                },
              })}
              {LayerMapNestedView({
                icon: <FavoritesIcon />,
                name: 'Favorites',
                isChecked: favorites,
                onPress: () => {
                  setFavorites(!favorites);
                },
              })}
            </View>
          )}
        </View>
      </ScrollView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        height={isExpandable ? hp(20) : hp(40)}
        customStyles={{
          container: {
            backgroundColor: '#22052C',
            borderRadius: wp(5),
          },
          draggableIcon: {
            backgroundColor: 'transparent',
          },
        }}>
        {bottomSheetView()}
      </RBSheet>
      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          customMapStyle={mapStyle}
          initialRegion={curLoc}>
          {data.map((val, i) => {
            return (
              <Marker
                key={i}
                coordinate={val.coords}
                tracksViewChanges={imageTrack}>
                <TouchableOpacity onPress={handlePress}>
                  <Image
                    source={{uri: val.img}}
                    style={{width: hp(8), height: hp(8), borderRadius: 4}}
                    resizeMode="center"
                    resizeMethod="resize"
                  />
                </TouchableOpacity>
              </Marker>
            );
          })}
        </MapView>
        <View style={styles.topViewStyles}>
          <SVGRenderer
            onPress={() => {
              refRBSheet?.current?.open();
            }}>
            <MapLayer />
          </SVGRenderer>
          {topSearchView()}
          <View style={styles.endIconStyles}>
            <SVGRenderer onPress={() => {}} style={{padding: wp(1)}}>
              <NotificationIcon />
            </SVGRenderer>
            <SVGRenderer onPress={() => {}} style={{padding: wp(1)}}>
              <MessageIcon />
            </SVGRenderer>
          </View>
        </View>
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
  topViewStyles: {
    width: wp(94),
    flexDirection: 'row',
    position: 'absolute',
    padding: wp(2),
    marginTop: wp(5),
    marginHorizontal: wp(2),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchBarStyles: {
    flexDirection: 'row',
    backgroundColor: Colors.liteGrey,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.5,
  },
  searchTextStyles: {
    maxWidth: wp(40),
    fontSize: hp(1.5),
    color: 'white',
    textAlign: 'center',
    marginHorizontal: wp(2),
  },
  searchViewStyles: {
    flexDirection: 'row',
    marginHorizontal: wp(2),
    marginVertical: hp(0.5),
  },
  textViewStyles: {
    width: wp(0.5),
    height: hp(2),
    marginHorizontal: wp(1),
    backgroundColor: Colors.liteGrey,
  },
  endIconStyles: {
    width: wp(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  layerTextViewStyles: {
    width: wp(94),
    marginBottom: hp(1.5),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  layerTextStyles: {
    fontFamily: Fonts.robotoSemiBold,
    fontSize: hp(1.8),
    color: Colors.textBlue,
  },
  arrayMapView1Styles: {
    width: wp(94),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  arrayMapView2Styles: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp(1.2),
  },
  arrayMapTextStyles: {
    fontSize: hp(1.8),
    color: 'white',
    marginLeft: wp(2.5),
  },
});
