
import AsyncStorage from '@react-native-community/async-storage';






 export const getPedidos = async (key) => {
   try {
     const value = await AsyncStorage.getItem(key).then((result) => {
         return JSON.parse(result);
     }).catch((err) => {
         
     });
     return value;
   } catch (e) {
     // process error
     console.log(e);
   }
 };
//export default prefsnamager;


/* export  const  GetPedidos = async () => AsyncStorage.getItem('mispedidos').then((result) => {

    if(result!==null){
      const   get_pedidos = JSON.parse(result);
        return get_pedidos;
    }else{
         return 0;
    }

}).catch((err) => {
    console.log('error:'+err);
});
 */
/* export  const  GetPedidos = async key => {
    try {
      const data = await AsyncStorage.getItem(key);
      if (data !== null) {
        console.log(data);
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  }; */