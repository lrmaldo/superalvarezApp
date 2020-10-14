import React from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  TouchableHighlight,
  StyleSheet,
  StatusBar,
  Linking,
} from 'react-native';

import Colors from './../Colors';
import FastImage from 'react-native-fast-image';

import AsyncStorage from '@react-native-community/async-storage';


import Icon from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/FontAwesome5';
/* estilos */
import styles from './styles';

/* funcion */
import {cambio,total_items} from '../../logica_carrito/script_carrito';



const {width: viewportWidth} = Dimensions.get('window');
const {width, height} = Dimensions.get('window');



export default class App extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      //headerTransparent: 'true',
      title: null,
      /*   headerLeft: (
        <BackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
      ) */
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      carrito: [] /*  datos carrito */,
      carritovacio:null,/* checar estado del carrito */
    };
    /* cargar datos */
    /* this.GetData(); */
    this.carrito();
  }
carrito = () => {

  return new Promise( async (resolve,reject)=>{
try {
  let items =  await AsyncStorage.getItem('carrito').then((cart) => {
      if (cart !== null) {
        // We have data!!
        const carritodata = JSON.parse(cart)

        //console.log(carritodata)


        this.setState({ carrito: carritodata })
        if (carritodata.length > 0) {


        /*   console.log("se checho") */
          this.setState({ carritovacio: false })
        } else {
          this.setState({ carritovacio: true })

        }

      }
    })
      .catch((err) => {
        alert(err)
      })

      resolve(items)
  
} catch (error) {
  
}

  })


}
  
  
  /* renderizar */



  itemsCarrito = () => {
    console.log(this.state.carrito);
   var mostrar  = this.state.carrito.map((item,i) =>{
     console.log(item.producto.url_imagen);
       return (
         <View
        style={styles.item_carro}>
        <FastImage
          resizeMode={'contain'}
          style={styles.imageItem}
          resizeMode={FastImage.resizeMode.contain}
          source={{
            uri: item.producto.url_imagen,
            headers: {Authorization: 'someAuthToken'},
            priority: FastImage.priority.normal,
          }}
          defaultSource={{uri: item.foto_url}}
          
        />
        <View
          style={{
            flex: 1,
            backgroundColor: 'trangraysparent',
            padding: 10,
            justifyContent: 'space-between',
          }}>
          <View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            
            <Text style={{fontWeight: 'bold', fontSize: 20}}>{item.producto.titulo}</Text>
            <TouchableOpacity onPress={()=>this.eliminarItem(i)} > 
                <Icon name="trash" size={28} color={Colors.rojo} />
              </TouchableOpacity>
            </View>
            
            <Text>{item.producto.descripcion.substr(0,80)}...</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              style={{
                fontWeight: 'bold',
                color: Colors.assent,
                fontSize: 20,
              }}>{Format_moneda(item.producto.precio)}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress={()=>this.cambio(i,false)}>
                <Icon name="ios-remove-circle" size={35} color={Colors.assent} />
              </TouchableOpacity>
              <Text
                style={{
                  paddingHorizontal: 8,
                  fontWeight: 'bold',
                  fontSize: 18,
                }}>{item.cantidad}</Text>
              <TouchableOpacity onPress={()=>this.cambio(i,true)}>
                <Icon name="ios-add-circle" size={35} color={Colors.assent} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
       )
    });
    
    /*  <View  style={styles.item_carro}>
            <Image resizeMode={'contain'}
                  style={styles.imagenItem}
                  source={require('../../../img/logo.jpg')}
                   />

          </View>
 */
 return mostrar;
   
  };

  

  render() {
    console.log(this.state.carritovacio);
    return (
      <View style={styles.container}>
        <View style={{height: 20}} />
        <Text style={{fontSize: 32, fontWeight: 'bold', color: Colors.assent}}>
          Carrito
        </Text>
        <View style={{height: 10}} />

        <View style={{flex: 1}}>
          
          <ScrollView style={{flex: 2}}>{this.state.carritovacio == true ? <Text>Carrito Vacio</Text> : this.itemsCarrito()}</ScrollView>
        </View>
      </View>
    );
  }


  /* functions */
cambio(i,type) {
    //console.log("data" + data)
    const dataCar =this.state.carrito;
    let cantd = dataCar[i].cantidad;

    if (type) {
      cantd = cantd + 1
      dataCar[i].cantidad = cantd
      this.setState({ carrito: dataCar })
      console.log(" mas dos items");
      AsyncStorage.setItem('carrito', JSON.stringify(dataCar));
    }
    else if (type == false && cantd >= 2) {
      cantd = cantd - 1
      dataCar[i].cantidad = cantd
     this.setState({ carrito: dataCar })
      console.log("dos items");
      AsyncStorage.setItem('carrito', JSON.stringify(dataCar));
    }
    else if (type == false && cantd == 1) {
      dataCar.splice(i, 1)
     this.setState({ carrito: dataCar })


      console.log(dataCar);
      AsyncStorage.setItem('carrito', JSON.stringify(dataCar));
    }
    //mostrar vista de carrito vacio
    if (dataCar.length === 0) {
      this.setState({ carritovacio: true })
      //console.log("entro")
    }
  }

  /* eliminar item */

  eliminarItem(i){
    const dataCar =this.state.carrito;
     dataCar.splice(i, 1)
     this.setState({ carrito: dataCar })


      console.log(dataCar);
      AsyncStorage.setItem('carrito', JSON.stringify(dataCar));
      if (dataCar.length === 0) {
      this.setState({ carritovacio: true })
      //console.log("entro")
    }

  }

}


function Format_moneda(num) {
  return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}