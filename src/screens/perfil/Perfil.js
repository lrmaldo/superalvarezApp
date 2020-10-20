import React, {Component} from 'react';
import {View} from 'react-native';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Right,
} from 'native-base';
import Colores from '../Colors';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
export default class Perfil extends Component {
  state = {};
  static navigationOptions = ({navigation}) => {
    return {
      //headerTransparent: 'true',
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

  render() {
    return (
      <Container style={{marginTop:2,}}>
        <Card style={styles.card}>
          <CardItem button onPress={() => this.onPressMisdirecciones()}>
            <Icon
              name="directions"
              style={styles.icon_style}
              size={27}
              color={Colores.secundario2}
            />

            <Text style={styles.text_item}>Mi dirección </Text>
            <Right>
              <Icon2
                style={styles.icon_derecha}
                name="arrow-right"
                size={27}
                color={Colores.secundario2}
              />
            </Right>
          </CardItem>
        </Card>

        <Card style={styles.card}>
          <CardItem button onPress={() => this.onPressMispedidos()}>
            <Icon2
              style={styles.icon_style}
              name="shopping-basket"
              size={27}
              color={Colores.secundario2}
            />

            <Text style={styles.text_item}>Mis pedidos </Text>
            <Right>
              <Icon2
                style={styles.icon_derecha}
                name="arrow-right"
                size={27}
                color={Colores.secundario2}
              />
            </Right>
          </CardItem>
        </Card>
      </Container>
    );
  }

  onPressMisdirecciones = () => {
    this.props.navigation.navigate('Misdirecciones');
  };
  onPressMispedidos = () => {
    this.props.navigation.navigate('Mispedidos');
  };

  /* renderizacion  por partes */
  
}
