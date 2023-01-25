import { Role } from "../../types/role";

export interface ResponseJwt {
    id: string;
    email: string;
    name: string;
    role: Role;
    iat: number;
    exp: number;
}
