
import React, { Component } from 'react';
//import PropTypes from 'prop-types';

import {FlatList, 
Text,
View,
Image,
StatusBar,
TouchableHighlight
} from 'react-native';


/* styles */
import styles from './styles';
export default class Categorias extends Component {
    constructor(props) {
    super(props);
    this.state = {
      categorias: this.props.navigation.getParam('categorias'),
      sucursal: this.props.navigation.getParam('sucursal'),
     
    }
    }

    render() {
        return (
         <View>
      <StatusBar barStyle='light-content' backgroundColor='#c7b800' />
        <FlatList
          data={this.state.categorias}
          renderItem={this.renderCategorias}
          keyExtractor={(item) => `${item.id}`} 
        />
      </View>   
        );
    }

    /* functions */
     onPressCategoria = item => {
    this.props.navigation.navigate('ItemCategoria', { categoria:item,sucursal:this.state.sucursal});
  };
/* */


  /* render de sucursales */


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
       
        <Text style={styles.categoriesName}>{item.titulo}</Text> 
        <Text style={styles.categoriesInfo}>  

            {item.direccion} 
         {/*  {getNumberOfRecipes(item.id)} recipes */}
        </Text>
      </View>
    </TouchableHighlight>
  );

    }