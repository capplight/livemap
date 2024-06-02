import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Bubble,
  Composer,
  GiftedChat,
  IMessage,
  InputToolbar,
  Send,
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
import {
  ActivityIndicator,
  BackHandler,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {CircularImage, MyHeader, exportStyles} from '@components/ExportStyles';
import {EntypoIcon, FeatherIcon, MaterialIcon} from '@themes/Icons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {goBack} from '../../Navigation/RootNavigationRef';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import {useIsFocused} from '@react-navigation/native';
import {TopHeaderView} from '@components/TopHeaderView';
import {StackNavigationProp} from '@react-navigation/stack';

interface ChatProps {
  route?: any;
  navigation: StackNavigationProp<any>;
  isScreenFocused: React.Dispatch<React.SetStateAction<boolean>>;
}

const CustomInputToolbar = (props: any) => {
  const {isKeyboardVisible, ...restProps} = props;
  return (
    // <KeyboardAvoidingView
    //   behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
    <InputToolbar
      {...restProps}
      containerStyle={[
        styles.inputToolbar,
        {
          paddingBottom: hp(
            Platform.OS === 'android' && isKeyboardVisible ? 4 : 2,
          ),
        },
      ]}
      renderComposer={() => (
        <View style={styles.composerContainer}>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialIcon name="photo" size={24} color="white" />
          </TouchableOpacity>
          <Composer {...restProps} textInputStyle={styles.composer} />
          <TouchableOpacity style={styles.iconButton}>
            <FeatherIcon name="mic" size={24} color="white" />
          </TouchableOpacity>
        </View>
      )}
      renderSend={sendProps => (
        <Send {...sendProps} containerStyle={styles.sendButtonContainer}>
          <View style={styles.sendButton}>
            <FeatherIcon name="send" size={24} color="white" />
          </View>
        </Send>
      )}
    />
    // </KeyboardAvoidingView>
  );
};

const ChatScreen = ({route, navigation, isScreenFocused}: ChatProps) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const userId = route?.params?.userId;
  const token = route?.params?.token;
  const senderId = route?.params?.senderId;
  const lastMsg = route?.params?.lastMessage;
  const senderName = route?.params?.senderName;
  const lastMessage = useRef(lastMsg);
  const [messages, setMessages] = useState<IMessage[] | undefined>(undefined);
  const chatDetails = useSelector(
    (state: RootState) => state?.chatDetails?.data,
  );
  const chatData = chatDetails?.chatHistory;
  const currentPage = chatDetails?.currentPage;
  const totalPages = chatDetails?.totalPages;

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [isLoading, setLoader] = useState(true);

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

  const backHandle = () => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  };

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

  function handleBackButtonClick() {
    isScreenFocused(false);
    goBack();
    return true;
  }

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    backHandle();
  });

  useEffect(() => {
    if (messages !== undefined) {
      setLoader(false);
    }
  }, [messages]);

  useEffect(() => {
    isScreenFocused(isFocused);
    const intervalId = setInterval(() => {
      getSenderData();
    }, 3000);
    return () => {
      // Clears the interval when the component unmounts
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
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
    } else {
      setMessages([]);
    }
  }, [chatData]);

  return (
    <SafeAreaView
      style={[
        exportStyles.container,
        {backgroundColor: Colors.backgroundDark},
      ]}>
      <TopHeaderView
        navigation={navigation}
        navigateBack
        title="Inbox"
        isChatScreen
        senderName={senderName}
      />
      {messages === undefined ? (
        <ActivityIndicator
          size={'large'}
          color={'white'}
          style={{marginTop: hp(10)}}
        />
      ) : (
        <GiftedChat
          messages={messages}
          onSend={newMessages => onSend(newMessages)}
          user={{
            _id: userId,
          }}
          isKeyboardInternallyHandled={false}
          keyboardShouldPersistTaps="handled"
          renderLoading={() => {
            return (
              <ActivityIndicator
                size={'large'}
                color={'white'}
                style={{marginTop: hp(10)}}
              />
            );
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
          // renderInputToolbar={props => {
          //   return (
          //     <InputToolbar
          //       {...props}
          //       containerStyle={{
          //         backgroundColor: Colors.primaryColor,
          //         borderTopColor: 'transparent',
          //         // height: hp(7),
          //         // borderRadius: 80,
          //         // padding: 4,
          //         // marginHorizontal: wp(8),
          //         // marginBottom: hp(0.5),
          //         // paddingRight: wp(-8),
          //       }}
          //     />
          //   );
          // }}
          maxComposerHeight={hp(10)}
          renderInputToolbar={props => (
            <CustomInputToolbar
              {...props}
              isKeyboardVisible={isKeyboardVisible}
            />
          )}
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
          messagesContainerStyle={{
            backgroundColor: Colors.backgroundColor,
            paddingBottom: hp(
              Platform.OS === 'ios'
                ? isKeyboardVisible
                  ? 4
                  : 2
                : isKeyboardVisible
                ? 6
                : 4,
            ),
          }}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inputToolbar: {
    backgroundColor: Colors.backgroundDark,
    borderTopWidth: 0,
    padding: hp(1.5),
    paddingBottom: hp(Platform.OS === 'android' ? 2 : 0),
  },
  composerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
    marginBottom: hp(Platform.OS === 'ios' ? -2 : 0),
    maxHeight: hp(10),
    backgroundColor: Colors.primaryColor,
  },
  composer: {
    backgroundColor: 'transparent',
    color: 'white',
    flex: 1,
    paddingTop: hp(1),
    maxHeight: hp(8),
  },
  iconButton: {
    padding: 10,
  },
  sendButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(Platform.OS === 'ios' ? -2 : 0),
    marginLeft: hp(0.8),
    marginRight: hp(-0.5),
  },
  sendButton: {
    backgroundColor: Colors.primaryColor,
    padding: hp(1),
    borderRadius: 25,
  },
});

export default ChatScreen;
