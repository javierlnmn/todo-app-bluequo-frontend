export interface User {
    id: string;
    username: string;
    isSuperuser: boolean;
}

export interface LoginFormProps {
    username: string;
    password: string;
}
