import {
    User
} from '../model';

export default {
    async getAllUser(req, res) {
        try {
            const user = await User.find({})

            if (user.length < 1) {
                return res.status(200).json({
                    message: 'No User yet'
                })
            }

            return res.status(200).json({
                type: 'GET',
                status: 'success',
                message: 'Request successfully',
                data: user
            })
        } catch (err) {
            res.status(500).json({
                status: 'error',
                message: err.message
            })
        }
    },

    async getSingleUser(req, res) {
        const {
            id
        } = req.params
        try {
            const user = await User.findById(id)
            if (!user) return res.status(404).json({
                message: 'User doesn\'t exist'
            })

            return res.status(200).json({
                type: 'GET',
                status: 'success',
                message: 'Request successfully',
                data: user
            })
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            })
        }
    },
    async deleteUser(req, res) {
        const {
            id
        } = req.params
        try {
            if (req.user.isAdmin !== true) {
                return res.status(401).json({
                    message: 'Unauthorised'
                })
            }
            const user = await User.findById(id)
            if (!user) return res.status(403).json({
                message: 'Bad request'
            })

            await User.deleteOne({
                _id: id
            })

            return res.status(200).json({
                type: 'DELETE',
                status: 'success',
                message: 'Deleted successfully'
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                success: false,
                message: err.message
            })
        }
    }
}