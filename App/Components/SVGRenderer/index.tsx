import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

interface StyleProps {
  style?: {[key: string]: string | number | React.FC<any>};
}

interface SVGRendererProps extends StyleProps {
  children?: React.ReactNode;
  onPress?: () => void;
  touchable?: boolean;
}

export const SVGRenderer: React.FC<SVGRendererProps> = ({
  onPress,
  children,
  style,
  touchable = true,
}) => {
  return (
    <View style={[{...style}]}>
      {touchable ? (
        <TouchableOpacity onPress={onPress}>
          {/* style={[{...style, transform: [{scale: hp(0.1)}]}]}> */}
          {children}
        </TouchableOpacity>
      ) : (
        <View>
          {/* style={[{...style, transform: [{scale: hp(0.1)}]}]}> */}
          {children}
        </View>
      )}
    </View>
  );
};
