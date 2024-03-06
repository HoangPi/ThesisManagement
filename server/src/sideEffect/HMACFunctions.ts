import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';
import randomString from 'randomstring'

export function checkHMAC(hashcode: string, originalMessage: string, salt: string | undefined, key?: string | undefined) {
    return(hashcode === Base64.stringify(hmacSHA512(salt + originalMessage,key? key : randomString.generate(10) )))
}