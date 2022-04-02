import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  joystickCircle: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    height: 150,
    width: 150,
    borderRadius: 75,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verticalDirect: {
    height: '100%',
    justifyContent: 'space-between',
    position: 'absolute',
  },
  horizontalDirect: {
    width: '100%',
    height: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
  },
  joystick: {
    height: 70,
    width: 70,
    borderRadius: 40,
    backgroundColor: 'black',
    zIndex: 999,
    borderColor: '#ffab00',
    borderWidth: 1.5,
  },
});
