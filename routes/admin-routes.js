const router = require("express").Router()
const { ensureAuthenticated, ensureAuthorized } = require("../middleware/auth-middleware")

const { getAll, getOne } = require("../controllers/admin-controller")
const { register } = require("../controllers/auth-controller")

router.get("/users", ensureAuthenticated, ensureAuthorized(["admin"]), async(req, res) => {
    await getAll(req, res)
})

router.get("/users/:id", ensureAuthenticated, ensureAuthorized(["admin"]), async(req, res) => {
    await getOne(req, res)
})

router.get("/seed", async(req, res) => {
    const admin = {
        name: "Administrator",
        email: "eddiemania70@gmail.com",
        password: "Password123#"
    }

    await register(admin, "admin", res)
})

module.exports = router
