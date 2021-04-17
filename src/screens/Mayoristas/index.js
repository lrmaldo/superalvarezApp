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
 Root, 
  
} from 'native-base';
import {View,
  BackHandler,
  FlatList,
   Platform,
   TouchableHighlight,
   Image,
   Linking,
   } from 'react-native';
   import styles from './styles';

export default class Mayorista extends Component{
constructor(props) {
    super(props)
    
    this.state = {
        sucursales: this.props.navigation.getParam('sucursales'),

    }
}

renderSucursal = ({item}) => (
    <TouchableHighlight
      underlayColor="rgba(73,182,77,1,0.9)"
      onPress={() =>  Linking.openURL(
              `https://wa.me/52${item.whatsapp}`,
            ).catch((err) => console.log('Error:', err))}>
      <View style={styles.categoriesItemContainer}>
        {item.url_imagen == null ? (
          <Image
            style={styles.Photo}
            source={require('./../../../img/logo.jpg')}
          />
        ) : (
          <Image
            style={styles.categoriesPhoto}
            key={item.id}
            source={{uri: item.url_imagen}}
          />
        )}

        <Text style={styles.categoriesName}>{item.name}</Text>
        <Text style={styles.categoriesInfo}>
          {item.direccion}
          {/*  {getNumberOfRecipes(item.id)} recipes */}
        </Text>
        {/*  <Text style={styles.categoriesName}>Soy mayorista</Text> */}
      </View>
    </TouchableHighlight>
  );


        render(){
            console.log(this.state.sucursales)
            return (
                 <Root>
                  <Text style={styles.categoriesName}>Elige tu sucursal más cercano</Text>
                   <FlatList
                     ref={c => { this.flatList = c; }}
                     style={{ flex: 1 }}
                     keyboardShouldPersistTaps={'always'}
                     enableEmptySections
                     data={this.state.sucursales}
                     keyExtractor={(item) => item.id.toString()}
                     renderItem={ this.renderSucursal}
                     // ListEmptyComponent={() => <EmptyComponent />}
                     // refreshControl={
                     //   <RefreshControl
                     //     refreshing={this.state.refreshing}
                     //     onRefresh={() => this.onRefresh()}
                     //   />
                     // }
                   />
{/* 
                    <FlatList
              data={this.state.dataSucursales}
              renderItem={this.renderSucursal}
              keyExtractor={(item) => `${item.id}`}
                 /> */}

                 </Root>
            );
        }
  }