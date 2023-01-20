import { createContext, useState, useEffect } from 'react';

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [feedback, setFeedback] = useState([]);

    const { REACT_APP_BASE_URL } = process.env

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const fetchFeedback = async () => {
        const response = await fetch(`${REACT_APP_BASE_URL}/feedback?_sort=id&_order=desc`);
        const data = await response.json();
        setFeedback(data);
        setIsLoading(false);
    };


    useEffect(() => {
        fetchFeedback();
    }, [fetchFeedback]);

    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false,
    });

    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit: true,
        });
    };

    const updateFeedback = async (id, updItem) => {
        const response = await fetch(`${REACT_APP_BASE_URL}/feedback/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(updItem)
        });

        const data = await response.json()


        setFeedback(
            feedback.map((item) =>
                item.id === id ? { ...item, ...data } : item
            )
        );
        setFeedbackEdit({
            item: {},
            edit: false,
        });
    };

    const deleteFeedback = async (id) => {
        if (window.confirm('Are you sure you want to delete?')) {
            await fetch(`${REACT_APP_BASE_URL}/feedback/${id}`, { method: 'DELETE' });
            setFeedback(feedback.filter((item) => item.id !== id));
        }
    };

    const addFeedback = async (newFeedback) => {
        const response = await fetch(`${REACT_APP_BASE_URL}/feedback`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(newFeedback),
        });
        const data = await response.json();
        setFeedback([data, ...feedback]);
    };

    return (
        <FeedbackContext.Provider
            value={{
                feedback,
                deleteFeedback,
                addFeedback,
                editFeedback,
                feedbackEdit,
                updateFeedback,
                isLoading,
            }}
        >
            {children}
        </FeedbackContext.Provider>
    );
};

export default FeedbackContext;
