import { resolve } from "./adapters";
import { RPCUrls } from "./types";

export class Resolve {
    rpc: RPCUrls = {}

    constructor(rpc: RPCUrls) {
        this.rpc = rpc
    }

    async resolve(id: string) {
        return resolve(id, this.rpc)
    }
}