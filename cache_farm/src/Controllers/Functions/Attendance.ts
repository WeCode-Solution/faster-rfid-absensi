import { utils, ModeOfOperation, Counter } from 'aes-js'
import 'dotenv/config'

const AESKey = utils.utf8.toBytes(process.env.API_KEY ?? '').slice(0, 16)
const AESCounter = (): ModeOfOperation.ModeOfOperationCTR =>
  // eslint-disable-next-line new-cap
  new ModeOfOperation.ctr(
    AESKey, new Counter(
      parseInt(process.env.AES_CTR_COUNTER ?? '5')
    )
  )

export const Encrypt = (data: {}): string => {
  const textBytes = utils.utf8.toBytes(JSON.stringify(data))
  const encrypted = AESCounter().encrypt(textBytes)
  return utils.hex.fromBytes(encrypted)
}

export const Decrypt = (hex: string): {} | undefined => {
  const textBytes = utils.hex.toBytes(hex)
  try {
    const encrypted = AESCounter().encrypt(textBytes)
    return JSON.parse(utils.utf8.fromBytes(encrypted))
  } catch (e) {
    return undefined
  }
}
