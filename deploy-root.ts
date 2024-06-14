import { DefaultProvider, sha256, bsv, toByteString } from 'scrypt-ts'
import { Root } from './src/contracts/root'
import { NeucronSigner } from 'neucron-signer'

async function main() {
    const provider = new DefaultProvider({ network: bsv.Networks.mainnet })
    const signer = new NeucronSigner(provider)
    const amount = 2

    await signer.login('sales@timechainlabs.io', 'string')
    await Root.loadArtifact()

    const square = BigInt(4)
    const instance = new Root(square)
    await instance.connect(signer)

    const deployTx = await instance.deploy(amount)
    console.log(
        'smart lock deployed : https://whatsonchain.com/tx/' + deployTx.id
    )
    
    const root = 2
    await new Promise((f) => setTimeout(f, 5000))
    const { tx: callTx } = await instance.methods.unlock(root)
    console.log(
        'contract unlocked successfully : https://whatsonchain.com/tx/' +
            callTx.id
    )
}

main()
