import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState, useEffect, FC, useRef, useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from '../Themes/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MapView, {
  Marker,
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import RBSheet from 'react-native-raw-bottom-sheet';
import {
  TOKEN_KEY,
  USER_ID,
  horizontalLine,
  mapStyle,
  modalStoryValues,
} from '@constants/constValues';
import {SVGRenderer} from '@components/SVGRenderer';
import MapLayer from '@assets/svg/mapLayers.svg';
import NotificationIcon from '@assets/svg/bell.svg';
import MessageIcon from '@assets/svg/message.svg';
import EarthIcon from '@assets/svg/earth.svg';
import GroceryIcon from '@assets/svg/shop.svg';
import PharmacyIcon from '@assets/svg/pharmacy.svg';
import PeopleIcon from '@assets/svg/people.svg';
import FavoritesIcon from '@assets/svg/favorites.svg';
import FilterIcon from '@assets/svg/settings.svg';
import CrossIcon from '@assets/svg/cross.svg';
import {requestMapsPermission} from '@constants/Permission';
import {FeatherIcon, Ionicons, MaterialCommunityIcon} from '@themes/Icons';
import Fonts from '@themes/Fonts';
import {CustomTextField} from '@components/TextField/CustomTextField';
import InstaStory from 'react-native-insta-story';
import {exportStyles} from '@components/ExportStyles';
import Geolocation from 'react-native-geolocation-service';
import {useDispatch} from 'react-redux';
import {GetUserDataRequest} from '@redux/GetUserData/GetUserDataAction';
import {useSelector} from 'react-redux';
import {RootState} from '@redux/Reducers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeInstaStory} from '@components/StoryComponent/NativeInstaStory';
import CurrentLocation from '@assets/svg/currentLocation.svg';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import {dummyStoryData} from '@constants/storyData';
import {UserDetails} from '@redux/GetUserDetails/GetUserDetailsTypes';
import {MetaData} from '@redux/types';
import {GetUserListRequest} from '@redux/SuggestedUsersList/GetUserListAction';
import {UserList} from '@redux/SuggestedUsersList/GetUserListTypes';

interface Home {
  navigation: StackNavigationProp<any>;
}
interface nestedMapViewProps {
  icon: any;
  name: string;
  isChecked: boolean;
  expand?: boolean;
  onPress: () => void;
}

const LayerMapNestedView = ({
  icon,
  name,
  isChecked = true,
  expand = false,
  onPress,
}: nestedMapViewProps) => {
  return (
    <View style={styles.arrayMapView1Styles}>
      <View style={styles.arrayMapView2Styles}>
        <SVGRenderer touchable={false}>{icon}</SVGRenderer>
        <Text style={styles.arrayMapTextStyles}>{name}</Text>
      </View>
      {expand ? (
        <TouchableOpacity style={{padding: wp(1)}} onPress={onPress}>
          <FeatherIcon name="chevron-right" size={26} color={'white'} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={{padding: wp(1)}} onPress={onPress}>
          <Ionicons
            name="checkmark-circle-sharp"
            size={26}
            color={isChecked ? Colors.checkedGreen : 'white'}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export const Home: FC<Home> = ({navigation}: Home) => {
  const [token, setToken] = useState('');
  const refRBSheet = useRef();
  const mapRef = useRef(null);
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state?.getUserData);
  const userDetails: UserDetails[] = useSelector(
    (state: RootState) => state?.getUserDetails?.data,
  );
  const userList: UserList[] = useSelector(
    (state: RootState) => state?.getUserList?.data,
  );

  const [imageTrack, setImageTrack] = useState(true);
  const [allMap, setAllMap] = useState(true);
  const [open, setOpen] = useState(true);
  const [userId, setUserId] = useState('');
  const [searchText, setSearchText] = useState('');
  const [streaming, setStreaming] = useState(true);
  const [activeHighlights, setActiveHighlights] = useState(true);
  const [groceries, setGroceries] = useState(true);
  const [pharmacy, setPharmacy] = useState(true);
  const [people, setPeople] = useState(true);
  const [favorites, setFavorites] = useState(true);
  const [isExpandable, setExpandable] = useState(false);
  const [searchPressed, setSearchPress] = useState(false);
  const [nestedExpandableText, setExpandableText] = useState('');
  const [curtLat, setCurLat] = useState(0);
  const [curtLong, setCurLong] = useState(0);
  const [openModal, setModalVisible] = useState(false);
  const [storyData, setStoryData] = useState(modalStoryValues);
  const [curLoc, setCurLoc] = useState<MetaData>();

  let jsonData = userData?.data;

  const newDataArray: Array<any> = useMemo(() => {
    const userDataArray: any[] = [];
    userDataArray.push(userData?.data);

    if (jsonData !== undefined && userDataArray?.length > 0) {
      for (const userId in jsonData) {
        if (jsonData.hasOwnProperty(userId)) {
          const userObjects = jsonData[userId];
          // Filter out objects where metadata is undefined
          const filteredObjects = userObjects.filter(
            (obj: any) =>
              obj.metadata !== undefined && obj.story_media !== undefined,
          );
          // Update the user's array with filtered objects
          jsonData[userId] = filteredObjects;
        }
      }

      //To remove empty objects:
      for (let key in jsonData) {
        if (jsonData[key].length === 0) {
          delete jsonData[key];
        }
      }

      // Initialize an empty array to store the reformatted data
      const reformattedData: {
        userId: string;
        metadata: any;
        story_media: any;
      }[] = [];
      // Iterate over each key-value pair in the JSON object
      for (const key in jsonData) {
        if (jsonData?.hasOwnProperty(key)) {
          let lastIndex = jsonData[key].length - 1;
          let lastObject = jsonData[key][lastIndex];

          if (lastIndex !== undefined && lastObject !== undefined) {
            //Checks if the metadata and story_media field are inside the object or not
            if (lastObject?.metadata && lastObject?.story_media) {
              // Extract metadata and story_media from the last index of the array
              const {userId, metadata, story_media} = lastObject;
              // Add metadata and story_media to the reformatted data array
              reformattedData.push({userId, metadata, story_media});
            } else {
              // Extract metadata and story_media from the second last index of the array if couldn't find those fields inside
              lastObject = jsonData[key][lastIndex--];
              // Extract metadata and story_media from the first index of the array
              const {userId, metadata, story_media} = lastObject;
              // Add metadata and story_media to the reformatted data array
              reformattedData.push({userId, metadata, story_media});
            }
          }
        }
      }

      return reformattedData;
    } else {
      return [];
    }
  }, [userData?.data, jsonData]);

  function topSearchView() {
    return (
      <TouchableOpacity
        onPress={() => {
          setSearchPress(true);
          refRBSheet?.current?.open();
        }}
        style={styles.searchBarStyles}>
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
            <TouchableOpacity
              style={{padding: wp(1)}}
              onPress={() => {
                isExpandable
                  ? setExpandable(false)
                  : refRBSheet?.current?.close();
              }}>
              <MaterialCommunityIcon name="close-circle" size={28} />
            </TouchableOpacity>
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
                  setExpandableText('People');
                },
              })}
              {LayerMapNestedView({
                icon: <FavoritesIcon />,
                name: 'Favorites',
                isChecked: favorites,
                expand: true,
                onPress: () => {
                  setExpandable(true);
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

  function searchBottomSheetView() {
    return (
      <View style={{alignItems: 'center', marginVertical: hp(1)}}>
        <View style={{flexDirection: 'row'}}>
          <CustomTextField
            showIcon={true}
            placeHolder="Search"
            value={searchText}
            onChangeText={val => {
              setSearchText(val);
            }}
            icon={<FeatherIcon name="search" size={24} color={'white'} />}
            containerStyle={{
              height: hp(4),
              width: wp(85),
            }}
            textInputStyle={{
              width: wp(75),
              height: hp(5),
              marginLeft: wp(2),
            }}
          />
          <View style={styles.filterViewStyles}>
            <SVGRenderer
              onPress={() => {
                searchText.length >= 3 && setSearchText('');
              }}>
              {searchText.length >= 3 ? <CrossIcon /> : <FilterIcon />}
            </SVGRenderer>
          </View>
        </View>
        <InstaStory
          data={dummyStoryData}
          duration={5}
          unPressedBorderColor={Colors.textBlue}
          style={{alignSelf: 'flex-start'}}
          avatarImageStyle={{height: hp(11.5), width: wp(19), borderRadius: 4}}
          avatarWrapperStyle={exportStyles.avatarSquareWrapper}
          unPressedAvatarTextColor={'#ffff'}
          pressedAvatarTextColor={Colors.liteGrey}
          showAvatarText={false}
        />
      </View>
    );
  }

  function getCurrentPosition() {
    try {
      Geolocation.getCurrentPosition(
        position => {
          setCurLat(position.coords.latitude);
          setCurLong(position.coords.longitude);
          userDetails?.length > 0
            ? setCurLoc({
                latitude: userDetails[0]?.metaData?.latitude,
                longitude: userDetails[0]?.metaData?.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              })
            : setCurLoc({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              });
        },
        error => {
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        //Time to obtain current location, if it couldn't get until 15secs then this function will terminate
      );
    } catch (error) {}
  }

  async function getToken() {
    const val = await AsyncStorage.getItem(TOKEN_KEY);
    setToken(val!);
    const val2 = await AsyncStorage.getItem(USER_ID);
    setUserId(val2!);
  }

  useEffect(() => {
    getToken();
    requestMapsPermission();
    dispatch(GetUserDataRequest({token: token}));
    dispatch(GetUserListRequest({token: token}));
    changeNavigationBarColor('transparent');
    return () => {
      changeNavigationBarColor('transparent');
    };
  }, [token]);

  useEffect(() => {
    setTimeout(() => {
      setImageTrack(false);
    }, 8000);
  }, [imageTrack]);

  useEffect(() => {
    getCurrentPosition();
  }, [curtLat, curtLong, mapRef]);

  // console.log('Current lat long: ', curLoc);

  return (
    <SafeAreaView style={styles.container}>
      {storyData.length > 0 && (
        <NativeInstaStory
          openModal={openModal}
          setModalVisible={setModalVisible}
          content={storyData}
          setContent={setStoryData}
        />
      )}
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          container: {
            height: searchPressed ? hp(92) : isExpandable ? hp(20) : hp(48),
            backgroundColor: '#22052C',
            borderRadius: wp(5),
          },
          draggableIcon: {
            width: wp(12),
            backgroundColor: searchPressed
              ? Colors.primaryColor
              : 'transparent',
          },
        }}>
        {searchPressed ? searchBottomSheetView() : bottomSheetView()}
      </RBSheet>
      <View style={styles.mapContainer}>
        {curLoc !== undefined && curLoc?.latitude?.toString().length > 0 && (
          <MapView
            ref={mapRef}
            style={styles.map}
            // mapType={Platform.OS === 'android' ? 'none' : 'standard'}
            loadingEnabled={newDataArray?.length > 0 ? true : false}
            // showsUserLocation={true}
            followsUserLocation={true}
            // showsMyLocationButton={true}
            // provider={PROVIDER_GOOGLE}
            provider={
              Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT
            }
            customMapStyle={mapStyle}
            initialRegion={curLoc}>
            {newDataArray?.length > 0 &&
              newDataArray?.map((val, i: number) => {
                // console.log('Show data: ', val);
                return (
                  <Marker
                    onPress={index => {
                      setStoryData([]);
                      const reformattedData: any[] = [];
                      jsonData[val?.userId].forEach(obj => {
                        reformattedData.push({
                          content: obj.story_media,
                          type: 'image',
                          finish: 0,
                        });
                      });
                      setStoryData(prevData => [
                        ...prevData,
                        ...reformattedData,
                      ]);
                      setModalVisible(true);
                    }}
                    key={i}
                    coordinate={val?.metadata}
                    tracksViewChanges={imageTrack}>
                    <Image
                      source={{
                        uri: val?.story_media,
                      }}
                      style={styles.markerImageStyles}
                    />
                    <SVGRenderer
                      style={{paddingLeft: wp(3.7), paddingTop: hp(0.5)}}>
                      <CurrentLocation />
                    </SVGRenderer>
                  </Marker>
                );
              })}
          </MapView>
        )}
        <View style={styles.topViewStyles}>
          <SVGRenderer
            onPress={() => {
              setSearchPress(false);
              refRBSheet?.current?.open();
            }}>
            <MapLayer />
          </SVGRenderer>
          {topSearchView()}
          <View style={styles.endIconStyles}>
            <SVGRenderer onPress={() => {}} style={{padding: wp(1)}}>
              <NotificationIcon />
            </SVGRenderer>
            {token?.length > 0 &&
              userId?.length > 0 &&
              userList?.length > 0 && (
                <SVGRenderer
                  onPress={() => {
                    navigation.navigate('ChatList', {
                      token: token,
                      userId: userId,
                    });
                  }}
                  style={{
                    padding: wp(1),
                    marginRight: wp(-4),
                    marginLeft: wp(2),
                  }}>
                  <MessageIcon />
                </SVGRenderer>
              )}
          </View>
        </View>
        {newDataArray?.length > 0 && (
          <TouchableHighlight
            onPress={() => {
              setImageTrack(true);
              dispatch(GetUserDataRequest({token: token}));
              dispatch(GetUserListRequest({token: token}));
            }}
            style={[styles.gpsBackground, exportStyles.shadowProp]}>
            <Ionicons name="refresh" size={26} />
          </TouchableHighlight>
        )}
        {/* {curtLat !== 0 && (
          <TouchableHighlight
            onPress={() => {
              mapRef?.current?.animateToRegion({
                latitude: curtLat,
                longitude: curtLong,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              });
            }}
            style={[styles.gpsBackground, exportStyles.shadowProp]}>
            <MaterialIcon name="my-location" size={26} />
          </TouchableHighlight>
        )} */}
      </View>
    </SafeAreaView>
  );
};

const circle = 55;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#242f3e',
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
    marginTop: wp(10),
    marginHorizontal: wp(2),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchBarStyles: {
    flexDirection: 'row',
    backgroundColor: Colors.liteGrey,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.5,
    marginLeft: wp(6),
    marginTop: hp(Platform.OS === 'ios' ? 1 : 0),
  },
  searchTextStyles: {
    maxWidth: wp(40),
    fontSize: hp(1.5),
    color: 'white',
    textAlign: 'center',
    marginHorizontal: wp(1),
    paddingRight: wp(2),
  },
  searchViewStyles: {
    flexDirection: 'row',
    marginHorizontal: wp(2),
    marginVertical: hp(Platform.OS === 'android' ? 0.8 : 0.5),
    alignItems: 'center',
  },
  textViewStyles: {
    width: wp(0.5),
    height: hp(2),
    marginHorizontal: wp(1),
    backgroundColor: Colors.fadeWhite,
    zIndex: 10,
  },
  endIconStyles: {
    flexDirection: 'row',
    justifyContent: 'space-around',
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
  markerImageStyles: {
    height: hp(8),
    width: wp(12),
    borderRadius: 8,
  },
  arrayMapTextStyles: {
    fontSize: hp(1.8),
    color: 'white',
    marginLeft: wp(2.5),
  },
  filterViewStyles: {
    height: hp(3.5),
    width: wp(8),
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(1),
    marginLeft: wp(2),
    backgroundColor: Colors.textLight,
  },
  gpsBackground: {
    width: circle,
    height: circle,
    borderRadius: circle / 2,
    bottom: hp(Platform.OS === 'ios' ? 10 : 8),
    right: wp(2),
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.darkGrey,
    alignSelf: 'flex-end',
  },
});
