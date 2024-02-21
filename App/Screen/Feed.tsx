import {StackNavigationProp} from '@react-navigation/stack';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect, FC, useRef} from 'react';
import {Colors} from '@themes/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {feedData} from '@constants/data';
import {exportStyles} from '@components/ExportStyles';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {
  AntDesignIcon,
  FeatherIcon,
  Ionicons,
  MaterialCommunityIcon,
} from '@themes/Icons';
import {
  VerticalLine,
  homeNavigation,
  horizontalLine,
} from '@constants/constValues';
import {SVGRenderer} from '@components/SVGRenderer';
import CrossIcon from '@assets/svg/crossLarge.svg';

interface Feed {
  navigation: StackNavigationProp<any>;
  route?: any;
}

export const Feed: FC<Feed> = ({navigation}: Feed) => {
  const renderItem = (data: any) => {
    const {userName, userId, description, link, likes, comments, share, time} =
      data?.item;
    return (
      <View style={{alignItems: 'center', marginVertical: hp(0.5)}}>
        <View style={styles.renderingViewStyles}>
          <Image
            source={{uri: link}}
            style={[exportStyles.roundImageStyles, {marginRight: wp(4)}]}
          />
          <View style={styles.headLineViewStyles}>
            <View style={[exportStyles.row]}>
              <Text style={exportStyles.text1}>{userName}</Text>
              <Text style={[exportStyles.text2, {marginLeft: wp(2)}]}>
                {userId}
              </Text>
            </View>
            <Text
              numberOfLines={2}
              style={[exportStyles.text1, {fontWeight: 'normal'}]}>
              {description}
            </Text>
          </View>
          <View style={[styles.endHeaderStyles]}>
            <Text style={[exportStyles.text2, {fontWeight: 'bold'}]}>
              {time}
            </Text>
            <TouchableOpacity onPress={() => {}}>
              <Text
                style={[
                  exportStyles.text1,
                  {
                    marginLeft: wp(1),
                    marginBottom: hp(0.8),
                    padding: hp(0.5),
                  },
                ]}>
                ...
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[exportStyles.row, {justifyContent: 'space-between'}]}>
          {VerticalLine()}
          <Image source={{uri: link}} style={styles.imageStyles} />
        </View>
        <View style={styles.iconStyles}>
          <View style={[exportStyles.row]}>
            <View style={styles.innerIconStyles}>
              <AntDesignIcon name="hearto" size={26} />
              <Text style={[exportStyles.text1, {marginLeft: wp(1.5)}]}>
                {likes}
              </Text>
            </View>
            <View style={styles.innerIconStyles}>
              <MaterialCommunityIcon name="comment-text-outline" size={26} />
              <Text style={[exportStyles.text1, {marginLeft: wp(1.5)}]}>
                {comments}
              </Text>
            </View>
            <View style={styles.innerIconStyles}>
              <Ionicons name="send-sharp" size={26} />
              <Text style={[exportStyles.text1, {marginLeft: wp(1.5)}]}>
                {share}
              </Text>
            </View>
          </View>
          <FeatherIcon name="bookmark" size={26} />
        </View>
        {horizontalLine(wp(100))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topViewStyles}>
        <SVGRenderer
          touchable
          style={{padding: wp(2)}}
          onPress={() => {
            homeNavigation({navigation});
          }}>
          <CrossIcon />
        </SVGRenderer>
        <Text
          style={[
            exportStyles.text1,
            {marginVertical: hp(2), fontSize: hp(2)},
          ]}>
          Posts
        </Text>
        <TouchableHighlight style={{alignSelf: 'flex-end'}}>
          <FeatherIcon name="search" size={28} color={Colors.lightWhite} />
        </TouchableHighlight>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={feedData}
        renderItem={renderItem}
        style={{backgroundColor: Colors.backgroundColor}}
      />
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.backgroundDark,
  },
  renderingViewStyles: {
    width: wp(98),
    padding: wp(2),
    flexDirection: 'row',
    marginHorizontal: wp(2),
    justifyContent: 'space-around',
  },
  topViewStyles: {
    width: wp(96),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headLineViewStyles: {
    width: wp(74),
    marginLeft: wp(2),
    alignItems: 'flex-start',
  },
  endHeaderStyles: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp(1.5),
  },
  imageStyles: {
    height: hp(22),
    width: wp(84),
    borderRadius: 8,
    marginBottom: hp(1),
  },
  iconStyles: {
    width: wp(82),
    marginLeft: wp(12),
    marginTop: hp(0.5),
    marginBottom: hp(2),
    flexDirection: 'row',
    alignSelf: 'flex-start',
    justifyContent: 'space-between',
  },
  innerIconStyles: {
    marginRight: wp(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
