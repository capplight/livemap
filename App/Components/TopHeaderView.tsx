import React from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {exportStyles} from './ExportStyles';
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
  //   icon?: any;
  navigateBack?: boolean;
  title: string;
}

export const TopHeaderView = ({
  navigation,
  title = 'Posts',
  //   icon = <CrossIcon />,
  navigateBack = true,
}: HeaderViewProps) => {
  return (
    <View style={{backgroundColor: Colors.backgroundDark}}>
      <View style={{height: hp(2.5)}} />
      <SafeAreaView style={styles.topViewStyles}>
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
        <Text
          style={[
            exportStyles.text1,
            {marginVertical: hp(2), fontSize: hp(2)},
          ]}>
          {title}
        </Text>
        <TouchableHighlight style={{alignSelf: 'center'}}>
          <FeatherIcon name="search" size={28} color={Colors.lightWhite} />
        </TouchableHighlight>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  topViewStyles: {
    height: hp(8),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(2),
    // paddingTop: hp(4),
    justifyContent: 'space-between',
    // backgroundColor: Colors.backgroundDark,
  },
});
