import { roles } from "../../middleware/auth";

export const endPoint  = {
    create: [roles.Admin],
    update: [roles.HR],
    delete: [roles.User],
}