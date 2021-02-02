import React, {Component} from 'react';
import {StyleSheet, Alert, Text, View, Linking, TouchableOpacity} from 'react-native';

import Steps from 'react-native-steps';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import ViewPager from '@react-native-community/viewpager';
import Carrito from '../Carrito/Carrito';
import Colors from '../Colors';
import Component_direccion from './Componentes/DireccionCheck';
import Direccion from '../perfil/Misdirecciones';
import styles from './styles';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import AnimatedLoader from 'react-native-animated-loader';
/* hora  */
import Moment from 'moment'
import   'moment/locale/es';

import {
  Content,
  Card,
  CardItem,
  Body,
  Button,
  DatePicker,
  Textarea,
  Toast,
  Root,
} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';



/* importar url de guardar datos  del pedido */
import {url_store} from '../../URLs/url';

import {eliminarCarrito, totalCarrito} from '../../logica_carrito/script_carrito';



const PAGES = ['Page 1', 'Page 2', 'Page 3', 'Page 4'];

const secondIndicatorConfigs = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: Colors.secundario2,
  stepStrokeWidth: 3,
  separatorStrokeFinishedWidth: 4,
  stepStrokeFinishedColor: Colors.secundario2,
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: Colors.secundario2,
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: Colors.secundario2,
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: Colors.secundario2,
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: Colors.secundario2,
};

const getStepIndicatorIconConfig = ({position, stepStatus}) => {
  const iconConfig = {
    name: 'feed',
    color: stepStatus === 'finished' ? '#ffffff' : Colors.secundario2,
    size: 15,
  };
  switch (position) {
    case 0: {
      iconConfig.name = 'shopping-cart';
      break;
    }
    case 1: {
      iconConfig.name = 'location-on';
      break;
    }
    case 2: {
      iconConfig.name = 'assessment';
      break;
    }
    /*  case 3: {
            iconConfig.name = 'payment';
            break
        } */
    /* case 3: {
      iconConfig.name = 'track-changes';
      break;
    } */
    default: {
      break;
    }
  }
  return iconConfig;
};

export default class Checkout extends Component {
 static navigationOptions = ({navigation}) => {
    return {
      //headerTransparent: 'true',
      title: null,
      headerBackTitle:'Regresar',
     /*  headerRight: () => (
      <Button
        onPress={() => alert('This is a button!')}
        title="Info"
        color="#fff"
      />
    ), */
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
      currentPage: 0,
      total_carrito_items: 0,
      data_carrito:[],
      nombre: null,
      telefono: null,
      direccion: null,
      entre: null,
      colonia: null,
      referencia: null,
      comentario: null,
      datos_usuario: false,
      chosenDate: new Date(),
      visibleTime: null,
      visible:false,
      showToast: false,
      sucursal: this.props.navigation.getParam('sucursal'),
      json_pedido:[],
      total_carro:0,
    };
    

    this.viewPager = React.createRef();
    this.cargarDatos();
    this.fechaahora = new Date();
    this.setDate = this.setDate.bind(this);
    
   

  
  }

  setDate(newDate) {
    this.setState({chosenDate: newDate});
  }

  onStepPress(num) {
    this.setState({currentPage: num});
    this.viewPager.setPage(num);
  }

  render() {
    return (
      <Root> 
      <View style={styles.container}>
      
          <AnimatedLoader
            visible={this.state.visible}
            overlayColor="rgba(255,255,255,0.75)"
            source={require("../../../img/animation.json")}
            animationStyle={styles.lottie}
            speed={1}

          />
        <View style={styles.stepIndicator}>
          <Steps
            count={3}
            renderStepIndicator={this.renderStepIndicator}
            configs={secondIndicatorConfigs}
            current={this.state.currentPage}
            onPress={(number) => {
              this.onStepPress(number);
            }}
            labels={['Carrito', 'Dirección de entrega', 'Resumen']}
          />
        </View>

        <ViewPager
          ref={(ref) => (this.viewPager = ref)}
          style={{flex: 1}}
          initialPage={0}
          onPageSelected={(page) => {
            this.setState({currentPage: page.nativeEvent.position});
            //this.onStepPress(page.nativeEvent.position);
          }}>
          {PAGES.map((page, index) => this.renderViewPagerPage(page, index))}
        </ViewPager>
      </View>
      </Root>
    );
  }

  onPressCheckout = (data) => {
    if (this.state.total_carrito_items > 0) {
      this.setState({currentPage: 1});
      this.viewPager.setPage(data);
    } else {
      alert('no hay pedidos en el carrito');
    }
  };

  componentWillUpdate() {
 this.cargarDatos();
  }
  componentDidMount() {
    
  }

  renderViewPagerPage = (data, index) => {
    switch (index) {
      case 0: {
        return (
          <View style={{marginBottom: 20}}>
            <Carrito />
            <View></View>
          </View>
        );
        break;
      }
      case 1: {
        return (
          <View key={index}>
            <Direccion />
          </View>
        );
        break;
      }
      case 2: {
        return <View key={index}>{this.Render_resumen()}</View>;
        break;
      }

      default: {
        break;
      }
    }
  };

  renderStepIndicator = (params) => (
    <MaterialIcon {...getStepIndicatorIconConfig(params)} />
  );

  Render_resumen = () => {
    const render = (
      <Content padder>
        {this.Render_direcion_resumen()}
        {this.render_sucursal()}
        {this.render_button_finalizar()}
      </Content>
    );

    return render;
  };

  Render_direcion_resumen = () => {
    const render = (
      <Card>
        <CardItem header bordered>
          <Text style={styles.texto_header_checkout}>Día de entrega:</Text>
        </CardItem>
        <CardItem bordered>
          <Body>
            <DatePicker
              defaultDate={new Date()}
              minimumDate={new Date()}
              maximumDate={
                new Date(
                  this.fechaahora.getFullYear(),
                  this.fechaahora.getMonth(),
                  this.fechaahora.getDate() + 7,
                )
              }
              locale={'es'}
              timeZoneOffsetInMinutes={undefined}
              modalTransparent={false}
              animationType={'fade'}
              androidMode={'default'}
              placeHolderText="Seleccionar fecha"
              textStyle={{color: Colors.secundario2, fontSize: 14}}
              placeHolderTextStyle={{color: Colors.secundario2}}
              onDateChange={this.setDate}
              disabled={false}
              datePickerTextColor={{color: Colors.secundario2}}
            />
            <Text style={styles.text_fecha}>
              Fecha de entrega: {this.state.chosenDate.toString().substr(4, 12)}
            </Text>
            <Text style={styles.text_fecha1}>
              La hora de entrega sera en el transcurso del día que elijas
            </Text>
          </Body>
        </CardItem>
      </Card>
    );
    return render;
  };
/* carga los datos a la variable de la direccion a los estados  */
  cargarDatos = async () => {
    try {
      const misdatos = await AsyncStorage.getItem('midireccion');
      if (misdatos !== null) {
        const data = JSON.parse(misdatos);
        this.setState({
          nombre: data.nombre,
          telefono: data.telefono,
          direccion: data.direccion,
          entre: data.entre,
          colonia: data.colonia,
          referencia: data.referencia,
          datos_usuario: true,
        });
      } else {
        this.setState({
          datos_usuario: false,
        });
      }
    } catch (error) {
      this.ToastMsj('danger', 'Error al cargar datos');
    }
  };

  /* render datos de la sucursal  */

  render_sucursal = () => {
    const render = (
      <Card>
        <CardItem header bordered>
          <Text style={styles.texto_header_checkout}>
            Sucursal que recibe tu pedido:
          </Text>
        </CardItem>
        <CardItem>
          <Body>
            <Text style={styles.titulo_sucursal}>
              {this.state.sucursal.name}
            </Text>
            <Text>Direccion: {this.state.sucursal.direccion}</Text>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  `tel://${this.state.sucursal.telefono}`,
                ).catch((err) => console.log('Error:', err))
              }>
              <Text>Telefono: {this.state.sucursal.telefono}</Text>
            </TouchableOpacity>
          </Body>
        </CardItem>
      </Card>
    );

    return render;
  };

  onClickTerminar = async () => {
    this.setState({visible:!this.state.visible});
    await this._updateCarrito();

    //console.log(getCarro());
    console.log(this.state.datos_usuario);
    console.log(this.state.total_carrito_items);

    if (this.state.total_carrito_items) {
      if (this.state.datos_usuario) {
        //alert('vista finalizar');
        this.GetData();
       // this.setState({visible:true}) **************** quitar esto para funcionar la animacion 
      } else {
        Alert.alert('falta llenar los datos de envio');
         this.setState({visible:false});
      }
    } else {
      console.log("error");
      //alert('El carrito esta vacio');
      this.setState({visible:false});
      this.ToastMsj('danger', 'Error, el carrito esta vacio');
    }
  };

  render_button_finalizar = () => {
    const comentario = this.state.comentario;
    
    const renderButon = (
      <Card>
        <CardItem>
          <Body>
            <Textarea
              style={{width: '100%'}}
              rowSpan={5}
              bordered
              placeholder="Escribe un comentario"
              onChangeText={(comentario) => this.setState({comentario})}
              value={comentario}
            />
            <View style={{marginBottom: 10}} />
            <Button
              horizontal
              onPress={() => this.onClickTerminar()}
              style={styles.btn_check}>
              <Text style={styles.btn_text2}>Terminar pedido</Text>
              
            </Button>
          </Body>
        </CardItem>
      </Card>
    );

    return renderButon;
  };

  async _updateCarrito() {
    let response = await AsyncStorage.getItem('carrito');
    let carro = (await JSON.parse(response)) || [];
     let total =  await totalCarrito().then((result) => {
       this.setState({
         total_carro:result,
       })
    }).catch((err) => {
      
    });
    this.setState({
      data_carrito:carro,
      total_carrito_items: carro.length,
    });

    console.log("variable total: "+total)
  }

  GetData() {
     //Moment.locale('es-mx')
    //const f = Moment(this.state.chosenDate).format('DD [de] MMM [de] YYYY')
    const fapp = this.state.chosenDate.toString();
    const {total_carro,nombre,telefono, direccion,entre,colonia,referencia,comentario,data_carrito,sucursal} = this.state;

  
   
    const datosC ={
      nombre:nombre,
      telefono:telefono,
      direccion:direccion,
      entre:entre,
      colonia,colonia,
      referencia:referencia,
    }


    var data = {
      carrito: data_carrito,
      datos_cliente: datosC,
      comentario:comentario,
      fecha_entrega:fapp, //fecha de entrega variable f
      fecha_entrega_app:fapp,
      id_sucursal:sucursal.id,
      totalc:total_carro

    };

    console.log(JSON.stringify(data));
    try {
/* 
       setInterval(() => {
      this.setState({
        visible:
      });
    }, 2000); */
      //this.guardaPedido(data);
       this.enviarApi(data); //***************** deshabilitar cuando este listo el  link 
     //this.props.navigation.navigate('Finalizar');
    } catch (error) {
      
    }
  }


/* metodo para enviar a la api en el server */
  enviarApi = async (datos) =>{
    this.setState({
                  json_pedido:datos});
                  console.log(url_store);
     var that = this;
      fetch(url_store, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datos)
    }).then(function (response) {
      return response.json();
    }).then(function (result) {
      console.log(result);
      if (!result.error) {
       
        that.setState({ visible: false });
        //Alert.alert(result.message);
        that.guardaPedido(datos);
        that.props.navigation.navigate('Finalizar');
        //Toast.showWithGravity(result.message, Toast.LONG, Toast.CENTER);
      } else {
        // Alert.alert(result.error_msg);
        that.setState({ visible: false });
        that.ToastMsj('danger','Ocurrio un problema no se hizo el pedido a la sucursal');
        console.log(result);
      }
    }).catch(function (error) {
      console.log("-------- error ------- " + error);
      that.setState({ visible: false });
      that.ToastMsj('danger','Ocurrio un problema no se hizo el pedido a la sucursal');

    });


  }

  guardaPedido = async (data) =>{
   
    await AsyncStorage.getItem('mispedidos').then((result) => {
      if(result !== null){
        const datos_pedidos = JSON.parse(result);
        datos_pedidos.push(data);
        AsyncStorage.setItem('mispedidos',JSON.stringify(datos_pedidos));
      }else{
        const pedido = [];
        pedido.push(data);
        AsyncStorage.setItem('mispedidos',JSON.stringify(pedido));
      }
       eliminarCarrito();
    }).catch((err) => {
      console.log(err)
    });
  }


  ToastMsj =(type,msj) =>{
      return Toast.show({
                text: msj,
                buttonText: "Ok",
                position: "top",
                duration: 3000,
                 type: type
              });
  }
}
