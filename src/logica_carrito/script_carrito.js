
import AsyncStorage from '@react-native-community/async-storage';
import {Alert,
}from 'react-native';


//import { useNavigation, useNavigationParam, } from 'react-navigation-hooks'

 


export function OnClickAddCarrito(data){
  //const { navigate } = useNavigation();

     //AsyncStorage.removeItem('carrito');
 
 const itemCarrito = {
     producto:data,
     cantidad: 1,
     precio:data.precio
 }

  AsyncStorage.getItem('carrito').then((datacarrito) => {
          console.log(JSON.parse(datacarrito));
      if (datacarrito !== null) {
          console.log('carrito no esta vacio')
          const cart = JSON.parse(datacarrito);

      // const sin_duplicacion = []; 
       /* al presionar el boton agrega más elementos en cantidad  */
       cart.forEach(element => {
           if(element.producto.id==data.id){
               element.cantidad = element.cantidad +1;
               console.log(element)
           }
        
       });
       /* si excite el producto */
         const exite = cart.filter((item)=>{
              return item.producto.id == data.id ;  
              
          });
          if(exite.length > 0){

             /*  Alert.alert("Ya agregaste este producto",
              'se agrego cantidad, ¿Deseas ir al carrito? ',); */
              Alerta();


          }else{
            Alerta();
              cart.push(itemCarrito);

          }
         
     AsyncStorage.setItem('carrito', JSON.stringify(cart));

       



      }else{
        const cart = []
        cart.push(itemCarrito)
        AsyncStorage.setItem('carrito', JSON.stringify(cart));
       Alerta()

      }
  })
   .catch((err) => {
        alert(err)
      })

  const Alerta = () =>
    Alert.alert(
      "",
      "Producto Agregado",
      [
      
        {
          text: "Seguir agregando",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
       
      ],
      { cancelable: false }
    );


  

}
