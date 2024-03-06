import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../store/hook"
import apiCall from "../apis"
import { updateUser } from "../store/userinfo"

export const Profile = () => {
    const fullname = useAppSelector(state => state.user.info.fullname)
    const dispatch = useAppDispatch()
    const [phone, setPhone] = useState(useAppSelector(state => state.user.info.phone))
    const [email, setEmail] = useState(useAppSelector(state => state.user.info.email))
    const [isUpdating, setIsUpdating] = useState(false)

    const onChangePhone = (ev: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(/^\d+$/.test(ev.target.value))
        if (/^\d+$/.test(ev.target.value) || ev.target.value === '') {
            setPhone(ev.target.value)
        }
    }
    const onChangeEmail = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(ev.target.value)
    }
    const updateProfile = async () => {
        try {
            if(!/^\d+$/.test(phone) || !/^[^@]+@\w+(\.\w+)+\w$/.test(email)){
                alert('Phone number or email is not in correct format')
                return
            }
            setIsUpdating(true)
            const res = await apiCall('/account/profile', 'POST', {
                phone,
                email
            })
            if(res.confirm){
                alert("Profile updated")
                dispatch(updateUser({
                    email,
                    phone
                }))
            }
        }
        catch(err){
            console.log(err)
        }
        finally{
            setIsUpdating(false)
        }
        
    }
    return <>
        <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Full name</label>
            <input type="text" defaultValue={fullname} readOnly={true} className="form-control" id="fullname" placeholder="name@example.com" />
        </div>
        <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Phone number</label>
            <input onChange={onChangePhone} type="text" value={phone} className="form-control" id="phoneNumber" placeholder="09xxxxx" />
        </div>
        <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
            <input onChange={onChangeEmail} type="text" value={email} className="form-control" id="emailAddress" placeholder="name@example.com" />
        </div>
        <div style={{ textAlign: 'left' }} className="mb-3">
            {!isUpdating
                ? <button onClick={updateProfile} style={{ width: '5rem' }} type="button" className="btn btn-primary">Update</button>
                : <button disabled={true} style={{ width: '5rem', textAlign: 'left' }} type="button" className="btn btn-primary"><div className="spinner-border spinner-border-sm" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div></button>
            }
            <button style={{ marginInline: '2rem' }} type="button" className="btn btn-primary">Primary</button>
        </div>

    </>
}