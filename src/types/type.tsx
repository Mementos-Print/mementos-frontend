export interface NewUserDataProps {
    name: string;
    email: string;
    date_created: Date;
}

export interface AdminDataProps {
    username: string;
    email: string;
    password: string;
    isAdmin: Boolean;
    date_created: Date;
}

export type NewUserDataInformation = {
    // sectionData: NewUserDataProps;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
};

export type AdminDataInformation = {
    // sectionData: NewUserDataProps;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
};
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
export interface InformationDataProps {
    name: string;
    email: string;
    saveInfo: Boolean;
    date_created: Date;
}

export type InformationProps = {
    // sectionData: NewUserDataProps;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>, saveInfo: Boolean) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    handleNext: (e: React.FormEvent<HTMLFormElement>) => void
};

export type FormDataProps = {
    name: string;
    email: string;
    saveInfo: Boolean;
    date_created: Date;
}

export type FormSectionDataProps = [
    {
        name: string;
        email: string;
        saveInfo: Boolean;
        date_created: Date;
    },
    {
        files: File[]
    }
]

export type FormDataBlackPrint = {
    // sectionData: FormSectionDataProps[5]
    activeSection: number;
    handleFilesChange: (files: File[]) => void
    handleChange: (e: React.ChangeEvent<HTMLInputElement>, section: number) => void
    handleNext: (e: React.FormEvent<HTMLFormElement>) => void
    handlePrevious: () => void
};

export type FormDataUploadTab = {
    // handlePrevious: () => void
    Files: File[]
    handleFilesChange: (files: File[]) => void
    handleNext: (e: React.FormEvent<HTMLFormElement>) => void
    setShowUploadModal: (a: boolean) => void
};

export type FormDataFileUpload = {
    // sectionData: FormSectionDataProps[2]
    handleFilesChange: (files: File[]) => void
    handleNext: (e: React.FormEvent<HTMLFormElement>) => void
    // handlePrevious: () => void
};

export type FormDataEdit = {
    // handlePrevious: () => void
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
};


export type ProgressBarProps = {
    setcurrentsection: (a: number) => void;
    done: number[]
    activeSection: number;
};

export type CompletedProps = {
    isOpen: boolean
}

export type UploadProps = {
    isOpen: boolean
    handleNext: (e: React.MouseEvent<HTMLButtonElement>) => void
    // handleSubmit: () => void
}

export type StoreContextType = {
    [key: string]: unknown;
};