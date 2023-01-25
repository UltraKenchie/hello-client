import { Image } from "./image";
import { ResponseBody } from "./responses/response";
import { User } from "./user";

export interface Client extends ResponseBody {
    organizationName: string;
    organizationImage: Image | null;
    contactName: string;
    contactImage: Image | null;
    contactEmail: string;
    contactPhoneNumber: string;
    website: string;
    status: boolean;
    assigned: User | null;
}
