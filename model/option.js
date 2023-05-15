const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema(
  {
    q_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    },
    option: {
      type: String,
      required: true,
    },
    votes: {
      type: Number,
      default: 0,
    },
    link_to_vote: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Option = mongoose.model("Option", optionSchema);

module.exports = Option;
