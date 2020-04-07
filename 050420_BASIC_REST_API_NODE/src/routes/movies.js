const { Router } = require("express");
const movies = require("../sample.json");
const _ = require("underscore");
const router = Router();

//Obteniendo todas las peliculas
router.get("/", (req, res) => {
    res.json(movies);
});

//Guardando una pelicula
router.post("/", (req, res) => {
    const { title, director, year, rating } = req.body;

    if (title && director && year && rating) {
        const id = movies.length + 1;
        const newMovie = { id, ...req.body };
        movies.push(newMovie);
        res.status(201).json({ message: "Datos Completos" });
    } else {
        res.json({ message: "Datos incompletos" });
    }
});

//Eliminando una pelicula
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    _.each(movies, (movie, index) => {
        if (movie.id == id) {
            movies.splice(index, 1);
        }
    });
    res.json(movies);
});

//Modificando pelicula
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { title, director, year, rating } = req.body;
    if (title && director && year && rating) {
        _.each(movies,(movie,ind)=>{
            if(movie.id==id){
                movie.title = title;
                movie.director = director;
                movie.year = year;
                movie.rating = rating;
            }
        });
        res.json(movies);
    }else{
        res.status(500).json({message:"Pelicula no encontrada"});
    }
});

module.exports = router;
