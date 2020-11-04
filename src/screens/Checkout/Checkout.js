import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Steps from 'react-native-steps';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import ViewPager from '@react-native-community/viewpager';
import Carrito  from '../Carrito/Carrito';
import Colors from '../Colors';
import Component_direccion from './Componentes/DireccionCheck';
import Direccion from '../perfil/Misdirecciones';
import styles from './styles';
const PAGES = ['Page 1', 'Page 2', 'Page 3', 'Page 4'];



const secondIndicatorConfigs = {
    stepIndicatorSize: 30,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: Colors.secundario2,
    stepStrokeWidth: 3,
    separatorStrokeFinishedWidth: 4,
    stepStrokeFinishedColor: Colors.secundario2,
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: Colors.secundario2,
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: Colors.secundario2,
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: Colors.secundario2,
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: Colors.secundario2,
};



const getStepIndicatorIconConfig = ({position, stepStatus}) => {
    const iconConfig = {
        name: 'feed',
        color: stepStatus === 'finished' ? '#ffffff' : Colors.secundario2,
        size: 15
    };
    switch (position) {
        case 0: {
            iconConfig.name = 'shopping-cart';
            break
        }
        case 1: {
            iconConfig.name = 'location-on';
            break
        }
        case 2: {
            iconConfig.name = 'assessment';
            break
        }
       /*  case 3: {
            iconConfig.name = 'payment';
            break
        } */
        case 3: {
            iconConfig.name = 'track-changes';
            break
        }
        default: {
            break
        }
    }
    return iconConfig
};


export default class Checkout extends Component {

 constructor(props) {
        super(props);
        this.state = {
            currentPage: 0
        }
    }

    componentWillReceiveProps(nextProps, nextState) {
        if (nextState.currentPage !== this.state.currentPage) {
            if (this.viewPager) {
                this.viewPager.setPage(nextState.currentPage)
            }
        }
    }

  render() {
       
    return (
         <View style={styles.container}>
               
                <View style={styles.stepIndicator}>
                    <Steps
                        count={4}
                        renderStepIndicator={this.renderStepIndicator}
                        configs={secondIndicatorConfigs}
                        current={this.state.currentPage}
                        labels={[
                            'Carrito',
                            'Dirección de entrega',
                            'Resumen',
                            /* 'Payment Method', */
                            'Finalizar'
                        ]}
                    />
                </View>
                
                <ViewPager
                    style={{flex: 1}}
                   initialPage={0}
                   onPageSelected={page => {
                       console.log(page)
                        this.setState({currentPage: page.nativeEvent.position})
                    }}
                >
                    {PAGES.map((page, index) => this.renderViewPagerPage(page, index))}
                </ViewPager>
            </View>
         
      
    );
  }

renderViewPagerPage = (data, index) => {
       switch (index) {
        case 0: {
            return(<Carrito/>)
            break
        }
        case 1: {
            return (  <View  key={index}>
               <Direccion/>
            </View>)
            break
        }
        case 2: {
        return (  <View  key={index}>
                <Text> resumen</Text>
            </View>)
            break
        }
      
        case 3: {
          return (  <View  key={index}>
                <Text> finalizar</Text>
            </View>)
            break
        }
        default: {
            break
        }
    }
       
       
       /*  if(index==0){
          return(<Carrito/>)
        }else{

        return (
            <View style={styles.page} key={index}>
                <Text>{data}</Text>
            </View>
        )
        } */
        
    };

    renderStepIndicator = params => (
        <MaterialIcon {...getStepIndicatorIconConfig(params)} />
    )

    Render_resumen = () =>{
    const render = <View></View>;

    return render; 

    }


}

