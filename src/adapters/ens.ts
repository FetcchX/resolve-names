import { GenericError, RPCUrls, UnstrippedIdentity } from "../types"
import { ethers } from "ethers"

export const resolveENS = async (ens: string, rpcUrls: RPCUrls): Promise<UnstrippedIdentity | { provider: { id: string, delimiter: string } }> => {
    if(!rpcUrls.eth) throw new GenericError("RPCNotDefined", "Please add a rpc url for ethereum chain")
    
    const rpc = ethers.getDefaultProvider(rpcUrls.eth)

    const address = await rpc.resolveName(ens)

    if(!address) throw new GenericError("CannotFindEns", `${ens} doesn't exist`)

    return {
        id: ens,
        identifier: ens.split(".").slice(0, -1).join("."),
        provider: {
            id: 'eth',
            delimiter: '.'
        },
        default: {
            address,
            chain: 1,
            isContract: false
        },
        secondary: [],
        currentSignature: ''
    }
}