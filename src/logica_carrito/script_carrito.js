import AsyncStorage from '@react-native-community/async-storage';
import {Alert} from 'react-native';

import {Toast} from 'native-base';
//import { useNavigation, useNavigationParam, } from 'react-navigation-hooks'

export function OnClickAddCarrito(data) {
  //const { navigate } = useNavigation();

  //AsyncStorage.removeItem('carrito');

  const itemCarrito = {
    producto: data,
    cantidad: 1,
    precio: data.precio,
  };

  AsyncStorage.getItem('carrito')
    .then((datacarrito) => {
      console.log(JSON.parse(datacarrito));
      if (datacarrito !== null) {
        console.log('carrito no esta vacio');
        const cart = JSON.parse(datacarrito);

        // const sin_duplicacion = [];
        /* al presionar el boton agrega más elementos en cantidad  */
        cart.forEach((element) => {
          if (element.producto.id == data.id) {
            element.cantidad = element.cantidad + 1;
            console.log(element);
          }
        });
        /* si excite el producto */
        const exite = cart.filter((item) => {
          return item.producto.id == data.id;
        });
        if (exite.length > 0) {
          /*  Alert.alert("Ya agregaste este producto",
              'se agrego cantidad, ¿Deseas ir al carrito? ',); */
          Alerta();
        } else {
          Alerta();
          cart.push(itemCarrito);
        }

        AsyncStorage.setItem('carrito', JSON.stringify(cart));
      } else {
        const cart = [];
        cart.push(itemCarrito);
        AsyncStorage.setItem('carrito', JSON.stringify(cart));
        Alerta();
      }
    })
    .catch((err) => {
      alert(err);
    });

  const Alerta = () => {
    Toast.show({
      text: 'Producto agregado',
      buttonText: 'Ok',
      duration: 3000,
    });
  };
}

export function OnClickCarritoItem(data, cant) {
  const itemCarrito = {
    producto: data,
    cantidad: cant,
    precio: data.precio,
  };

  AsyncStorage.getItem('carrito')
    .then((datacarrito) => {
      console.log(JSON.parse(datacarrito));
      if (datacarrito !== null) {
        console.log('carrito no esta vacio');
        const cart = JSON.parse(datacarrito);

        // const sin_duplicacion = [];
        /* al presionar el boton agrega más elementos en cantidad  */
        cart.forEach((element) => {
          if (element.producto.id == data.id) {
            element.cantidad = cant;
            console.log(element);
          }
        });
        /* si excite el producto */
        const exite = cart.filter((item) => {
          return item.producto.id == data.id;
        });
        if (exite.length > 0) {
          /*  Alert.alert("Ya agregaste este producto",
              'se agrego cantidad, ¿Deseas ir al carrito? ',); */
          Alerta();
        } else {
          Alerta();
          cart.push(itemCarrito);
        }

        AsyncStorage.setItem('carrito', JSON.stringify(cart));
      } else {
        const cart = [];
        cart.push(itemCarrito);
        AsyncStorage.setItem('carrito', JSON.stringify(cart));
        Alerta();
      }
    })
    .catch((err) => {
      alert(err);
    });

  const Alerta = () => {
    Toast.show({
      text: 'Producto agregado',
      buttonText: 'Ok',
      duration: 2500,
       position: "bottom"
    });
  };
}

export const  totalCarrito = async ()=> {

  try {
     const total = await AsyncStorage.getItem('carrito')
    .then((datacarrito) => {
      //console.log(JSON.parse(datacarrito));
      if (datacarrito !== null) {
        var total_items = 0;
        const cart = JSON.parse(datacarrito);
         cart.forEach(element => {
                total_items = total_items + (element.cantidad * element.producto.precio );
        
          });
          return parseFloat(total_items);
      }

    });
      return total;
  } catch (error) {
    console.log(error);
  }

 
}


 export const eliminarCarrito = async () =>{
   try {
    await AsyncStorage.removeItem('carrito');
    return true
     
   } catch (error) {
     
   }
  }


  
