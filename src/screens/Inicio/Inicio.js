/* eslint-disable no-unused-vars */
import React, {Component} from 'react';

import {
  FlatList,
  Text,
  View,
  Image,
  StatusBar,
  RefreshControl,
  ScrollView,
  SafeAreaView,
  TouchableHighlight,
  ActivityIndicator,
  Linking,
  Alert,   
} from 'react-native';
import { Root,
  } from 'native-base';
import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
//import fontAwesome
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Colors from '../Colors';

import {url_sucursales}  from  '../../URLs/url';
import {eliminarCarrito} from '../../logica_carrito/script_carrito';

/* asyncstorage */
import AsyncStorage from '@react-native-community/async-storage';

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
    const url = url_sucursales+`?page=${page}`
    
    console.log(url);
    //console.log(this.state.dataFood)
    this.setState({loading: true,refreshing: true});
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

/* refrescar  datos */
onRefresh() {
    //Clear old data of the list
    this.setState({
      dataBanner: [],
      dataSucursales: [],
      
      refreshing: false,
    });

    this.page = 1;
    //Call the Service to get the latest data
    this.GetData(this.page);
    //this.GetData();
  }



  onPressSucursal = (item) => {
    eliminarCarrito();

    //AsyncStorage.removeItem('mispedidos');
    this.props.navigation.navigate('Sucursal', {sucursal: item});
  };

  onPressMayorista = (item) =>{
    Alert.alert("","¿Ya eres cliente ?",
    [
      {
        text:"Sí",
        onPress:()=> Linking.openURL(
              `https://wa.me/52${item.whatsapp}`, 
            ).catch((err) => console.log('Error:', err)),
      },
      {text:'No',
      onPress:()=>Linking.openURL(
              `https://wa.me/52${item.whatstapp_mayoreo}`, 
            ).catch((err) => console.log('Error:', err)),
      },
      {
        text:'Cancelar',
        style:'cancel',
      }
    ])
  }
   /*  {item.mayoreo==1 ? <Text style={styles.text_mayorista} onPress={() =>  Linking.openURL(
              `https://wa.me/52${item.whatsapp}`, 
            ).catch((err) => console.log('Error:', err))}>Eres mayorista,haz click aquí</Text>
        :
        null} */
  /* render de sucursales */

  renderSucursal = ({item}) => (
    <View>
     <TouchableHighlight
      underlayColor="rgba(73,182,77,1,0.9)"
      onPress={() => this.onPressSucursal(item)}>
      <View style={styles.categoriesItemContainer}>
        {item.url_imagen == null ? (
          <Image
            style={styles.Photo}
            source={require('./../../../img/logo.jpg')}
          />
        ) : (
          <Image
            style={styles.categoriesPhoto}
            key={item.id}
            source={{uri: item.url_imagen}}
          />
        )}
        <Text style={{ fontWeight:'bold',}}>Autoservicio</Text>
        <Text style={styles.categoriesName}>{item.name}</Text>
        <Text style={styles.categoriesInfo}>
          {item.direccion}
          {/*  {getNumberOfRecipes(item.id)} recipes */}
        </Text>
        
        
      </View>
    </TouchableHighlight>
   {item.mayoreo ==1 ?/* si hay autoservio */

    <TouchableHighlight
      underlayColor="rgba(73,182,77,1,0.9)"
      onPress={() => this.onPressMayorista(item)}>
      <View style={styles.categoriesItemContainer}>
        {item.url_imagen == null ? (
          <Image
            style={styles.Photo}
            source={require('./../../../img/logo.jpg')}
          />
        ) : (
          <Image
            style={styles.categoriesPhoto}
            key={item.id}
            source={{uri: item.url_imagen}}
          />
        )}
        <Text style={{ fontWeight:'bold',}}>Mayoreo</Text>
        <Text style={styles.categoriesName}>{item.name}</Text>
        <Text style={styles.categoriesInfo}>
          {item.direccion}
          {/*  {getNumberOfRecipes(item.id)} recipes */}
        </Text>
        
        
      </View>
    </TouchableHighlight>: null}
    </View>
  );

  render() {
    console.log(this.state.dataSucursales);
    const {refreshing} = this.state;
    if (refreshing) {
      return (
        //loading view while data is loading
        //loading view while data is loading
        <View style={[styles.container1, styles.horizontal]}>
          <ActivityIndicator size="large" color="#ffea0f" />
        </View>
      );
    }
    return (
      <Root>
     
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          refreshControl={
            <RefreshControl
              //refresh control used for the Pull to Refresh
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh.bind(this)}
              colors={[Colors.primario, Colors.secundario2, Colors.secundario]}
            />
          }>
          <View>
            <StatusBar barStyle="dark-content" backgroundColor="#c7b800" />
            {/*  <Text style={styles.categoriesName} onPress={()=>{this.props.navigation.navigate('Mayoristas',{sucursales:this.state.dataSucursales})}}>¿Eres mayorista?, haz clic aquí</Text> */}
            <FlatList
              data={this.state.dataSucursales}
              renderItem={this.renderSucursal}
              keyExtractor={(item) => `${item.id}`}
            />
          </View>
        </ScrollView>
      </Root>
    );
  }

  
}
