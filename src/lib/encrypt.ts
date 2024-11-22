import CryptoJS from 'crypto-js'

export const encryptData = (value: string) => {
  const key = import.meta.env.VITE_PUBLIC_HASHKEY

  if (!key) {
    throw new Error(
      'NEXT_PUBLIC_HASHKEY is not defined in the environment variables.',
    )
  }

  const encrypted = CryptoJS.AES.encrypt(JSON.stringify(value), key)

  return {
    ct: encrypted.ciphertext.toString(CryptoJS.enc.Base64),
    iv: encrypted.iv.toString(),
    s: encrypted.salt.toString(),
  }
}
