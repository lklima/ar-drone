import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  ViroARScene,
  ViroNode,
  Viro3DObject,
  ViroARPlaneSelector,
  ViroSpotLight,
  ViroQuad,
} from '@viro-community/react-viro';

const resources = [
  require('../../res/drone/black.jpeg'),
  require('../../res/drone/gold.jpeg'),
  require('../../res/drone/silver.jpeg'),
  require('../../res/drone/cobre.jpeg'),
];

export default function DroneScene({ arSceneNavigator }) {
  const [pauseUpdates, setPauseUpdates] = useState(false);

  const {
    reset,
    withShadow,
    clearReset,
    startLoad,
    endLoad,
    runAnimation,
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
    if (reset && drone.current) {
      console.log('entrou');
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
  }, [drone, reset, clearReset]);

  useEffect(() => {
    if (drone.current) {
      if (leftJoystickDirection === 'up') {
        clearInterval(intervaRigthMoveId.current);
        intervaRigthMoveId.current = setInterval(() => {
          if (rotateY.current === 0) {
            translateZ.current += 0.01;
          } else if (rotateY.current > 0) {
            translateZ.current += 0.01;
            translateX.current += 0.01;
          } else if (rotateY.current < 0) {
            translateZ.current += 0.01;
            translateX.current -= 0.01;
          }

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
        }, 15);
      } else if (leftJoystickDirection === 'down') {
        clearInterval(intervaRigthMoveId.current);
        intervaRigthMoveId.current = setInterval(() => {
          if (rotateY.current === 0) {
            translateZ.current -= 0.01;
          } else if (rotateY.current > 0) {
            translateZ.current -= 0.01;
            translateX.current -= 0.01;
          } else if (rotateY.current < 0) {
            translateZ.current -= 0.01;
            translateX.current += 0.01;
          }

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
        }, 15);
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
        }, 15);
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
        }, 15);
      } else {
        clearInterval(intervaRigthMoveId.current);
        intervaRigthRotateId.current = setInterval(() => {
          if (rotateX.current !== 0 || rotateZ.current !== 0) {
            if (rotateX.current > 0) {
              rotateX.current -= 1;
            }
            if (rotateX.current < 0) {
              rotateX.current += 1;
            }
            if (rotateZ.current > 0) {
              rotateZ.current -= 1;
            }
            if (rotateZ.current < 0) {
              rotateZ.current += 1;
            }
          } else {
            clearInterval(intervaRigthRotateId.current);
          }

          drone.current.setNativeProps({
            rotation: [rotateX.current, rotateY.current, rotateZ.current],
          });
        }, 15);
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
        <ViroARPlaneSelector
          minHeight={0.1}
          minWidth={0.1}
          alignment="Horizontal"
          pauseUpdates={pauseUpdates}
          maxPlanes={1}
          onPlaneSelected={onPlaneSelected}>
          <ViroNode ref={drone}>
            <ViroSpotLight
              attenuationStartDistance={5}
              attenuationEndDistance={10}
              color="#ffffff"
              direction={[0, -0.5, -0.2]}
              position={[0, 3, 1]}
              innerAngle={5}
              outerAngle={20}
              castsShadow={withShadow}
              shadowNearZ={2}
              shadowFarZ={3.5}
              shadowOpacity={0.6}
            />
            <Viro3DObject
              position={[0, 0, 0]}
              scale={[0.01, 0.01, 0.01]}
              source={require('../../res/drone/drone.vrx')}
              resources={resources}
              type="VRX"
              onLoadStart={startLoad}
              onLoadEnd={endLoad}
              animation={{
                name: 'Simple_drone',
                run: runAnimation,
                loop: true,
              }}
            />
          </ViroNode>
          <ViroQuad
            position={[0, 0, 0]}
            rotation={[-90, 0, 0]}
            width={2}
            height={2}
            arShadowReceiver
          />
        </ViroARPlaneSelector>
      </ViroARScene>
    ),
    [pauseUpdates, withShadow, startLoad, endLoad, runAnimation],
  );
}
