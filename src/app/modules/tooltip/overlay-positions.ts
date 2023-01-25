import { ConnectedPosition } from "@angular/cdk/overlay";

export const top: ConnectedPosition = {
    originX: "center",
    originY: "top",
    overlayX: "center",
    overlayY: "bottom",
    offsetY: -5
};

export const right: ConnectedPosition = {
    originX: "end",
    originY: "center",
    overlayX: "start",
    overlayY: "center",
    offsetX: 5
};

export const bottom: ConnectedPosition = {
    originX: "center",
    originY: "bottom",
    overlayX: "center",
    overlayY: "top",
    offsetY: 5
};

export const bottomRight: ConnectedPosition = {
    originX: "end",
    originY: "bottom",
    overlayX: "end",
    overlayY: "top",
    offsetY: 5
};

export const bottomLeft: ConnectedPosition = {
    originX: "end",
    originY: "bottom",
    overlayX: "end",
    overlayY: "top",
    offsetY: 5
};

export const left: ConnectedPosition = {
    originX: "start",
    originY: "center",
    overlayX: "end",
    overlayY: "center",
    offsetX: -5
};

export const topRight: ConnectedPosition = {
    originX: "end",
    originY: "bottom",
    overlayX: "start",
    overlayY: "bottom",
    offsetX: -5,
    offsetY: -10
};

export type OverlayPositions = "bottom-right" | "bottom" | "left" | "right" | "top" | "top-right";

export function getConnectedPositions(position: OverlayPositions): ConnectedPosition[] {
    switch (position) {
        case "top":
            return [top, bottom, right, left];
        case "bottom":
            return [bottom, bottomRight, bottomLeft, top, right, left];
        case "bottom-right":
            return [bottomRight, bottom, bottomLeft, top, right, left];
        case "top-right":
            return [topRight, bottom, bottomLeft, top, right, left];
        case "left":
            return [left, right, top, bottom];
        case "right":
            return [right, left, bottom, top];
        default:
            return [right, left, bottom, top];
    }
}
