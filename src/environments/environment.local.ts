import { Environment } from "../app/core/interfaces/environment/environment-interface";

export const environment: Environment = {
    name: "local",
    theme: "light",
    production: false,
    api: "http://localhost:3000/api",
    imageKit: {
        publicKey: "public_xxZjiqGKP247HsziX7mB2W2BA6s=",
        endpoint: "https://ik.imagekit.io/zghagvfvqzy/"
    }
};
