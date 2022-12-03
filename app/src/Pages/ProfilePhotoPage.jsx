import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import {setProfilePictureRoute} from '../utils/APIRoutes';
import './ProfilePhotoPage.css';

function ProfilePhotoPage() {
    const [currentUserImage, setCurrentUserImage] = useState();
    const user = JSON.parse(localStorage.getItem('chat-app-user'));
    const navigate = useNavigate();
    function handleShowUserImage(e) {
        setCurrentUserImage(e.target.files[0]);
        // console.log(e.target.files[0])
        // console.log(URL.createObjectURL(e.target.files[0]))
    }
    function handleSetUserImage(e) {
        e.preventDefault()
        const formData = new FormData();
        formData.append('fileupload', currentUserImage);
        console.log(formData)
        fetch(`${setProfilePictureRoute}/${user._id}`, {
            method: 'POST',
            body: formData,
            // dataType: 'jsonp' 
        }) 
    }
    useEffect(() => {
        if(!user) {
            navigate('/register')
        }
    }, [user, navigate])
    return (
        <section id="profile-photo-page">
            <form encType="multipart/form-data">
                <div className="image-container">
                    <img className='profile-photo' src={currentUserImage ? URL.createObjectURL(currentUserImage) : `${process.env.PUBLIC_URL}/logos/person-outline.svg`} alt="profile" />
                </div>
                <input type="file" accept="image/*" onInput={handleShowUserImage}/>
                <button type='submit' className='cta' onClick={handleSetUserImage}>Submit</button>
            </form>
        </section>
    )
}

export default ProfilePhotoPage;