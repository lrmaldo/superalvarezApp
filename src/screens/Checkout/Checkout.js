import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Steps from 'react-native-steps';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import ViewPager from '@react-native-community/viewpager';
import Carrito  from '../Carrito/Carrito';
const PAGES = ['Page 1', 'Page 2', 'Page 3', 'Page 4'];



const secondIndicatorConfigs = {
    stepIndicatorSize: 30,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#fe7013',
    stepStrokeWidth: 3,
    separatorStrokeFinishedWidth: 4,
    stepStrokeFinishedColor: '#fe7013',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#fe7013',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#fe7013',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#fe7013',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: '#fe7013',
};



const getStepIndicatorIconConfig = ({position, stepStatus}) => {
    const iconConfig = {
        name: 'feed',
        color: stepStatus === 'finished' ? '#ffffff' : '#fe7013',
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
        if(index==0){
          return(<Carrito/>)
        }else{

        return (
            <View style={styles.page} key={index}>
                <Text>{data}</Text>
            </View>
        )
        }
        
    };

    renderStepIndicator = params => (
        <MaterialIcon {...getStepIndicatorIconConfig(params)} />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    stepIndicator: {
        marginVertical: 50
    },
    page: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});