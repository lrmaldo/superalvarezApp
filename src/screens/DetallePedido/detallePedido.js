import React, { Component } from 'react';
import { View } from 'react-native';
export default class detallePedido extends Component {
    constructor(props) {
        super(props)
    this.state = { 
        pedido:this.props.navigation.getParam('pedido'),
        
     }
    }
    
    render() {
        return (
            <View> </View>
        );
    }
}