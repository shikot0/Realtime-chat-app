import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import {setProfilePictureRoute} from '../utils/APIRoutes';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ProfilePhotoPage.css';

function ProfilePhotoPage() {
    const [currentUserImage, setCurrentUserImage] = useState();
    const user = JSON.parse(localStorage.getItem('chat-app-user'));
    const navigate = useNavigate();

    const toastOptions = {
        position: "top-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    function handleShowUserImage(e) {
        if(e.target.files[0].size < 400000) {
            console.log(e.target.files[0])
            setCurrentUserImage(e.target.files[0]);
        }else {
            toast.error('Please choose a smaller image', toastOptions)
        }
    }

    async function handleSetUserImage(e) {
        e.preventDefault()
        if(currentUserImage) {
            const formData = new FormData();
            formData.append('fileupload', currentUserImage);
            const data = await fetch(`${setProfilePictureRoute}/${user._id}`, {
                method: 'POST',
                body: formData, 
            }).then(res => res.json())
            .then(data => data);

            if(data.status) {
                navigate('/') 
            }
        }else {
            toast.error('Please choose an image for your profile',toastOptions)
        }
     }
    useEffect(() => {
        if(!user) {
            navigate('/register')
        }
    }, [user, navigate])
    return (
        <>
            <section id="profile-photo-page">
                <form encType="multipart/form-data">
                    <div className="image-container">
                        <img className='profile-photo' src={currentUserImage ? URL.createObjectURL(currentUserImage) : `${process.env.PUBLIC_URL}/logos/person-outline.svg`} alt="profile" />
                    </div>
                    <input type="file" accept="image/*" onInput={handleShowUserImage}/>
                    <button type='submit' className='cta' onClick={handleSetUserImage}>Submit</button>
                </form>
            </section>
            <ToastContainer/>
        </>
    )
}

export default ProfilePhotoPage;