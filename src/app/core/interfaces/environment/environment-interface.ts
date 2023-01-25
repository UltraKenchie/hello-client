import { ThemeCode } from "../../types/theme-code";

export interface Environment {
    name: "local" | "production";
    theme: ThemeCode;
    production: boolean;
    api: string;
    imageKit: {
        publicKey: string;
        endpoint: string;
    };
}
