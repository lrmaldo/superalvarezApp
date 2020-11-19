import { StyleSheet } from 'react-native';
import Colors from '../Colors';
const styles = StyleSheet.create({

card:{
    flex:1,
    
},
imagen_circle:{
    backgroundColor: Colors.secundario2 ,
    width:200,
    height:200,
    borderRadius: 200/2,
},
icon_check:{
  
  alignItems:"center"
    
},

  btn_check:{
    justifyContent: 'center',
    backgroundColor: Colors.secundario2,
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
        color: Colors.blanco,
        marginRight: 10,
    },
text_center:{
    color:Colors.blanco,
}
});


export default styles;