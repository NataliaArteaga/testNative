import React, { Component, useEffect, useState } from 'react';
import { Image, FlatList,View, ToastAndroid } from 'react-native';
import { Container, Header, Content, Card, CardItem, ListItem, Text, Button, Icon, Left, Body, Right } from 'native-base';
import FooterHome from '../components/FooterHome'
import {getListApi,favorites} from '../../Actions/listApiActions'
import { connect } from 'react-redux'



const ListApiSelected = ({navigation, getListApi, listApi, favorites, route, isLoadingListApi}) => {

  useEffect(() => {
    getListApi()
  }, [])
  
  
  const renderItem = ({ item }) => (
      
<ListItem>
<Card style={{flex: 0}}>

                <CardItem>
                  <Image source={{uri: 'http://image.tmdb.org/t/p/original/'+item.backdrop_path}} style={{height: 200, width: 300, flex: 1}}/>
                </CardItem>
                <CardItem>
                 <Text style={{fontWeight:"bold"}}>{item.title}</Text>
                </CardItem>
                <CardItem>
                <Text>
                      {item.overview}
                    </Text>
                </CardItem>
                  <Right/>
                  <Left></Left>
              </Card>
              </ListItem>
  )
  if(isLoadingListApi){
    return(
      <View>
      <Text>Aún no hay favorites</Text>
      </View>
    )
  }
  else{
        return (

            <FlatList
               data = {route.params ? Object.values(route.params.listFavorites) : []}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
            >
            </FlatList>
        );
      }
    }
      
const mapStateToProps = (state) => {
    return {
      listApi: state.listApi.listApi,  
      isLoadingListApi:state.listApi.isLoadingListApi
    }
  }
  
  
  export default connect(mapStateToProps, { getListApi, favorites })(ListApiSelected) 