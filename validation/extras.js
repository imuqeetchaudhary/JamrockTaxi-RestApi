const yup = require("yup")

exports.addExtrasSchema = yup.object({
    name: yup.string().required(),
    description: yup.string().required(),
    price: yup.number().required()
})

exports.getExtrasSchema = yup.object({
    extrasId: yup.string().required()
})

exports.updateExtrasSchema = yup.object({
    extrasId: yup.string().required(),
    name: yup.string(),
    description: yup.string(),
    price: yup.number()
})