import React, {Component} from 'react';

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
  ActivityIndicator,
} from 'react-native';

import FastImage from 'react-native-fast-image';
import AsyncStorage from '@react-native-community/async-storage';

var {height, width} = Dimensions.get('window');

import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import Icon3 from 'react-native-vector-icons/MaterialIcons';

/* native base */
import {
  Container,
  Footer,
  FooterTab,
  Button,
  Badge,
  Root,
  Toast,
} from 'native-base';
import styles from './styles';
import Colors from './../Colors';
/* funciones de carrito */
import {OnClickAddCarrito} from '../../logica_carrito/script_carrito';

/* url*/
import {url_sucursal} from '../../URLs/url';
export default class ItemCateogorias extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: null,
      headerTransparent: 'true',
    };
  };

  constructor(props) {
    super(props);
    this.page = 1;
    this.state = {
      categoria: this.props.navigation.getParam('categoria'),
      sucursal: this.props.navigation.getParam('sucursal'),
      dataProductos: [],
      loading: true,
      refreshing: true,
      dataaux: [],
      total_carrito: 0,
    };
    this.GetData(this.page);
  }
  /* peticion al servidor  */

  /* obtener datos de la sucursal */
  GetData = (page) => {
    const id_sucursal = this.state.sucursal.id;
      
      const url = url_sucursal+`${id_sucursal}?page=${page}`;
      
      //const url = url_sucursales+`?page=${page}`
    //const url = `http://test.sattlink.com/api/sucursal/${id_sucursal}?page=${page}`;
    //const url = `http://test.sattlink.com/api/sucursal/${this.state.id_sucursal[0].id?page=${page}`;
    //const url =`http://markettux.sattlink.com/api/recursos?page=21`;

    this.setState({loading: true});
    return fetch(url)
      .then((response) => response.json())
      .then((response) => {
        console.log(response.data);

        var listData = this.state.dataProductos;
        var data = listData.concat(response.data.productos);
        var dataaux = response.data.productos;

        this.setState({
          // isLoading: true,
          dataCategorias: response.data.categorias,
          dataBanners: response.data.banners,
          dataProductos: data,
          refreshing: false,
          loading: false,
          dataaux: dataaux,
        });
      })
      .catch((error) => {
        console.error(error);
        this.setState({refreshing: false, loading: false});
        //Alert.alert("","Ocurrio un problema con el servidor intentalo más tarde")
      });
  };
  /* function de categoria */

  indicator = () => {
    if (this.state.refreshing) {
      return (
        <View style={styles.indicator}>
          <ActivityIndicator size="large" color="#ffea0f" />
        </View>
      );
    }
    return (
      <View style={styles.infoContainer}>
        <FlatList
          numColumns={2}
          data={this.state.dataProductos.filter(
            (item) => item.id_categoria === this.state.categoria.id,
          )}
          renderItem={this.renderProductos}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    );
  };

  /* render */
  render() {
    
    //console.log("datacategarias"+this.getCategoria(this.state.categoria.id))
    return (
      <Root>
        <Container>
          <ScrollView style={styles.container}>
            {this.Cabecera()}
            <View style={{marginBottom: 5}}>
              <Text style={styles.titulo_categoria}>
                {' '}
                {this.state.categoria.titulo}
              </Text>
            </View>

            {this.indicator()}
          </ScrollView>
          {this.footer()}
        </Container>
      </Root>
    );
  }

  /* functions */

  Cabecera = () => {
    return (
      <View style={styles.containerCabecera}>
        <StatusBar barStyle="dark-content" />
        <FastImage
          key={this.state.categoria.id}
          style={styles.photo_categoria}
          resizeMode={FastImage.resizeMode.cover}
          source={{
            uri: this.state.categoria.url_imagen,
            headers: {Authorization: 'someAuthToken'},
            priority: FastImage.priority.normal,
          }}
          defaultSource={{uri: this.state.categoria.url_imagen}}
        />
      </View>
    );
  };

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
            //active
            badge
            onPress={() => this.onPressCarrito()}>
            <Badge style={{backgroundColor: Colors.secundario2}}>
              <Text style={{color: Colors.blanco}}>
                {this.state.total_carrito}
              </Text>
            </Badge>
            <Icon name={'cart'} size={25} color={Colors.negro} />
            <Text style={{color: Colors.negro}}>Carrito</Text>
          </Button>

          {/* categorias */}
          <Button vertical active style={{backgroundColor: Colors.assent}}>
            <Icon3 name={'category'} size={25} color={Colors.negro} />
            <Text>Categorias</Text>
          </Button>

          {/*bton de  perfil category */}
          <Button vertical onPress={() => this.onPressMispedidos()}>
            <Icon2 name={'shopping-bag'} size={30} color={Colors.negro} />
            <Text>Mis pedios</Text>
          </Button>
        </FooterTab>
      </Footer>
    );
    /*  icon3 category */
    return foot;
  };

  renderProductos = ({item}) => (
    //console.log(item)
    <TouchableOpacity
      underlayColor="rgba(73,182,77,1,0.9)"
      onPress={() => this.onPressRecipiente(item)}>
      <View style={styles.containerRecipiente}>
        {/*  <Image style={styles.photo} source={{ uri: 'http:\/\/test.sattlink.com\/imagenes\/sucursal\/Sucursal2\/productos\/test1\/producto1601583570.jpg' }} /> */}

        <FastImage
          key={item.id}
          style={styles.photo}
          resizeMode={FastImage.resizeMode.contain}
          source={{
            uri: item.url_imagen,
            headers: {Authorization: 'someAuthToken'},
            priority: FastImage.priority.normal,
          }}
          defaultSource={{uri: item.foto_url}}
        />
        <Text style={styles.title}>{item.titulo}</Text>
        <Text style={styles.title}>{Format_moneda(item.precio)}</Text>

        <TouchableOpacity
          onPress={() => OnClickAddCarrito(item)}
          style={{
            width: width / 2 - 40,
            backgroundColor: Colors.secundario2,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
            padding: 3,
            margin: 5,
          }}>
          <Text style={{fontSize: 12, color: Colors.blanco, fontWeight: 'bold'}}>
            Agregar carrito
          </Text>
          <View style={{width: 12}} />
          <Icon name="ios-add-circle" size={15} color={Colors.blanco} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  /* onpress */

  onPressRecipiente = (item) => {
    this.props.navigation.navigate('DetalleProducto', {producto: item});
    //alert('hola presionaste');
  };

  /*  al presionar el boton buscador */
  onPressPerfil = () => {
    this.props.navigation.navigate('Perfil');
  };
  onPressSucursal = () => {
    this.props.navigation.navigate('Sucursal', {
      sucursal: this.state.sucursal,
    });
  };
  onPressCarrito = () => {
    this.props.navigation.navigate('Checkout', {sucursal: this.state.sucursal});
  };

   onPressMispedidos = () => {
    this.props.navigation.navigate('Mispedidos');
  };
  onPressCategorias = () => {
    this.props.navigation.navigate('Categorias', {
      sucursal: this.state.sucursal,
      categorias: this.state.dataCategorias,
    });
  };

  /* total de carrito */

  total_items = () => {
    let total_car =  AsyncStorage.getItem('carrito').then(
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
      
  };
componentWillUpdate(){
   this.total_items();
}
}
function Format_moneda(num) {
  return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}
