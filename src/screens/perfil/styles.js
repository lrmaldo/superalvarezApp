import { StyleSheet } from 'react-native';
import Colors from '../Colors';

const styles = StyleSheet.create({
card:{
    marginTop:10,
    padding: 10,
    marginLeft:10,
    marginRight:10,
    marginBottom:10,
},
icon_style:{
    marginRight:5,
    justifyContent:'flex-start',

},
icon_derecha:{
    alignSelf:'flex-end',
    alignItems:'flex-end',
    justifyContent:'flex-end',
},
text_item:{
 textAlign:'center',
 marginLeft:10,
 color:'gray',
 fontSize:20,
},
 button:{
     width:'80%',
      margin:25,
      height: 46,
      backgroundColor: Colors.secundario2,
      borderColor: '#f9aa34',
      borderWidth: 1,
      borderRadius: 8,
      marginBottom: 10,
      alignSelf: 'center',
      justifyContent: 'center'
    },

alineacion_centro:{
    alignItems: 'center',
    alignSelf:'center',
    justifyContent: 'center',
},
text_titulo:{
    textAlign:'center',
 
 color:'gray',
 fontSize:20,
},
color_icon:{
color:Colors.secundario2
},
});

export default styles;