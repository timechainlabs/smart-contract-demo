import { ByteString, Sha256, SmartContract, assert, method, prop } from "scrypt-ts";

export class Demo extends SmartContract{
    @prop()
    hash: Sha256

    constructor(hash: Sha256){
        super(...arguments)
        this.hash = hash
    }

    @method()
   public unlock(message: ByteString){
    assert(Sha256(message) == this.hash,'incorrect hash')
   }
}