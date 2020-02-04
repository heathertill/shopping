import * as React from 'react';
import { useRef } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { json, User } from '../../utils/api';
import { wayToGo } from '../../utils/formService';

export interface ImageProps extends RouteComponentProps<{id: string}> { }

const Image: React.SFC<ImageProps> = ({ history, match: { params: {id}} }) => {

    const fileInput = useRef<HTMLInputElement>();

    const handleImageChange = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            const data = new FormData();
        data.append('avatar', fileInput.current.files[0]);
        let body = {
            data
        }
            let result = await json('/multer', 'POST', body)
        if (result) {
            let body = {
                image: `https://heathers-projects.s3.amazonaws.com/shoppingImage-${fileInput.current.files[0].name}`
            };
            console.log('body', body)
            try {
                let worked = await json(`/api/users/${id}`, 'PUT', body)
                if (worked) {
                    wayToGo('Your profile image has been changed', history.goBack())
                }
            } catch (e) {
                console.log(e)
            }
        }
        } catch (e) {
            console.log(e)
            wayToGo('Please select a new image or click \'Return to Profile\'')
        }
        
    }

    const returnToProfile = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        history.goBack();
    }

    return (
        <main className="container">
            <section className="row my-5 justify-content-center">
                <div className="col-md-9">
                    <form className="form-group p-3 border shadow">
                        <h3 className="text-center">Select a new profile image</h3>
                        <div className="border  p-3 mx-4">
                            <input ref={fileInput} accept=".JPG, .PNG, .JPEG" type="file" className="ml-1 form-control-file" />
                        </div>
                        <span className="d-flex justify-content-between">
                            <button onClick={handleImageChange} className="btn btn-dark btn-block w-25 mx-auto mt-3 shadow">Submit Image</button>
                            <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => returnToProfile(e)} className="btn btn-dark w-25 mx-auto mt-3 shadow">Return to Profile</button>
                        </span>
                    </form>
                </div>
            </section>
        </main>
    );
}

export default Image;
