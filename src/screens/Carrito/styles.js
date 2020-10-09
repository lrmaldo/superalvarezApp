/* eslint-disable no-dupe-keys */
/* eslint-disable no-unused-vars */
import {StyleSheet, Dimensions} from 'react-native';
import {RecipeCard} from './../../AppStyles';
 import Colors from './../Colors';

const {width: viewportWidth} = Dimensions.get('window');
const {width, height} = Dimensions.get('window');
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;

const recipeNumColums = 2;
// item size
const RECIPE_ITEM_HEIGHT = 150;
const RECIPE_ITEM_MARGIN = 20;

const styles = StyleSheet.create({
 container:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    contairner_vacio:{
        flex: 1, 
        alignItems: 'center',
         justifyContent: 'center'
    },
    item_carro: {
        width: width - 20,
          margin: 10,
          backgroundColor: 'transparent',
          flexDirection: 'row',
          borderBottomWidth: 2,
          borderColor: '#cccccc',
          paddingBottom: 10,
    },
    imageItem:{
         width: width / 3, 
         height: width / 3 

    },
    item_carro2:{
        flex: 1,
        backgroundColor: 'transparent',
        padding: 10,
        justifyContent: "space-between"
    },
    text_carrito:{
        fontSize:32,
        fontWeight:'bold',
        color:Colors.negro,
    },
    item_titulo:{
        fontWeight: "bold",
        fontSize: 20
    }
});

export default styles;


