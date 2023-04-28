import { GenericError, RPCUrls, UnstrippedIdentity } from "../types"
import { NameRegistryState, getDomainKeySync } from "@bonfida/spl-name-service"
import { Connection } from "@solana/web3.js"

export const resolveSOL = async (sol: string, rpcUrls: RPCUrls): Promise<UnstrippedIdentity | { provider: { id: string, delimiter: string } }> => {
    if(!rpcUrls.sol) throw new GenericError("RPCNotDefined", "Please add a rpc url for solana chain")
    
    const rpc = new Connection(rpcUrls.sol)

    const record = getDomainKeySync(sol)

    const { registry, nftOwner } = await NameRegistryState.retrieve(rpc, record.pubkey)

    let publicKey 
    if(nftOwner) {
        publicKey = nftOwner
    } else {
        publicKey = registry.owner
    }

    if(!publicKey) {
        throw new GenericError("CannotFindEns", `${sol} doesn't exist`)
    }

    return {
        id: sol,
        identifier: sol.split(".").slice(0, -1).join("."),
        provider: {
            id: 'sol',
            delimiter: '.'
        },
        default: {
            address: publicKey.toBase58(),
            chain: 7,
            isContract: false
        },
        secondary: [],
        currentSignature: ''
    }
}