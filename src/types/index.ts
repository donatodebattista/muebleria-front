export type Client = {
    _id?: string;    
    name: string
    email: string
    plan: string
    product: string
    facturado: boolean
    fechaInicio: string
}

export type AuthCredentials = {
    username: string
    password: string
}