import {
    SmartContract,
    assert,
    method,
    prop,
} from 'scrypt-ts'

export class Root extends SmartContract {
    @prop()
    square: bigint

    constructor(sq: bigint) {
        super(...arguments)
        this.square = sq
    }

    @method()
    public unlock(root: bigint) {
        assert(root * root == this.square, 'incorrect square-root')
    }
}
