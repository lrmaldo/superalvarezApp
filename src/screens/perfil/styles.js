import { StyleSheet } from 'react-native';
import Colors from '../Colors';

const styles = StyleSheet.create({
card:{
    margin:10,
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
}
});

export default styles;