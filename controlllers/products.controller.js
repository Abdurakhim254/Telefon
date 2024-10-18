import { fileread, writefile } from "../servis/index.js"
export const getAllproducts = (req, res, next) => {
    try {
        const data =fileread()
        return res.send(JSON.parse(data))
    } catch (e) {
        next(e)
    }
}

export const getbyidProduct = (req, res, next) => {
    try {
        const data=JSON.parse(fileread())
        const id=req.params.id
        let finddata=data.find((item)=>item.id===+id)
        if(!finddata){
           return res.status(404).send("Malumot topilmadi")
        }
        return res.send(finddata)
    } catch (error) {
        next(error)
    }
}


export const createProduct = (req, res, next) => {
    try {
        const data = JSON.parse(fileread())
        const newdata=req.body
        data.push(newdata)
        writefile(data)
        return res.status(200).send("Ma'lumot muvaffaqiyatli qo'shildi")
    } catch (error) {
        next(error)
    }

}

export const updaTeProductsbyId = (req, res, next) => {
    try {
        const data=JSON.parse(fileread())
        const id=req.params.id
        let check=false
        for(let i=0;i<data.length;i++){
            if(data[i].id===+id){
                data[i]=req.body
                data[i].id=+id
                check=true
                break
            }
        }
        if(!check){
           return res.status(404).send("Malumot O'zgartirilmadi")
        }
        writefile(data)
        return res.send("Malumot o'zgartirildi")
    } catch (error) {
        next(error)
    }
}

export const deleTeProductsbyId=(req,res,next)=>{
    try {
        const data=JSON.parse(fileread())
        const id=req.params.id
        const newdata=data.filter((item)=>item.id!==+id)
        writefile(newdata)
        return res.send("Malumot o'chirildi")
    } catch (error) {
        next(error)
    }
}