const express = require('express');
const app = express();
const mangaExpressRoute = express.Router();
let MangaSchema = require('../model/manga.model');

// Search route
mangaExpressRoute.route('/search/:key').get(async (req, res) => {
    try {
        let data = await MangaSchema.find({
            "$or": [
                { title: { $regex: req.params.key, $options: 'i' } },
                { author: { $regex: req.params.key, $options: 'i' } },
                { year_written: { $regex: req.params.key } },
                { NumberOfVolumes: { $regex: req.params.key } }
            ]
        });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

mangaExpressRoute.route('/').get((req, res)=> {
    MangaSchema.find((error,data)=>{
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

mangaExpressRoute.route('/manga/:id').get((req, res)=> {
    MangaSchema.findById(req.params.id,(error,data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

mangaExpressRoute.route('/add-manga').post((req, res, next)=> {
    MangaSchema.create(req.body,(error, data)=>{
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

mangaExpressRoute.route('/delete-manga/:id').delete((req, res)=> {
    MangaSchema.findByIdAndRemove(req.params.id,(error,data) => {
        if (error) {
            return next(error)
        } else {
            res.status(200).json({
                msg:data
            })
        }
    })
})


mangaExpressRoute.route('/update-manga/:id').put((req, res)=> {
    MangaSchema.findByIdAndUpdate(req.params.id, {
        $set: req.body,
    },(error,data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data);
            console.log('Manga Deleted successfully!')
        }
    })
})



module.exports = mangaExpressRoute;