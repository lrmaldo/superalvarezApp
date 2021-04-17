import { StyleSheet } from 'react-native';
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
    height: 230,
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
   horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  container1: {
    flex: 1,
    justifyContent: 'center',
    
    
  },
});


export default styles;