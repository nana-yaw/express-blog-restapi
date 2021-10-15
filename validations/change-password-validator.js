const { check, validationResult } = require("express-validator")

const validationRules = () => {
    return [
        check("newPassword").trim().isLength({
            min: 6,
            max: 16
        }).withMessage("Password must be between 6 and 16 characters.")
    ]
}

const validate = (req, res, next) => {
    const errors = validationRules(req)

    if (errors.isEmpty()) {
        return next;
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