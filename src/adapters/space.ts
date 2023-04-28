import { GenericError, UnstrippedIdentity } from "../types"
import axios from "axios"

export const resolveSpace = async (_id: string): Promise<UnstrippedIdentity | { provider: { id: string, delimiter: string } }> => {
    try {
        const idSplit = _id.split(".")
        const tld = idSplit[idSplit.length - 1]
        
        const res = await axios({
            url: `https://api.prd.space.id/v1/getAddress?tld=${tld == "arb" ? "arb1" : tld}&domain=${_id}`,
        })
    
        const id = await res.data

        if(!id.address) throw ''

        return {
            id: _id,
            identifier: idSplit.slice(0, -1).join("."),
            provider: {
                id: tld,
                delimiter: "."
            },
            default: {
                address: id.address,
                chain: tld === "bnb" ? 3 : tld === "arb" ? 6 : 1,
                isContract: false
            },
            secondary: [],
            currentSignature: ''
        }
    } catch (e) {
        console.log(e)
        throw new GenericError("CannotFindFetcchId", `${_id} doesn't exist`)
    }
}