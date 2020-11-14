import { StyleSheet } from 'react-native';
import colores from '../Colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    stepIndicator: {
        marginVertical: 30
    },
    page: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btn_check:{
    justifyContent: 'center',
    backgroundColor: colores.secundario2,
    width: '95%',
    alignItems: 'center',
    padding: 0,
    borderRadius: 5,
    marginBottom: 15,
    marginLeft:10,
    marginRight: 10,
    },
   
    btn_text2:{
        fontSize: 18,
        fontWeight: "bold",
        color: colores.blanco,
        marginRight: 10,
    },
    text_fecha:{
        fontSize:16,

    },
     text_fecha1:{
        fontSize:12,
        
    },
    texto_header_checkout:{
        fontSize:18,
        fontWeight:'bold',
    },
    textArea:{
        width:'100%',
    },
     lottie: {
    width: '100%',
    height: '100%',
    aspectRatio: 4
  }

    /* view_resumen */

    
});
export default styles;