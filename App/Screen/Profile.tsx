import {StackNavigationProp} from '@react-navigation/stack';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect, FC} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {CircularImage, exportStyles} from '@components/ExportStyles';
import {
  coverImageLink,
  expandableData,
  profileImageLink,
} from '@constants/constValues';
import {
  AntDesignIcon,
  FeatherIcon,
  FontistoIcons,
  Ionicons,
  SimpleLineIcons,
} from '@themes/Icons';
import {Colors} from '@themes/Colors';
import {LoginButton} from '@components/Buttons/LoginButton';
import InstaStory from 'react-native-insta-story';
import {dummyStoryData} from '@constants/storyData';
import {TabView, TabBar} from 'react-native-tab-view';
import {feedData} from '@constants/data';
import {FirstRoute} from './ProfileRoutes/FirstRoute';
import {useSelector} from 'react-redux';
import {RootState} from '@redux/Reducers';
import {UserDetails} from '@redux/GetUserDetails/GetUserDetailsTypes';

interface Profile {
  navigation: StackNavigationProp<any>;
  route?: any;
}

export const Profile: FC<Profile> = ({navigation}: Profile) => {
  const iconSize = 18;
  const [index, setIndex] = React.useState(0);
  const [isDataAvailable, setDataAvailability] = useState(false);
  const userDetails: UserDetails[] = useSelector(
    (state: RootState) => state?.getUserDetails?.data,
  );
  const [routes] = React.useState([
    {key: 'first', title: 'Reels'},
    {key: 'second', title: 'Feed'},
    {key: 'third', title: 'Saved'},
    {key: 'fourth', title: 'Liked'},
    {key: 'fifth', title: 'Reposted'},
  ]);

  //Aligns data in GridView: It will add a new object in the arrayList to format the data structure in the UI
  const itemCount = feedData?.length % 4;

  const [firstRouteData, setFirstRouteData] = useState(
    itemCount > 0
      ? [
          ...feedData,
          ...[...new Array(itemCount).keys()].map((_, idx) => ({
            id: feedData?.length + idx,
          })),
        ]
      : feedData,
  );

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      labelStyle={{textTransform: 'capitalize', fontSize: hp(1.4)}}
      indicatorStyle={{backgroundColor: 'white'}}
      style={{backgroundColor: Colors.backgroundDark}}
    />
  );

  const renderScene = ({route}: any) => {
    switch (route.key) {
      case 'second':
        return <FirstRoute data={firstRouteData} />;
      case 'third':
        return <FirstRoute data={firstRouteData} />;
      case 'fourth':
        return <FirstRoute data={firstRouteData} />;
      case 'fifth':
        return <FirstRoute data={firstRouteData} />;
      default:
        return <FirstRoute data={firstRouteData} />;
    }
  };

  const [expandedItemIndex, setExpandedItemIndex] = useState<number | null>(
    null,
  );

  const handleItemClick = (i: number) => {
    if (expandedItemIndex === i) {
      setExpandedItemIndex(null); // Collapse the item if already expanded
    } else {
      setExpandedItemIndex(i); // Expand the clicked item
    }
  };

  function detailView(
    post: string,
    follower: string,
    following: string,
    editProfileOnPress: () => void,
    shareProfileOnPress: () => void,
  ) {
    return (
      <View style={styles.userDetailViewStyle}>
        <View style={exportStyles.row}>
          <View style={styles.userDetailTextStyle}>
            <Text style={exportStyles.text3}>{post}</Text>
            <Text style={exportStyles.text4}>Posts</Text>
          </View>
          <View style={styles.userDetailTextStyle}>
            <Text style={exportStyles.text3}>{follower}</Text>
            <Text style={exportStyles.text4}>Followers</Text>
          </View>
          <View style={styles.userDetailTextStyle}>
            <Text style={exportStyles.text3}>{following}</Text>
            <Text style={exportStyles.text4}>Following</Text>
          </View>
        </View>
        <View style={exportStyles.row}>
          <LoginButton
            label="Edit Profile"
            buttonContainerStyle={styles.buttonStyles}
            textStyles={styles.buttonTextStyles}
            onPress={editProfileOnPress}
          />
          <LoginButton
            label="Share Profile"
            buttonContainerStyle={styles.buttonStyles}
            textStyles={styles.buttonTextStyles}
            onPress={shareProfileOnPress}
          />
        </View>
      </View>
    );
  }

  function mediaLinkView() {
    return (
      <View style={styles.iconStyles}>
        <View style={styles.innerIconStyles}>
          <SimpleLineIcons name="location-pin" size={iconSize} />
          <Text numberOfLines={1} style={[styles.text]}>
            Kathmandu
          </Text>
        </View>
        <View style={styles.innerIconStyles}>
          <FontistoIcons name="link" size={iconSize} />
          <Text numberOfLines={1} style={[styles.text]}>
            LinkedIn
          </Text>
        </View>
        <View style={styles.innerIconStyles}>
          <AntDesignIcon name="instagram" size={iconSize} />
          <Text numberOfLines={1} style={[styles.text]}>
            Instagram
          </Text>
        </View>
        <View style={styles.innerIconStyles}>
          <Ionicons name="logo-tiktok" size={iconSize} />
          <Text numberOfLines={1} style={[styles.text]}>
            Tiktok
          </Text>
        </View>
      </View>
    );
  }

  function expandableView(index: number, label: string, children: any) {
    let isExpanded: boolean = expandedItemIndex === index ? true : false;
    return (
      <View
        style={[
          styles.expandableContainer,
          {height: hp(isExpanded ? (index === 0 ? 17 : 19) : 5)},
        ]}>
        <View style={styles.expandableViewStyles}>
          <Text
            style={[
              styles.text2,
              [{alignSelf: isExpanded ? 'flex-start' : 'center'}],
            ]}>
            {label}
          </Text>
          <TouchableOpacity
            style={{
              alignSelf: isExpanded ? 'flex-start' : 'center',
              padding: wp(1.6),
            }}
            onPress={() => {
              handleItemClick(index);
            }}>
            <FeatherIcon
              name={isExpanded ? 'chevron-up' : 'chevron-down'}
              size={26}
            />
          </TouchableOpacity>
        </View>
        {isExpanded && children}
      </View>
    );
  }

  useEffect(() => {
    if (userDetails?.length > 0) {
      setDataAvailability(true);
    } else {
      setDataAvailability(false);
    }
  }, [userDetails]);

  return (
    <SafeAreaView style={styles.container}>
      {/* <ScrollView
        nestedScrollEnabled={false}
        style={{flexGrow: 1}}
        contentContainerStyle={{flexGrow: 1}}> */}
      <View style={styles.scrollContainer}>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Image
            source={{
              uri: coverImageLink,
            }}
            style={styles.coverImageStyles}
          />
          <View style={styles.coverImageBackgroundStyles}>
            <TouchableOpacity>
              <FeatherIcon name="lock" size={26} />
            </TouchableOpacity>
            <Text style={[exportStyles.text3, {}]}>{`${
              isDataAvailable ? userDetails[0]?.email : 'user@gmail.com'
            }`}</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Login');
              }}>
              <AntDesignIcon name="setting" size={26} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{position: 'absolute', top: hp(12), left: wp(2)}}>
          <CircularImage link={profileImageLink} />
        </View>
        {detailView(
          '50',
          '112M',
          '100',
          () => {},
          () => {},
        )}
        <View style={styles.userIdViewStyles}>
          <Text numberOfLines={1} style={[exportStyles.text4]}>{`${
            isDataAvailable ? userDetails[0]?.user_name : '@userName'
          }`}</Text>
          <Text
            numberOfLines={1}
            style={[exportStyles.text1, {padding: hp(0.1)}]}>{`${
            isDataAvailable
              ? `${userDetails[0]?.first_name} ${userDetails[0]?.last_name}`
              : 'User Name'
          }`}</Text>
        </View>
        <Text style={styles.text2}>
          The reason most people fail instead of succeed is they trade what they
          want most for what they want at the moment.
        </Text>
        {mediaLinkView()}
        {expandableData.map((data, i) => {
          return (
            <View key={data?.id}>
              {expandableView(
                i,
                data?.name,
                data?.id === 0 ? (
                  <InstaStory
                    data={dummyStoryData}
                    duration={5}
                    unPressedBorderColor={'transparent'}
                    style={{alignSelf: 'flex-start'}}
                  />
                ) : (
                  <InstaStory
                    data={dummyStoryData}
                    duration={5}
                    unPressedBorderColor={'transparent'}
                    pressedBorderColor={'transparent'}
                    style={{alignSelf: 'flex-start'}}
                    avatarImageStyle={styles.avatarImageStyles}
                    avatarWrapperStyle={styles.avatarSquareWrapper}
                    avatarTextStyle={{bottom: hp(0.5)}}
                  />
                ),
              )}
            </View>
          );
        })}
      </View>
      <TabView
        swipeEnabled={false}
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
        initialLayout={{width: Dimensions.get('window').width}}
      />
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    overflow: 'hidden',
    backgroundColor: Colors.backgroundDark,
  },
  scrollContainer: {
    alignItems: 'center',
  },
  coverImageStyles: {
    height: hp(16),
    width: wp(100),
  },
  userIdViewStyles: {
    width: wp(32),
    marginTop: hp(6),
    marginLeft: wp(3),
    alignSelf: 'flex-start',
  },
  roundImageStyles: {position: 'absolute'},
  coverImageBackgroundStyles: {
    width: wp(94),
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userDetailViewStyle: {
    marginTop: hp(17),
    paddingRight: wp(1),
    alignSelf: 'flex-end',
    position: 'absolute',
  },
  userDetailTextStyle: {alignItems: 'center', marginHorizontal: wp(3)},
  buttonStyles: {
    height: hp(3.8),
    width: wp(25),
    borderRadius: 6,
    marginTop: hp(1),
    marginRight: wp(2),
    backgroundColor: Colors.secondaryColor,
  },
  buttonTextStyles: {
    fontSize: hp(1.6),
    color: 'white',
    opacity: 1,
    paddingRight: wp(2),
    alignSelf: 'center',
  },
  text: {
    width: wp(18),
    fontSize: hp(1.6),
    marginLeft: wp(1),
    textAlign: 'justify',
    color: Colors.activeColor,
  },
  text2: {
    color: 'white',
    padding: wp(2),
    fontSize: hp(1.8),
    textAlign: 'justify',
  },
  iconStyles: {
    width: wp(96),
    marginTop: hp(0.5),
    marginBottom: hp(2),
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  innerIconStyles: {
    marginRight: wp(3),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  expandableContainer: {
    width: wp(96),
    borderRadius: 4,
    paddingHorizontal: wp(2),
    marginVertical: hp(0.1),
    backgroundColor: Colors.primaryColor,
  },
  expandableViewStyles: {
    width: wp(92),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  avatarImageStyles: {
    height: hp(10),
    width: wp(19),
    borderRadius: 4,
  },
  avatarSquareWrapper: {
    height: hp(12),
    width: wp(20),
    borderRadius: 4,
    borderWidth: hp(0.2),
    marginTop: hp(-1.5),
  },
});
