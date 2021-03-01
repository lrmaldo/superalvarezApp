import React, {Component} from 'react';
import {View,
 FlatList,
 ActivityIndicator,
 Image,
 } from 'react-native';
import { HeaderBackButton } from 'react-navigation-stack';
import {H1, Container,
 Content,
  Card,
   CardItem,
    Text, 
    Body,
    Button, 
    } from "native-base";
import FastImage from 'react-native-fast-image';

/* script mis pedidos */
import {getPedidos}  from './script/script_mispedidos';
import styles from './styles';
/* hora  */
import Moment from 'moment'
/* import   'moment/locale/es'; */



export default class Mispedidos extends Component {
  constructor(props) {
    super(props)
    this.state = {
      finalizar: this.props.navigation.getParam('finalizar') || false,
      mispedidos:[],
      recargando:true,
      
    };


     

       const { params } = this.props.navigation.state;

        
       
  
  }

  
componentDidMount()
{
     
}

componentWillUpdate(){
  this.getDataPedidos();
}

getDataPedidos = async ()=>{
 await  getPedidos('mispedidos')
    .then(res => {
      this.setState({mispedidos:res!=null? res:null,
                     recargando:res!=null?false:true})
      
    
    })
}
 static navigationOptions = ({ navigation }) => {

    const { params = {} } = navigation.state;
    //const {direccionTienda} =this.state
    //console.log(params.descripcion)
    return {
       headerLeft:  (props) => (
        <HeaderBackButton
          {...props}
          onPress={() => {
            params.regresar()
          }}
        />
      ),

    }
 }

  componentDidMount() {

this.props.navigation.setParams({
      regresar: this._regresar.bind(this),
      });

     
  }


/* rederizar  */
  render() {
     
     if (this.state.recargando) {
      return (
        //loading view while data is loading
        //loading view while data is loading
        <View style={[styles.container1]}>
        <Image source={require('../../../img/logo.jpg')} style={{ width: 300, height: 200, alignSelf: 'center'}} />
          <H1>Aun no tienes pedidos</H1>
        </View>
      );
    }



    return ( <Container>
       
        <Content padder>
                <FlatList
                  numColumns={1}
                  data={this.state.mispedidos.reverse()}
                  renderItem={({item}) =>this._renderItemPedidos(item)}
                  keyExtractor={(item,index) => index.toString()}
                />
          {/* <View style={styles.infoContainer}>
              </View> */}
        </Content>
      </Container>);
  }

  /* functions */

  _regresar= ()=>{
    console.log("regresar"+this.state.finalizar);

    if(this.state.finalizar){
      this.props.navigation.navigate('Sucursal');
    }else{

      this.props.navigation.goBack()
    }
  }

  _renderItemPedidos = (item)=>{
      const fecha = Date.parse(item.fecha_entrega_app);
      //Moment.locale('es')
      const carrito =  this.pedidoCard(item.carrito);
    return(<Card>
            <CardItem header bordered>
              <Text style={styles.text_color}> Pedido: {Moment(fecha).format('DD [de] MMM [de] YYYY [,] h:mm a')}</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text style={styles.text_color}>
                  Productos
                </Text>
                {carrito}
                <Text>...</Text>
              </Body>
            </CardItem>
            <CardItem  bordered style={{alignContent: 'center', justifyContent: 'center',}}>
               <Button
              horizontal
              onPress={() => this.onClickDetallePedidos(item)}
              style={styles.btn_check}>
              <Text style={styles.btn_text2}>Ver detalle</Text>
              </Button>
            </CardItem>
          </Card>);
  }

  pedidoCard =  (item)=>{
     const data =  [...item].slice(0, 2).map((item, i) => {
       return  (<View style={{ marginBottom: 10, flexDirection: "row", justifyContent: "center" }}>
                <Text style={{ textAlign: "left", fontSize: 19 }}>{item.producto.titulo.substr(0,100)}   </Text>
                <Text style={{ textAlign: "right", fontSize: 19 }}>${item.producto.precio} x {item.cantidad} unidad</Text>
            </View>)
     })
     return data;
  }

  onClickDetallePedidos = (item) =>{this.props.navigation.navigate('DetallePedido',{pedido:item})}
}
