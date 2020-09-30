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
} from 'react-native';
/* import styles from './styles'; */

/* carrusel */
//swiper
import Swiper from 'react-native-swiper';
var {height, width} = Dimensions.get('window');
import styles from './styles';

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
      sucursal: this.props.navigation.getParam('sucursal'),
      isLoading: true,
      loading: false, // cargar lista de paginacion
      dataBanners: [],
      dataCategorias: [],
      dataProductos: [],
      selectCatg: 0,
      visible: false,
      refreshing: true,
      icon: null,
      hasScrolled: false,
      dataaux: [],
    };
    /* cargar datos */
    this.GetData(this.page);
  }

  /* obtener datos de la sucursal */
  GetData = (page) => {
    const id_sucursal = this.state.sucursal.id;
    // AsyncStorage.removeItem('cart');
    //Service to get the data from the server to render
    
    const url = `http://test.sattlink.com/api/sucursal/${id_sucursal}?page=${page}`;
    //const url = `http://test.sattlink.com/api/sucursal/${this.state.id_sucursal[0].id?page=${page}`;
    //const url =`http://markettux.sattlink.com/api/recursos?page=21`;
    console.log(url);
    //console.log(this.state.sucursal.id);
    //console.log(this.state.dataFood)
    this.setState({loading: true});
    return fetch(url)
      .then((response) => response.json())
      .then((response) => {
        console.log(response.data);
        var listData = this.state.dataProductos;
        var data = listData.concat(response.data.productos);
        var dataaux = response.data.productos;

        /* var listData = this.state.dataSucursales;
        var data = listData.concat(responseJson.data.sucursales.data);
        var dataaux = responseJson.data.sucursales; */
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


 getCategoriaTitulo(categoryId) {
  let titulo;
 this.state.dataCategorias.map(data => {
    if (data.id === categoryId) {
      titulo = data.titulo;
    }
  });
  return titulo;
}
/* render de productos */

renderProductos = ({ item }) => (
    <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={() => this.onPressRecipiente(item)}>
      <View style={styles.containerRecipiente}>
        <Image style={styles.photo} source={{ uri: item.url_imagen }} />
        <Text style={styles.title}>{item.titulo}</Text>
        <Text style={styles.title}>${item.precio}</Text>
        <Text style={styles.category}>{this.getCategoriaTitulo(item.id_categoria)}</Text>
      </View>
    </TouchableHighlight>
  );

/* al presionar en el recipiente  */

onPressRecipiente = item => {
    this.props.navigation.navigate('DetalleProducto', { producto:item });
    //alert('hola presionaste'); 
  };

  banners =()=>{
    return   (<View style={styles.carouselContainer}>
          <View style={styles.carousel}>
            <Swiper
              style={{height: width / 0.99}}
              key={this.state.dataBanners.length}
              showsButtons={false}
              autoplay={true}
              autoplayTimeout={4}>
              {this.state.dataBanners.map((itembann) => {
                return (
                  <Image
                    style={styles.imageBanner}
                    resizeMode="contain"
                    source={{uri: itembann.url_imagen}}
                  />
                );
              })}
            </Swiper>
          </View>
        </View>);
  }

  render() {
    //console.log(this.state.dataBanners[0]);
    console.log(this.state.dataProductos)
    return (
      <ScrollView style={styles.container}>
        {this.state.dataBanners ? this.banners() : null}
        <View style={styles.infoRecipeContainer}>
          <Text style={styles.infoRecipeName}>{this.state.sucursal.name}</Text>
          <View style={styles.infoContainer}>
          <FlatList
          numColumns={2}
          data={this.state.dataProductos}
          renderItem={this.renderProductos}
          keyExtractor={(item) => `${item.id}`} 
          />
          
          </View>
        </View>
      </ScrollView>
    );
  }
}
