const { check, validationResult } = require("express-validator")

const validationRules = () => {
    return [
        check("email").trim().isEmail().normalizeEmail()
        .withMessage("Please enter a valid email."),
        check("name").trim().isLength({
            min: 1,
            max: 20
        }).withMessage("Name must be between 1 and 20 characters long."),
        check("password").trim().isLength({
            min: 6,
            max: 16
        }).withMessage("Password must be between 6 and 16 characters long."),
    ]
}

const validate = (req, res, next) => {
    const errors = validationResult(req)

    if (errors.isEmpty()) {
        return next();
    }

    const resultErrors = []
    errors.array().map((error) => resultErrors.push({[error.param]: error.mss}))

    resultErrors.push({message: "Action unsuccessful"})
    resultErrors.push({success: false})

    const errorObject = object.assign({}, ...resultErrors)
    return res.status(422).json(errorObject)
}

module.exports = {
    validationRules,
    validate
}