import { StyleSheet,Dimensions } from 'react-native';
import Colors from'./../Colors';

const {width: viewportWidth} = Dimensions.get('window');
const {width, height} = Dimensions.get('window');
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;

const recipeNumColums = 2;
// item size
const RECIPE_ITEM_HEIGHT = 150;
const RECIPE_ITEM_MARGIN = 20;
const styles = StyleSheet.create({
  categoriesItemContainer: {
    flex: 1,
    margin: 15,
    justifyContent: 'center',
    alignItems: 'center',
    height: 315,
    borderColor: '#cccccc',
    borderWidth: 0.5,
    borderRadius: 20,
     backgroundColor: 'white',
  },
  categoriesPhoto: {
    width: '100%',
    height: 220,
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    shadowColor: 'blue', 
    shadowOffset: { 
      width: 0,
      height: 3 
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
   
  },
  Photo: {
    width: 550,
    height: 150,
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    shadowColor: 'white',
    shadowOffset: {
      width: 0,
      height: 3
    },
    //color:'white',
    shadowRadius: 5,
    shadowOpacity: 1.0,
   
    resizeMode:"contain"
    
  },
  categoriesName: {
    
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333333',
    marginTop: 10
  },
  categoriesInfo: {
    margin: 10,
    marginLeft:5,
    textAlign:'center',
    fontSize:12,
  
    //marginBottom: 15 
  },
   containerCabecera:{
    backgroundColor:Colors.primario,
    height:230,
    borderBottomLeftRadius:30,
    borderBottomRightRadius:30,
    position:'relative',
  },
  photo_categoria:{
    // backgroundColor:Colors.primario,
    height:'100%',
    width:'100%',
    borderBottomLeftRadius:30,
    borderBottomRightRadius:30,
    position:'relative', 
  },

  /* style itemCategoria */
   titulo_categoria:{
     textAlign:'center',
     fontSize:25,
     fontWeight:'bold',
     margin:10,
   },

   /* stylo de contenedores */

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
  
});


export default styles;