import React, { Component, useEffect, useState } from 'react';
import { Image, FlatList, View } from 'react-native';
import { Container, Header, Content, Card, CardItem, Footer, FooterTab, ListItem,Item,Input, Text, Button, Icon, Left, Body, Right } from 'native-base';
import FooterHome from '../components/FooterHome'
import {getListApi,favorites} from '../../Actions/listApiActions'
import { connect } from 'react-redux'



const listApiHome = ({getListApi, navigation,favorites,isLoadingListApi,listApi}) => {
  let [listFavorite, setListFavorite] = useState({})
  useEffect(() => {
    getListApi()
  }, [])
  

  const renderItem = ({ item }) => (
    <View>
      
<ListItem>
<Card style={{flex: 0}}>

                <CardItem>
                  <Body>
                  <Image source={{uri: 'http://image.tmdb.org/t/p/original/'+item.backdrop_path}} style={{height: 200, width: 300, flex: 1}}/>
                  </Body>
                </CardItem>
                <CardItem>
                 <Text style={{fontWeight:"bold"}}>{item.title}</Text>
                </CardItem>
                <CardItem>
                <Text>
                      {item.overview}
                    </Text>
                </CardItem>
                <CardItem footer style={{ alignSelf:'center'}} >
                          {listFavorite[item.id.toString()] ?
                  <Button success style={{marginRight:5}} rounded  onPress={() =>
                    setListFavorite(prevState => {
                      delete prevState[item.id.toString()] 
                      return { ...prevState }
                    })}><Text>favorite</Text></Button>
                  :
                  <Button primary style={{marginRight:5, alignSelf:'center'}} rounded  onPress={() =>
                    setListFavorite(prevState => {
                      prevState[item.id.toString()] = item
                      return { ...prevState }
                    })}><Text>add favorite</Text></Button>}
                </CardItem>
              </Card>
              </ListItem>
              </View>
  )
        return ( 
        <View>
          
          < Button transparent warning style={{ marginTop:12, alignSelf:'center' }} onPress={()=>{navigation.navigate('ListApiSelected', {listFavorites:listFavorite})}}><Text>Go favorites</Text></Button>
            <FlatList
            data={listApi}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
            >
            </FlatList>
            </View>

        );
      }

      
const mapStateToProps = (state) => {
    return {
      listApi: state.listApi.listApi, 
      isLoadingListApi: state.listApi.isLoadingListApi
    }
  }
  
 
  
  export default connect(mapStateToProps, { getListApi,favorites })(listApiHome) // connect hace que map obtenga como parametro el estado