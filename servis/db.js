import fs from 'fs'
import path from 'path'
const filepath = path.join(import.meta.dirname, "..", "database", "data.json")


export const fileread = () => {
    try {
        const data = fs.readFileSync(filepath, 'utf8')
        return data
    } catch (error) {
        console.error(error)
        throw new Error(error)
    }
}

export const writefile = async (data) => {
    fs.writeFile(filepath, JSON.stringify(data), (err) => {
        if (err) {
            throw new Error("Xatolik")
        }
    })
}