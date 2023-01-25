import { Image } from "./image";
import { ResponseBody } from "./responses/response";

export interface User extends ResponseBody {
    email: string;
    name: string;
    avatar: Image | null;
}
