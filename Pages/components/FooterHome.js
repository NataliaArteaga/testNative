import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text } from 'native-base';


const  FooterHome =({navigation})=> {
  
    return (
      <Container>
        <Content />
        <Footer>
          <FooterTab>
            <Button vertical active onPress={()=>{navigation.navigate('Home')}}>
              <Icon active name="home" />
              <Text>Home</Text>
            </Button>
            <Button vertical onPress={()=>{navigation.navigate('FormProduct')}}>
              <Icon name="apps" />
              <Text>Create</Text>
            </Button>
            <Button vertical  onPress={()=>{navigation.navigate('ListApiHome')}}>
              <Icon name="grid" />
              <Text>List</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }

  export default FooterHome