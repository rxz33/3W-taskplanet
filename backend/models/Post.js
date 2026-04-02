import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: String,
    username: String,
    text: String,
    image: String,
    likes: [String],
    comments: [
      {
        username: String,
        comment: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);