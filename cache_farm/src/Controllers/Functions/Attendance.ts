import { utils, ModeOfOperation, Counter } from 'aes-js'
import 'dotenv/config'

const AESKey = utils.utf8.toBytes(process.env.API_KEY ?? '').slice(0, 16)
const AESCounter = () =>
  new ModeOfOperation.ctr(
    AESKey, new Counter(
      parseInt(process.env.AES_CTR_COUNTER ?? '5')
    )
  )

export const encrypt = (txt: string): string => {
  let textBytes = utils.utf8.toBytes(txt)
  let encrypted = AESCounter().encrypt(textBytes)
  return utils.hex.fromBytes(encrypted)
}

export const decrypt = (hex: string): string => {
  let textBytes = utils.hex.toBytes(hex)
  let encrypted = AESCounter().encrypt(textBytes)
  return utils.utf8.fromBytes(encrypted)
}
