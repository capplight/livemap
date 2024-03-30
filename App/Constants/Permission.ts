import {PermissionsAndroid, Platform} from 'react-native';
import {
  PERMISSIONS,
  check,
  request,
  openSettings,
  RESULTS,
} from 'react-native-permissions';

export const isAndroid = Platform.OS === 'android';

export const requestCameraPermission = async () => {
  try {
    if (isAndroid) {
      // const a =
      //   Platform.Version >= '33'
      //     ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
      //     : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Requires Camera Permission',
          message: 'LiveMap App needs access to your camera',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
        return true;
      } else {
        console.log('Camera permission denied', granted);
        granted === 'never_ask_again' &&
          // showAlert({
          //   message: 'You need to grant camera permission from app settings!!',
          //   type: 'danger',
          //   duration: 2000,
          // });
          openSettings().catch(() => console.warn('cannot open settings'));
      }
    } else {
      const status = await check(PERMISSIONS.IOS.CAMERA);
      if (status !== RESULTS.GRANTED) {
        try {
          const camStatus = await request(PERMISSIONS.IOS.CAMERA);
          if (camStatus !== RESULTS.GRANTED) {
            openSettings().catch(() => console.warn('cannot open settings'));
            return false;
          }
        } catch (err) {
          console.log(err);
          return false;
        }
      }
      return true;
    }
  } catch (err) {
    console.warn('Catch: ', err);
  }
};

export const requestStoragePermission = async () => {
  try {
    if (isAndroid) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Requires Storage Permission',
          message: 'LiveMap App needs access to your storage',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You have now storage access');
        return true;
      } else {
        console.log('Storage permission denied', granted);
        granted === 'never_ask_again' &&
          // showAlert({
          //   message: 'You need to grant camera permission from app settings!!',
          //   type: 'danger',
          //   duration: 2000,
          // });
          openSettings().catch(() => console.warn('cannot open settings'));
      }
    }
    // else {
    //   const status = await check(PERMISSIONS.IOS);
    //   if (status !== RESULTS.GRANTED) {
    //     try {
    //       const camStatus = await request(PERMISSIONS.IOS.CAMERA);
    //       if (camStatus !== RESULTS.GRANTED) {
    //         openSettings().catch(() => console.warn('cannot open settings'));
    //         return false;
    //       }
    //     } catch (err) {
    //       console.log(err);
    //       return false;
    //     }
    //   }
    //   return true;
    // }
  } catch (err) {
    console.warn('Catch: ', err);
  }
};

export const requestMapsPermission = async () => {
  try {
    if (isAndroid) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Requires Maps Permission',
          message: 'LiveMap App needs access to your map',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the maps');
        return true;
      } else {
        console.log('Maps permission denied', granted);
        granted === 'never_ask_again' &&
          // showAlert({
          //   message: 'You need to grant camera permission from app settings!!',
          //   type: 'danger',
          //   duration: 2000,
          // });
          openSettings().catch(() => console.warn('cannot open settings'));
      }
    } else {
      const status = await check(PERMISSIONS.IOS.CAMERA);
      if (status !== RESULTS.GRANTED) {
        try {
          const camStatus = await request(PERMISSIONS.IOS.CAMERA);
          if (camStatus !== RESULTS.GRANTED) {
            openSettings().catch(() => console.warn('cannot open settings'));
            return false;
          }
        } catch (err) {
          console.log(err);
          return false;
        }
      }
      return true;
    }
  } catch (err) {
    console.warn('Catch: ', err);
  }
};

export const requestNotificationPermission = async () => {
  try {
    if (isAndroid) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        {
          title: 'Requires Notification Permission',
          message: 'LiveMap App needs to send you notification',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can send the notification');
        return true;
      } else {
        console.log('Notification permission denied', granted);
        granted === 'never_ask_again' &&
          // showAlert({
          //   message: 'You need to grant camera permission from app settings!!',
          //   type: 'danger',
          //   duration: 2000,
          // });
          openSettings().catch(() => console.warn('cannot open settings'));
      }
    } else {
      const status = await check(PERMISSIONS.IOS.CAMERA);
      if (status !== RESULTS.GRANTED) {
        try {
          const camStatus = await request(PERMISSIONS.IOS.CAMERA);
          if (camStatus !== RESULTS.GRANTED) {
            openSettings().catch(() => console.warn('cannot open settings'));
            return false;
          }
        } catch (err) {
          console.log(err);
          return false;
        }
      }
      return true;
    }
  } catch (err) {
    console.warn('Catch: ', err);
  }
};
