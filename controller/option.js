const Async = require("../util/Async");
const Option = require("../model/option");
const AppError = require("../util/AppError");

exports.deleteOption = Async(async (req, res, next) => {
  let option = await Option.findById(req.params.id);
  if (option.votes > 0)
    return next(
      new AppError(`can't delte option it's has been voted by people`, 400)
    );

  await Option.findByIdAndDelete(req.params.id);

  res.status(200).json({
    message: "deleted",
    data: {
      option,
    },
  });
});

exports.addVote = Async(async (req, res, next) => {
  const { id } = req.params;
  const option = await Option.findById(id);
  option.votes += 1;
  option.save();
  res.status(203).json({
    message: "vote added",
    data: {
      option,
    },
  });
});
