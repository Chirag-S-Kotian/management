import { Request, Response } from 'express';

type Feedback = {
  name: string;
  feedback: string;
};

let feedbacks: Feedback[] = [];

export const getFeedbacks = (req: Request, res: Response): void => {
  res.json(feedbacks);
};

export const submitFeedback = (req: Request, res: Response): void => {
  const { name, feedback } = req.body;

  if (!name || !feedback) {
    res.status(400).json({ message: 'Name and feedback are required' });
    return;
  }

  const newFeedback = { name, feedback };
  feedbacks.unshift(newFeedback); // Add new feedback at the beginning of the array
  res.status(201).json(newFeedback); // Return the newly added feedback
};

export const updateFeedback = (req: Request, res: Response): void => {
  const index = parseInt(req.params.index, 10); // Convert index to number
  const { name, feedback } = req.body;

  if (isNaN(index) || index < 0 || index >= feedbacks.length) {
    res.status(404).json({ message: 'Feedback not found' });
    return;
  }

  if (!name || !feedback) {
    res.status(400).json({ message: 'Name and feedback are required' });
    return;
  }

  feedbacks[index] = { name, feedback };
  res.json({ message: 'Feedback updated', updatedFeedback: feedbacks[index] });
};

export const deleteFeedback = (req: Request, res: Response): void => {
  const index = parseInt(req.params.index, 10); // Convert index to number

  if (isNaN(index) || index < 0 || index >= feedbacks.length) {
    res.status(404).json({ message: 'Feedback not found' });
    return;
  }

  feedbacks.splice(index, 1);
  res.json({ message: 'Feedback deleted' });
};
