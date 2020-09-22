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
} from 'react-native';
import styles from './styles';

/* carrusel */
//swiper
import Swiper from 'react-native-swiper';

export default class App extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerTransparent: 'true',
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
      id_sucursal: this.navigation.props.getParam('id_sucursal'),
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
    // AsyncStorage.removeItem('cart');
    //Service to get the data from the server to render

    const url = `http://test.sattlink.com//api/sucursal/${id_sucursal}?page=${page}`;
    //const url =`http://markettux.sattlink.com/api/recursos?page=21`;
    console.log(page);
    //console.log(this.state.dataFood)
    this.setState({loading: true});
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        var listData = this.state.dataSucursales;
        var data = listData.concat(responseJson.data.productos.data);
        var dataaux = responseJson.data.productos;
        // console.log(listData);
        this.setState({
          // isLoading: true,
          dataCategorias: responseJson.data.categorias,
          dataBanners: responseJson.data.banners,
          dataProductos: data,
          refreshing: false,
          loading: false,
          dataaux: dataaux,
        });
      })
      .catch((error) => {
        //console.error(error);
        this.setState({refreshing: false, loading: false});
        //Alert.alert("","Ocurrio un problema con el servidor intentalo más tarde")
      });
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.carouselContainer}>
          <View style={styles.carousel}>
            <Swiper
              style={{height: width / 1.99}}
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
        </View>
        <View style={styles.infoRecipeContainer}>
          <Text style={styles.infoRecipeName}>{item.title}</Text>
        </View>
      </ScrollView>
    );
  }
}
