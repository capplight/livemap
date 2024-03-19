import React, {Fragment, useRef, useState} from 'react';
import {
  Modal,
  View,
  Image,
  Animated,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {CircularImage, exportStyles} from '@components/ExportStyles';
import {profileImageLink} from '@constants/constValues';
import {EntypoIcon} from '@themes/Icons';
import GestureRecognizer from 'react-native-swipe-gestures';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

interface NativeInstaProps {
  openModal: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  values: any;
}

export const NativeInstaStory = ({
  openModal = false,
  setModalVisible,
  values,
}: NativeInstaProps) => {
  const [load, setLoad] = useState<boolean>(true);
  const [pressed, setPressed] = useState<boolean>(false);
  const [current, setCurrent] = useState(0);
  const [content, setContent] = useState(values);
  const progress = useRef(new Animated.Value(0)).current;

  const startAnimation = () => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: false,
    }).start(({finished}) => {
      if (finished) {
        next();
      }
    });
  };
  const next = () => {
    if (current !== content.length - 1) {
      let tempData = content;
      tempData[current].finish = 1;
      setContent(tempData);
      setCurrent(current + 1);
      progress.setValue(0);
    } else {
      close();
    }
  };
  const previous = () => {
    if (current - 1 >= 0) {
      let tempData = content;
      tempData[current].finish = 0;
      setContent(tempData);
      progress.setValue(0);
      setCurrent(current - 1);
    } else {
      close();
    }
  };
  function start() {
    setLoad(false);
    progress.setValue(0);
    startAnimation();
  }
  const close = () => {
    progress.setValue(0);
    setModalVisible(false);
  };

  return (
    <Fragment>
      <GestureRecognizer
        style={styles.flex}
        onSwipeUp={() => setModalVisible(true)}
        onSwipeDown={() => setModalVisible(false)}>
        <Modal animationType="slide" transparent={true} visible={openModal}>
          <View style={{flex: 1, backgroundColor: 'black'}}>
            <View style={styles.pressContainer}>
              <TouchableWithoutFeedback
                onPressIn={() => progress.stopAnimation()}
                onLongPress={() => setPressed(true)}
                onPressOut={() => {
                  setPressed(false);
                  startAnimation();
                }}
                onPress={() => {
                  if (!pressed && !load) {
                    previous();
                  }
                }}>
                <View style={styles.flex} />
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPressIn={() => progress.stopAnimation()}
                onLongPress={() => setPressed(true)}
                onPressOut={() => {
                  setPressed(false);
                  startAnimation();
                }}
                onPress={() => {
                  if (!pressed && !load) {
                    next();
                  }
                }}>
                <View style={styles.flex} />
              </TouchableWithoutFeedback>
            </View>
            <Image
              source={{uri: content[current].content}}
              style={styles.imageStyles}
              onLoadEnd={() => {
                progress.setValue(0);
                start();
              }}
            />
            <View style={styles.progressBarView}>
              {content.map((item: any, index: number) => {
                return (
                  <View style={styles.contentView}>
                    <Animated.View
                      style={[
                        styles.progressAnimStyles,
                        {
                          flex:
                            current === index
                              ? progress
                              : content[index].finish,
                        },
                      ]}
                    />
                  </View>
                );
              })}
              <View style={styles.headerViewContainer}>
                <View style={styles.imageViewStyles}>
                  <CircularImage size={40} link={profileImageLink} />
                  <Text
                    numberOfLines={1}
                    style={[
                      exportStyles.text5,
                      {width: wp(40), marginLeft: wp(2)},
                    ]}>
                    Organization's Name
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.iconViewStyles}
                  onPress={() => {
                    setModalVisible(false);
                  }}>
                  <EntypoIcon name="cross" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.nextViewContainer}>
              <TouchableOpacity
                style={styles.nextViewStyles}
                onPress={() => {
                  previous();
                }}
              />
              <TouchableOpacity
                style={styles.nextViewStyles}
                onPress={() => {
                  next();
                }}
              />
            </View>
          </View>
        </Modal>
      </GestureRecognizer>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  pressContainer: {
    flex: 1,
    flexDirection: 'row',
    height: hp(100),
    width: wp(100),
    position: 'absolute',
    zIndex: 10,
  },
  imageStyles: {height: hp(100), width: wp(100), resizeMode: 'cover'},
  progressBarView: {
    width: wp(98),
    position: 'absolute',
    top: hp(1),
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
  },
  progressAnimStyles: {height: 3, backgroundColor: 'rgba(255, 255, 255, 1)'},
  contentView: {
    flex: 1,
    height: 3,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, .5)',
    marginLeft: wp(1.5),
    flexDirection: 'row',
  },
  headerViewContainer: {
    width: wp(100),
    justifyContent: 'space-between',
    flexDirection: 'row',
    position: 'absolute',
    top: hp(0),
  },
  imageViewStyles: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: wp(2),
  },
  iconViewStyles: {
    right: wp(-4),
    padding: hp(2),
    zIndex: 10,
  },
  nextViewContainer: {
    width: wp(100),
    height: hp(100),
    position: 'absolute',
    top: 0,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  nextViewStyles: {
    width: wp(30),
    height: hp(100),
  },
});
