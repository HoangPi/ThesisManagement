import { useEffect, useState } from "react"
import apiCall from "../../apis"
import { Link, useNavigate } from "react-router-dom"

export const JoinThesis = () => {
    const navigate = useNavigate()
    const [theses, setTheses] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isStudentIn, setIsStudentIn] = useState<boolean[]>([])

    const joinThesis = async (ev: any) => {
        try {
            setIsSubmitting(true)
            const res = await apiCall('/student/jointhesis', "POST", {
                thesisid: ev.target.id
            })
            if (!res.confirm) {
                throw new Error("Fail to do the request, please try again later")
            }
            console.log(res)

        }
        catch (err: any) {
            alert(err.message)
            navigate('/')
        }
    }
    const unjoinThesis = async (ev: any) => {
        try{
            setIsSubmitting(true)
            const res = await apiCall('/student/unjoinThesis',"POST",{
                thesisid: ev.target.id
            })
            if(!res.confirm){
                throw new Error("Fail to do the request, please try again later")
            }
            console.log(res)
        }
        catch(err: any){
            alert(err.message)
            navigate('/')
        }
    }

    useEffect(() => {
        // setIsSubmitting(true)
        apiCall('/student/getpenddingtheses', 'POST',)
            .then(res => {
                setTheses(res.theses)
                setIsLoading(false)
                setIsStudentIn(res.isStudentIn)
                setIsSubmitting(false)
                console.log(res)
            })
            .catch(err => {
                alert("Error, you are about to be redirected to main page!")
                navigate('/')
                console.log(err)
            })
    }, [isSubmitting])
    return <>
        <div style={{ width: '50rem', backgroundColor: '#EADFFD', marginTop: '5rem' }} className="container text-center">
            <div className="row">
                <div className="col-4 border text-start border-dark-subtle" >
                    <strong>Thesis name</strong>

                </div>
                <div className="col-2 border text-start border-dark-subtle">
                    <strong>Instructor</strong>
                </div>
                <div className="col-3 border text-start border-dark-subtle">
                    <strong>email</strong>
                </div>
                <div className="col border text-start border-dark-subtle">
                    <strong>Phone</strong>
                </div>
                <div className="col border text-start border-dark-subtle">

                </div>
            </div>
        </div>
        {isLoading ? [...Array(8)].map(() => {
            return <p className="placeholder-glow">
                <span className="placeholder col-12"></span>
            </p>
        })
            : theses.map((item, key: number) => {
                return <>
                    <div className="container text-center">
                        <div className="row">
                            <div className="col col-4 border text-start border-dark-subtle">
                                {item.name}
                            </div>
                            <div className="col col-2 border text-start border-dark-subtle">
                                {item.instructorid.fullname}
                            </div>
                            <div className="col-3 border text-start border-dark-subtle">
                                {item.instructorid.email}
                            </div>
                            <div className="col border text-start border-dark-subtle">
                                {item.instructorid.phone}
                            </div>
                            {isSubmitting
                                ? <div className="col border text-start border-dark-subtle" >
                                    <div className="spinner-border spinner-border-sm" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>

                                : <Link onClick={isStudentIn[key]
                                    ? unjoinThesis
                                    : joinThesis
                                } id={item._id} className="col border text-start border-dark-subtle" to={""}>
                                    {isStudentIn[key] ? 'Un-join' : 'Join'}
                                </Link>
                            }

                        </div>
                    </div>
                </>
            })
        }
    </>
}