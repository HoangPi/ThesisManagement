import { useEffect, useState } from "react"
import apiCall from "../../apis"
import { useNavigate } from "react-router-dom"

export const ThesisManager = () => {
    const navigate = useNavigate()

    const [thesisName, setThesisname] = useState('')
    const [description, setDescription] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [theses, setTheses] = useState<any[]>([])
    const [collapseToggle, setCollapseToggle] = useState<boolean[]>([])
    const [isStudentIn, setIsStudentIn] = useState<boolean[][]>([])

    const acceptThesis = async (ev: any) => {
        try {
            console.log(ev.target.value)
            const thesisNo = Number(ev.target.value)
            let temp = theses[thesisNo].students.map((value: any, key: number) => {
                if (isStudentIn[thesisNo][key]) return value._id
            })
            let studentList = temp.filter((value: any) => value as string !== undefined)
            if (studentList.length <= 0 || studentList.length > 4) {
                alert("Number of participant must be in between 1 and 4")
                return
            }
            setIsSubmitting(true)
            const res = await apiCall('/instructor/activatethesis', 'POST', {
                students: [...studentList],
                thesisid: theses[thesisNo]._id
            })
            console.log(res)
            if (!res.confirm) {
                alert("Fail to execute, please try again")
                window.location.reload()
            }

        }
        catch (err) {
            console.log(err)
        }

    }
    const acceptStudent = (ev: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(ev.target.checked)
        // console.log(ev.target.id)
        // console.log(ev.target.value)
        const coordinate = ev.target.value.split(',')
        let temp = [...isStudentIn]
        temp[Number(coordinate[0])][Number(coordinate[1])] = ev.target.checked
        setIsStudentIn(temp)
        console.log(isStudentIn)
    }

    const addThesis = async () => {
        try {
            setIsSubmitting(true)
            const res = await apiCall('/instructor/addthesis', "POST", {
                name: thesisName,
                description
            })
            console.log(res)
        }
        catch (err) {
            console.log(err)
            alert("Cannot add thesis right now!")
        }

    }

    useEffect(() => {
        apiCall('/instructor/gettheses', "POST",)
            .then(res => {
                console.log(res.theses)
                setTheses(res.theses)
                setCollapseToggle(Array(Object.keys(res.theses).length).fill(false))
                let a1: boolean[][] = []
                // console.log(a1)
                for (let i = 0; i < Object.keys(res.theses).length; i++) {
                    let t = Object.keys(res.theses[i].students).length
                    a1.push(Array(t).fill(false))
                    console.log(t)
                }
                setIsStudentIn(a1)
                setIsSubmitting(false)
                // console.log(a1)
            })
            .catch(err => {
                console.log(err)
                navigate('/')
            })
    }, [isSubmitting])
    return <>
        <div style={{ backgroundColor: '#F8F9FB', textAlign: 'left', paddingInline: '15%', marginBottom: '3rem' }}>
            <div className="mb-3">
                <h3 className="form-label">Create new thesis</h3>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Thesis name</label>
                <input value={thesisName} onChange={(ev) => setThesisname(ev.target.value)} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
                <textarea value={description} onChange={(ev) => setDescription(ev.target.value)} className="form-control" id="exampleFormControlTextarea1" rows={3}></textarea>
            </div>
            {!isSubmitting
                ? <button onClick={addThesis} style={{ width: '5rem' }} type="button" className="btn btn-primary">Submit</button>
                : <button disabled={true} style={{ width: '5rem', textAlign: 'left' }} type="button" className="btn btn-primary"><div className="spinner-border spinner-border-sm" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div></button>
            }
        </div>
        <div style={{ backgroundColor: '#F8F9FB' }}>
            <div className="mb-3">
                <h3 className="form-label">Pending theses</h3>
            </div>
            {theses && theses.map((item: any, key: number) => {
                // console.log(item.name)
                return <>
                    <div style={{ marginBottom: '2rem', width: '64rem', textAlign: 'left', paddingInline: '15%', margin: 'auto' }}>
                        <p className="d-inline-flex gap-1">
                            <input readOnly={true} defaultValue={item.name} style={{ height: '3rem' }} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            <button key={key} onClick={() => {
                                let t = [...collapseToggle]
                                t[key] = !t[key]
                                setCollapseToggle(t)
                                // console.log(collapseToggle)
                            }} style={{ height: '3rem', width: '5rem' }} className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target={`#collapseExample${key}`} aria-expanded="false" aria-controls="collapseExample">
                                {collapseToggle[key] ? "Hide" : "Show"}
                            </button>
                            <button
                                onClick={acceptThesis}
                                value={key}
                                style={{ width: '5rem', height: '3rem' }}
                                className="btn btn-primary"
                                type="submit">Accept</button>
                            <button style={{ width: '5rem', height: '3rem' }} className="btn btn-danger" type="submit">Delete</button>
                        </p>

                        <div style={{ marginBottom: '2rem' }} className="collapse" id={`collapseExample${key}`} >
                            <div className="card card-body">
                                <div className="container-xl">
                                    <div className="row">
                                        <div className="col-3 border text-start border-dark-subtle bg-secondary">Student name</div>
                                        <div className="col-4 border text-start border-dark-subtle bg-secondary">Email</div>
                                        <div className="col border text-start border-dark-subtle bg-secondary">Phone</div>
                                        <div className="col border text-start border-dark-subtle bg-secondary">Accept</div>
                                    </div>
                                    {item.students.map((value: any, subkey: number) => {
                                        return <div className="row">
                                            <div className="col-3 border text-start border-dark-subtle">{value.fullname}</div>
                                            <div className="col-4 border text-start border-dark-subtle">{value.email}</div>
                                            <div className="col border text-start border-dark-subtle">{value.phone}</div>
                                            <div className="col border text-start border-dark-subtle">
                                                <div className="form-check">
                                                    <input checked={isStudentIn[key][subkey]} onChange={acceptStudent} className="form-check-input border border-dark-subtle border-2" type="checkbox"
                                                        value={`${key},${subkey}`} id={value._id} />
                                                </div>
                                            </div>
                                        </div>
                                    })}
                                </div>
                            </div>

                        </div>
                    </div>
                </>
            })}
        </div>

    </>
}