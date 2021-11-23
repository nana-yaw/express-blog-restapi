const { check, validationResult } = require("express-validator")

const validationRules = () => {
    return [
        check("title").trim().isLength({
            min: 2,
            max: 256
        }).withMessage("Title must be between 2 and 256 characters long."),
        check("videoId").trim().isLength({
            min: 11,
            max: 11
        }).withMessage("Youtube Video ID must be 11 characters long.")
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