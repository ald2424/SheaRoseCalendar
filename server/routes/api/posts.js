const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//Get Posts
    //the '/' represents '/api/posts' because we directed it there in index.js with app.use('/api/posts', posts)
router.get('/',  async (req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
});

router.get('/:date',  async (req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({date: req.params.date}).toArray());
});

//Add Post
router.post('/', async (req, res) =>{
    const posts = await loadPostsCollection();
    await posts.insertOne({
        types: req.body.types,
        details: req.body.details,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        date: req.body.date,
        instructor: req.body.instructor,
        repeat: req.body.repeat,
        repeatUntil: req.body.repeatUntil,
        start: req.body.start,
        end: req.body.end,
        notes: req.body.notes
        
    });
    //status 201 means everything worked and something was created
    res.status(201).send();
})
//Update Post

//Delete Post
router.delete('/:id', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.deleteOne({_id:new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
})


async function loadPostsCollection(){
    const client = await mongodb.MongoClient.connect("mongodb+srv://abby:AbbyD123@shearoseplanner.qip91.mongodb.net/SheaRosePlanner?retryWrites=true&w=majority", {
        useNewUrlParser: true
    })

    return client.db('SheaRosePlanner').collection('posts');
};
module.exports = router;

