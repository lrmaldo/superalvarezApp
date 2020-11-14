import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Text, Body, H2 } from "native-base";
import { View } from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Colors from '../Colors';
export default class finalizar extends Component {
   constructor(props) {
       super(props)

    /* this.state = {

      } */
       
   }
   

   /* icons check-circle */
   
    render() {
        return (
           <Container>
       
        <Content padder>
          <Card style={styles.card}>
            <CardItem header bordered >
                <Body style={styles.icon_check}>
                
                <Icon name={'check-circle'} style={{alignSelf:'center'}}  size={100} color={Colors.secundario2} />
                </Body>               
              
            </CardItem>
            <CardItem bordered>
              <Body style={{justiftyContent:"center", alignItems:"center"}}>


                 
                <H2 style={styles.text_h2} >
                 ¡Pedido enviado Exitosamente!
                </H2>
              </Body>
            </CardItem>
            <CardItem footer bordered>
              <Text>GeekyAnts</Text>
            </CardItem>
          </Card>
        </Content>
      </Container>  
        );
    }
}