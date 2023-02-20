import mongoose from "mongoose";

const { Schema } = mongoose;

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    rented: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

bookSchema.index({ title: "text" });

const bookModel = mongoose.model("Book", bookSchema);

export { bookSchema, bookModel };
