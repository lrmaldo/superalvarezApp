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
  ActivityIndicator,
} from 'react-native';
import {Badge} from 'react-native-elements';

import Colors from './../Colors';
import FastImage from 'react-native-fast-image';

import AsyncStorage from '@react-native-community/async-storage';

/* estilos */
import styles from './styles';

/* iconos */
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import Icon3 from 'react-native-vector-icons/MaterialIcons';

/* native base */
import {Container, Content, Footer, FooterTab, Button} from 'native-base';

/* funcion */
import {cambio, total_items} from '../../logica_carrito/script_carrito';



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
      carritovacio: null /* checar estado del carrito */,
      total_carrito: 0,/* total cantidad por precio del carrito */
      total_items: 0,
      cargando:true,
    };
    /* cargar datos */
    /* this.GetData(); */
    this.carrito();
    this.total();
  }

  /* renderizar */

  itemsCarrito = () => {
    //console.log(this.state.total_items);
    var mostrar = this.state.carrito.map((item, i) => {
     // console.log(item.producto.url_imagen);
      return (
        <View style={styles.item_carro}>
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
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{fontWeight: 'bold', fontSize: 20}}>
                  {item.producto.titulo}
                </Text>
                <TouchableOpacity onPress={() => this.eliminarItem(i)}>
                  <Icon name="trash" size={28} color={Colors.rojo} />
                </TouchableOpacity>
              </View>

              <Text>{item.producto.descripcion.substr(0, 80)}...</Text>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: Colors.assent,
                  fontSize: 20,
                }}>
                {Format_moneda(item.producto.precio)}
              </Text>

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity onPress={() => this.cambio(i, false)}>
                  <Icon
                    name="ios-remove-circle"
                    size={35}
                    color={Colors.assent}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    paddingHorizontal: 3,
                    fontWeight: 'bold',
                    fontSize: 18,
                  }}>
                  {item.cantidad}
                </Text>
                <TouchableOpacity onPress={() => this.cambio(i, true)}>
                  <Icon name="ios-add-circle" size={35} color={Colors.assent} />
                </TouchableOpacity>
              </View>
            </View>
            <Text
              style={{
                color: Colors.assent,
                fontSize: 14,
              }}>
              {Format_moneda(item.producto.precio)} x {item.cantidad} ={' '}
              {Format_moneda(item.producto.precio * item.cantidad)}
              
            </Text>
            
          </View>
        </View>
      );
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
    //console.log(this.state.total_carrito);

    return (
      <Container>
        <View style={styles.container}>
          <View style={{height: -20}} />
         {/*  <Text
            style={{fontSize: 32, fontWeight: 'bold', color: Colors.assent}}>
            Carrito
          </Text> */}
         {/*  <View style={{height: 10}} /> */}

          <View style={{flex: 1}}>
            <ScrollView style={{flex: 2}}>
              {this.state.carritovacio == true ? (
                <Text>Carrito Vacio</Text>
              ) : (
                this.state.cargando ? this.render_cargador(): this.itemsCarrito()
              )}
            </ScrollView>
           
          </View>
         {this.render_total()}
        {/*  <Button
            horizontal
           
            onPress={()=>this.onPressCheckout()}
            style={styles.btn_check}>
            <Text style={styles.btn_text2}>Terminar pedido</Text>
            <Icon2 name={'arrow-right'} size={20} color={Colors.blanco} />
          </Button> */}
         {/*   <TouchableOpacity style={styles.btn_check}>
             <Text style={styles.btn_text}>
                Terminar compra
           </Text>
           </TouchableOpacity> */}
        </View>
       {/*  {this.footer()} */}
      </Container>
    );
  }

  /* functions */
  /* ============================================================================ */
  onPressSucursal = () => {
    this.props.navigation.goBack();
  };

  onPressCheckout = () => {
    if(this.total()>0){
    this.props.navigation.navigate('Checkout')

    }else{
      alert('no hay pedidos en el carrito')
    }
  };
  render_cargador =() =>{
    const renderC =(<View style={[styles.container_cargador]}>
          <ActivityIndicator size="large" color="#ffea0f" />
        </View>)
        return renderC;
  }


  render_btn_checkout = () => {

    const btn_check = (
    <TouchableOpacity  style={styles.btn_check}>
    <Text style={styles.btn_text}>
                Terminar compra
      </Text>
    </TouchableOpacity>
    );
    return btn_check;
  }

  footer = () => {
    const foot = (
      <Footer>
        <FooterTab style={{backgroundColor: Colors.primario}}>
          <Button
            vertical
            onPress={() => this.onPressSucursal()}
            style={{backgroundColor: Colors.primario}}>
            <Icon2 name={'store'} size={25} color={Colors.negro} />
            <Text>Sucursal</Text>
          </Button>

          <Button
            vertical
            active
            style={{backgroundColor: Colors.assent}}>
            <View style={{flexDirection: 'row'}}>
              <Icon name={'cart'} size={30} color={Colors.negro} />
            
            </View>
            <Text style={{color: Colors.negro}}>Carrito</Text>
          </Button>
          {/*bton de  perfil */}
          <Button vertical onPress={() => this.onPressBuscador()}>
            <Icon name={'ios-person'} size={30} color={Colors.negro} />
            <Text>Perfil</Text>
          </Button>
        </FooterTab>
      </Footer>
    );
    /*  icon3 category */
    return foot;
  };

  carrito = () => {
    return new Promise(async (resolve, reject) => {
      try {
        this.setState({cargando:true});
        let items = await AsyncStorage.getItem('carrito')
          .then((cart) => {
            if (cart !== null) {
              // We have data!!
              const carritodata = JSON.parse(cart);

              //console.log(carritodata)
              /* suma del total de productos en el carrito */
            
              let cantidad_total = 0;
              carritodata.forEach((element) => {
              

                cantidad_total = cantidad_total + element.cantidad;
              });

              //carritodata.forEach((element) => {

              //});

              //console.log(cart.length)

              this.setState({
                carrito: carritodata,
                cargando:false,
                total_items: cantidad_total,
              });
              if (carritodata.length > 0) {
                /*   console.log("se checho") */
                this.setState({carritovacio: false});
              } else {
                this.setState({carritovacio: true});
              }
            }
          })
          .catch((err) => {
            alert(err);
          });

        resolve(items);
      } catch (error) {}
    });
  };

  /* funcioon de render del total */

  render_total = () => {
    const rentotal = (
      <View>
      <View style={styles.vista_total}>
      <Text style={styles.subtotalText}>Subtotal:</Text>
      <View style={{flex:1.80}} />
      <Text style={styles.totalText}>{Format_moneda(this.total())} </Text>
      </View>
 

  <View style={styles.vista_total}>
      <Text style={styles.subtotalText}>Total del pedido:</Text>
      <View style={{flex:1.80}} />
      <Text style={styles.totalText}>{Format_moneda(this.total())} </Text>
      </View>
      </View>

    );
      
    

    return rentotal;
  };

  cambio(i, type) {
    //console.log("data" + data)
    const dataCar = this.state.carrito;
    let cantd = dataCar[i].cantidad;

    if (type) {
      cantd = cantd + 1;
      dataCar[i].cantidad = cantd;
      this.setState({carrito: dataCar});
      console.log(' mas dos items');
      AsyncStorage.setItem('carrito', JSON.stringify(dataCar));
    } else if (type == false && cantd >= 2) {
      cantd = cantd - 1;
      dataCar[i].cantidad = cantd;
      this.setState({carrito: dataCar});
      console.log('dos items');
      AsyncStorage.setItem('carrito', JSON.stringify(dataCar));
    } else if (type == false && cantd == 1) {
      dataCar.splice(i, 1);
      this.setState({carrito: dataCar});

      console.log(dataCar);
      AsyncStorage.setItem('carrito', JSON.stringify(dataCar));
    }
    //mostrar vista de carrito vacio
    if (dataCar.length === 0) {
      this.setState({carritovacio: true});
      //console.log("entro")
    }
  }

  /* eliminar item */

  eliminarItem(i) {
    const dataCar = this.state.carrito;
    dataCar.splice(i, 1);
    this.setState({carrito: dataCar});

    console.log(dataCar);
    AsyncStorage.setItem('carrito', JSON.stringify(dataCar));
    if (dataCar.length === 0) {
      this.setState({carritovacio: true});
      //console.log("entro")
    }
  }
/* function para sumar la cantidad con el la cantidad de todos los productos del carrito */
  total(){
    const dataCar = this.state.carrito;

    var total_items = 0;

     dataCar.forEach(element => {
                total_items = total_items + (element.cantidad * element.producto.precio );
        
          });
        
        return parseFloat(total_items);
  }

}

function Format_moneda(num) {
  return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}
