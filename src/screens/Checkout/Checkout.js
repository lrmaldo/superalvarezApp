import React, {Component} from 'react';
import {StyleSheet, Text, View, Linking, TouchableOpacity} from 'react-native';

import Steps from 'react-native-steps';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import ViewPager from '@react-native-community/viewpager';
import Carrito from '../Carrito/Carrito';
import Colors from '../Colors';
import Component_direccion from './Componentes/DireccionCheck';
import Direccion from '../perfil/Misdirecciones';
import styles from './styles';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import {
  Content,
  Card,
  CardItem,
  Body,
  Button,
  DatePicker,
  Textarea,
} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';

import DateTimePickerModal from 'react-native-modal-datetime-picker';

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
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0,
      total_carrito: 0,
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
      sucursal: this.props.navigation.getParam('sucursal'),
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
      <View style={styles.container}>
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
    );
  }

  onPressCheckout = (data) => {
    if (this.state.total_carrito > 0) {
      this.setState({currentPage: 1});
      this.viewPager.setPage(data);
    } else {
      alert('no hay pedidos en el carrito');
    }
  };

  componentWillUpdate() {}
  componentDidMount() {}

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
    await this._updateCarrito();

    //console.log(getCarro());
    console.log(this.state.datos_usuario);
    console.log(this.state.total_carrito);

    if (this.state.total_carrito) {
      if (this.state.datos_usuario) {
        alert('vista finalizar');
        this.GetData();
      } else {
        alert('falta llenar los datos de envio');
      }
    } else {
      //console.log(this._getValue());
      alert('no vista');
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
              <Icon2 name={'arrow-right'} size={20} color={Colors.blanco} />
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

    this.setState({
      data_carrito:carro,
      total_carrito: carro.length,
    });
  }

  GetData() {
    const f = this.state.chosenDate.toString();
    const {nombre,telefono, direccion,entre,colonia,referencia,comentario,data_carrito,sucursal} = this.state;
   
   
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
      fecha_entrega:f, //fecha de entraga variable f
      id_sucursal:sucursal.id,

    };

    console.log(JSON.stringify(data));
  }
}
