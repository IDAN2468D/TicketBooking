import React from 'react';
import { ActivityIndicator, Image, ImageBackground, ScrollView, View, Text } from 'react-native';
import { AppHeader } from '../components';
import LinearGradient from 'react-native-linear-gradient';
import CustomIcon from '../components/CustomIcon';
import useTicket from '../hooks/useFetchTicket';

const TicketScreen = ({ route, navigation }: any) => {
    const { ticketData, loading } = useTicket(route.params);

    if (loading) {
        return <ActivityIndicator size="large" color="#FFFFFF" />;
    }

    if (!ticketData) {
        return (
            <View className='flex flex-1 bg-Black'>
                <View className='mx-[30px] my-14'>
                    <AppHeader showButton={true} name="close" header="My Tickets" action={() => navigation.goBack()} />
                </View>
            </View>
        );
    }

    return (
        <ScrollView className='flex bg-Black'>
            <View className='mx-space_16 mt-[50px]'>
                <AppHeader showButton={true} name="close" header="My Tickets" action={() => navigation.goBack()} />
            </View>
            {/* Ticket information */}
            <View className='mt-space_28 justify-center'>
                <ImageBackground
                    source={{ uri: ticketData.ticketImage }}
                    className='self-center w-[300px] aspect-[200/300] rounded-t-radius_25 overflow-hidden justify-end'
                    resizeMode="cover"
                >
                    <LinearGradient
                        style={{ height: "70%" }}
                        colors={["rgba(255,85,36,0)", "#FF5524"]}
                    />
                    <View className='absolute bottom-[-40px] left-[-40px] h-[80px] w-[80px] rounded-[80px] bg-Black' />
                    <View className='absolute bottom-[-40px] right-[-40px] h-[80px] w-[80px] rounded-[80px] bg-Black' />
                </ImageBackground>
                <View className='border-t-Black border-t-[3px] bg-Orange border-dashed w-[300px] self-center' />
                <View className="w-[300px] bg-Orange items-center self-center py-space_20 rounded-b-radius_25">
                    <View className='absolute top-[-40px] left-[-40px] h-[80px] w-[80px] rounded-[80px] bg-Black' />
                    <View className='absolute top-[-40px] right-[-40px] h-[80px] w-[80px] rounded-[80px] bg-Black' />
                    <View className="flex-row-reverse items-end gap-space_36">
                        <View className="items-center">
                            <Text className="text-size_24 font-poppins_medium text-White">{ticketData.date.date}</Text>
                            <Text className="text-size_14 text-White font-poppins_regular">{ticketData.date.day}</Text>
                        </View>
                        <View className="items-center">
                            <CustomIcon className="text-[26px] text-White" name="clock" />
                            <Text className="text-size_14 text-White mt-2 text-center font-poppins_regular">{ticketData.time}</Text>
                        </View>
                    </View>
                    <View className="flex-row-reverse items-center gap-space_36 justify-center">
                        <View className="items-center">
                            <Text className="text-White font-poppins_medium">Hall</Text>
                            <Text className="text-White text-size_14">{ticketData.hallNumber}</Text>
                        </View>
                        <View className="items-center py-space_20">
                            <Text className="text-White font-poppins_medium">Row</Text>
                            <Text className="text-White text-size_14">{ticketData.row}</Text>
                        </View>
                        <View className="items-center">
                            <Text className="text-White font-poppins_medium">Seats</Text>
                            <Text className="text-White text-size_14">
                                {ticketData.seatArray.slice(0, 4).map((item: any, index: number, arr: any) => (
                                    item + (index === arr.length - 1 ? "" : ", ")
                                ))}
                            </Text>
                        </View>
                    </View>
                    <Image source={require("../assets/image/barcode.png")} className="" />
                </View>
            </View>
        </ScrollView>
    );
}

export default TicketScreen;