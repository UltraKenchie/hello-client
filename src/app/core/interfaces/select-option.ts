export interface SelectOption {
    label: string;
    value: string | number | boolean | null;

    [key: string]: string | number | boolean | null;
}
