const { check, validationResult } = require("express-validator")

const validationRules = () => {
    return [
        check("Title").trim().isLength({
            min: 2,
            max: 256
        }).withMessage("Title must be between 2 and 256 characters."),
        check("body").trim().isLength({
            min: 2,
        }).withMessage("Comment must be at least 2 characters long."),
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