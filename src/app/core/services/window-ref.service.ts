import { isPlatformBrowser } from "@angular/common";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";

export declare type WindowRef = Window;

function windowObject(): WindowRef | undefined {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    return window ? (window as unknown as WindowRef) : undefined;
}

@Injectable({
    providedIn: "root"
})
export class WindowRefService {
    public modals = 0;
    private readonly platformId: string;

    public constructor(@Inject(PLATFORM_ID) platformId: string) {
        this.platformId = platformId;
    }

    public get nativeWindow(): WindowRef | undefined {
        return isPlatformBrowser(this.platformId) ? windowObject() : undefined;
    }
}
