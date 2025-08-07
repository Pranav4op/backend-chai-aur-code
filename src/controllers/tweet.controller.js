import mongoose, { isValidObjectId } from "mongoose";
import { Tweet } from "../models/tweet.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createTweet = asyncHandler(async (req, res) => {
  //TODO: create tweet
});

const getUserTweets = asyncHandler(async (req, res) => {
  // TODO: get user tweets
});

const updateTweet = asyncHandler(async (req, res) => {
  //TODO: update tweet
  const { content } = req.body;
  const { tweetId } = req.params;
  if (!content) {
    throw new ApiError(400, "Tweet can't be empty");
  }
  tweetExists = await Tweet.findById(tweetId);
  if (!tweetExists) {
    throw new ApiError(400, "No tweet present");
  }
  if (Tweet.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(400, "Can't edit other user tweets");
  }
  const updatedTweet = await Tweet.findByIdAndUpdate(
    tweetId,
    {
      $set: {
        content,
      },
    },
    {
      new: true,
    }
  );
  if (!updatedTweet) {
    throw new ApiError(500, "Tweet not updated, Something went wrong");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, updatedTweet, "Tweet updated successfully"));
});

const deleteTweet = asyncHandler(async (req, res) => {
  //TODO: delete tweet
  const { tweetId } = req.params;
  const tweetExists = await Tweet.findById(tweetId);
  if (!tweetExists) {
    throw new ApiError(400, "Tweet doesn't exist");
  }
  if (Tweet.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(400, "Can't edit other user tweets");
  }
  const deletedTweet = await Tweet.findByIdAndDelete(tweetId);
  if (!deletedTweet) {
    throw new ApiError(500, "Unable to delete tweet");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, deletedTweet, "Deleted Tweet successfully"));
});

export { createTweet, getUserTweets, updateTweet, deleteTweet };
