import { fileread, writefile } from "../servis/index.js"
function createpagindata(data,page,limit){
    let paginatedata=data.slice((page-1)*limit,limit)
    return paginatedata
  }
  function getsorttoasc(data){
    for(let i=0;i<data.length-1;i++){
        for(let j=i+1;j<data.length;j++){
            if(data[i].price>data[j].price){
                let temp=data[i]
                data[i]=data[j]
                data[j]=temp
            }
        }
    }
    return data
  }
  function getsorttodesc(data){
    for(let i=0;i<data.length-1;i++){
        for(let j=i+1;j<data.length;j++){
            if(data[i].price<data[j].price){
                let temp=data[i]
                data[i]=data[j]
                data[j]=temp
            }
        }
    }
    return data
  }
export const getAllproducts = (req, res, next) => {
    try {
        let{page=1,limit=1,model,sort}=req.query
        const data =fileread()
        let productData = JSON.parse(data);
        if(sort==='ORDER BY ASC'){
            let result=getsorttoasc(productData)
            let filter=result.filter((item)=>item.model.toLowerCase().trim()===model.toLowerCase().trim())
            return res.status(200).send({
                data: createpagindata(filter,page,limit)
              });
        }else if(sort==='ORDER BY DESC'){
            let result=getsorttodesc(productData)
            let filter=result.filter((item)=>item.model.toLowerCase().trim()===model.toLowerCase().trim())
            return res.status(200).send({
                data:createpagindata(filter,page,limit)
              });
        }else{
            return res.status(200).send({
                data: createpagindata(productData,page,limit),
              });
        }
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