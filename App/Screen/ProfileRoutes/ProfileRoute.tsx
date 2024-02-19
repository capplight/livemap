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
  ScrollView,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Ionicons} from '@themes/Icons';
import {exportStyles} from '@components/ExportStyles';

interface FirstRouteProps {
  data: any;
}

export const renderItem = (data: any) => {
  const {link} = data?.item;
  return (
    <View style={styles.container}>
      {link !== null || '' ? (
        <Image source={{uri: link}} style={styles.imageStyles} />
      ) : null}
      <TouchableOpacity
        style={[exportStyles.row, {position: 'absolute', marginLeft: wp(1.5)}]}>
        <Ionicons name="play-outline" size={18} />
        <Text
          style={[
            exportStyles.text1,
            {fontWeight: 'normal', marginLeft: wp(1)},
          ]}>
          2M
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export const FirstRoute = ({data = []}: FirstRouteProps) => (
  <View style={styles.routeViewStyles}>
    <ScrollView nestedScrollEnabled>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        nestedScrollEnabled
        numColumns={3}
        data={data}
      />
    </ScrollView>
  </View>
);

export const SecondRoute = ({data = []}: FirstRouteProps) => (
  <View style={styles.routeViewStyles}>
    <FlatList
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
      nestedScrollEnabled
      numColumns={3}
      data={data}
    />
  </View>
);

export const ThirdRoute = ({data = []}: FirstRouteProps) => (
  <View style={styles.routeViewStyles}>
    <ScrollView nestedScrollEnabled horizontal={true}>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        nestedScrollEnabled
        numColumns={3}
        data={data}
      />
    </ScrollView>
  </View>
);

export const FourthRoute = ({data = []}: FirstRouteProps) => (
  <View style={styles.routeViewStyles}>
    <ScrollView nestedScrollEnabled horizontal={true}>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        nestedScrollEnabled
        numColumns={3}
        data={data}
      />
    </ScrollView>
  </View>
);

export const FifthRoute = ({data = []}: FirstRouteProps) => (
  <View style={styles.routeViewStyles}>
    <ScrollView nestedScrollEnabled horizontal={true}>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        nestedScrollEnabled
        numColumns={3}
        data={data}
      />
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
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
