import mongoose from "mongoose";
import { Comment } from "../models/comment.model.js";
import { ApiErrors } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Video } from "../models/video.model.js";

const getVideoComments = asyncHandler(async (req, res) => {
  //TODO: get all comments for a video
  const { videoId } = req.params;
  const { page = 1, limit = 10 } = req.query;
});

const addComment = asyncHandler(async (req, res) => {
  // TODO: add a comment to a video
  const { content } = req.body;
  const { videoId } = req.params;

  if (!content) {
    throw new ApiErrors(400, "Comment is required to update");
  }

  if (!mongoose.Types.ObjectId.isValid(videoId)) {
    throw new ApiErrors(400, "Invalid video ID format");
  }

  const video = await Video.findById(videoId);

  if (!video) {
    throw new ApiErrors(404, "Video not found");
  }
  const comment = await Video.create({
    content,
    video: videoId,
    owner: req.user._id,
  });
  if (!comment) {
    throw new ApiErrors(500, "Something went wrong while updating comment");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, content, "Comment added successfully"));
});

const updateComment = asyncHandler(async (req, res) => {
  // TODO: update a comment
  const { content } = req.body;
  const { commentId } = req.params;

  if (!content) {
    throw new ApiErrors(404, "Bad Request - Comment cannot be empty");
  }

  const comment = await Comment.findById(commentId);

  if (!comment) {
    throw new ApiErrors(400, "Comment not found");
  }
  const updatedComment = await Comment.findByIdAndUpdate(
    commentId,
    {
      $set: {
        content,
      },
    },
    {
      new: true,
    }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, updatedComment, "UPdated comment successfully"));
});

const deleteComment = asyncHandler(async (req, res) => {
  // TODO: delete a comment
});

export { getVideoComments, addComment, updateComment, deleteComment };
