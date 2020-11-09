/* aqui se guardara los datos de la sucursal  y se  podra eliminiar */

import AsyncStorage from '@react-native-community/async-storage';

export const  guardarDatosSucursal = async (data) =>{

  try {
      await AsyncStorage.getItem('sucursal')
      .then((dataSucursal)=>{
          
        if(dataSucursal !== null){
             data = JSON.parse(dataSucursal);
            AsyncStorage.setItem('sucursal',JSON.stringify(data));
            console.log('datos de sucursal guardados')
        }else{
            data = JSON.parse(dataSucursal);
            AsyncStorage.setItem('sucursal', JSON.stringify(data));
            console.log('datos de sucursal guardados')
        }
      });
  } catch (error) {
      console.log("funcion guardarDatossucursal:"+error);
  }


}

export  const GetDatosSucursal= async ()=>{
try {
const sucursal = await AsyncStorage.getItem('sucursal');
console.log(sucursal);
return sucursal ?JSON.parse(sucursal) : {};
    
} catch (error) {
    console.log('fallo al obtener los datos')
}    
} 
    //const datag = null
        /*  try {
       datag = AsyncStorage.getItem('sucursal')
      .then((dataSucursal)=>{
        if(dataSucursal !== null){
            datag = JSON.parse(dataSucursal);
            
        }else{
            //datag = null
        }
       
      });
    } catch (error) {
console.log('error de obtener datos de sucursal: '+error);        
    } */

    





export function EliminarDatosSucursal(){
    AsyncStorage.removeItem('sucursal');
}