import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {CircularImage, exportStyles} from '@components/ExportStyles';
import {TopHeaderView} from '@components/TopHeaderView';
import {
  USER_ID,
  horizontalLine,
  profileImageLink,
} from '@constants/constValues';
import {StackNavigationProp} from '@react-navigation/stack';
import {ChatListRequest} from '@redux/ChatList/ChatListAction';
import {Users} from '@redux/ChatList/ChatListTypes';
import {RootState} from '@redux/Reducers';
import {DateConverter} from '@utils/dateConverter';
import {Colors} from '@themes/Colors';
import {FontAwesome6Icon} from '@themes/Icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {requestNotificationPermission} from '@constants/Permission';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

interface ChatListProps {
  navigation: StackNavigationProp<any>;
  route?: any;
}

export const ChatList = ({navigation, route}: ChatListProps) => {
  const token = route?.params?.token;
  const dispatch = useDispatch();
  const [userId, setUserId] = useState('');
  const chatListData = useSelector((state: RootState) => state?.chatList);

  async function getUserId() {
    const val = await AsyncStorage.getItem(USER_ID);
    setUserId(val!);
  }

  const renderItem = (data: any) => {
    const {_id, sender, receiver, oppositeUser, lastMessage}: Users =
      data?.item;
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ChatScreen', {
            token: token,
            userId: userId,
            senderId: oppositeUser?.id,
            senderName: oppositeUser?.first_name,
            lastMessage: lastMessage?.message,
          });
        }}
        style={styles.touchableView}>
        <View style={styles.renderViewStyles}>
          <View style={styles.childViewStyles}>
            <CircularImage size={50} link={`${profileImageLink}`} />
            <View style={{marginLeft: wp(2)}}>
              <Text style={[exportStyles.text5]}>
                {`${oppositeUser?.first_name} ${oppositeUser?.last_name}`}
              </Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{paddingTop: wp(1), marginRight: wp(0.8)}}>
                  <FontAwesome6Icon
                    name="check"
                    size={18}
                    color={Colors.fadeWhite}
                  />
                </View>
                <Text style={styles.messageText}>{lastMessage?.message}</Text>
              </View>
            </View>
          </View>
          <Text style={[styles.messageText, {marginTop: 0}]}>
            {DateConverter(lastMessage?.createdAt)}
          </Text>
        </View>
        <View style={styles.horizontalView2Styles}>
          {horizontalLine(wp(85))}
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    changeNavigationBarColor('transparent');
    Platform.OS === 'android'
      ? Platform.Version > 31 && requestNotificationPermission()
      : requestNotificationPermission();
    getUserId();
    dispatch(
      ChatListRequest({
        token: token,
        page: 1,
        limit: 10,
      }),
    );
    return () => {
      changeNavigationBarColor('transparent');
    };
  }, []);

  return (
    <SafeAreaView style={exportStyles.container}>
      <StatusBar backgroundColor={Colors.backgroundDark} />
      <TopHeaderView
        navigation={navigation}
        navigateBack={true}
        title="Inbox"
      />
      <View style={styles.headerView}>
        <Text style={exportStyles.text5}>Messages</Text>
        <TouchableOpacity onPress={() => {}}>
          <Text style={[exportStyles.text5, {opacity: 0.8}]}>Requests</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.horizontalViewStyles]}>
        {chatListData?.data?.length > 0 && horizontalLine(wp(85))}
      </View>
      <FlatList
        renderItem={renderItem}
        data={chatListData?.data}
        ListEmptyComponent={
          <ActivityIndicator
            color={'white'}
            size={'large'}
            style={{marginTop: hp(24)}}
          />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp(1.5),
    paddingHorizontal: wp(3),
    justifyContent: 'space-between',
  },
  touchableView: {marginVertical: hp(0.7), justifyContent: 'center'},
  renderViewStyles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp(2),
  },
  childViewStyles: {flexDirection: 'row', marginBottom: hp(0.5)},
  horizontalViewStyles: {alignSelf: 'flex-end', marginBottom: hp(0.5)},
  horizontalView2Styles: {alignSelf: 'flex-end', marginTop: hp(0.5)},
  messageText: {
    color: Colors.lightWhite,
    opacity: 0.5,
    fontSize: hp(1.4),
    fontWeight: 'bold',
    marginTop: hp(0.5),
  },
});
