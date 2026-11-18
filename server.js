import 'dotenv/config';
import express from 'express';
import movieRoutes  from './routes/movieRoutes.js';

const app = express();
const port = 3001;

//middleware (importand for post, put, and patch requests)
app.use(express.json());

//post routes
app.use("/api/movieRoutes", movieRoutes);

app.get('/api/search', (req, res) => {
    res.body.movieController('Hi!')
});
