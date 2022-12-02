import {useState} from 'react';
import './ProfilePhotoPage.css';
function ProfilePhotoPage() {
    const [currentUserImage, setCurrentUserImage] = useState();
    // function handleUserImage(e) {
    // }
    return (
        <section id="profile-photo-page">
            {/* <form method="post" action="/profilephoto" encType="multipart/form-data">
                <div className="image-container">
                    <img src={currentUserImage ? currentUserImage: `${process.env.PUBLIC_URL}/logos/person-outline.svg`} alt="" />
                </div>
                <input type="file" accept="image/*"/>
                <button type='submit' onInput={handleUserImage}>Submit</button>
            </form> */}
        </section>
    )
}

export default ProfilePhotoPage;