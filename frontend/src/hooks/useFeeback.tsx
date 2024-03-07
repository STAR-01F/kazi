import {useContext} from 'react';
import {FeedbackContext, FeedbackContextType} from '@context/Feedback';

export const useFeedback = (): FeedbackContextType => {
  const feedbackContext = useContext(FeedbackContext);
  if (!feedbackContext) {
    throw new Error('useFeeback must be used within an FeedbackProvider');
  }
  return feedbackContext;
};
