import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {registerRoute, loginRoute} from '../utils/APIRoutes';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './SignUpPage.css';

function SignUpPage() {
    const navigate = useNavigate();
    const [signUpData, setSignUpData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const toastOptions = {
        position: "top-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    }

    useEffect(() => {
        if(localStorage.getItem('chat-app-user')) {
            navigate('/')
        }
    }, [navigate])

    const [loginData, setLoginData] = useState({
        username: "",
        password: "",
    });

    function handleSlideLeft() {
        document.querySelectorAll('form').forEach(form => {
            form.style.translate = `-100%`
        })
        document.querySelector('form').parentElement.style.backgroundPosition = '100%'
    }
    function handleSlideRight() {
        document.querySelectorAll('form').forEach(form => {
            form.style.translate = `0%`
        })
        document.querySelector('form').parentElement.style.backgroundPosition = '0%'
    }


    function handleSignUp(e) {
        setSignUpData({...signUpData, [e.target.name]: e.target.value})
    }

    function handleLogin(e) {
        setLoginData({...loginData, [e.target.name]: e.target.value})
    }

    async function handleSignUpValidation() {
        const {password, confirmPassword, email, username} = signUpData;
        if(password !== confirmPassword) {
            toast.error("The two passwords do not match", toastOptions);
        }else if(password.length < 8) {
            toast.error("Your password should be 8 characters or longer", toastOptions);
        }else if(username.length < 3) {
            toast.error("Your username should be 3 characters or longer", toastOptions);
        }else if(email === "") {
            toast.error("Please add your email", toastOptions);
        }else {
            const data = await fetch(registerRoute, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username,
                    email,
                    password   
                })
            })
            const response = await data.json();
            if(response.status === false) {
                toast.error(response.msg, toastOptions);
            }else if(response.status === true) {
                localStorage.setItem('chat-app-user', JSON.stringify(response.user));
                navigate('/profilepicture')
            }
            
        }
    }

    async function handleLoginValidation() {
        const {username, password} = loginData;
        if(username === '') {
            toast.error("Please add your username", toastOptions);
        }else if(password === "") {
            toast.error("Please add your password", toastOptions);
        }else {
            const data = await fetch(loginRoute, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username,
                    password    
                })
            })
            const response = await data.json();
            if(response.status === false) {
                toast.error(response.msg, toastOptions);
            }else if(response.status === true) {
                localStorage.setItem('chat-app-user', JSON.stringify(response.user));
                navigate('/')
            }
        }
    }

    return (
        <>
            <section id="sign-up-page">
            <div className="form-wrapper">
                <form>
                    <input type="text" name="username" placeholder='Username' onChange={e => {handleSignUp(e)}} aria-label='Username Input'/>
                    <input type="email" name="email" placeholder='Email' onChange={e => {handleSignUp(e)}} aria-label='Email Input'/>
                    <input type="password" name="password" placeholder='Password' onChange={e => {handleSignUp(e)}} aria-label='Password Input'/>
                    <input type="password" name="confirmPassword" placeholder='Confirm Password' onChange={e => {handleSignUp(e)}} aria-label='Confirm Password Input'/>
                    <button type="button" className="cta" onClick={handleSignUpValidation}>Sign Up</button>
                    <p className="hint" onClick={handleSlideLeft}>Already have an account? <span>Login</span></p>
                </form>
                <form>
                    <input type="text" name="username" placeholder='Username' onChange={e => {handleLogin(e)}} aria-label='Username Input'/>
                    <input type="password" name="password" placeholder='Password' onChange={e => {handleLogin(e)}} aria-label='Password Input'/>
                    <button type="button" className="cta" onClick={handleLoginValidation}>Login</button>
                    <p className="hint" onClick={handleSlideRight}>Don't have an account? <span>Sign Up</span></p>
                </form>
            </div>
        </section>
        <ToastContainer/>
        </>
    )
}

export default SignUpPage;