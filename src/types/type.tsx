export interface DropdownWithRadioProps {
    options: { value: string; label: string }[];
    defaultValue: string;
    onChange: (value: string) => void;
}

export interface DropdownOption {
    label: string;
    value: string;
    icon: string; // URL or path to the image/icon
}

export interface DropdownWithImageProps {
    options: DropdownOption[];
    defaultValue: string;
    onChange: (value: string) => void;
}