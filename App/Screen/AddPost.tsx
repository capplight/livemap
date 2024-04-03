import {StackNavigationProp} from '@react-navigation/stack';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
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
import {
  TOKEN_KEY,
  baseUrl,
  err_image_uploading_msg,
  homeNavigation,
  horizontalLine,
  showToast,
} from '@constants/constValues';
import {SVGRenderer} from '@components/SVGRenderer';
import CrossIcon from '@assets/svg/crossLarge.svg';
import CustomButton from '@components/Buttons/CustomButton';
import {useDispatch} from 'react-redux';
import {AddPostRequest} from '@redux/AddPost/AddPostAction';
import Geolocation from 'react-native-geolocation-service';
import {MetaData} from '@redux/types';
import {useSelector} from 'react-redux';
import {RootState} from '@redux/Reducers';
import axios from 'axios';
import {readFile} from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AddPost {
  navigation: StackNavigationProp<any>;
  route?: any;
}

export const AddPost: FC<AddPost> = ({navigation}: AddPost) => {
  const [token, setToken] = useState('');
  const dispatch = useDispatch();
  const fetching: boolean = useSelector(
    (state: RootState) => state?.addPost?.fetching,
  );
  const isAuthorized: boolean = useSelector(
    (state: RootState) => state?.addPost?.isAuthorized,
  );
  const maxLengthSize = 100;
  const refRBSheet = useRef();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [isImageUploading, setImageUploading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState('');
  const [onMap, setOnMapCheck] = useState(true);
  const [description, setDescription] = useState('');
  const [profileImage, setProfileImage] = useState<any>(null);
  const [curLoc, setCurLoc] = useState<MetaData>({
    latitude: 30.7993,
    longitude: 76.9149,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const options = {
    mediaType: 'photo',
    includeBase64: false,
    maxHeight: 1000,
    maxWidth: 1000,
  };

  async function getToken() {
    const val = await AsyncStorage.getItem(TOKEN_KEY);
    setToken(val!);
  }

  function getCurrentPosition() {
    try {
      Geolocation.getCurrentPosition(
        position => {
          setCurLoc({
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
      );
    } catch (error) {}
  }

  const loadImageBase64 = async capturedImageURI => {
    try {
      const base64Data = await readFile(capturedImageURI, 'base64');
      return 'data:image/jpeg;base64,' + base64Data;
    } catch (error) {
      console.error('Error converting image to base64:', error);
    }
  };

  function DataURIToBlob(dataURI: string) {
    const splitDataURI = dataURI.split(',');
    const byteString =
      splitDataURI[0].indexOf('base64') >= 0
        ? atob(splitDataURI[1])
        : decodeURI(splitDataURI[1]);
    const mimeString = splitDataURI[0].split(':')[1].split(';')[0];

    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++)
      ia[i] = byteString.charCodeAt(i);

    return new Blob([ia], {type: mimeString});
  }

  const toBase64 = (file: any) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });

  const uploadImage = async (base64File: any) => {
    setImageUploading(true);
    const raw = JSON.stringify({
      contentType: 'image/jpeg',
      extension: 'jpg',
      image: base64File,
    });

    await axios
      .post(`${baseUrl}/dev/mediaFile`, raw, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        const imgUrl = response?.data?.location;
        // console.log('Show res: ', response?.data);
        setUploadedImage(imgUrl);
        setImageUploading(false);
      })
      .catch(function (error) {
        setImageUploading(false);
        if (error.response) {
          const errMsg = error?.response?.data?.message;
          showToast(
            'error',
            'Error while uploading image',
            err_image_uploading_msg,
          );
          console.log(errMsg);
          console.log(error?.response?.status);
          // console.log(error.response.headers);
          if (error?.response?.status === 403) {
            navigation.navigate('Login');
          }
        }
      });
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

              // Convert image URI to base64
              fetch(imageUri)
                .then(response => response.blob())
                .then(async blob => {
                  const image = (await toBase64(blob)) as string;
                  uploadImage(image);
                })
                .catch(error => {
                  console.error('Error converting image to base64:', error);
                  showToast('error', 'Error', err_image_uploading_msg);
                });
            }
          })
        : launchImageLibrary(
            {
              mediaType: 'photo',
            } as CameraOptions,
            async (response: any) => {
              if (response.didCancel) {
              } else {
                let imageUri = response?.uri || response?.assets?.[0]?.uri;
                setProfileImage(imageUri);
                refRBSheet.current?.close();

                // Convert image URI to base64
                fetch(imageUri)
                  .then(response => response.blob())
                  .then(async blob => {
                    const image = (await toBase64(blob)) as string;
                    uploadImage(image);
                  })
                  .catch(error => {
                    console.error('Error converting image to base64:', error);
                    showToast('error', 'Error', err_image_uploading_msg);
                  });
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
    getToken();
    getCurrentPosition();
  }, []);

  useEffect(() => {
    if (isAuthorized) {
      setDescription('');
      setProfileImage(null);
    }
  }, [isAuthorized]);

  return (
    <SafeAreaView style={styles.container}>
      {fetching && (
        <ActivityIndicator
          animating={fetching}
          color={'white'}
          size="large"
          style={styles.activityIndicatorStyles}
        />
      )}
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
        <Text style={[exportStyles.text3, {fontSize: hp(2)}]}>Post</Text>
        <TouchableOpacity
          onPress={() => {
            Keyboard.dismiss();
            const sendingData = {
              token: token,
              story_media: uploadedImage,
              description: description,
              // metadata: curLoc,
            };
            if (uploadedImage === '') {
              showToast(
                'error',
                'Required',
                'Please attach any image files to upload',
              );
            } else {
              !fetching &&
                !isImageUploading &&
                dispatch(AddPostRequest(sendingData));
            }
          }}
          style={{marginRight: wp(4)}}>
          <Text style={[exportStyles.text3]}>{`${
            fetching
              ? 'Publishing...'
              : !isImageUploading
              ? 'Publish'
              : 'Please Wait'
          }`}</Text>
        </TouchableOpacity>
      </View>
      <View style={{alignItems: 'center'}}>
        {isImageUploading && (
          <ActivityIndicator
            size={'large'}
            color={'white'}
            style={{position: 'absolute', marginTop: hp(12), zIndex: 100}}
          />
        )}
        {profileImage && (
          <FastImage
            style={{
              height: hp(32),
              width: wp(98),
              opacity: isImageUploading ? 0.6 : 1,
              backgroundColor: isImageUploading ? 'white' : 'transparent',
            }}
            source={{
              uri: profileImage,
            }}
          />
        )}
        {profileImage === null && (
          <TouchableOpacity
            style={{alignItems: 'center', marginTop: hp(6)}}
            onPress={() => {
              refRBSheet?.current?.open();
            }}>
            <AntDesignIcon name="pluscircleo" size={62} color={'white'} />
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
                color={Colors.fadeWhite}
              />
            </TouchableOpacity>
          </View>
        )}
        <TextInput
          multiline
          numberOfLines={5}
          value={description}
          maxLength={maxLengthSize}
          placeholderTextColor={Colors.fadeWhite}
          onChangeText={val => setDescription(val)}
          placeholder="Write your stuffs here...."
          style={styles.textInputStyles}
        />
        {horizontalLine(wp(100))}
        <View style={styles.textCountView}>
          <Text style={[exportStyles.text4]}>Limited to 100 symbols</Text>
          <Text
            style={[
              styles.countTextStyles,
              {color: description.length >= 95 ? 'red' : 'white'},
            ]}>{`${description.length}/${maxLengthSize}`}</Text>
        </View>
      </View>
      {!isKeyboardVisible && (
        <View style={[exportStyles.row, styles.buttonViewStyles]}>
          <CustomButton
            label="On the Map"
            onPress={() => {
              !fetching && setOnMapCheck(!onMap);
            }}
            containerStyle={styles.buttonContainerStyles}
            textOverrideStyle={{color: !onMap ? Colors.darkGrey : 'white'}}
          />
          <CustomButton
            label="On the Profile"
            onPress={() => {
              !fetching && setOnMapCheck(!onMap);
            }}
            containerStyle={[
              styles.buttonContainerStyles,
              {backgroundColor: Colors.activeColor},
            ]}
            textOverrideStyle={{color: onMap ? Colors.darkGrey : 'white'}}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    height: hp(10),
    width: wp(100),
    paddingTop: hp(2.5),
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
    color: 'white',
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
  activityIndicatorStyles: {
    left: 0,
    right: 0,
    top: hp(32),
    bottom: 0,
    alignSelf: 'center',
    position: 'absolute',
    justifyContent: 'center',
  },
});
