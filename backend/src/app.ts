import express from 'express';
import cors from 'cors';
import router from './routes/index';

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));


app.use(express.json());
app.get('/', (req, res) => {
    res.send('Backend is running');
});

// Routes API
app.use('/api', router);

export default app;
