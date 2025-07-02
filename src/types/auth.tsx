export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
    user: {
        // id: string;
        email: string;
        name: string;
        role: string;
    };  
}

export interface ApiError {
    message: string;
    statusCode?: number;
    errors?: Record<string, string[]>;
}