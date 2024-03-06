import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';
import {store} from '../store/store'

export default async function apiCall(url: string, method: "POST" | "GET", payload?: any | undefined) {
    try {
        const res = await fetch('http://localhost:3000' + url, {
            headers: {
                "Content-type": "application/json",
            },
            method,
            body: JSON.stringify({
                payload,
                hmac:{
                    hashcode: Base64.stringify(hmacSHA512(store.getState().session.HMAC_token.salt + store.getState().session.HMAC_token.sessionid,store.getState().session.HMAC_token.key)),
                    sessionid: store.getState().session.HMAC_token.sessionid
                }
            }),
            credentials: 'include',
        })
        return res.json()
    }
    catch(err) {
        console.log(err)
        return {message: "Error while communicating with the server"}
    }
}