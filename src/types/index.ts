export interface Address {
    address: string
    chain: number
    isContract: boolean
}

export interface UnstrippedIdentity {
    id: string
    identifier: string
    provider: string
    default: Address
    secondary: Address[]
    currentSignature: string
    previousSignature?: string
}

export interface RPCUrls {
    eth?: string
    pol?: string
    bsc?: string
    avax?: string
    arb?: string
    opt?: string
    sol?: string
    apt?: string
}

export class GenericError extends Error {
    public name = ""

    constructor(name: string, message: string) {
        super(message)
        this.name = name
    }
}