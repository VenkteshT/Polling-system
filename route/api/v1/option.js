const router = require("express").Router();
const optionController = require("../../../controller/option");

// (To delete an option)
router.post("/:id/delete", optionController.deleteOption);

// (To increment the count of votes)
router.get("/:id/add_vote", optionController.addVote);

module.exports = router;
