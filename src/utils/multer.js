
import multer from 'multer'
export const fileValidation = {
    image: ["image/png", "image/jpg", "image/jpeg", "image/gif"]
}

export function cloudUpload() {
    const storage = multer.diskStorage({})


    const upload = multer({storage})
    return upload ; 
}