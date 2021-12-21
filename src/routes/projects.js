var express = require('express');
var router = express.Router();
const Project = require('../models/project')

router.get('/', (req, res) => {
    Project.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err)=>{
            console.log(err)
        })
    
});

module.exports = router;