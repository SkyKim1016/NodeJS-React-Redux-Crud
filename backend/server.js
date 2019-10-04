import express from 'express';
import mongodb from 'mongodb';
import bodyParser from 'body-parser';


const app = express();
app.use(bodyParser.json());

const dbUrl = 'mongodb://localhost/crudwithredux';

function validate(data){
    let errors = {};
    if (data.title === '') errors.title = "Can't be empty";
    if (data.cover === '') errors.cover = "Can't be empty" ;
    const isValid = Object.keys(errors).length === 0
    return{errors, isValid};  
}

mongodb.MongoClient.connect(dbUrl, function(err, db){
    
    app.get('/api/games', (req,res) => {
        // setTimeout(() => {
        //     db.db('crudwithredux').collection('games').find({ }).toArray(( err, games) => {
        //         res.json({games})
        // console.log("/************* Backend Server.js  /api/games called ************")
        // console.log(games);
        //     })
        // },2000)

        db.db('crudwithredux').collection('games').find({ }).toArray(( err, games) => {
            res.json({games})
            // console.log("/************* Backend Server.js  /api/games called ************");
            // console.log(games);
        })
    });

    app.post('/api/games', (req, res) => { 
        // console.log(req.body)
        const {errors, isValid} = validate(req.body);

        if(isValid){
            const {title, cover} = req.body;
            db.db('crudwithredux').collection('games').insert({ title, cover }, (err, result) => {
                if(err){
                    res.status(500).json({ errors : {global: "Something went wrong"}});
                } else {
                    res.json({ game: result.ops[0] })
                }
            })
        } else {
            res.status(400).json({ errors })
        }

    })

    app.put('/api/games/:_id', (req, res) => {
        const {errors, isValid} = validate(req.body);
        
        console.log(' /************** Backend called to /api/games/:id ***************')
        console.log('Mongodb.ObjectId : '+new mongodb.ObjectId(req.params._id));

        if(isValid){
            const {title, cover } = req.body;
            db.db('crudwithredux').collection('games').findOneAndUpdate(
                { _id: new mongodb.ObjectId(req.params._id) },
                { $set: {title, cover} },
                { returnOriginal: false },
                (err, result) => {
                    if(err) { res.status(500).json({ errors: {global: err}}); return;}
                    
                    res.json({ game: result.value });
                }
            );
        } else {
            res.status(400).json({ errors }) 
        }
    })

    app.get('/api/games/:_id', (req,res) => {
        db.db('crudwithredux').collection('games').findOne( { _id: new mongodb.ObjectId(req.params._id) } , (err,game) => {
            res.json({ game })
        })
    });

    app.delete('/api/games/:_id', (req,res) => {
        db.db('crudwithredux').collection('games').deleteOne({ _id: new mongodb.ObjectId(req.params._id )}, (err,r) =>{
            if (err) {res.status(500).json({ errors : {global: err}}); return; }

            res.json({});
        })
    })

    app.use((req, res)=>{
        res.status(404).json({
            errors: {
                global: "Still working on it, Please try again later when we impleted it"
            }
        })
    })

    app.listen(8080, ()=> console.log('Server is running on localhost:8080'));

}) 
