type Feedback = {
    name: string;
    feedback: string;
  };
  
  const feedbacks: Feedback[] = [];
  
  export const getAllFeedback = () => feedbacks;
  
  export const addFeedback = (feedback: Feedback) => {
    feedbacks.push(feedback);
  };
  