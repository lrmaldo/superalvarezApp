import React, { Component } from 'react';
import {  Content, Card, CardItem,  Icon, Right, Text } from 'native-base';

export default class DireccionCheck extends Component {
    state = {  }
    render() {
        return (
          <Content style>
          <Card>
            <CardItem>
            
              <Text>Google Plus</Text>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
             </CardItem>
           </Card>
        </Content>
        );
    }
}