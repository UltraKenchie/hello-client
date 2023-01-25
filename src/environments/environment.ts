import { Environment } from "../app/core/interfaces/environment/environment-interface";

export const environment: Environment = {
    name: "production",
    theme: "light",
    production: true,
    api: "https://hello-client-server.onrender.com/api",
    imageKit: {
        publicKey: "public_xxZjiqGKP247HsziX7mB2W2BA6s=",
        endpoint: "https://ik.imagekit.io/zghagvfvqzy/"
    }
};
