import {StyleSheet, Dimensions} from 'react-native';

import Colors  from '../Colors';
var { height, width } = Dimensions.get('window');
 const styles = StyleSheet.create({
    divPedido:{
        width: '100%',
         padding: 10,
        borderRadius: 10,
        marginTop: 5,
        marginBottom: 5,
        marginLeft:0 ,
        marginRight: 0,
        alignItems: 'center',
        elevation: 8,
        shadowOpacity: 0.3,
        shadowRadius: 50,
        backgroundColor: 'white',
    },
    tamanio_iz:{
        flex:0.4
    },
    tamanio_de:{
        flex:0.6
    },
    texto_total:{
        fontWeight:'bold',
    },
    texto_negritas:{
        fontWeight:'bold',
        fontSize:18,
    },
    color_texto:{
        color:Colors.secundario2,
        fontWeight:'bold',
        fontSize:18,
    },
    view_fila:{
        flexDirection: 'row',
    },
     IconRow: {
    flex: 0.5,
    marginLeft: 17,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
   IconStyle: {
    color: Colors.secundario2,
    fontSize: 34,
  },
  text_fecha:{
      flex:1,
      flexDirection:'row',
  }
})

export default styles;