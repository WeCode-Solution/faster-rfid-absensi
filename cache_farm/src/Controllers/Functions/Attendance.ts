import * as AES from 'aes-js'
import 'dotenv/config'

const AESKey = AES.utils.utf8.toBytes(process.env.API_KEY ?? '').slice(0, 16)
const AESCounter = () =>
  new AES.ModeOfOperation.ctr(
    AESKey, new AES.Counter(
      parseInt(process.env.AES_CTR_COUNTER ?? '5')
    )
  )

export const encrypt = (txt: string): string => {
  let textBytes = AES.utils.utf8.toBytes(txt)
  let encrypted = AESCounter().encrypt(textBytes)
  return AES.utils.hex.fromBytes(encrypted)
}

export const decrypt = (hex: string): string => {
  let textBytes = AES.utils.hex.toBytes(hex)
  let encrypted = AESCounter().encrypt(textBytes)
  return AES.utils.utf8.fromBytes(encrypted)
}
