//@desc Register User
//@route POST /api/users/register
//@access public
const registerUser = (req, res) => {
  res.status(201).json({ message: 'Register User' })
}

//@desc Login User
//@route POST /api/users/login
//@access public
const loginUser = (req, res) => {
  res.status(201).json({ message: 'Login User' })
}

//@desc Current User Information
//@route GET /api/users/current
//@access private
const currentUser = (req, res) => {
  res.status(200).json({ message: 'Current User Information' })
}

module.exports = {
  registerUser,
  loginUser,
  currentUser,
}
