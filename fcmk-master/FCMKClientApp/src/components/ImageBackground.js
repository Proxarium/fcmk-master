import React from 'react';
import { View, StyleSheet, ImageBackground, ActivityIndicator } from 'react-native';
const styles = StyleSheet.create({
  imageOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  container: {
    //backgroundColor: '#000000',
  },
});
class ProgressiveImage extends React.Component {
    render() {
      const {
        thumbnailSource,
        source,
        style,
        ...props
      } = this.props;
      return (
        <View style={styles.container}>
          <ActivityIndicator style={{position:'relative', width:'100%', height:'100%'}}  />
          <ImageBackground
            {...props}
            resizeMode="contain"
            source={source}
            style={[styles.imageOverlay, style]}
          />
        </View>
      );
    }
  }
  export default ProgressiveImage;