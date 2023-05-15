const Async = require("../util/Async");
const Question = require("../model/question");
const Option = require("../model/option");
const AppError = require("../util/AppError");

// get question
exports.getQuestion = Async(async (req, res, next) => {
  const { id } = req.params;
  const question = await Question.findById(id).populate({
    path: "options",
    select: "option votes link_to_vote",
  });
  res.status(200).json({
    message: "success",
    question,
  });
});

// create question
exports.createQuestion = Async(async (req, res, next) => {
  const { question } = req.body;

  const newQuestion = await Question.create({ question });

  res.status(201).json({
    message: "success",
    data: {
      question: newQuestion,
    },
  });
});

// delete question
exports.deleteQuestion = Async(async (req, res, next) => {
  const { id } = req.params;
  let question = await Question.findById(id);
  question = await question.populate({
    path: "options",
  });
  const hasVotes = question.options.find((option) => option.votes > 0);
  if (hasVotes) {
    return next(
      new AppError(
        `this question can't be deleted. one of it's option has already got votes`,
        400
      )
    );
  }
  await Option.deleteMany({ q_id: id });
  await Question.findByIdAndDelete(id);
  res.status(200).json({
    message: "delted",
    data: {
      question,
    },
  });
});

// add option to a question
exports.addOption = Async(async (req, res, next) => {
  const { id } = req.params;
  const question = await Question.findById(id);
  const option = await Option.create({ option: req.body.option });
  question.options.push(option);
  question.save();
  option.link_to_vote = `http://localhost:8000/api/v1/options/${option._id}/add_vote`;
  option.q_id = question._id;
  option.save();
  // send response back
  res.status(201).json({
    message: "success",
    option,
  });
});

// get all question
exports.allQuestions = Async(async (req, res, next) => {
  const questions = await Question.find().select("question");
  res.status(200).json({
    message: "success",
    data: {
      results: questions.length,
      questions,
    },
  });
});
