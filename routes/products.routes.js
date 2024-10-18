import express from 'express'
import { validationProductmidd } from '../middlewares/index.js'
import { getAllproducts, getbyidProduct, updaTeProductsbyId, createProduct, deleTeProductsbyId } from '../controlllers/index.js'
export const productsRouter = express.Router()

//GET all
productsRouter.get("/", getAllproducts)

//GEt by id
productsRouter.get("/:id", getbyidProduct)

//Create
productsRouter.post("/", validationProductmidd, createProduct)

//Update by id
productsRouter.put("/:id", updaTeProductsbyId)

//delete by id
productsRouter.delete("/:id",deleTeProductsbyId)