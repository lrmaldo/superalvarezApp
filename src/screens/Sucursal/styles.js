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
  container: {
    backgroundColor: 'white',
    marginTop:10,
  },
  carouselContainer: {
    minHeight: 50,
  },
  carousel: {},

  image: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: 250,
  },
  imageContainer: {
    flex: 1,
    marginTop: 20,
    justifyContent: 'center',
    width: 300,
    height: 80,
  },
  paginationContainer: {
    flex: 1,
    position: 'absolute',
    alignSelf: 'center',
    paddingVertical: 8,
    marginTop: 200,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 0,
  },
  infoRecipeContainer: {
    flex: 1,
    margin: 10,
    marginTop: 15,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  infoPhoto: {
    height: 20,
    width: 20,
    marginRight: 0,
  },
  infoRecipe: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  category: {
    fontSize: 14,
    fontWeight: 'bold',
    margin: 10,
    color: '#2cd18a',
  },
  infoDescriptionRecipe: {
    textAlign: 'left',
    fontSize: 16,
    marginTop: 30,
    margin: 15,
  },
  infoRecipeName: {
    fontSize: 28,
    margin: 10,
   justifyContent:'center',
    fontWeight: 'bold',
    color: Colors.negro,
    textAlign: 'center',
  },
  imageBanner: {
    marginTop: 30,
    width: '95%',
    height: 300,
    borderRadius: 10,

    marginLeft: 10,
    marginRight: 10,
  },
  /* styles de recipiente de productos */
  containerRecipiente: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
    marginTop: 20,
    width:
      (SCREEN_WIDTH - (recipeNumColums + 1) * RECIPE_ITEM_MARGIN) /
      recipeNumColums,
    height: RECIPE_ITEM_HEIGHT + 105,
    borderColor: '#cccccc',
    borderWidth: 0.5,
    borderRadius: 15,
  },
  photo: {
    width:
      (SCREEN_WIDTH - (recipeNumColums + 1) * RECIPE_ITEM_MARGIN) /
      recipeNumColums,
    height: RECIPE_ITEM_HEIGHT,
    borderRadius: 15,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  title: {
    flex: 1,
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#444444',
    marginTop: 3,
    marginRight: 5,
    marginLeft: 5,
  },
  category: {
    marginTop: 5,
    marginBottom: 5,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  container1: {
    flex: 1,
    justifyContent: 'center',
  },
  /* buscador */

  searchBar: {
    backgroundColor: 'white',
    //position: 'absolute',
    width: '90%',
    //bottom: 45,
    alignSelf: 'center',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowColor: Colors.negro,
    shadowOpacity: 0.5,
    shadowRadius: 7,
    borderWidth: 0.2,
    flexDirection:'row',
    justifyContent:'space-between',
    padding:10,
    borderRadius:15,
    paddingHorizontal:15,
  },
  textBuscador:{
    fontSize:22,
    color: Colors.negro,

  },
  iconBuscador:{
    tintColor: Colors.blanco,
    width:30,
    height:30,
    marginRight:10,
    backgroundColor:Colors.primario,
    borderRadius:25/2,
    
  }

});

export default styles;
