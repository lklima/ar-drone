import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonsContent: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 35,
  },
  shadowButton: {
    backgroundColor: 'gray',
    height: 45,
    width: 100,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
    flexDirection: 'row',
  },
  button: {
    backgroundColor: 'gray',
    height: 45,
    width: 150,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
    flexDirection: 'row',
  },
  onButton: {
    backgroundColor: 'green',
    height: 45,
    width: 150,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 5,
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
