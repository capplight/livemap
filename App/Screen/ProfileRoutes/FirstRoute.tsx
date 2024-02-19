import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {View, Text, FlatList, Image, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Ionicons} from '@themes/Icons';
import {exportStyles} from '@components/ExportStyles';
import {Colors} from '@themes/Colors';

interface FirstRouteProps {
  data: any;
}

export const FirstRoute = ({data = []}: FirstRouteProps) => {
  return (
    <View style={routeStyles.routeViewStyles}>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => {
          const link = item?.link;
          return (
            <View style={routeStyles.container}>
              <TouchableOpacity>
                {link !== null || '' ? (
                  <Image source={{uri: link}} style={routeStyles.imageStyles} />
                ) : null}
              </TouchableOpacity>
              {index !== data?.length - 1 ? (
                <View
                  style={[
                    exportStyles.row,
                    {position: 'absolute', marginLeft: wp(1.5), bottom: hp(1)},
                  ]}>
                  <Ionicons
                    name="play-outline"
                    size={18}
                    color={Colors.lightWhite}
                  />
                  <Text
                    style={[
                      exportStyles.text1,
                      {fontWeight: 'normal', marginLeft: wp(1)},
                    ]}>
                    2M
                  </Text>
                </View>
              ) : null}
            </View>
          );
        }}
        nestedScrollEnabled
        numColumns={3}
        data={data}
      />
    </View>
  );
};

export const routeStyles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 1,
  },
  imageStyles: {
    height: hp(15),
    width: wp(33),
    alignContent: 'flex-start',
  },
  routeViewStyles: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});
