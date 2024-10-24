import { useReducer, useEffect, useCallback } from 'react';
import { ToastAndroid } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';

// Initial state for the seat booking
const initialState = {
    dataArray: [],
    selectedDateIndex: undefined,
    price: 0,
    twoDSeatArray: [],
    selectedSeatArray: [],
    selectTimeIndex: undefined,
    selectedRowIndex: -1,
    movieHalls: {}, // Added a new property to store the hall numbers for each movie
};

// Reducer function to manage state updates based on actions
const reducer = (state: any, action: any) => {
    switch (action.type) {
        case 'SET_DATA_ARRAY':
            return { ...state, dataArray: action.payload };
        case 'SET_SELECTED_DATE_INDEX':
            return { ...state, selectedDateIndex: action.payload };
        case 'SET_PRICE':
            return { ...state, price: action.payload };
        case 'SET_SEAT_ARRAY':
            return { ...state, twoDSeatArray: action.payload };
        case 'SET_SELECTED_SEAT_ARRAY':
            return { ...state, selectedSeatArray: action.payload };
        case 'SET_SELECT_TIME_INDEX':
            return { ...state, selectTimeIndex: action.payload };
        case 'SET_SELECTED_ROW_INDEX':
            return { ...state, selectedRowIndex: action.payload };
        case 'SET_MOVIE_HALL': // Action to update the hall number for a movie
            return {
                ...state,
                movieHalls: {
                    ...state.movieHalls,
                    [action.payload.movieIndex]: action.payload.hallNumber // Update the hall number for the movie
                }
            };
        default:
            return state;
    }
};

// Text and color mapping for seat statuses
const radioSeatText = [
    {
        id: 1,
        name: "Available",
        color: "#FF5524"
    },
    {
        id: 2,
        name: "Taken",
        color: "#333333"
    },
    {
        id: 3,
        name: "Selected",
        color: "#FFFFFF"
    },
];

// Custom hook for seat booking logic
const useSeatBooking = (route: any, navigation: any) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // Array of show times
    const timeArray: string[] = [
        "10:30",
        "12:30",
        "14:30",
        "15:00",
        "19:30",
        "21:00",
        "22:30",
    ];

    // Function to generate the upcoming dates for the next week
    const generateDate = () => {
        const date = new Date();
        let weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        let weekdays = [];
        for (let i = 0; i < 7; i++) {
            let tempDate = {
                date: new Date(date.getTime() + i * 24 * 60 * 60 * 1000).getDate(),
                day: weekday[new Date(date.getTime() + i * 24 * 60 * 60 * 1000).getDay()],
            };
            weekdays.push(tempDate);
        }
        console.log("Generated Dates: ", weekdays);
        return weekdays;
    };

    // Function to generate a 2D array representing seat availability in the cinema hall
    const generateSeats = () => {
        let numRow = 8; // Number of rows
        let numColumn = 3; // Initial number of columns
        let rowArray = [];
        let start = 1; // Starting seat number
        let reachnine = false;

        for (let i = 0; i < numRow; i++) {
            let columnArray = [];
            for (let j = 0; j < numColumn; j++) {
                let seatObject = {
                    number: start,
                    taken: Boolean(Math.round(Math.random())), // Randomly assign if the seat is taken
                    selected: false,
                };
                columnArray.push(seatObject);
                start++;
            }
            if (i === 3) {
                numColumn += 2; // Increase columns after row 3
            }
            if (numColumn < 9 && !reachnine) {
                numColumn += 2; // Increase columns until reaching 9
            } else {
                reachnine = true;
                numColumn -= 2; // Decrease columns after reaching 9
            }
            rowArray.push(columnArray);
        }
        return rowArray; // Return the generated seat layout
    };

    // Function to toggle the selection of a seat and update the state accordingly
    const selectSeat = useCallback((rowIndex: number, subindex: number, num: number) => {
        if (!state.twoDSeatArray[rowIndex][subindex].taken) {
            let array: number[] = [...state.selectedSeatArray];
            let temp = [...state.twoDSeatArray];
            temp[rowIndex][subindex].selected = !temp[rowIndex][subindex].selected; // Toggle seat selection
            if (!array.includes(num)) {
                array.push(num); // Add seat number if not already selected
            } else {
                const tempindex = array.indexOf(num);
                if (tempindex > -1) {
                    array.splice(tempindex, 1); // Remove seat number if already selected
                }
            }
            dispatch({ type: 'SET_SELECTED_SEAT_ARRAY', payload: array });
            dispatch({ type: 'SET_PRICE', payload: array.length * 5.0 }); // Update price based on selected seats
            dispatch({ type: 'SET_SEAT_ARRAY', payload: temp });
            dispatch({ type: 'SET_SELECTED_ROW_INDEX', payload: rowIndex });
        }
    }, [state.selectedSeatArray, state.twoDSeatArray]);

    // Function to get the hall number for a movie based on its index
    const getMovieHall = useCallback((movieIndex: number) => {
        const hallNumber = state.movieHalls[movieIndex] || 1; // Default to 1 if no halls registered
        return hallNumber;
    }, [state.movieHalls]);

    // Function to handle the booking of seats and storing the booking details
    const BookSeats = useCallback(async () => {
        if (
            state.selectedSeatArray.length > 0 &&
            timeArray[state.selectTimeIndex] &&
            state.dataArray[state.selectedDateIndex] &&
            state.selectedRowIndex >= 0
        ) {
            try {
                await EncryptedStorage.setItem("ticket", JSON.stringify({
                    seatArray: state.selectedSeatArray,
                    time: timeArray[state.selectTimeIndex],
                    date: state.dataArray[state.selectedDateIndex],
                    row: state.selectedRowIndex,
                    ticketImage: route.params.PosterImage,
                    movieIndex: route.params.movieIndex,
                    hallNumber: getMovieHall(route.params.movieIndex) // Add hall number to the stored data
                }));

                navigation.navigate("Ticket", {
                    seatArray: state.selectedSeatArray,
                    time: timeArray[state.selectTimeIndex],
                    date: state.dataArray[state.selectedDateIndex],
                    row: state.selectedRowIndex,
                    ticketImage: route.params.PosterImage,
                    movieIndex: route.params.movieIndex,
                    hallNumber: getMovieHall(route.params.movieIndex) // Pass hall number to the Ticket screen
                });
            } catch (error) {
                console.log("Something went wrong while storing in BookState Function", error);
                ToastAndroid.showWithGravity("Error while booking the seats. Please try again.",
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM
                );
            }
        } else {
            ToastAndroid.showWithGravity("Please Select Seats, Date and Time of Show",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
            );
        }
    }, [state, timeArray, navigation, route.params, getMovieHall]);

    // useEffect to initialize the data array and seats when the component mounts
    useEffect(() => {
        dispatch({ type: 'SET_DATA_ARRAY', payload: generateDate() });
        dispatch({ type: 'SET_SEAT_ARRAY', payload: generateSeats() });

        const movieIndex = route.params.movieIndex; // Assume the movie index comes from route parameters
        const hallNumber = Math.floor(Math.random() * 5) + 1; // Example: random hall number between 1 and 5
        dispatch({ type: 'SET_MOVIE_HALL', payload: { movieIndex, hallNumber } });
    }, [route.params.movieIndex]); // Add movieIndex as a dependency

    return {
        ...state,
        timeArray,
        selectSeat,
        radioSeatText,
        BookSeats,
        getMovieHall, // Return the function to get hall number
        setSelectedDateIndex: (index: number) => dispatch({ type: 'SET_SELECTED_DATE_INDEX', payload: index }),
        setSelectTimeIndex: (index: number) => dispatch({ type: 'SET_SELECT_TIME_INDEX', payload: index }),
    };
};

export default useSeatBooking;
