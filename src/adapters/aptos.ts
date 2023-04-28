import { GenericError, UnstrippedIdentity } from "../types"
import axios from "axios"

export const resolveAptos = async (apt: string): Promise<UnstrippedIdentity | { provider: { id: string, delimiter: string } }> => {
    const res = await axios({
        url: `https://www.aptosnames.com/api/mainnet/v1/address/${apt}`
    })

    const data = await res.data

    if(!data || !data.address) throw new GenericError("CannotFindAptosName", `${apt} doesn't exist`)

    return {
        id: apt,
        identifier: apt.split(".").slice(0, -1).join("."),
        provider: {
            id: 'apt',
            delimiter: '.'
        },
        default: {
            address: data.address,
            chain: 8,
            isContract: false
        },
        secondary: [],
        currentSignature: ''
    }
}