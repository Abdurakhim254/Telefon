export const validationProductmidd=(req,res,next)=>{
    const {model,price,company}=req.body

    if(!model || !price || !company){
       return  res.status(400).send("Model, price and company are not valid!")
    }

    if(price<=0 || isNaN(+price)){
        return res.status(400).send("Model,price and company are not valid!")
    }
    

    next()
}