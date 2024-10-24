import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CategoryHeader = (props: any) => {
    return (<Text className='font-poppins_semibold text-size_20 text-White px-space_36 py-space_28'>{props.title}</Text>)
}

export default CategoryHeader;