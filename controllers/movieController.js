import axios from 'axios';


export const searchMovies = async (req, res) => {

    const title = req.query.title;

    if (!title) {
        return res.status(400).json({ error: "Title query parameter is required" })
    }
    try {
        const response = await axios.get('http://www.omdbapi.com/', { params: { s: title, apikey: process.env.OMDB_API_KEY } });
        res.json(response.data);
    } catch (e) {
        if (e.response) {
            res.status(e.response.status).json({ error: '400 Bad Request' })
        } else {
            res.status(500).json({ message: '500 Internal Server Error' })
        }
    }



}

export const getMovieDetails = async (req, res) => {

    const id = req.params.id;

    try {
        const response = await axios.get('http://www.omdbapi.com/', { params: { i: id, apikey: process.env.OMDB_API_KEY } });
        res.json(response.data);
    } catch (e) {
        if (e.response) {
            res.status(e.response.status).json({ error: '400 Bad Request' })
        } else {
            res.status(500).json({ message: '500 Internal Server Error' })
        }
    }



}