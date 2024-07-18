import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Cards from './card-container/cards'
import Transactions from './card-container/transactions'

const CardMain = ({isOpen, setIsOpen, data}) => {
  
  return (
    <View>
      <Cards isOpen={isOpen} setIsOpen={setIsOpen} cardData={data}/>
      <Transactions/>
    </View>
  )
}

export default CardMain

const styles = StyleSheet.create({})