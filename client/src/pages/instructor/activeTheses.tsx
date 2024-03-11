import { useEffect, useState } from "react"
import apiCall from "../../apis"

export const ActiveTheses = () => {
    const [theses, setTheses] = useState<any[]>([])
    const [stateFilter, setStateFilter] = useState([false, false])
    const [passFilter, setPassFilter] = useState([false, false])

    const checkFilter = (item: any) => {
        console.log(stateFilter)
        console.log(passFilter)
        if(stateFilter[0] && stateFilter[1]){
            if(item.status !== 'On going') return false
        }
        if(passFilter[0] && passFilter[1]){
            if(!item.score || Number(item.score) < 5) return false
        }
        return true
    }
    useEffect(() => {
        apiCall('/instructor/getmythesis', 'POST',)
            .then((res) => {
                console.log(res)
                setTheses(res.theses)
            })
            .catch((err: any) => {
                console.log(err)
            })
    }, [])
    return <section className="pt-0">
        <div className="container">
            <div className="row border border-1">
                <div className="col-3 border border-2 ">
                    <div className="row border border-1 px-0 bg-secondary text-white">
                        <p><strong>Filter</strong></p>
                    </div>
                    <div className="container px-0">
                        <div className="row px-0 bg-secondary-subtle">
                            <div className="col-4 border border-1 px-0">Use filter?</div>
                            <div className="col border border-1 px-0">Type</div>
                        </div>
                        <div className="row">
                            <div className="col-4">
                                <div className="form-check form-switch">
                                    <input onChange={(ev) => setStateFilter([...[ev.target.checked, stateFilter[1]]])} className="form-check-input" type="checkbox" role="switch" />
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-check">
                                    <p>Finished
                                        <input disabled={!stateFilter[0]} checked={stateFilter[1]} onChange={(ev) => setStateFilter([...[stateFilter[0], ev.target.checked]])} className="form-check-input border border-2 border-primary" type="checkbox" value="" id="flexCheckCheckedDisabled" />
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4">
                                <div className="form-check form-switch">
                                    <input onChange={(ev) => setPassFilter([ev.target.checked, passFilter[1]])} className="form-check-input" type="checkbox" role="switch" />
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-check">
                                    <p>Pass
                                        <input disabled={!passFilter[0]} checked={passFilter[1]} onChange={(ev) => setPassFilter([passFilter[0], ev.target.checked])} className="form-check-input border border-2 border-primary" type="checkbox" value="" id="flexCheckCheckedDisabled" />
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col border border-2 px-0">
                    <div className="container">
                        <div className="row border border-1 bg-secondary text-white">
                            <p><strong>Theses</strong></p>
                        </div>
                        <div className="row bg-secondary-subtle">
                            <div className="col-4">Thesis's info</div>
                            <div className="col-3" >Participants</div>
                            <div className="col-2">Committee</div>
                            <div className="col-2">Defense date</div>
                            <div className="col">Score</div>
                        </div>
                        {theses.map((item: any, key: number) => {
                            if(checkFilter(item)) return <div className="row px-0 border border-1">
                                <div className="col-4">
                                    <p className="d-sm-block my-0"><strong>{item.name}</strong></p>
                                    {item.description}
                                </div>
                                <div className="col-3" >
                                    <div className="container">
                                        {item.students.map((student:any, stdKey: number)=>{
                                            return <div className="row">
                                                {student.fullname}
                                            </div>
                                        })}
                                    </div>
                                </div>
                                <div className="col-2">{item.committee ? item.committee : 'N/A'}</div>
                                <div className="col-2">{item.defensedate ? item.defensedate : 'N/A'}</div>
                                <div className="col">{item.score ? item.score : 'N/A'}</div>
                            </div>
                        })}
                    </div>
                </div>
            </div>

        </div>
    </section>
}