import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Bubble,
  GiftedChat,
  IMessage,
  InputToolbar,
} from 'react-native-gifted-chat';
import axios from 'axios';
import {REACT_APP_BASE_URL_DEV} from '@env';
import {useDispatch} from 'react-redux';
import {ChatDetailsRequest} from '@redux/ChatDetails/ChatDetailsAction';
import {useSelector} from 'react-redux';
import {RootState} from '@redux/Reducers';
import {CHAT_USER_KEY, profileImageLink} from '@constants/constValues';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Colors} from '@themes/Colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet, Text, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {CircularImage, exportStyles} from '@components/ExportStyles';
import {EntypoIcon} from '@themes/Icons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {goBack} from '../../Navigation/RootNavigationRef';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

interface ChatProps {
  route?: any;
}

const ChatScreen: React.FC = ({route}: ChatProps) => {
  const dispatch = useDispatch();
  const userId = route?.params?.userId;
  const token = route?.params?.token;
  const senderId = route?.params?.senderId;
  const lastMsg = route?.params?.lastMessage;
  const senderName = route?.params?.senderName;

  const lastMessage = useRef(lastMsg);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const chatDetails = useSelector(
    (state: RootState) => state?.chatDetails?.data,
  );
  const chatData = chatDetails?.chatHistory;
  const currentPage = chatDetails?.currentPage;
  const totalPages = chatDetails?.totalPages;

  async function getSenderData() {
    const data = await AsyncStorage.getItem(CHAT_USER_KEY);
    const val = JSON.parse(`${data}`);
    const updatedMsg = val?.data?.message;
    const sender_id = val?.data?.sender_id;

    if (val !== null) {
      if (updatedMsg !== '') {
        if (lastMessage.current === '' || lastMessage.current !== updatedMsg) {
          lastMessage.current = val?.data?.message;
          if (sender_id !== '' && userId !== sender_id) {
            const newMessage = [
              {
                _id: val?.messageId,
                createdAt: val?.sentTime,
                text: val?.data?.message,
                user: {
                  _id: val?.data?.sender_id,
                  avatar: profileImageLink,
                },
              },
            ];
            setMessages(previousMessages =>
              GiftedChat.append(previousMessages, newMessage),
            );
          }
        }
      }
    }
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      getSenderData();
    }, 3000);
    return () => {
      // Clears the interval when the component unmounts
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    changeNavigationBarColor('transparent');
    dispatch(
      ChatDetailsRequest({
        token: token,
        receiver_id: senderId,
        page: 1,
        limit: 100,
      }),
    );
  }, []);

  useEffect(() => {
    if (chatData?.length > 0) {
      const msgs = chatData?.map((data: any) => ({
        _id: data?._id,
        text: data?.message,
        createdAt: new Date(data?.createdAt),
        user: {
          _id: data?.sender_id,
          avatar: profileImageLink,
        },
        sent: true,
        received: true,
      }));
      setMessages(msgs);
    }
  }, [chatData]);

  const onSend = useCallback(async (newMessage: any) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, newMessage),
    );
    const params = JSON.stringify({
      receiver_id: senderId,
      message: newMessage[0]?.text,
    });
    try {
      await axios.post(`${REACT_APP_BASE_URL_DEV}/dev/message`, params, {
        headers: {Authorization: `Bearer ${token}`},
      });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }, []);

  return (
    <SafeAreaView style={exportStyles.container}>
      <View style={styles.navigationBarStyles}>
        <TouchableOpacity
          onPress={() => {
            goBack();
          }}>
          <EntypoIcon name="chevron-left" size={32} />
        </TouchableOpacity>
        <View style={styles.userBackgroundStyles}>
          <CircularImage size={32} />
          <Text style={[exportStyles.text3, {marginLeft: wp(2.5)}]}>
            {senderName}
          </Text>
        </View>
      </View>
      <GiftedChat
        messages={messages}
        onSend={newMessages => onSend(newMessages)}
        user={{
          _id: userId,
        }}
        listViewProps={{
          scrollEventThrottle: 400,
          onScroll: ({nativeEvent}) => {
            if (currentPage + 1 <= totalPages) {
              dispatch(
                ChatDetailsRequest({
                  token: token,
                  receiver_id: senderId,
                  page: currentPage + 1,
                  limit: 20,
                }),
              );
            }
          },
        }}
        textInputStyle={{color: 'white'}}
        // messagesContainerStyle={{height: hp(88), bottom: hp(4)}}
        renderInputToolbar={props => {
          return (
            <InputToolbar
              {...props}
              containerStyle={{
                backgroundColor: Colors.primaryColor,
                borderTopColor: 'transparent',
                // height: hp(7),
                // borderRadius: 80,
                // padding: 4,
                // marginHorizontal: wp(8),
                // marginBottom: hp(0.5),
                // paddingRight: wp(-8),
              }}
            />
          );
        }}
        renderBubble={props => {
          return (
            <Bubble
              {...props}
              wrapperStyle={
                {
                  right: {
                    backgroundColor: Colors.primaryColor,
                  },
                  left: {
                    backgroundColor: Colors.senderChatColor,
                  },
                } as any
              }
              textStyle={{left: {color: 'white'}}}
            />
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  chatInputContainer: {},
  navigationBarStyles: {
    height: hp(10),
    backgroundColor: Colors.backgroundDark,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(2),
    paddingTop: hp(4),
    top: hp(-4),
  },
  userBackgroundStyles: {
    marginLeft: wp(6),
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ChatScreen;
