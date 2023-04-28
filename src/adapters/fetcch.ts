import { GenericError, UnstrippedIdentity } from "../types"
import axios from "axios"

export const resolveFetcch = async (_id: string): Promise<UnstrippedIdentity | { provider: { id: string, delimiter: string } }>  => {
    try {
        const res = await axios({
            url: `https://sandbox-api.fetcch.xyz/v1/identity?id=${_id}`
        })
    
        const id = (await res.data).data

        return {
            id: _id,
            identifier: id.identifier,
            provider: {
                id: id.provider.id,
                delimiter: id.provider.delimiter
            },
            default: {
                address: id.default.address,
                chain: id.default.chain.id,
                isContract: id.default.isContract
            },
            secondary: id.secondary.map((s: any) => ({
                address: s.address,
                chain: s.chain.id,
                isContract: s.isContract
            })),
            currentSignature: ''
        }
    } catch (e) {
        console.log(e, "!23s")
        throw new GenericError("CannotFindFetcchId", `${_id} doesn't exist`)
    }
}