import {
  User
} from '../model'
import helper from '../middlewares/helper'

export default {
  signup: async (req, res) => {
    let {
      firstName,
      lastName,
      email,
      password
    } = req.value.body
        try {
      email = email.toLowerCase().trim()
      const checkEmail = await helper.existEmail(email)
            if (checkEmail) {
        return res.status(403).json({
          message: 'Email already exist'
        })
            }

      const hash = await helper.hashPassword(password)

            const user = await User.create({
        firstName,
        lastName,
        email,
        password: hash
      })

      const token = await helper.genToken(user)
            return await res.status(201).json({
        status: 'success',
        type: 'POST',
        data: user,
        token: `Bearer ${token}`,
        message: 'Registered successfully'
      })
        } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: err.message
      })
        }
  },

  signin: async (req, res) => {
    const user = req.user
        // gen token
        const token = helper.genToken(user)
        res.status(200).json({
      type: 'POST',
      status: 'success',
      data: user,
      token: `Bearer ${token}`,
      message: "You've successfully signed in"
    })
    },

  secret: (req, res) => {
    res.status(200).json({
      type: 'GET',
      status: 'success',
      data: req.user,
      secret: 'resource'
    })
    }

}
