import React, { useState } from 'react';
import { TouchableOpacity, Text, View, ActivityIndicator } from 'react-native';
import { ViroARSceneNavigator } from '@viro-community/react-viro';

import { styles } from './styles';

import DroneScene from './components/DroneScene';
import Joystick from './components/Joystick';

export default function Main() {
  const [isObjLoad, setisObjLoad] = useState(false);
  const [reset, setReset] = useState(false);
  const [leftJoystickDirection, setLeftJoystickDirection] = useState('none');
  const [rigthJoystickDirection, setRightJoystickDirection] = useState('none');

  const viroAppProps = {
    reset,
    leftJoystickDirection,
    rigthJoystickDirection,
    startLoad: () => setisObjLoad(true),
    endLoad: () => setisObjLoad(false),
    clearReset: () => setReset(false),
  };

  const viroScene = () => {
    return (
      <ViroARSceneNavigator
        viroAppProps={viroAppProps}
        initialScene={{
          scene: DroneScene,
        }}
        style={styles.container}
      />
    );
  };

  return (
    <View style={styles.container}>
      {isObjLoad && (
        <ActivityIndicator color="white" size="large" style={styles.loader} />
      )}
      {viroScene()}
      <Joystick
        style={styles.leftJoystick}
        currentDirection={leftJoystickDirection}
        handleDirection={setLeftJoystickDirection}
      />
      <Joystick
        style={styles.rigthJoystick}
        currentDirection={rigthJoystickDirection}
        handleDirection={setRightJoystickDirection}
      />
      <TouchableOpacity style={styles.button} onPress={() => setReset(true)}>
        <Text style={styles.buttonText}>RESET</Text>
      </TouchableOpacity>
    </View>
  );
}
