import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    position: 'absolute',
    backgroundColor: 'gray',
    height: 50,
    width: 200,
    bottom: 40,
    borderRadius: 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loader: {
    position: 'absolute',
    alignSelf: 'center',
    top: 0,
    bottom: 0,
    zIndex: 9999,
  },
  leftJoystick: {
    position: 'absolute',
    bottom: 30,
    left: 50,
  },
  rigthJoystick: {
    position: 'absolute',
    bottom: 30,
    right: 50,
  },
});
