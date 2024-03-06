import { useEffect, useState } from "react"
import apiCall from "../../apis"
import { useNavigate } from "react-router-dom"

export const ThesisManager = () => {
    const navigate = useNavigate()

    const [thesisName, setThesisname] = useState('')
    const [description, setDescription] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [theses, setTheses] = useState<any[]>()
    const [collapseToggle, setCollapseToggle] = useState<boolean[]>([])

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
        setIsSubmitting(false)
    }

    useEffect(() => {
        apiCall('/instructor/gettheses', "POST",)
            .then(res => {
                console.log(res)
                setTheses(res.theses)
                setCollapseToggle(Array(Object.keys(res.theses).length).fill(false))
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
            {theses && theses.map((item: any, key: number) => {
                // console.log(item.name)
                return <>
                    <div style={{ marginBottom: '2rem', width: '50rem', textAlign: 'left', paddingInline: '15%', margin: 'auto' }}>
                        <p className="d-inline-flex gap-1">
                            <input readOnly={true} defaultValue={item.name} style={{ height: '3rem' }} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            <button key={key} onClick={() => {
                                let t = [...collapseToggle]
                                t[key] = !t[key]
                                setCollapseToggle(t)
                                console.log(collapseToggle)
                            }} style={{ height: '3rem' }} className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target={`#collapseExample${key}`} aria-expanded="false" aria-controls="collapseExample">
                                {collapseToggle[key] ? "Hide" : "Show"}
                            </button>
                        </p>
                        <div style={{ marginBottom: '2rem' }} className="collapse" id={`collapseExample${key}`} >
                            <div className="card card-body">
                                {item.name}
                            </div>
                        </div>
                    </div>
                </>
            })}
        </div>

    </>
}