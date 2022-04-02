import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { styles } from './styles';

export default function Joystick({ style, currentDirection, handleDirection }) {
  const positionX = useSharedValue(0);
  const positionY = useSharedValue(0);

  function handleChangeDirection(direction) {
    if (direction !== currentDirection) {
      handleDirection(direction);
    }
  }

  const panGesture = Gesture.Pan()
    .onUpdate(({ translationX, translationY }) => {
      const pureXValue = Number(translationX.toString().replace('-', ''));
      const pureYValue = Number(translationY.toString().replace('-', ''));

      if (translationX > 35) {
        runOnJS(handleChangeDirection)('right');
      } else if (translationX < -35) {
        runOnJS(handleChangeDirection)('left');
      } else if (translationY > 35) {
        runOnJS(handleChangeDirection)('down');
      } else if (translationY < -35) {
        runOnJS(handleChangeDirection)('up');
      }

      if (pureXValue <= 65 && pureYValue <= 65) {
        positionX.value = translationX;
        positionY.value = translationY;
      }
    })
    .onEnd(() => {
      runOnJS(handleChangeDirection)('none');
      positionX.value = withTiming(0, { duration: 100 });
      positionY.value = withTiming(0, { duration: 100 });
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: positionY.value },
      { translateX: positionX.value },
    ],
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <View style={style}>
        <View style={styles.joystickCircle}>
          <View style={styles.verticalDirect}>
            <Icon name="ios-chevron-up" color="white" size={24} />
            <Icon name="ios-chevron-down" color="white" size={24} />
          </View>
          <Animated.View style={[styles.joystick, animatedStyle]} />
          <View style={styles.horizontalDirect}>
            <Icon name="ios-chevron-back" color="white" size={24} />
            <Icon name="ios-chevron-forward" color="white" size={24} />
          </View>
        </View>
      </View>
    </GestureDetector>
  );
}
