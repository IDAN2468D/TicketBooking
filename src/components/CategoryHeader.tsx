import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CategoryHeader = (props: any) => {
    return (<Text className={props.className}>{props.title}</Text>)
}

export default CategoryHeader;