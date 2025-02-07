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

// Form Type
export type DataProps = {
    id: string
    name: string
    email: string
    date_submitted: Date
}

export type FormDataProps = {
    name: string
    email: string
    date_submitted: Date
}

export type FormSectionDataProps = [
    {
        name: string
        email: string
        date_submitted: Date
    },
]

export type FormDataInformation = {
    sectionData: FormSectionDataProps[0]
    activeSection: number;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>, section: number) => void
    handleNext: (e: React.FormEvent<HTMLFormElement>) => void;
};

export type FormDataBlackPrint = {
    // sectionData: FormSectionDataProps[5]
    activeSection: number;
    handleFilesChange: (files: File[]) => void
    handleChange: (e: React.ChangeEvent<HTMLInputElement>, section: number) => void
    handleNext: (e: React.FormEvent<HTMLFormElement>) => void
    handlePrevious: () => void
};


export type ProgressBarProps = {
    setcurrentsection: (a: number) => void;
    done: number[]
    activeSection: number;
};

export type CompletedProps = {
    isOpen: boolean
}