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
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  Alert,
} from 'react-native';


/* carga de  imagen rapido */

import FastImage from 'react-native-fast-image';

import AsyncStorage from '@react-native-community/async-storage';
/* iconos */
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import Icon3 from 'react-native-vector-icons/MaterialIcons';

/* native base */
import {
  Container,
  Content,
  Footer,
  FooterTab,
  Button,
  Badge,
  Root,
   Header,
   Right,
   Left,
   Text as texto,
} from 'native-base';

 
/* carrusel */
//swiper
import Swiper from 'react-native-swiper';
var {height, width} = Dimensions.get('window');
import styles from './styles';

import Colors from '../Colors';

import {url_sucursal} from './../../URLs/url';

/* funciones de carrito */
import {OnClickAddCarrito, totalCarrito} from '../../logica_carrito/script_carrito';
/* import {guardarDatosSucursal} from '../../logica_carrito/datosSucursal'; */
import { HeaderBackButton } from 'react-navigation-stack';
export default class App extends React.Component {
  _isMounted = false;

  
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
      total_carrito: 0,
      
    };
    /* cargar datos */
    this.GetData(this.page);
    /* estado */
    //this.total_items();
 
  
  }


  

    

  

  /* obtener datos de la sucursal */
  GetData = (page) => {
    const id_sucursal = this.state.sucursal.id;
    // AsyncStorage.removeItem('cart');
    //Service to get the data from the server to render

    //const url = `http://test.sattlink.com/api/sucursal/${id_sucursal}?page=${page}`;
    const url =  url_sucursal+`${id_sucursal}?page=${page}`;
    //const url = `http://test.sattlink.com/api/sucursal/${this.state.id_sucursal[0].id?page=${page}`;
    //const url =`http://markettux.sattlink.com/api/recursos?page=21`;

      console.log(url);
     this.setState({loading: true,refreshing: true});
    return fetch(url)
      .then((response) => response.json())
      .then((response) => {
        console.log(response.data);
        var listData = this.state.dataProductos;
        var data = listData.concat(response.data.productos);
        var dataaux = response.data.productos;

    
        this.setState({
         
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
    this.state.dataCategorias.map((data) => {
      if (data.id === categoryId) {
        titulo = data.titulo;
      }
    });
    return titulo;
  }
  /* render de productos */

  renderProductos = ({item}) => (
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
        <Text style={styles.category}>
          {this.getCategoriaTitulo(item.id_categoria)}
        </Text>

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
          <Icon name="ios-add-circle" size={15} color={'#FFF'} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  /* al presionar en el recipiente  */

  onPressRecipiente = (item) => {
    this.props.navigation.navigate('DetalleProducto', {
      producto: item,
      sucursal: this.state.sucursal,
      categorias: this.state.dataCategorias,
    });
    //alert('hola presionaste');
  };

  /*  al presionar el boton buscador */
  onPressBuscador = () => {
    this.props.navigation.navigate('Buscador', {sucursal: this.state.sucursal});
  };
  onPressSucursal = () => {
    this.props.navigation.navigate('DetalleSucursal', {
      sucursal: this.state.sucursal,
    });
  };
  onPressCarrito = async () => {
        await this._total_items();
        console.log(this.state.total_carrito)
      if(this.state.total_carrito){
    
    this.props.navigation.navigate('Checkout', {sucursal: this.state.sucursal});

    }else{
      Alert.alert('','No hay articulos en el carrito')
    }
  };
  onPressCategorias = () => {
    this.props.navigation.navigate('Categorias', {
      sucursal: this.state.sucursal,
      categorias: this.state.dataCategorias,
    });
  };

  onPressPerfil = () => {
    this.props.navigation.navigate('Perfil');
  };

  banners = () => {
    return (
      <View style={styles.carouselContainer}>
        <View style={styles.carousel}>
          <Swiper
            style={{height: width / 0.99}}
            key={this.state.dataBanners.length}
            showsButtons={false}
            autoplay={true}
            autoplayTimeout={6}>
            {this.state.dataBanners.map((itembann) => {
              return (
                <Image
                  style={styles.imageBanner}
                  resizeMode="contain"
                  source={{uri: itembann.url_imagen}}
                  key={itembann.id}
                />
              );
            })}
          </Swiper>
        </View>
      </View>
    );
  };
  /* render buscador */

  renderBuscador = () => {
    return (
      <View style={styles.searchBar}>
        <Text style={styles.textBuscador}>Buscar</Text>
        {/* <Image
          style={styles.iconBuscador}
          source={require('./../../../img/icon/ic_search.png')}
        /> */}
      </View>
    );
  };

  /* recardado */

  renderFooter = () => {
    //it will show indicator at the bottom of the list when data is loading otherwise it returns null
    if (!this.state.refreshing) return null;
    return (
      <View style={[styles.container1, styles.horizontal]}>
        <ActivityIndicator size="large" color="#ffea0f" />
      </View>
    );
  };
  handleLoadMore = () => {
    // console.log("en el handle")
    //  if(!this.state.hasScrolled){ return null; }
    if (!this.state.loading) {
      this.page = this.page + 1; // increase page by 1

      this.GetData(this.page); // method for API call
      //this.setState({hasScrolled:false})
    }
  };

  onScroll = () => {
    this.setState({hasScrolled: true});
    this.handleLoadMore();
  };

  /* recargarcon el swipe */

  onRefresh() {
    //Clear old data of the list
    this.setState({
      dataBanners: [],
      dataCategorias: [],
      dataProductos: [],
      refreshing: false,
    });

    this.page = 1;
    //Call the Service to get the latest data
    this.GetData(this.page);
    //this.GetData();
  }

  async _total_items() {
    let response = await AsyncStorage.getItem('carrito');
    let carro = (await JSON.parse(response)) || [];
     let total =  await totalCarrito().then((result) => {
       /* this.setState({
         total_carro:result,
       }) */
    }).catch((err) => {
      
    });
    this.setState({
      
      total_carrito: carro.length,
    });

    console.log("variable total: "+total)
      
  };

  /* componentDidUpdate (){
    this.total_items;
  } */

  render() {
    //this.total_items();/* =============================== */

    // console.log(this.state.total_carrito);
    if (this.state.refreshing) {
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
         {this.header()}
        <Container>
          <ScrollView
            style={styles.container}
            contentInsetAdjustmentBehavior="automatic"
            refreshControl={
              <RefreshControl
                //refresh control used for the Pull to Refresh
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh.bind(this)}
                colors={[Colors.primario, Colors.secundario2, Colors.secundario]}
              />
            }>
            {this.state.dataBanners.length == 0 ? (
              <View style={{marginTop: 35}} />
            ) : (
              this.banners()
            )}
            <SafeAreaView style={styles.infoRecipeContainer}>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  style={{
                    backgroundColor: 'transparent',
                    borderBottomColor: 'transparent',
                    borderTopColor: 'transparent',
                    width: '98%',
                    flex: 1,
                  }}
                  onPress={() => this.onPressBuscador()}>
                  {this.renderBuscador()}
                </TouchableOpacity>
              </View>
              <View style={{margin: 10}} />
              <View style={{flexDirection: 'row'}}>
                {/* onpress al detalle sucursal */}
                <TouchableOpacity onPress={() => this.onPressSucursal()}>
                  <Text style={styles.infoRecipeName}>
                    {this.state.sucursal.name}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* <View style={styles.infoContainer}>
                <FlatList
                  numColumns={2}
                  data={this.state.dataProductos}
                  renderItem={this.renderProductos}
                  keyExtractor={(item) => item.id.toString()}
                />
              </View> */}

              {/* render categorias */}

               <FlatList
          data={this.state.dataCategorias}
          renderItem={this.renderCategorias}
          keyExtractor={(item) => `${item.id}`} 
        />
            </SafeAreaView>
          </ScrollView>

          {this.footer()}
        </Container>
      </Root>
    );
  }

  footer = () => {
    const foot = (
      <Footer>
        <FooterTab style={{backgroundColor: Colors.primario}}>
          <Button vertical active style={{backgroundColor: Colors.assent}}>
            <Icon2 name={'store'} size={25} color={Colors.negro} />
            <Text>Sucursal</Text>
          </Button>

          <Button
            vertical
            //active
          /*   badge */
            style={{backgroundColor: Colors.primario}}
            onPress={() => this.onPressCarrito()}>
            {/* <Badge style={{backgroundColor: Colors.secundario2}}>
              <Text style={{color: Colors.blanco}}>
                {this.state.total_carrito}
              </Text>
            </Badge> */}
            <Icon name={'cart'} size={25} color={Colors.negro} />
            <Text style={{color: Colors.negro}}>Carrito</Text>
          </Button>

          {/* categorias */}
         {/*  <Button vertical onPress={() => this.onPressCategorias()}>
            <Icon3 name={'category'} size={25} color={Colors.negro} />
            <Text>Categorias</Text>
          </Button> */}

          {/*bton de  pedidos */}
          <Button vertical onPress={() => this.onPressMispedidos()}>
            <Icon2 name={'shopping-bag'} size={30} color={Colors.negro} />
            <Text>Mis pedidos</Text>
          </Button>
        </FooterTab>
      </Footer>
    );
    /*  icon3 category */
    return foot;
  };

  
  /* functions */

  header = ()=>{
    const icon_back = Platform.select({
      ios:'arrow-back-ios',
      android:'arrow-back'});

    const header =(
       <Header androidStatusBarColor={Colors.assent}  iosBarStyle="dark-content"  style={{backgroundColor: '#ffea00'}}>
       {/*   <StatusBar barStyle='dark-content' /> */}
        <Left> 
        <Button transparent 
            onPress ={()=>this.props.navigation.goBack()}
            >

             <Icon3
                  name= {icon_back}
                  size={25}
                  style={{color:Platform.OS==='ios'?'#147efb':Colors.negro}}
                />
                {Platform.OS === 'ios' ?
                <Text style={{paddingLeft:-30, fontSize:18,color: '#147efb' }} >Regresar</Text>:null  
              }
            </Button>
          </Left>
          <Right>
           
           <Button transparent 
            onPress ={()=>this.onPressSucursal()}
            >

             <Icon2
                  name="store"
                  size={30}
                  style={{color:Colors.negro}}
                />
            </Button>
            
            <Button transparent
              onPress={() => this.onPressMisdirecciones()}
            >
            

              <Icon2 name='user-circle'
                     size={30} 
                     style={{color: Colors.negro}}
                    />
            </Button>
      
     
          </Right>
        </Header>
    )
    return header;
  }


  /* render de Categorias */


  renderCategorias = ({item}) => (
    <TouchableHighlight
      underlayColor="rgba(73,182,77,1,0.9)"
      onPress={() => this.onPressCategoria(item)}
      >
      <View style={styles.categoriesItemContainer}>
      {item.url_imagen ==null ?  <Image style={styles.Photo} source={require('./../../../img/logo.jpg')} />
      : <Image 
      style={styles.categoriesPhoto}
      key={item.id}
      source={{uri: item.url_imagen}} />}
      {/* <FastImage
          key={item.id}
          style={styles.photo}
          resizeMode={FastImage.resizeMode.contain}
          source={{
            uri: item.url_imagen,
            headers: {Authorization: 'someAuthToken'},
            priority: FastImage.priority.normal,
          }}
          defaultSource={{uri: require('./../../../img/logo.jpg')}}
        /> */}
       
        <Text style={styles.categoriesName}>{item.titulo}</Text> 
        <Text style={styles.categoriesInfo}>  

            {item.direccion} 
         {/*  {getNumberOfRecipes(item.id)} recipes */}
        </Text>
      </View>
    </TouchableHighlight>
  );

    

 /* functions */
     onPressCategoria = item => {
    this.props.navigation.navigate('ItemCategoria', { categoria:item,sucursal:this.state.sucursal});
  };


  
/* presionadores */
  onPressMisdirecciones = () => {
    this.props.navigation.navigate('Misdirecciones');
  };
   onPressMispedidos = () => {
    this.props.navigation.navigate('Mispedidos');
  };
}




function Format_moneda(num) {
   var num = parseFloat(num);
  return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}
