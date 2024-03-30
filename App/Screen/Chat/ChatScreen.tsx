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
import {CHAT_USER_KEY, USER_ID, profileImageLink} from '@constants/constValues';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Colors} from '@themes/Colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
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
  // const receiverId = route?.params?.receiverId;
  const senderName = route?.params?.senderName;
  // const [lastMessage, setLastMessage] = useState('');
  const [messages, setMessages] = useState<IMessage[]>([]);
  const chatData = useSelector((state: RootState) => state?.chatDetails);
  const lastMessage = useRef(lastMsg);

  console.log('Show sender id: ', senderId);

  async function getSenderData() {
    const data = await AsyncStorage.getItem(CHAT_USER_KEY);
    const val = JSON.parse(`${data}`);
    const updatedMsg = val?.data?.message;
    const sender_id = val?.data?.sender_id;
    // console.log('Show sender id: ', sender_id);
    // console.log('Show ids: ', userId);
    // console.log('Show rendering values: ', val);

    if (val !== null) {
      // console.log('It is here.....1');
      if (updatedMsg !== '') {
        // console.log('It is here.....2');
        // console.log('Msg1: ', lastMessage.current);
        if (lastMessage.current === '' || lastMessage.current !== updatedMsg) {
          // console.log('It is here.....3');
          lastMessage.current = val?.data?.message;
          // console.log('Show ids: ', userId, sender_id);
          if (sender_id !== '' && userId !== sender_id) {
            // console.log('It is here.....4');
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

  // console.log('Show last message: ', lastMessage);
  // console.log('Token: ', token);
  // console.log('User Id: ', userId, senderId, receiver_id);
  // console.log('Chat detail data: ', messages);
  // console.log('Chat id: ', chatId);
  // console.log('Chat length: ', chatData?.data?.length);

  // const timerID = setInterval(function run() {
  //   console.log('This will run only once after 1 second');
  //   clearInterval(timerID);
  // }, 5000);

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
    // changeNavigationBarColor(Colors.primaryColor);
    dispatch(
      ChatDetailsRequest({
        token: token,
        receiver_id: senderId,
        page: 1,
        limit: 50,
      }),
    );
  }, []);

  useEffect(() => {
    if (chatData?.data?.length > 0) {
      const msgs = chatData?.data?.map((data: any) => ({
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
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(
        `${REACT_APP_BASE_URL_DEV}/dev/message?list=true&page=1&limit=10`,
        {headers: {Authorization: `Bearer ${token}`}},
      );
      // console.log('Res: ', response?.data?.users);
      const msgs = response?.data?.users.map((message: any) => ({
        ...message,
        text: message?.lastMessage?.message,
        createdAt: new Date(message?.lastMessage?.createdAt),
      }));
      // const newArray = messages.map(message => ({ _id: message.id, createdAt: message.createdAt, text: message.body, user: { _id: //user_id, name: //username } }))
      // const messages = response?.data?.users.map((message: IMessage) => ({
      //   ...message,
      //   createdAt: new Date(message.createdAt),
      // }));
      setMessages(msgs);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const onSend = useCallback(async (newMessage: any) => {
    // console.log('Show msg: ', newMessage);
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
      <StatusBar backgroundColor={Colors.backgroundDark} />
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
        textInputStyle={{color: 'white'}}
        // messagesContainerStyle={{height: hp(86)}}
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
  // chatInputBackground: {backgroundColor: Colors.backgroundDark, height: hp(20)},
  chatInputContainer: {},
  navigationBarStyles: {
    height: hp(6),
    width: wp(100),
    backgroundColor: Colors.backgroundDark,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(2),
  },
  userBackgroundStyles: {
    marginLeft: wp(6),
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ChatScreen;
