const { check, validationResult } = require("express-validator")

const validationRules = () => {
    return [
        check("name").trim().isLength({
            min: 1,
            max: 20
        }).withMessage("Name must be between 1 and 20 characters long.")
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