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
/* import styles from './styles'; */

/* carrusel */

var {height, width} = Dimensions.get('window');
import styles from './styles';

import Icon from 'react-native-vector-icons/Ionicons';

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
    this.page = 1;
    this.state = {
      producto: this.props.navigation.getParam(
        'producto',
      ) /* obtener datos de producto */,
      isLoading: true,
      loading: false, // cargar lista de paginacion

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

  render() {
    //console.log(this.state.dataBanners[0]);
    /* console.log(this.state.dataProductos) */
    return (
      <ScrollView style={styles.container}>
       {/*  <StatusBar barStyle='dark-content' translucent backgroundColor="transparent" /> */}
        {this.state.producto.url_imagen != null ? this.ImagenPortada() : null}
        <View style={styles.infoRecipeContainer}>
          <Text style={styles.infoRecipeName}>
            {this.state.producto.titulo}
          </Text>
          <Text style={styles.infoRecipe}>
            {Format_moneda(this.state.producto.precio)}
          </Text>

          {/* boton de agregar carrito */}
          
            <TouchableOpacity
               onPress={() => this.onClickAddCart("item")}
              style={{
                width: '80%',
                height: 40,
                backgroundColor: '#ffea00',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 5,
                padding: 4,
              }}>
            <Text style={{fontSize: 16, color: 'black', fontWeight: 'bold'}}>
              Agregar carrito
            </Text>
            <View style={{width: 12}} />
            <Icon name="ios-add-circle" size={15} color={'black|'} />
          </TouchableOpacity>
        

          <View style={styles.infoContainer}>
            <Text style={styles.infoDescriptionRecipe}>
              {this.state.producto.descripcion}
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }

onClickAddCart =(item)=>{
alert("agrego al carrito")
}

}
function Format_moneda(num) {
  return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}
