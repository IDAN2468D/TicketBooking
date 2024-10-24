// hooks/useTicket.ts
import { useState, useEffect } from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';

const useTicket = (initialParams: any) => {
    const [ticketData, setTicketData] = useState(initialParams);
    const [loading, setLoading] = useState(true);

    const fetchTicket = async () => {
        setLoading(true); // Start loading
        try {
            const ticket = await EncryptedStorage.getItem('ticket');
            console.log("Fetched ticket: ", ticket); // Log ticket
            if (ticket !== undefined && ticket !== null) {
                setTicketData(JSON.parse(ticket)); // Update state with fetched ticket
            } else {
                console.log("No ticket found in storage.");
            }
        } catch (error) {
            console.log("Error fetching ticket: ", error);
        } finally {
            setLoading(false); // End loading
        }
    };

    // Effect to fetch ticket data when component mounts or initialParams change
    useEffect(() => {
        fetchTicket(); // Fetch the ticket data
    }, [initialParams]);

    return { ticketData, loading };
};

export default useTicket;
