import {StackNavigationProp} from '@react-navigation/stack';
import {View, Text, SafeAreaView, StyleSheet, TextInput} from 'react-native';
import React, {useState, useEffect, FC, useRef} from 'react';
import {requestCameraPermission} from '@constants/Permission';
import {
  CameraOptions,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';
import {exportStyles} from '@components/ExportStyles';
import {LoginButton} from '@components/Buttons/LoginButton';
import {AntDesignIcon, Ionicons} from '@themes/Icons';
import {Colors} from '@themes/Colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import RBSheet from 'react-native-raw-bottom-sheet';
import {homeNavigation, horizontalLine} from '@constants/constValues';
import {SVGRenderer} from '@components/SVGRenderer';
import CrossIcon from '@assets/svg/crossLarge.svg';
import CustomButton from '@components/Buttons/CustomButton';

interface AddPost {
  navigation: StackNavigationProp<any>;
  route?: any;
}

export const AddPost: FC<AddPost> = ({navigation}: AddPost) => {
  const maxLengthSize = 100;
  const refRBSheet = useRef();
  const [onMap, setOnMapCheck] = useState(true);
  const [textValue, setText] = useState('');
  const [profileImage, setProfileImage] = useState<any>(null);
  const options = {
    mediaType: 'photo',
    includeBase64: false,
    maxHeight: 1000,
    maxWidth: 1000,
  };

  async function openCamera(openCamera: boolean) {
    try {
      openCamera
        ? (await requestCameraPermission()) &&
          launchCamera(options as CameraOptions, response => {
            if (response.didCancel) {
              console.log('User cancelled camera');
            } else {
              let imageUri = response?.uri || response.assets?.[0]?.uri;
              setProfileImage(imageUri);
              refRBSheet.current.close();
            }
          })
        : launchImageLibrary(
            {
              mediaType: 'photo',
            } as CameraOptions,
            (response: any) => {
              if (response.didCancel) {
              } else {
                let imageUri = response?.uri || response.assets?.[0]?.uri;
                setProfileImage(imageUri);
                refRBSheet.current.close();
              }
            },
          );
    } catch (error) {
      console.log(error);
    }
  }

  function bottomSheetView() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <LoginButton
          label={profileImage === null ? 'Capture Image' : 'Retake Image'}
          onPress={() => openCamera(true)}
        />
        <View style={{height: hp(2)}} />
        <LoginButton label="Open Gallery" onPress={() => openCamera(false)} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          container: {
            height: hp(22),
            backgroundColor: Colors.primaryColor,
            borderRadius: wp(5),
          },
          draggableIcon: {
            width: wp(12),
          },
        }}>
        {bottomSheetView()}
      </RBSheet>
      <View style={styles.header}>
        <SVGRenderer
          touchable
          style={{padding: wp(4), marginRight: wp(6)}}
          onPress={() => {
            homeNavigation({navigation});
          }}>
          <CrossIcon />
        </SVGRenderer>
        <Text style={[exportStyles.text3]}>Post</Text>
        <TouchableOpacity
          onPress={() => {
            const sendingData = {
              story_media: 'link',
              description: textValue,
              // metadata,
            };
            console.log(sendingData);
          }}
          style={{marginRight: wp(4)}}>
          <Text style={[exportStyles.text3]}>Publish</Text>
        </TouchableOpacity>
      </View>
      <View style={{alignItems: 'center'}}>
        {profileImage && (
          <FastImage
            style={{height: hp(32), width: wp(98)}}
            source={{
              uri: profileImage,
            }}
          />
        )}
        {/* {profileImage && (
          <Image
            source={{uri: profileImage}}
            style={{height: hp(28), width: wp(150)}}
            resizeMode="contain"
          />
        )} */}
        {profileImage === null && (
          <TouchableOpacity
            style={{alignItems: 'center', marginTop: hp(6)}}
            onPress={() => {
              refRBSheet?.current?.open();
            }}>
            <AntDesignIcon name="pluscircleo" size={62} />
            <Text style={styles.text}>Add Image</Text>
          </TouchableOpacity>
        )}
        {profileImage !== null && (
          <View style={styles.closeIconStyles}>
            <TouchableOpacity
              onPress={() => {
                refRBSheet.current?.open();
              }}>
              <Ionicons
                name="close-circle"
                size={28}
                color={Colors.lightWhite}
              />
            </TouchableOpacity>
          </View>
        )}
        <TextInput
          multiline
          numberOfLines={5}
          value={textValue}
          maxLength={maxLengthSize}
          placeholderTextColor={Colors.fadeWhite}
          onChangeText={val => setText(val)}
          placeholder="Write your stuffs here...."
          style={styles.textInputStyles}
        />
        {horizontalLine(wp(100))}
        <View style={styles.textCountView}>
          <Text style={[exportStyles.text4]}>Limited to 100 symbols</Text>
          <Text
            style={[
              styles.countTextStyles,
              {color: textValue.length >= 95 ? 'red' : 'white'},
            ]}>{`${textValue.length}/${maxLengthSize}`}</Text>
        </View>
      </View>
      <View style={[exportStyles.row, styles.buttonViewStyles]}>
        <CustomButton
          label="On the Map"
          onPress={() => {
            setOnMapCheck(!onMap);
          }}
          containerStyle={styles.buttonContainerStyles}
          textOverrideStyle={{color: !onMap ? Colors.darkGrey : 'white'}}
        />
        <CustomButton
          label="On the Profile"
          onPress={() => {
            setOnMapCheck(!onMap);
          }}
          containerStyle={[
            styles.buttonContainerStyles,
            {backgroundColor: Colors.activeColor},
          ]}
          textOverrideStyle={{color: onMap ? Colors.darkGrey : 'white'}}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    height: hp(8),
    width: wp(100),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.backgroundDark,
  },
  container: {
    flex: 1,
    alignContent: 'center',
    backgroundColor: Colors.backgroundColor,
  },
  text: {
    color: Colors.lightWhite,
    fontSize: hp(2),
    padding: wp(2.5),
    alignSelf: 'center',
  },
  textInputStyles: {
    width: wp(90),
    height: hp(10),
    marginTop: hp(2),
    textAlignVertical: 'top',
  },
  textCountView: {
    padding: hp(2),
    alignSelf: 'flex-start',
    flexDirection: 'row',
  },
  countTextStyles: {
    marginLeft: wp(2),
    fontSize: hp(1.5),
  },
  buttonContainerStyles: {
    height: hp(4.5),
    width: wp(34),
    marginRight: wp(4),
    paddingRight: wp(2),
  },
  buttonViewStyles: {
    alignSelf: 'center',
    paddingLeft: wp(6),
    position: 'absolute',
    bottom: hp(2),
  },
  closeIconStyles: {
    position: 'absolute',
    alignSelf: 'flex-end',
    paddingTop: hp(0.5),
    paddingRight: wp(2),
  },
});
