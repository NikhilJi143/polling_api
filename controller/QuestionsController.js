const Question = require('../models/questions');
const Option = require('../models/options');

// Create a new question
module.exports.create = async function (req, res) {
    try {
        // Create a new question based on the request data
        const question = await Question.create(req.body);
        console.log(question);
         
        res.send(question);
    } catch (error) {
        console.error('Error:', error); 
        res.status(500).send('Internal Server Error'); 
    }
};

// Retrieve and show details of a question
module.exports.showDetails = async function (req, res) {
    try {
        // Find a question by its ID and populate its associated options
        const question = await Question.findById(req.params.id).populate('options');
        if (question) {
            res.send(question); 
        } else {
            res.send('Question does not exist'); 
        }
    } catch (error) {
        console.error('Error:', error); 
        res.status(500).send('Internal Server Error'); 
    }
};

// Delete a question and its associated options
module.exports.deleteQues = async function (req, res) {
    try {
        // Find a question by its ID
        const question = await Question.findById(req.params.id);
        if (question) {
            // Delete the question by its ID
            await Question.deleteOne({ _id: req.params.id });
            // Delete all options associated with the question
            await Option.deleteMany({ question: req.params.id });
            res.send('Question deleted'); 
        } else {
            res.send('Question does not exist'); 
        }
    } catch (error) {
        console.error('Error:', error); 
        res.status(500).send('Internal Server Error'); 
    }
};
