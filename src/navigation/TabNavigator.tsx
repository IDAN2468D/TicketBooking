import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FavoritesScreen, HomeScreen, SearchScreen, TicketScreen, UserAccountScreen } from '../screens';
import { TabBarIcon } from '../components';
import useLogin from '../hooks/useLogin';

const Tab = createBottomTabNavigator();

function TabNavigator({ navigation }: any) {
    const { name, photo } = useLogin(navigation);

    return (
        <Tab.Navigator
            initialRouteName='Home'
            screenOptions={{
                tabBarHideOnKeyboard: true,
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#000000',
                    borderTopWidth: 0,
                    height: 10 * 10,
                }
            }}
        >
            <Tab.Screen
                name="User"
                component={UserAccountScreen}
                initialParams={{ name, photo }}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color, focused, size }) => (
                        <TabBarIcon icon="user" focused={focused} />
                    )
                }}
            />
            <Tab.Screen
                name="Ticket"
                component={TicketScreen}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color, focused, size }) => (
                        <TabBarIcon icon="ticket" focused={focused} />
                    )
                }}
            />
            <Tab.Screen
                name="Favorites"
                component={FavoritesScreen}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused }) => (
                        <TabBarIcon icon="favorites" focused={focused} />
                    ),
                }}
            />
            <Tab.Screen
                name="Search"
                component={SearchScreen}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color, focused, size }) => (
                        <TabBarIcon icon="search" focused={focused} />
                    )
                }}
            />
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color, focused, size }) => (
                        <TabBarIcon icon="video" focused={focused} />
                    )
                }}
            />
        </Tab.Navigator>
    );
}

export default TabNavigator;