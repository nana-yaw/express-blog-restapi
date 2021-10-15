const router = require("express").Router()
const { ensureAuthenticated } = require("../middleware/auth-middleware")

const { getOne, updateOne } = require("../controllers/profile-controller")

router.get("/profile", ensureAuthenticated, async(req, res) => {
    await getOne(req, res)
})

router.put("/profile", ensureAuthenticated, async(req, res) => {
    await updateOne(req, res)
})


module.exports = router
