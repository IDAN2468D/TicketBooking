import React from 'react'
import { Dimensions, Image, ImageBackground, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import useSeatBooking from '../hooks/useSeatBooking'
import { baseImagePath } from '../api/apicalls';
import LinearGradient from 'react-native-linear-gradient';
import { AppHeader, PriceTotalButton, RadioSeat } from '../components';
import { TouchableOpacity } from 'react-native';
import CustomIcon from '../components/CustomIcon';

const SeatBookingScreen = ({ route, navigation }: any) => {
    const screenWidth = Dimensions.get('window').width;
    const {
        dataArray,
        selectedDateIndex,
        price,
        twoDSeatArray,
        selectTimeIndex,
        timeArray,
        selectSeat,
        BookSeats,
        radioSeatText,
        setSelectedDateIndex,
        setSelectTimeIndex,
    } = useSeatBooking(route, navigation);

    return (
        <ScrollView
            bounces={false}
            showsVerticalScrollIndicator={false}
            className='flex bg-Black'
        >
            <StatusBar translucent backgroundColor={"transparent"} barStyle={"light-content"} />
            <View>
                <ImageBackground
                    style={{ width: "100%", aspectRatio: 2850 / 1727 }}
                    source={{ uri: route.params.BgImage }}
                >
                    <LinearGradient style={{ height: "100%" }} colors={["rgba(0,0,0,0.1)", "#000000"]}>
                        <View className='mx-[30px] my-14'>
                            <AppHeader name="close" header="" action={() => navigation.goBack()} />
                        </View>
                    </LinearGradient>
                </ImageBackground>
                <Text className='text-WhiteRGBA15 text-center text-size_10 font-poppins_regular'>Screen this side</Text>
            </View>
            <View style={{ width: screenWidth - 15 }}>
                <View className='gap-2'>
                    {twoDSeatArray.map((item: any, index: any) => (
                        <View key={`row-${index}`} className='flex-row justify-center gap-4'>
                            {item.map((subitem: any, subindex: any) => {
                                return (
                                    <TouchableOpacity key={subitem.number} onPress={() => {
                                        selectSeat(index, subindex, subitem.number)
                                    }}>
                                        <CustomIcon
                                            name='seat'
                                            className={`text-[24px] text-white 
                                                ${subitem.taken ? "text-Grey" : ""} 
                                                ${subitem.selected ? "text-Orange" : ""}
                                            `}
                                        />
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    ))}
                </View>
                <View className='flex-row-reverse mt-space_32 mx-space_36 justify-between'>
                    {radioSeatText.map((item: any, index: any) => (
                        <RadioSeat key={`radio-${index}`} name={item.name} icon="radio" color={item.color} />
                    ))}
                </View>
            </View>
            <ScrollView
                horizontal
                contentContainerStyle={{ gap: 24 }}
                showsHorizontalScrollIndicator={false}
                className='my-6'
            >
                {dataArray.map((item: any, index: any) => (
                    <TouchableOpacity
                        key={`date-${index}`}
                        onPress={() => setSelectedDateIndex(index)}
                    >
                        <View
                            className={`w-[70] h-[100px] rounded-[100px] justify-center items-center bg-DarkGrey
                                    ${index === 0 ? "ml-6" : index === dataArray.length - 1 ? "mr-6" : ""} 
                                    ${index === selectedDateIndex ? "bg-Orange" : ""}
                                `}>
                            <Text className='font-poppins_medium text-size_24 text-White'>{item.date}</Text>
                            <Text className='font-poppins_regular text-size_12 text-White'>{item.day}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <ScrollView
                horizontal
                contentContainerStyle={{ gap: 24 }}
                showsHorizontalScrollIndicator={false}
                className='mb-space_20'
            >
                {timeArray.map((item: any, index: any) => (
                    <TouchableOpacity
                        key={`time-${index}`}
                        onPress={() => setSelectTimeIndex(index)}
                    >
                        <View
                            className={`py-space_8 border-[1px] border-WhiteRGBA50
                                        px-space_32 rounded-radius_20 bg-DarkGrey justify-center items-center
                                    ${index === 0 ? "ml-6" : index === dataArray.length - 1 ? "mr-6" : ""} 
                                    ${index === selectTimeIndex ? "bg-Orange" : ""}
                                `}>
                            <Text className='font-poppins_regular text-size_14 text-White'>{item}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <View className='mx-space_36 my-space_20'>
                <PriceTotalButton price={price} onPress={BookSeats} />
            </View>
        </ScrollView>
    )
}

export default SeatBookingScreen;