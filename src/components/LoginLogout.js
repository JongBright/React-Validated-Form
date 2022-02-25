import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from "./AuthProvider";
import axios from 'axios';
import { Link } from 'react-router-dom';
import Register from './Register';



let token = '';

const LoginLogout = () => {

    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();


    const [userEmail, setUserEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);


    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [userEmail, pwd])

    const setToken = (tokenVal) => {
        token = tokenVal;
    }


    const Login = async (e) => {

        e.preventDefault();

        const userInfo = { "email": userEmail, "password": pwd }
        const apiEndpoint = "https://simplor.herokuapp.com/api/user/login"


        try {
            const res = await axios({
                method: "POST",
                url: apiEndpoint,
                data: userInfo
            })
                .then(res => setToken(`${res.data.token}`))
                .then(res => setSuccess(true))
                .then(res => alert('You have logged in successfully'))
                .catch(err => console.error(err))


            const accessToken = res?.data?.accessToken;
            const roles = res?.data?.roles;
            setAuth({ userEmail, pwd, roles, accessToken });
            setUserEmail('');
            setPwd('');


        } catch (err) {
            if (!err?.res) {
                setErrMsg('No Server Response');
            } else if (err.res?.status === 400) {
                setErrMsg('Incorrect Email or Password');
            } else if (err.res?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    const Logout = async (e) => {

        const tokenVal = token;
        const apiEndpoint = "https://simplor.herokuapp.com/api/user/logout"

        const res = await axios({
            method: "POST",
            url: apiEndpoint,
            data: { "refresh_token": token }
        })
            .then(res => console.log(`Status: ${res.status}`))
            .then(res => setSuccess(true))
            .then(res => alert('You have logged out successfully'))
            .catch(err => console.error(err))

    }

    return (
        <>
            {success ? (
                <section>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                        <a onClick={Logout} href="#">Logout</a>
                    </p>
                </section>
            ) : (
                    <section>
                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                        <h1 className="font-bold text-white">Sign In</h1>
                        <form onSubmit={Login}>
                            <label className="text-white" htmlFor="useremail">Email:</label>
                            <input
                                type="text"
                                id="useremail"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setUserEmail(e.target.value)}
                                value={userEmail}
                                required
                            />

                            <label className="text-white" htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                onChange={(e) => setPwd(e.target.value)}
                                value={pwd}
                                required
                            />
                            <button>Sign In</button>
                        </form>
                        <p>
                            Need an Account?<br />
                            <span className="line"><Link to={"/Register"}>Sign Up</Link></span>
                        </p>
                    </section>
                )}
        </>
    )
}

export default LoginLogout;
