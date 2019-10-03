import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import Display from './Display'
import Alert from './Alert'


const Input = () => {
    const [loading, setLoading] = useState(true);
    const [alert, setAlert] = useState(null);
    const [display, setDisplay] = useState([]);
    const [textInput, setTextInput] = useState('');

    useEffect(() => {
        const getData = async () => {
            await axios.get(`/api/history`)
                .then(res => {
                    if (res.data.length > 0)
                        setDisplay(res.data[0]);
                    setLoading(false);
                })
                .catch(err => {
                    setLoading(false);
                });
        }
        getData();
    }, []);

    const onChange = e => {
        setTextInput(e.target.value);
    }

    const onSubmit = async e => {
        setLoading(true);
        const res = await axios.post('/api/translate', { translate: textInput }, { headers: { 'Content-Type': 'application/json' } });
        if ('error' in res.data) {
            setAlert({ msg: res.data.error, type: 'danger' });
            setDisplay([]);
            setLoading(false);
        } else {
            setAlert({ msg: 'Success', type: 'success' });
            setDisplay(res.data);
            setLoading(false);
        }
    }

    return (
        <section id='input'>
            <div className="container">
                {alert ? <Alert alert={alert} /> : null}
                {loading ? <div>Loading...</div> :
                    <Fragment>
                        <input value={textInput} onChange={onChange} type="text" placeholder='Text To Translate' />
                        <button onClick={onSubmit} type='submit'>Submit</button>
                        <div className="display-container">
                            <Display db={display} />
                        </div>
                    </Fragment>
                }
            </div>
        </section>
    );
}

export default Input
