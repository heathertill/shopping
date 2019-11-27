import * as React from 'react';
import { useRef, useState } from 'react';
import {RouteComponentProps} from 'react-router-dom';
import { json, User } from '../../utils/api';
import { wayToGo } from '../../utils/formService';

export interface AppProps extends RouteComponentProps { }

const App: React.SFC<AppProps> = ({history}) => {

    const fileInput = useRef<HTMLInputElement>();

    const [show, setShow] = useState(false);

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log(fileInput.current.files[0]);
        const data = new FormData();
        data.append('avatar', fileInput.current.files[0]);
        let body = {
            data
        }
        let result = await json('/multer', 'POST', body)
        if (result) {
            let id = Number(User.userid);
            let body = {
                image: `https://heathers-projects.s3.amazonaws.com/shoppingImage-${fileInput.current.files[0].name}`
            };
            try {
                let worked = await json(`/api/users/${id}`, 'PUT', body)
                if (worked) {
                    wayToGo(history.push('/'))
                }
            } catch (e) {
                console.log(e)
            }
        }
    }

    const handleImage = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setShow(true);
    }



    const showImage = () => {
        if (show === true) {
            return (
                <div className="mt-3">
                    <img src={`https://heathers-projects.s3.us-east-2.amazonaws.com/shoppingImage-${fileInput.current.files[0].name}`} alt="test" id="test" />
                </div>
            )
        }
    }

    return (
        <main className="container">
            <section className="row my-5 justify-content-center">
                <div className="col-md-9">
                    <form className="form-group p-3 border shadow">
                        <h3 className="text-center">Would you like to add a profile image?</h3>
                        <span>
                            <input ref={fileInput} type="file" className="form-control-file"/>
                            {showImage()}
                        </span>
                        <span className="d-flex justify-content-between">
                            <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleImage(e)} className="btn btn-primary w-25 mx-auto mt-3  shadow">Preview</button>
                            <button onClick={handleClick} className="btn btn-primary w-25 mx-auto mt-3 shadow">Submit</button>

                        </span>
                    </form>
                </div>

            </section>
        </main>
    );
}

export default App;
