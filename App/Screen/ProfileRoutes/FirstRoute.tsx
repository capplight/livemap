import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Ionicons} from '@themes/Icons';
import {exportStyles} from '@components/ExportStyles';
import {Colors} from '@themes/Colors';

interface FirstRouteProps {
  isLoading?: boolean;
  data: any;
}

export const FirstRoute = ({isLoading = true, data = []}: FirstRouteProps) => {
  const emptyImageLink =
    'https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg';
  return (
    <View style={routeStyles.routeViewStyles}>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={
          <ActivityIndicator
            size={'large'}
            color={'white'}
            style={{marginTop: hp(8)}}
          />
        }
        renderItem={({item, index}) => {
          const link = item?.link;
          return (
            <View style={routeStyles.container}>
              <TouchableOpacity>
                <Image
                  source={{uri: link !== null || '' ? link : emptyImageLink}}
                  style={routeStyles.imageStyles}
                />
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
                  <Text style={routeStyles.text}>2M</Text>
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
  text: {
    fontSize: hp(1.5),
    marginLeft: wp(1),
    color: Colors.lightWhite,
  },
});
