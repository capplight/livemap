import React, {Fragment, useEffect, useRef, useState} from 'react';
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
import {Orientation, profileImageLink} from '@constants/constValues';
import {EntypoIcon} from '@themes/Icons';
import GestureRecognizer from 'react-native-swipe-gestures';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Video from 'react-native-video';

interface NativeInstaProps {
  openModal: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  content: any;
  setContent: React.Dispatch<any>;
}

export const NativeInstaStory = ({
  openModal = false,
  setModalVisible,
  content,
  setContent,
}: NativeInstaProps) => {
  const [orientation, setOrientation] = useState<string>(Orientation.landscape);
  const [vidDuration, setVidDuration] = useState(10 * 1000);
  const [mute, setMute] = useState(false);
  const [load, setLoad] = useState<boolean>(true);
  const [pressed, setPressed] = useState<boolean>(false);
  const [current, setCurrent] = useState(0);
  const progress = useRef(new Animated.Value(0)).current;

  const startAnimation = () => {
    if (content[current]?.type === 'video') {
      if (load) {
        Animated.timing(progress, {
          toValue: 1,
          duration: vidDuration,
          useNativeDriver: false,
        }).start(({finished}) => {
          if (finished) {
            next();
          }
        });
      }
    } else {
      Animated.timing(progress, {
        toValue: 1,
        duration: 5000,
        useNativeDriver: false,
      }).start(({finished}) => {
        if (finished) {
          next();
        }
      });
    }
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
  const close = () => {
    progress.setValue(0);
    setCurrent(0);
    setModalVisible(false);
  };

  useEffect(() => {
    if (openModal) {
      setCurrent(0);
    }
  }, [openModal]);

  return (
    <Fragment>
      <GestureRecognizer
        style={styles.flex}
        onSwipeUp={() => setModalVisible(true)}
        onSwipeDown={() => setModalVisible(false)}>
        <Modal animationType="slide" transparent={true} visible={openModal}>
          <View style={styles.container}>
            <View style={styles.pressContainer}>
              <TouchableWithoutFeedback
                onPressIn={() => progress.stopAnimation()}
                onLongPress={() => setPressed(true)}
                onPressOut={() => {
                  setPressed(false);
                  startAnimation();
                }}
                onPress={() => {
                  setMute(!mute);
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
                  setMute(!mute);
                  if (!pressed && !load) {
                    next();
                  }
                }}>
                <View style={styles.flex} />
              </TouchableWithoutFeedback>
            </View>

            <View style={styles.mediaViewStyles}>
              {content[current]?.type === 'video' ? (
                <Video
                  source={{uri: content[current]?.content}}
                  resizeMode="cover"
                  paused={pressed}
                  // disableFocus={true}
                  // onReadyForDisplay={() => {
                  //   startAnimation();
                  // }}
                  onLoad={x => {
                    setOrientation(x.naturalSize.orientation);
                    setLoad(true);
                    startAnimation();
                    setVidDuration(x.duration * 1000);
                  }}
                  onEnd={() => {
                    next();
                  }}
                  muted={mute}
                  style={{
                    height: hp(
                      orientation === Orientation.landscape ? 35 : 100,
                    ),
                    width: wp(100),
                  }}
                />
              ) : (
                <Image
                  source={{uri: content[current]?.content}}
                  style={[
                    styles.imageStyles,
                    {
                      height: hp(
                        orientation === Orientation.landscape ? 35 : 100,
                      ),
                    },
                  ]}
                  onLoad={x => {
                    setOrientation(
                      x.nativeEvent.source.width > x.nativeEvent.source.height
                        ? Orientation.landscape
                        : Orientation.portrait,
                    );
                  }}
                  onLoadEnd={() => {
                    progress.setValue(0);
                    startAnimation();
                  }}
                />
              )}
            </View>

            <View style={styles.progressBarView}>
              {content.map((item: any, index: number) => {
                return (
                  <View key={index} style={styles.contentView}>
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
  container: {flex: 1, backgroundColor: 'black'},
  pressContainer: {
    flex: 1,
    flexDirection: 'row',
    height: hp(100),
    width: wp(50),
    position: 'absolute',
    zIndex: 10,
    alignSelf: 'center',
  },
  imageStyles: {height: hp(100), width: wp(100), resizeMode: 'cover'},
  mediaViewStyles: {
    height: hp(100),
    width: wp(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
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
