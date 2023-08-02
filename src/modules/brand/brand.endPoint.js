import { roles } from "../../middleware/auth.js"

roles

export const endPoint  = {
    create: [roles.Admin],
    update: [roles.Admin],
    delete: [roles.Admin]
}