import {StyleSheet} from 'react-native';
import Colors from '../Colors';

const styles = StyleSheet.create({
  card: {
    marginTop: 10,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  icon_style: {
    marginRight: 5,
    justifyContent: 'flex-start',
  },
  icon_derecha: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  text_item: {
    textAlign: 'center',
    marginLeft: 10,
    color: 'gray',
    fontSize: 20,
  },
  button: {
    width: '80%',
    margin: 25,
    height: 46,
    backgroundColor: Colors.secundario2,
    borderColor: '#f9aa34',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'center',
    justifyContent: 'center',
  },

  alineacion_centro: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  text_titulo: {
    textAlign: 'center',

    color: 'gray',
    fontSize: 20,
  },
  color_icon: {
    color: Colors.secundario2,
  },

  /* view recargando */
  horizontal: {
    flexDirection: 'row',

    padding: 10,
  },
  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  image_nohay: {
    width: 300,
    height: 200,
    alignSelf: 'center',
  },
  text_color: {
    color: Colors.secundario2,
  },
  btn_check: {
    justifyContent: 'center',
    backgroundColor: Colors.secundario2,
    width: '60%',
    alignItems: 'center',
    padding: 0,
    borderRadius: 5,
    marginBottom: 15,
    marginLeft: 10,
    marginRight: 10,
  },
  text_center: {
    color: Colors.blanco,
  },
});

export default styles;
