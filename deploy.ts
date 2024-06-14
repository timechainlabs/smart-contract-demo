import { DefaultProvider, sha256, bsv, toByteString } from 'scrypt-ts'
import { Demo } from './src/contracts/demo'
import { NeucronSigner } from 'neucron-signer'

async function main() {
    const provider = new DefaultProvider({ network: bsv.Networks.mainnet })
    const signer = new NeucronSigner(provider)
    const amount = 1

    await signer.login('sales@timechainlabs.io', 'string')
    await Demo.loadArtifact()

    const message = toByteString('timechainlabs', true)
    const instance = new Demo(sha256(message))
    await instance.connect(signer)

    const deployTx = await instance.deploy(amount)
    console.log(
        'smart lock deployed : https://whatsonchain.com/tx/' + deployTx.id
    )

    await new Promise((f) => setTimeout(f, 5000))
    const { tx: callTx } = await instance.methods.unlock(message)
    console.log(
        'contract unlocked successfully : https://whatsonchain.com/tx/' +
            callTx.id
    )
}

main()
