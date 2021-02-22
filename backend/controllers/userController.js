import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../Models/userModel.js'

//@desc     Auth user & get token
//@route    POST /api/users/login
//@access   Public
const authUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    res.status(401)
    throw new Error('All fields are required')
  } else {
    const user = await User.findOne({ username })

    if (user && (await user.matchPassword(password))) {
      let apiPath
      if (user.isAdmin) {
        apiPath = process.env.RHINO_ROUTE
      } else {
        apiPath = process.env.GUEST_ROUTE
      }
      res.json({
        _id: user._id,
        name: user.name,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
        apiPath: apiPath,
      })
    } else {
      res.status(401) // 401: Unauthorized
      throw new Error('Invalid username or password')
    }
  }
})

export { authUser }
