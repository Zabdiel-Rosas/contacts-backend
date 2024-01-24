import mongoose from 'mongoose'

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please add the username'],
    },
    email: {
      type: String,
      required: [true, 'Please add the user email address'],
      unique: [true, 'Another user has registered this email'],
    },
    password: {
      type: String,
      required: [true, 'Please add the user password'],
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('User', userSchema)
