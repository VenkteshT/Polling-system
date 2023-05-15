const router = require("express").Router();
const questionController = require("../../../controller/question");

// see all questions
router.get("/", questionController.allQuestions);

// (To create a question)
router.post("/create", questionController.createQuestion);

// (To add options to a specific question)
router.post("/:id/options/create", questionController.addOption);

// (To delete a question)
router.post("/:id/delete", questionController.deleteQuestion);

// (To view a question and it’s options)
router.get("/:id", questionController.getQuestion);

module.exports = router;
