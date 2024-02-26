import Toaster from '@components/toaster/toaster';
import {createContext, useState} from 'react';

type Feedback = {
  type: 'error' | 'success';
  message: string;
};
export interface FeedbackContextType {
  feedback: Feedback | null;
  setFeedback: React.Dispatch<React.SetStateAction<Feedback | null>>;
}
export const FeedbackContext = createContext<FeedbackContextType>({
  feedback: null,
  setFeedback: () => {},
});

interface FeedbackProviderProps {
  children: React.ReactNode;
}
export const FeedbackProvider: React.FC<FeedbackProviderProps> = ({
  children,
}) => {
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const handleClose = () => {
    setFeedback(null);
  };
  return (
    <FeedbackContext.Provider value={{feedback, setFeedback}}>
      {feedback && (
        <Toaster
          open={!!feedback}
          handleClose={handleClose}
          message={feedback.message}
          severity={feedback.type}
        />
      )}
      {children}
    </FeedbackContext.Provider>
  );
};
