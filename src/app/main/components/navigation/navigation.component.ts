import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { AuthService } from "../../../core/services/auth.service";
import { ThemeService } from "../../../core/services/theme.service";
import { Role } from "../../../core/types/role";
import { ThemeCode } from "../../../core/types/theme-code";

@Component({
    selector: "app-navigation",
    templateUrl: "./navigation.component.html",
    styleUrls: ["./navigation.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent implements OnInit {
    public role: Role | null;
    public currentTheme: ThemeCode;

    private readonly authService: AuthService;
    private readonly themeService: ThemeService;
    private readonly cdr: ChangeDetectorRef;
    public constructor(
        authService: AuthService,
        cdr: ChangeDetectorRef,
        themeService: ThemeService
    ) {
        this.authService = authService;
        this.themeService = themeService;
        this.cdr = cdr;
    }

    public ngOnInit(): void {
        this.role = this.authService.getRole();
        this.currentTheme = this.themeService.theme.themeCode;
    }

    public logout(): void {
        this.authService.logout();
    }

    public toggleTheme(): void {
        this.currentTheme = this.currentTheme === "light" ? "dark" : "light";
        this.themeService.applyTheme(this.currentTheme);
        this.cdr.detectChanges();
    }
}
