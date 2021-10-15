const router = require("express").Router()
const { ensureAuthenticated } = require("../middleware/auth-middleware")
const {validationRules, validate }  = require("../validations/update-user-validator");
const { getOne, updateOne } = require("../controllers/profile-controller")

router.get("/profile", ensureAuthenticated, async(req, res) => {
    await getOne(req, res)
})

router.put("/profile", ensureAuthenticated, validationRules(), validate, async(req, res) => {
    await updateOne(req, res)
})


module.exports = router
