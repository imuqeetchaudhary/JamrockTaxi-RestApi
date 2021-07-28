const express = require("express")
const router = express.Router()
const extras = require("../controllers/extras")
const { authentication } = require("../middlewares/isAuth")
const { validation } = require("../middlewares/validation")
const { addExtrasSchema, getExtrasSchema, updateExtrasSchema } = require("../validation/extras")

router
    .post("/add", validation(addExtrasSchema), authentication, extras.addExtras)
    .get("/all", authentication, extras.getAllExtras)
    .post("/get-all-by-array", authentication, extras.getAllExtrasByArray)
    .post("/single", validation(getExtrasSchema), authentication, extras.getSingleExtras)
    .patch("/update", validation(updateExtrasSchema), authentication, extras.updateExtras)

module.exports = router