import React, {Component} from 'react';
import {
  Container,
  Left,
  Right,
  Content,
  View,
  Card,
  CardItem,
  Text,
  Body,
} from 'native-base';

import {url_sucursal_datos} from '../../URLs/url';
/* hora  */
import Moment from 'moment';
import 'moment/locale/es';

import styles from './styles';

import {Linking, TouchableOpacity}from 'react-native';
/* icons */
import Icon from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/FontAwesome5';

/* colores */
import Colors from './../Colors';

export default class detallePedido extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pedido: this.props.navigation.getParam('pedido'),
      carrito: null,
      sucursal: [],
    };
  }
  componentWillMount() {
    this.GetSucursal();
  }
  /* functions */

  GetSucursal = async () => {
    const id_sucursal = this.state.pedido.id_sucursal;

    const url = url_sucursal_datos + `${id_sucursal}`;
    //console.log(url)
    return await fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        //var responseJson = JSON.parse(response);

        let data = {
          nombre: responseJson.name,
          correo: responseJson.email,
          telefono: responseJson.telefono,
          lat: responseJson.lat,
          long: responseJson.lon,
          whatsapp: responseJson.whatsapp,
          direccion: responseJson.direccion,
        };

        this.setState({
          sucursal: data,
        });

        /*  this.setState({
      data_sucursal:data,
    })    */
      })
      .catch((error) => {
        //console.error(error);
        //this.setState({refreshing: false, loading: false});
        //Alert.alert("","Ocurrio un problema con el servidor intentalo más tarde")
      });
  };

  render() {
    console.log(this.state.sucursal);
    const fecha = Date.parse(this.state.pedido.fecha_entrega_app);
    Moment.locale('es-mx');
    return (
      <Container>
        <Content padder>
          <Card style={styles.divPedido}>
            <CardItem header bordered>
              <Text style={styles.color_texto}>Tu pedido</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                {this._render_pedido()}
                {this._render_total()}
              </Body>
            </CardItem>
            <CardItem bordered>
              {/* datos de la sucursal */}
              {this._render_sucursal()}
            </CardItem>
            <CardItem bordered>
              <View style={styles.circle}>
                <Icon3
                  name="map-marker-alt"
                  underlayColor="transparent"
                  style={styles.IconGps}
                />
              </View>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                 Dirección: {this.state.pedido.datos_cliente.direccion} {' '}  
                  Entre:{this.state.pedido.datos_cliente.entre}
                  colonia: {this.state.pedido.datos_cliente.colonia}
                  Referencia: {this.state.pedido.datos_cliente.referencia}
                  Recibe: {this.state.pedido.datos_cliente.nombre}{' '}
                </Text>
              </Body>
            </CardItem>
            <CardItem>
              <Text style={styles.color_texto}>Fecha de entrega: </Text>
              <Text style={styles.text_fecha}>
                {Moment(fecha).format('DD [de] MMM [de] YYYY [,] h:mm a')}
              </Text>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }

  /* functions de render  */

  _render_pedido = () => {
    var array_carrito = this.state.pedido.carrito;

    const render_carro = [...array_carrito].map((item, i) => {
      return (
        <View style={{flexDirection: 'row'}}>
          <Left style={styles.tamanio_iz}>
            <Text>{item.producto.titulo}</Text>
          </Left>
          <Right style={styles.tamanio_de}>
            <Text>
              {Format_moneda(item.precio)} x {item.cantidad} ={' '}
              {Format_moneda(item.cantidad * item.precio)}{' '}
            </Text>
          </Right>
        </View>
      );
    });

    return render_carro;
  };

  /* render total */

  _render_total = () => {
    const renderTotal = (
      <View style={{flexDirection: 'row'}}>
        <Right>
          <Text style={styles.texto_total}>
            Total:{Format_moneda(this.state.pedido.totalc)}
          </Text>
        </Right>
      </View>
    );
    return renderTotal;
  };
  /* render sucursal */

  _render_sucursal = () => {
    const url = Platform.select({
      ios: `maps://app?daddr=${this.state.sucursal.lat},${this.state.sucursal.long}&t=s`,
      android: `google.navigation:q=${this.state.sucursal.lat},${this.state.sucursal.long}`,
    });

    //console.log(this.state.sucursal.nombre);
    return (
      <View style={{alignItems: 'center'}}>
       <View style={styles.circle}>
                <Icon3
                  name="store"
                  underlayColor="transparent"
                  style={styles.IconGps}
                />
              </View>

        <Text>{this.state.sucursal.nombre || 'cargando...'} </Text>
        <Text>{this.state.sucursal.direccion || 'cargando...'}</Text>

        <View style={styles.view_fila}>{this.Icons_sucursal(url)}</View>
      </View>
    );
  };

  Icons_sucursal = (link) => {
    return (
      <View
        style={{
          marginTop: 10,
          marginBottom: 10,
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL(
              `tel://${this.state.sucursal.telefono}`,
            ).catch((err) => console.log('Error:', err))
          }>
          <Icon
            name="call"
            underlayColor="transparent"
            style={styles.IconStyle}
          />
        </TouchableOpacity>
        <View style={{paddingHorizontal: 20}} />
        <TouchableOpacity
          style={styles.smsRow}
          onPress={() =>
            Linking.openURL(
              `https://wa.me/52${this.state.sucursal.whatsapp}`,
            ).catch((err) => console.log('Error:', err))
          }>
          <Icon
            name="logo-whatsapp"
            underlayColor="transparent"
            style={styles.IconStyle}
          />
        </TouchableOpacity>
        <View style={{paddingHorizontal: 20}} />
        <TouchableOpacity onPress={() => Linking.openURL(link)}>
          <Icon3
            name="directions"
            underlayColor="transparent"
            style={styles.IconStyle}
          />
        </TouchableOpacity>
      </View>
    );
  };
}
function Format_moneda(num) {
  return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}
