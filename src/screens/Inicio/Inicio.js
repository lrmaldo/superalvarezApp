import React, {Component} from 'react';

import {FlatList, 
Text,
View,
Image,
StatusBar,
TouchableHighlight} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
//import fontAwesome
import Icon2 from 'react-native-vector-icons/FontAwesome';

export default class Inicio extends Component {
  constructor(props) {
    super(props);
    this.page = 1;
    //this.onEndReachedCalledDuringMomentum= true;
    this.state = {
      isLoading: true,
      loading: false, // cargar lista de paginacion
      dataBanner: [],
      dataSucursales: [],
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

  /* peticion GET al servidor */
  GetData = (page) => {
    // AsyncStorage.removeItem('cart');
    //Service to get the data from the server to render

    const url = `http://test.sattlink.com/api/sucursales?page=${page}`;
    //const url =`http://markettux.sattlink.com/api/recursos?page=21`;
    console.log(page);
    //console.log(this.state.dataFood)
    this.setState({loading: true});
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        var listData = this.state.dataSucursales;
        var data = listData.concat(responseJson.data.sucursales.data);
        var dataaux = responseJson.data.sucursales;
        // console.log(listData);
        this.setState({
          // isLoading: true,
          dataBanner: responseJson.data.bannerP,
          dataSucursales: data,
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

 onPressSucursal = item => {
    this.props.navigation.navigate('Sucursal', { item });
  };
  /* render de sucursales */

  renderSucursal = ({item}) => (
    <TouchableHighlight
      underlayColor="rgba(73,182,77,1,0.9)"
      onPress={() => this.onPressSucursal(item)}
      >
      <View style={styles.categoriesItemContainer}>
      {item.url_imagen ==null ?  <Image style={styles.Photo} source={require('./../../../img/logo.jpg')} />
      : <Image style={styles.categoriesPhoto} source={{uri: item.url_imagen}} />}
       
        <Text style={styles.categoriesName}>{item.name}</Text> 
        <Text style={styles.categoriesInfo}>  
            {item.direccion} 
         {/*  {getNumberOfRecipes(item.id)} recipes */}
        </Text>
      </View>
    </TouchableHighlight>
  );

 
  render() {
    console.log(this.state.dataSucursales);
    return (
      <View>
      <StatusBar barStyle='light-content' backgroundColor='#c7b800' />
        <FlatList
          data={this.state.dataSucursales}
          renderItem={this.renderSucursal}
          keyExtractor={(item) => `${item.id}`} 
        />
      </View>
    );
  }
}
