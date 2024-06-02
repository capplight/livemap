import React from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import {CircularImage, exportStyles} from './ExportStyles';
import {homeNavigation} from '@constants/constValues';
import {EntypoIcon, FeatherIcon} from '@themes/Icons';
import {SVGRenderer} from './SVGRenderer';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {StackNavigationProp} from '@react-navigation/stack';
import CrossIcon from '@assets/svg/crossLarge.svg';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Colors} from '@themes/Colors';

interface HeaderViewProps {
  navigation: StackNavigationProp<any>;
  navigateBack?: boolean;
  title: string;
  senderName?: string;
  isChatScreen?: boolean;
}

export const TopHeaderView = ({
  navigation,
  title = 'Posts',
  navigateBack = true,
  senderName = '',
  isChatScreen = false,
}: HeaderViewProps) => {
  return (
    <SafeAreaView style={{backgroundColor: Colors.backgroundDark}}>
      {!isChatScreen && (
        <View style={{height: hp(Platform.OS === 'ios' ? 0 : 1.8)}} />
      )}
      <SafeAreaView
        style={[
          styles.topViewStyles,
          {justifyContent: `${isChatScreen ? 'flex-start' : 'space-between'}`},
        ]}>
        {!navigateBack ? (
          <SVGRenderer
            touchable
            style={{padding: wp(2)}}
            onPress={() => {
              homeNavigation({navigation});
            }}>
            <CrossIcon />
          </SVGRenderer>
        ) : (
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <EntypoIcon name="chevron-left" />
          </TouchableOpacity>
        )}
        {isChatScreen && (
          <View style={styles.userImageStyles}>
            <CircularImage size={32} />
            <Text style={[exportStyles.text3, {marginLeft: wp(2.5)}]}>
              {senderName}
            </Text>
          </View>
        )}
        {!isChatScreen && (
          <Text
            style={[
              exportStyles.text1,
              {marginVertical: hp(2), fontSize: hp(2)},
            ]}>
            {title}
          </Text>
        )}
        {!isChatScreen && (
          <TouchableHighlight style={{alignSelf: 'center'}}>
            <FeatherIcon name="search" size={28} color={Colors.lightWhite} />
          </TouchableHighlight>
        )}
      </SafeAreaView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topViewStyles: {
    height: hp(Platform.OS === 'ios' ? 6 : 8),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(2),
    paddingTop: hp(1),
    justifyContent: 'space-between',
    // backgroundColor: Colors.backgroundDark,
  },
  userImageStyles: {
    marginLeft: wp(6),
    flexDirection: 'row',
    alignItems: 'center',
  },
});
