// app.ts
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { getFeedbacks, submitFeedback, updateFeedback, deleteFeedback } from './controllers';

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Use the CORS middleware

const limiter = rateLimit({
  windowMs: 10 * 1000, // 10 seconds
  max: 1, // limit each IP to 1 request per windowMs
  message: 'You can only submit feedback once every 10 seconds',
});

app.get('/feedback', getFeedbacks);
app.post('/feedback', limiter, submitFeedback);
app.put('/feedback/:index', updateFeedback); // Route for updating feedback
app.delete('/feedback/:index', deleteFeedback); // Route for deleting feedback

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
