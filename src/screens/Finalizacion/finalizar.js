import React, {Component} from 'react';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Body,
  H2,
  Button,
} from 'native-base';
import {View,  BackHandler, Platform} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Colors from '../Colors';
import { HeaderBackButton } from 'react-navigation-stack';
export default class finalizar extends Component {
  constructor(props) {
    super(props);

    /* this.state = {

      } */
      this.onBackClicked = this._onBackClicked.bind(this);
        const { params } = this.props.navigation.state;
  }
     static navigationOptions = ({ navigation }) => {

    const { params = {} } = navigation.state;
    //const {direccionTienda} =this.state
    //console.log(params.descripcion)
    return {
       headerLeft:   (props) => (
        <HeaderBackButton
          {...props}
          onPress={() => {
            params.regresar()
          }}
        />
      ),

    }
 }

  _regresar= ()=>{
    
      this.props.navigation.navigate('Sucursal');

   
  
}

componentDidMount() {

this.props.navigation.setParams({
      regresar: this._regresar.bind(this),
      });
  }
  componentWillMount() {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this.onBackClicked);
    }
  }
  componentWillUnmount() {
    if (Platform.OS === 'android') {
      
      BackHandler.removeEventListener("hardwareBackPress", false);
    } else {
      // this.propstManger.addLengeData(this.props.navigator.getCurrentRoutes().length);
    }
  }
  _onBackClicked = () => {
    this.props.navigation.navigate('Sucursal')
    return true;
  } 

/* back = ()=>{
  this.props.navigation.navigate('Sucursal')
} */
 

  render() {
    return (
      <Container>
        <Content padder>
          <Card style={styles.card}>
            <CardItem header bordered>
              <Body style={styles.icon_check}>
                <Icon
                  name={'check-circle'}
                  style={{alignSelf: 'center'}}
                  size={100}
                  color={Colors.secundario2}
                />
              </Body>
            </CardItem>
            <CardItem bordered>
              <Body style={{justiftyContent: 'center', alignItems: 'center'}}>
                <H2 style={styles.text_h2}>¡Pedido enviado Exitosamente!</H2>
              </Body>
            
            
            </CardItem>
           <CardItem bordered>
              <Body>
                <Button
              horizontal
              onPress={() => this.onClickPedidos()}
              style={styles.btn_check}>
              <Text style={styles.btn_text2}>Ver pedidos</Text>
              
            </Button>
              </Body>
            
            
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }

  /* functions */

  onClickPedidos = () =>{
     this.props.navigation.navigate('Mispedidos',{finalizar:true});
  }
}
