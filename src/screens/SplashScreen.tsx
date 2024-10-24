import React, { useEffect, useRef } from "react";
import { Animated, Easing, StatusBar, View } from "react-native";
import LottieView from "lottie-react-native";

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

export default function SplashScreen({ navigation }: any) {
    const animationProgress = useRef(new Animated.Value(0));

    useEffect(() => {
        Animated.timing(animationProgress.current, {
            toValue: 1,
            duration: 4500,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start();

        const timeout = setTimeout(() => {
            navigation.navigate('Onboarding');
        }, 4500);

        return () => clearTimeout(timeout);
    }, [navigation]);

    return (
        <View className="flex-1 bg-Black">
            <StatusBar translucent backgroundColor={"transparent"} barStyle={"light-content"} />
            <AnimatedLottieView
                source={require("../assets/lottiefiles/Tickets.json")}
                progress={animationProgress.current}
                style={{ width: "100%", height: "100%" }}
            />
        </View>
    );
}
