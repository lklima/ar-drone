import React, { useState } from 'react';
import { TouchableOpacity, Text, View, ActivityIndicator } from 'react-native';
import { ViroARSceneNavigator } from '@viro-community/react-viro';
import Icon from 'react-native-vector-icons/Ionicons';

import { styles } from './styles';

import DroneScene from './components/DroneScene';
import Joystick from './components/Joystick';

export default function Main() {
  const [isObjLoad, setisObjLoad] = useState(false);
  const [reset, setReset] = useState(false);
  const [runAnimation, setRunAnimation] = useState(false);
  const [withShadow, setWithShadow] = useState(false);
  const [leftJoystickDirection, setLeftJoystickDirection] = useState('none');
  const [rigthJoystickDirection, setRightJoystickDirection] = useState('none');

  const backgroundColor = runAnimation ? '#e53935' : '#43a047';

  const viroAppProps = {
    reset,
    withShadow,
    runAnimation,
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
      <View style={styles.buttonsContent}>
        <TouchableOpacity
          style={styles.shadowButton}
          onPress={() => setWithShadow(!withShadow)}>
          <Icon
            name={withShadow ? 'sunny-sharp' : 'sunny-outline'}
            size={30}
            color="white"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setReset(true)}>
          <Icon name="ios-refresh" size={25} color="white" />
          <Text style={styles.buttonText}>RESET</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.onButton, { backgroundColor }]}
          onPress={() => setRunAnimation(!runAnimation)}>
          <Icon name="power-sharp" size={25} color="white" />
          <Text style={styles.buttonText}>{runAnimation ? 'OFF' : 'ON'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
