import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { DarkTheme } from "../../../themes/dark";
import { LightTheme } from "../../../themes/light";
import { Theme } from "../interfaces/theme";
import { ThemeCode } from "../types/theme-code";

@Injectable({
    providedIn: "root"
})
export class ThemeService {
    public theme: Theme = LightTheme;

    private readonly defaultTheme: Theme = LightTheme;

    private readonly themes: Theme[] = [LightTheme, DarkTheme];
    public constructor() {
        if (environment.theme) {
            const foundTheme = this.themes.find((theme) => theme.themeCode === environment.theme);
            this.defaultTheme = foundTheme ?? DarkTheme;
        }
    }

    public init(): void {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            this.applyTheme(savedTheme as ThemeCode);
        } else {
            this.applyTheme(this.defaultTheme.themeCode);
        }
    }

    public applyTheme(code: ThemeCode): void {
        const foundTheme = this.themes.find((theme) => theme.themeCode === code);
        this.theme = foundTheme ? foundTheme : this.defaultTheme;
        Object.keys(this.theme).forEach((key) => {
            document.documentElement.style.setProperty(
                `${this.parse(key)}`,
                this.theme[key as keyof Theme]
            );
        });
        localStorage.setItem("theme", this.theme.themeCode);
    }

    private parse(key: string): string {
        return `-${key.replace(/[A-Z0-9]/gu, (char) => `-${char.toLowerCase()}`)}`;
    }
}
