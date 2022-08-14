import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';

const SIZE = 60;
const App = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (e, context) => {
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive: (e, context) => {
      translateX.value = e.translationX + context.translateX;
      translateY.value = e.translationY + context.translateY;
    },
    onEnd: () => {
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
    },
  });

  const animStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    };
  });
  return (
    <SafeAreaView style={styles.container}>
      <PanGestureHandler onGestureEvent={panGestureEvent}>
        <Animated.View style={[styles.container, animStyle]}>
          <Animated.View style={[styles.object, animStyle]}></Animated.View>
        </Animated.View>
      </PanGestureHandler>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  object: {
    width: SIZE,
    height: SIZE,
    backgroundColor: 'red',
    borderRadius: 50,
    margin: 5,
  },
});

export default App;
