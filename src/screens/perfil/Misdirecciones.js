 import React, {Component} from 'react';
import {View} from 'react-native';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Body,
  Item,
  Input,
  Icon,
  Form,
  Textarea,
  Toast,
  Root,
} from 'native-base';

import {Button} from 'react-native-elements';
import styles from './styles';
import Color from '../Colors';

/* asyncstorage */
import AsyncStorage from '@react-native-community/async-storage';

export default class Misdirecciones extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nombre: null,
      telefono: null,
      direccion: null,
      entre: null,
      colonia: null,
      referencia: null,
      showToast: false,
      visible:false,
    };
    this.cargarDatos();
  }
   


  render() {
    const {
      nombre,
      telefono,
      direccion,
      entre,
      colonia,
      referencia,
    } = this.state;
    return (
        <Root>
      <Container>
        <Content>
          <Card>
            <CardItem header style={styles.alineacion_centro}>
              <Button
                buttonStyle={styles.button}
                title="  Guardar"
                loading={this.state.visible ? true : false}
                onPress={this.Submit}
              />
            </CardItem>
            <CardItem>
              <Body>
                <Text>Nombre</Text>
                <Item>
                  <Icon active name="person-circle" style={styles.color_icon} />
                  <Input
                    placeholder="Escribe tu nombre..."
                    keyboardType="name-phone-pad"
                    onChangeText={(nombre) => this.setState({nombre})}
                    value={nombre}
                  />
                </Item>
                <Text>Teléfono</Text>
                <Item>
                  <Icon active name="ios-call" style={styles.color_icon} />
                  <Input
                    placeholder="Teléfono o Celular"
                    keyboardType="phone-pad"
                    onChangeText={(telefono) => this.setState({telefono})}
                    value={telefono}
                  />
                </Item>

                <Text>Dirección</Text>
                <Item>
                  <Icon active name="home" style={styles.color_icon} />
                  <Input
                    placeholder="Escribe tu dirección"
                    onChangeText={(direccion) => this.setState({direccion})}
                    value={direccion}
                  />
                </Item>
                <Text>Entre</Text>
                <Item>
                  <Icon
                    active
                    name="swap-horizontal"
                    style={styles.color_icon}
                  />
                  <Input
                    placeholder="Entre que calles esta ó cruzamientos"
                    onChangeText={(entre) => this.setState({entre})}
                    value={entre}
                  />
                </Item>
                <Text>Colonia</Text>
                <Item>
                  <Icon active name="home" style={styles.color_icon} />
                  <Input
                    placeholder="Escribe tu colonia "
                    onChangeText={(colonia) => this.setState({colonia})}
                    value={colonia}
                  />
                </Item>

                <Text>Referencia</Text>

                <Textarea
                  style={{width: '100%'}}
                  rowSpan={5}
                  bordered
                  placeholder="Escribe una referencia detallad, color de la casa, lugares cercanos, etc."
                  onChangeText={(referencia) => this.setState({referencia})}
                  value={referencia}
                />
              </Body>
            </CardItem>
            <CardItem style={styles.alineacion_centro} footer>
              
            </CardItem>
          </Card>
        </Content>
      </Container>
      </Root>
    );
  }

  /* functions */

  onChangeText = (text) => this.setState({text});

  Submit = () => {
if (this.state.nombre && this.state.telefono && this.state.direccion && this.state.entre && this.state.colonia && this.state.referencia) {
    this.guardarDatos();
}else{
  this.ToastMsj('danger','LLena todos los campos');
}

  };

  ToastMsj =(type,msj) =>{
      return Toast.show({
                text: msj,
                buttonText: "Ok",
                duration: 3000,
                 type: type
              });
  }

  guardarDatos = () =>{
      this.setState({ visible: !this.state.visible });
      const onsave = this.save;
       const {
      nombre,
      telefono,
      direccion,
      entre,
      colonia,
      referencia,
    } = this.state;

    let datosDireccion = {
        nombre:nombre,
        telefono:telefono,
        direccion:direccion,
        entre:entre,
        colonia:colonia,
        referencia:referencia
    }
    onsave(datosDireccion);
  }

  save = async name =>{
      try {
          await AsyncStorage.setItem('midireccion',JSON.stringify(name));
            this.setState({ visible: !this.state.visible });
            this.ToastMsj('success','Datos guardados Correctamente');
      } catch (error) {
         this.ToastMsj('danger','Ocurrio un problema al guardar los datos');
      }
  }

  cargarDatos = async () =>{
      try {
          const misdatos = await AsyncStorage.getItem('midireccion');
          if (misdatos !==null) {
              const data  = JSON.parse(misdatos);
              this.setState({
                  nombre:data.nombre,
                  telefono:data.telefono,
                  direccion:data.direccion,
                  entre:data.entre,
                  colonia:data.colonia,
                  referencia:data.referencia,

              })
          }
      } catch (error) {
          this.ToastMsj('danger','Error al cargar datos');
      }
  }
}


/* falta poner la funcion para guardar en la api desde la funcion save */ 