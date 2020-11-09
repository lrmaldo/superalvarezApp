/* eslint-disable eslint-comments/no-unused-disable */
/* eslint-disable no-alert */

/* eslint-disable no-unused-vars */
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
} from 'react-native';
/* native base */
import {
  Container,
  Content,
  Footer,
  FooterTab,
  Button,
  Badge,
  Root,
  Toast
} from 'native-base';

/* Colores */

import Colores from '../Colors';

/* carrusel */

var {height, width} = Dimensions.get('window');
import styles from './styles';

import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import Icon3 from 'react-native-vector-icons/MaterialIcons';


/* asyncstorage */
import AsyncStorage from '@react-native-community/async-storage';

import {OnClickCarritoItem} from '../../logica_carrito/script_carrito';
export default class App extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerTransparent: 'true',
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
      producto: this.props.navigation.getParam(
        'producto',
      ) /* obtener datos de producto */,
      sucursal: this.props.navigation.getParam('sucursal'),
      categorias: this.props.navigation.getParam('categorias'),
      isLoading: true,
      loading: false, // cargar lista de paginacion
      cantidad: 1,
      selectCatg: 0,
      visible: false,
      refreshing: true,
      icon: null,
      hasScrolled: false,
      dataaux: [],
    };
    /* cargar datos */
  }

  getCategoriaTitulo(categoryId) {
    let titulo;
    this.state.dataCategorias.map((data) => {
      if (data.id === categoryId) {
        titulo = data.titulo;
      }
    });
    return titulo;
  }
  /* render de productos */

  renderProductos = ({item}) => (
    <TouchableHighlight
      underlayColor="rgba(73,182,77,1,0.9)"
      onPress={() => this.onPressRecipiente(item)}>
      <View style={styles.containerRecipiente}>
        <Image style={styles.photo} source={{uri: item.url_imagen}} />
        <Text style={styles.title}>{item.titulo}</Text>
        <Text style={styles.title}>${item.precio}</Text>
        <Text style={styles.category}>
          {this.getCategoriaTitulo(item.id_categoria)}
        </Text>
      </View>
    </TouchableHighlight>
  );

  /* al presionar en el recipiente  */

  ImagenPortada = () => {
    return (
      <View style={styles.carouselContainer}>
        <View style={styles.carousel}>
          {/*   /*  style={{height: width / 0.99}} */}

          <Image
            style={styles.imageBanner}
            resizeMode="contain"
            source={{uri: this.state.producto.url_imagen}}
          />
        </View>
      </View>
    );
  };

  onChangeQual = async (i, type) => {
    //const dataCar = this.state.cantidad
    let cantd = this.state.cantidad;

    if (type) {
      cantd = cantd + 1;

      this.setState({cantidad: cantd});
      console.log(' mas dos items');
      //AsyncStorage.setItem('cart',JSON.stringify(dataCar));
    } else if (type == false && cantd >= 2) {
      cantd = cantd - 1;
      //dataCar[i].quantity = cantd
      this.setState({cantidad: cantd});
      console.log('dos items');
      //AsyncStorage.setItem('cart',JSON.stringify(dataCar));
    } else if (type == false && cantd == 1) {
      //dataCar.splice(i,1)
      this.setState({cantidad: 1});

      //console.log(dataCar);
      //AsyncStorage.setItem('cart',JSON.stringify(dataCar));
    }
  };
  

  render() {
    //console.log(this.state.dataBanners[0]);
    /* console.log(this.state.dataProductos) */
    this.total_items();
    return (
      <Root>
        <Container>
          <ScrollView style={styles.container}>
            {/*  <StatusBar barStyle='dark-content' translucent backgroundColor="transparent" /> */}
            {this.state.producto.url_imagen != null
              ? this.ImagenPortada()
              : null}
            <View style={styles.infoRecipeContainer}>
              <Text style={styles.infoRecipeName}>
                {this.state.producto.titulo}
              </Text>
              <Text style={styles.infoRecipe}>
                {Format_moneda(this.state.producto.precio)}
              </Text>

              {/* boton de agregar carrito */}
              <View
                style={{alignItems: 'center', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <TouchableOpacity
                    onPress={() =>
                      this.onChangeQual(this.state.cantidad, false)
                    }>
                    <Icon
                      name="ios-remove-circle"
                      size={36}
                      style={{color: Colores.assent}}
                    />
                  </TouchableOpacity>
                  <Text
                    style={{
                      paddingHorizontal: 8,
                      fontWeight: 'bold',
                      fontSize: 18,
                    }}>
                    {this.state.cantidad}
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      this.onChangeQual(this.state.cantidad, true)
                    }>
                    <Icon
                      name="ios-add-circle"
                      size={35}
                      color={Colores.assent}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                onPress={() =>
                  OnClickCarritoItem(this.state.producto, this.state.cantidad)
                }
                style={{
                  width: '80%',
                  height: 40,
                  backgroundColor: Colores.secundario2,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 5,
                  padding: 4,
                }}>
                <Text
                  style={{fontSize: 16, color: Colores.blanco, fontWeight: 'bold'}}>
                  Agregar carrito
                </Text>
                <View style={{width: 12}} />
                <Icon name="ios-add-circle" size={15} color={Colores.blanco} />
              </TouchableOpacity>

              <View style={styles.infoContainer}>
                <Text style={styles.infoDescriptionRecipe}>
                  {this.state.producto.descripcion}
                </Text>
              </View>
            </View>
          </ScrollView>
          {this.footer()}
        </Container>
      </Root>
    );
  }

  footer = () => {
    const foot = (
      <Footer>
        <FooterTab style={{backgroundColor: Colores.primario}}>
          <Button vertical active style={{backgroundColor: Colores.assent}}>
            <Icon2 name={'store'} size={25} color={Colores.negro} />
            <Text>Sucursal</Text>
          </Button>

          <Button
            vertical
            //active
            badge
            style={{backgroundColor: Colores.primario}}
            onPress={() => this.onPressCarrito()}>
            <Badge style={{backgroundColor: Colores.secundario2}}>
              <Text style={{color: Colores.blanco}}>
                {this.state.total_carrito}
              </Text>
            </Badge>
            <Icon name={'cart'} size={25} color={Colores.negro} />
            <Text style={{color: Colores.negro}}>Carrito</Text>
          </Button>

          {/* categorias */}
          <Button vertical onPress={() => this.onPressCategorias()}>
            <Icon3 name={'category'} size={25} color={Colores.negro} />
            <Text>Categorias</Text>
          </Button>

          {/*bton de  perfil category */}
          <Button vertical onPress={() => this.onPressBuscador()}>
            <Icon name={'ios-person'} size={30} color={Colores.negro} />
            <Text>Perfil</Text>
          </Button>
        </FooterTab>
      </Footer>
    );
    /*  icon3 category */
    return foot;
  };

  /* presionadores */

  /*  al presionar el boton buscador */
  onPressBuscador = () => {
    this.props.navigation.navigate('Buscador', {sucursal: this.state.sucursal});
  };
  onPressSucursal = () => {
    this.props.navigation.navigate('DetalleSucursal', {
      sucursal: this.state.sucursal,
    });
  };
  onPressCarrito = () => {
  this.props.navigation.navigate('Checkout', {sucursal: this.state.sucursal});
  };
  onPressCategorias = () => {
    this.props.navigation.navigate('Categorias', {
      sucursal: this.state.sucursal,
      categorias: this.state.categorias,
    });
  };

  /* total  de articulo del carrito */

  total_items = () => {
    return new Promise(async (resolver, reject) => {
      try {
        let total_car = await AsyncStorage.getItem('carrito').then(
          (datacarrito) => {
            //console.log(JSON.parse(datacarrito));
            if (datacarrito !== null) {
              const cart = JSON.parse(datacarrito);
              let cantidad_total = 0;
              cart.forEach((element) => {
                cantidad_total = cantidad_total + element.cantidad;
              });

              //console.log(cart.length)
              this.setState({
                total_carrito: cantidad_total,
              });
            } else {
              //return 0;
            }
          },
        );
        resolver(total_car);
      } catch (error) {}
    });
  };
}
function Format_moneda(num) {
  return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}
