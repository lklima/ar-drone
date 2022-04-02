import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  ViroARScene,
  ViroNode,
  ViroAmbientLight,
  Viro3DObject,
  ViroARPlaneSelector,
  ViroSpotLight,
  ViroQuad,
} from '@viro-community/react-viro';

const resources = [
  require('../../res/drone/black.jpg'),
  require('../../res/drone/gold.jpeg'),
  require('../../res/drone/silver.jpeg'),
  require('../../res/drone/cobre.jpeg'),
];

export default function DroneScene({ arSceneNavigator }) {
  const [pauseUpdates, setPauseUpdates] = useState(false);

  const {
    reset,
    clearReset,
    startLoad,
    endLoad,
    leftJoystickDirection,
    rigthJoystickDirection,
  } = arSceneNavigator.viroAppProps;

  const drone = useRef(null);

  const intervalLeftRotateId = useRef(null);
  const intervalLeftMoveId = useRef(null);
  const intervaRigthRotateId = useRef(null);
  const intervaRigthMoveId = useRef(null);

  const translateX = useRef(0);
  const translateY = useRef(0);
  const translateZ = useRef(0);
  const rotateX = useRef(0);
  const rotateY = useRef(0);
  const rotateZ = useRef(0);

  function onPlaneSelected() {
    setPauseUpdates(true);
  }

  useEffect(() => {
    if (reset) {
      rotateY.current = 0;
      translateY.current = 0;
      translateZ.current = 0;
      translateX.current = 0;

      drone.current.setNativeProps({
        position: [0, 0, 0],
        rotation: [0, 0, 0],
      });

      setTimeout(() => clearReset(), 600);
    }
  }, [reset, clearReset]);

  useEffect(() => {
    if (drone.current) {
      if (leftJoystickDirection === 'up') {
        clearInterval(intervaRigthMoveId.current);
        intervaRigthMoveId.current = setInterval(() => {
          translateZ.current += 0.01;

          if (rotateX.current < 9) {
            rotateX.current += 1.5;
          }

          drone.current.setNativeProps({
            position: [
              translateX.current,
              translateY.current,
              translateZ.current,
            ],
            rotation: [rotateX.current, rotateY.current, rotateZ.current],
          });
        }, 20);
      } else if (leftJoystickDirection === 'down') {
        clearInterval(intervaRigthMoveId.current);
        intervaRigthMoveId.current = setInterval(() => {
          translateZ.current -= 0.01;

          if (rotateX.current > -9) {
            rotateX.current -= 1.5;
          }

          drone.current.setNativeProps({
            position: [
              translateX.current,
              translateY.current,
              translateZ.current,
            ],
            rotation: [rotateX.current, rotateY.current, rotateZ.current],
          });
        }, 20);
      } else if (leftJoystickDirection === 'right') {
        clearInterval(intervaRigthMoveId.current);
        intervaRigthMoveId.current = setInterval(() => {
          translateX.current -= 0.01;

          if (rotateZ.current < 9) {
            rotateZ.current += 1.5;
          }

          drone.current.setNativeProps({
            position: [
              translateX.current,
              translateY.current,
              translateZ.current,
            ],
            rotation: [rotateX.current, rotateY.current, rotateZ.current],
          });
        }, 20);
      } else if (leftJoystickDirection === 'left') {
        clearInterval(intervaRigthMoveId.current);
        intervaRigthMoveId.current = setInterval(() => {
          translateX.current += 0.01;

          if (rotateZ.current > -9) {
            rotateZ.current -= 1.5;
          }

          drone.current.setNativeProps({
            position: [
              translateX.current,
              translateY.current,
              translateZ.current,
            ],
            rotation: [rotateX.current, rotateY.current, rotateZ.current],
          });
        }, 20);
      } else {
        clearInterval(intervaRigthMoveId.current);
        intervaRigthRotateId.current = setInterval(() => {
          if (rotateX.current > 0) {
            rotateX.current -= 1;
          } else if (rotateX.current < 0) {
            rotateX.current += 1;
          } else if (rotateZ.current > 0) {
            rotateZ.current -= 1;
          } else if (rotateZ.current < 0) {
            rotateZ.current += 1;
          } else {
            clearInterval(intervaRigthRotateId.current);
          }

          drone.current.setNativeProps({
            rotation: [rotateX.current, rotateY.current, rotateZ.current],
          });
        }, 20);
      }
    }
  }, [drone, leftJoystickDirection]);

  useEffect(() => {
    if (drone.current) {
      if (rigthJoystickDirection === 'up') {
        clearInterval(intervalLeftMoveId.current);
        intervalLeftMoveId.current = setInterval(() => {
          translateY.current += 0.01;

          drone.current.setNativeProps({
            position: [
              translateX.current,
              translateY.current,
              translateZ.current,
            ],
          });
        }, 20);
      } else if (rigthJoystickDirection === 'down') {
        clearInterval(intervalLeftMoveId.current);
        intervalLeftMoveId.current = setInterval(() => {
          if (translateY.current > 0) {
            translateY.current -= 0.01;
          }

          drone.current.setNativeProps({
            position: [
              translateX.current,
              translateY.current,
              translateZ.current,
            ],
          });
        }, 20);
      } else if (rigthJoystickDirection === 'right') {
        clearInterval(intervalLeftRotateId.current);
        intervalLeftRotateId.current = setInterval(() => {
          rotateY.current -= 1;
          drone.current.setNativeProps({
            rotation: [0, rotateY.current, 0],
          });
        }, 20);
      } else if (rigthJoystickDirection === 'left') {
        clearInterval(intervalLeftRotateId.current);
        intervalLeftRotateId.current = setInterval(() => {
          rotateY.current += 1;
          drone.current.setNativeProps({
            rotation: [0, rotateY.current, 0],
          });
        }, 20);
      } else {
        clearInterval(intervalLeftMoveId.current);
        clearInterval(intervalLeftRotateId.current);
      }
    }
  }, [drone, rigthJoystickDirection]);

  return useMemo(
    () => (
      <ViroARScene>
        <ViroAmbientLight color="#FFFFFF" />
        <ViroARPlaneSelector
          minHeight={0.1}
          minWidth={0.1}
          alignment="Horizontal"
          pauseUpdates={pauseUpdates}
          maxPlanes={1}
          onPlaneSelected={onPlaneSelected}>
          {/* <ViroSpotLight
          attenuationStartDistance={5}
          attenuationEndDistance={10}
          color="#ffffff"
          direction={[0, -0.5, -0.2]}
          position={[0, 3, 1]}
          innerAngle={5}
          outerAngle={20}
          castsShadow
          shadowNearZ={2}
          shadowFarZ={5}
          shadowOpacity={0.7}
        /> */}
          <ViroNode ref={drone}>
            <Viro3DObject
              position={[0, 0, 0]}
              scale={[0.01, 0.01, 0.011]}
              source={require('../../res/drone/drone.vrx')}
              resources={resources}
              type="VRX"
              onLoadStart={startLoad}
              onLoadEnd={endLoad}
              animation={{
                name: 'Simple_drone',
                run: true,
                loop: true,
              }}
            />
          </ViroNode>
          {/* <ViroQuad
          position={[0, 0, 0]}
          rotation={[-90, 0, 0]}
          width={0.6}
          height={0.6}
          arShadowReceiver={true}
        /> */}
        </ViroARPlaneSelector>
      </ViroARScene>
    ),
    [endLoad, pauseUpdates, startLoad],
  );
}
