const User = require("../models/user")

const updateOne = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id, req.body)
        return res.status(204).json({
            message: "Item successfully updated",
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        })
    }
}

const getOne = async (req, res) => {
    try {
        const item = await User.findById(req.params.id)
        if (item) {
            return res.status(200).json(item)
        }
        return res.status(404).json({
            message: "Item not found",
            success: false
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        })
    }
}

module.exports = {
    updateOne,
    getOne
}
