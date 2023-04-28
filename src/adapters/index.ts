import { GenericError, RPCUrls } from "../types"
import { resolveAptos } from "./aptos"
import { resolveENS } from "./ens"
import { resolveFetcch } from "./fetcch"
import { resolveSOL } from "./sol"
import { resolveSpace } from "./space"

export const resolve = (_id: string, rpcUrls: RPCUrls) => {
    if(_id.includes("@")) {
        return resolveFetcch(_id)
    }

    if(_id.includes(".")) {
        const split = _id.split(".")
        const tld = split[split.length - 1]
        
        if(tld === 'eth') return resolveENS(_id, rpcUrls)
        else if (tld === 'sol') return resolveSOL(_id, rpcUrls)
        else if (tld === 'bnb' || tld === 'arb') return resolveSpace(_id)
        else if (tld === 'apt') return resolveAptos(_id)

        throw new GenericError("DoNotSupportTLD", `SDK doesn't support ${tld} yet`)
    }

    throw new GenericError(`WrongName`, `${_id} is of wrong format`)
}