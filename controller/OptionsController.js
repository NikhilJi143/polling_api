const Option = require('../models/options');
const Question = require('../models/questions');

// Create options
module.exports.create = async function (req, res) {
    try {
        // Create a new option based on the request data
        const opt = await Option.create({
            option: req.body.content,
            question: req.params.id,
        });

        // Create a URL for voting on this option
        opt.add_vote = `http://localhost:3000/api/v1/options/${opt._id}/add_vote`;
        await opt.save();

        // Find the question and add the new option to its list of options
        const ques = await Question.findById(req.params.id);
        if (ques) {
            ques.options.push(opt);
            await ques.save();
            res.send(ques);
        } else {
            res.send('Question does not exist');
        }
    } catch (error) {
        // Handle errors and send an internal server error response
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
};

// Add votes to an option
module.exports.add_vote = async function (req, res) {
    try {
        // Find the option by its ID and increment its vote count
        const opt = await Option.findByIdAndUpdate(req.params.id, { $inc: { vote: 1 } });
        if (opt) {
            await opt.save();
            res.send(opt);
        } else {
            res.send('Option does not exist');
        }
    } catch (error) {
        // Handle errors and send an internal server error response
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
};

// Delete an option
module.exports.delete = async function (req, res) {
    try {
        // Find the option by its ID
        const opt = await Option.findById(req.params.id);
        if (opt) {
            const quesId = opt.question;
            // Find the associated question and remove the option from its list of options
            const ques = await Question.findByIdAndUpdate(quesId, { $pull: { options: req.params.id } });
            // Delete the option itself
            await Option.findByIdAndDelete(req.params.id);
            res.send('Option deleted successfully');
        } else {
            res.send('Option does not exist');
        }
    } catch (error) {
        // Handle errors and send an internal server error response
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
};
