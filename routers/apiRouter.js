import express from "express";
import v1Route from "./V1/v1Route"

const route = express.Router()

route.use("/v1", v1Route)

export default route;