import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import { Link } from 'react-router-dom';
import LoginLogout from './LoginLogout';



const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const PHONE_REGEX = /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/gm;
const AVATAR_REGEX = /(?!\?)(\d+)$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;



const Register = () => {

    const userRef = useRef();
    const errRef = useRef();



    const [userFn, setUserFn] = useState('');
    const [validNameFn, setValidNameFn] = useState(false);
    const [userFocusFn, setUserFocusFn] = useState(false);

    const [userLn, setUserLn] = useState('');
    const [validNameLn, setValidNameLn] = useState(false);
    const [userFocusLn, setUserFocusLn] = useState(false);

    const [userEmail, setUserEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setUserEmailFocus] = useState(false);

    const [userPhone, setUserPhone] = useState('');
    const [validPhone, setValidPhone] = useState(false);
    const [phoneFocus, setUserPhoneFocus] = useState(false);

    const [userAvatar, setUserAvatar] = useState('');
    const [validAvatar, setValidAvatar] = useState(false);
    const [avatarFocus, setUserAvatarFocus] = useState(false);


    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);




    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidNameFn(USER_REGEX.test(userFn));
    }, [userFn])

    useEffect(() => {
        setValidNameLn(USER_REGEX.test(userLn));
    }, [userLn])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(userEmail));
    }, [userEmail])

    useEffect(() => {
        setValidPhone(PHONE_REGEX.test(userPhone));
    }, [userPhone])

    useEffect(() => {
        setValidAvatar(AVATAR_REGEX.test(userAvatar));
    }, [userAvatar])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [userFn, userLn, userEmail, userPhone, pwd, matchPwd])




    const Register = async (e) => {

        e.preventDefault();

        try {

            const newUser = { "email": userEmail, "first_name": userFn, "last_name": userLn, "phone": userPhone, "password": pwd, "avatar": userAvatar }
            const apiEndpoint = "https://simplor.herokuapp.com/api/user/register"

            const res = await axios({
                method: "POST",
                url: apiEndpoint,
                data: newUser
            })
                .then(res => console.log(`Status: ${res.status}`))
                .then(res => console.log(`Token: ${res.data}`))
                .then(res => setSuccess(true))
                .then(res => alert(`${userFn} ${userLn} has been registered successfully`))
                .catch(err => console.error(err))


            setUserFn('');
            setUserLn('');
            setUserEmail('');
            setUserPhone('');
            setUserAvatar('');
            setPwd('');
            setMatchPwd('');


        } catch (err) {
            if (!err?.res) {
                setErrMsg('No Server Response');
            } else if (err.res?.status === 409) {
                setErrMsg('Username Taken');
            } else if (err.res?.status === 400) {
                setErrMsg(`Email ${userEmail} has been taken`);
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }





    return (
        <>
            {success ?
                (<section>
                    <h1>Success!</h1>
                    <p>
                        <a href="#">Sign In</a>
                    </p>
                </section>)
                : (
                    <section>
                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                        <h1 className="font-bold text-white">Register</h1>
                        <form onSubmit={Register}>
                            <label className="text-white" htmlFor="usernameFirstName">
                                First Name:
                            <FontAwesomeIcon icon={faCheck} className={validNameFn ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validNameFn || !userFn ? "hide" : "invalid"} />
                            </label>
                            <input
                                type="text"
                                id="usernameFirstName"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setUserFn(e.target.value)}
                                value={userFn}
                                required
                                aria-invalid={validNameFn ? "false" : "true"}
                                aria-describedby="uidnote"
                                onFocus={() => setUserFocusFn(true)}
                                onBlur={() => setUserFocusFn(false)}
                            />
                            <p id="uidnote" className={userFocusFn && userFn && !validNameFn ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                4 to 24 characters.<br />
                                Must begin with a letter.<br />
                                Letters, numbers, underscores, hyphens allowed.
                            </p>

                            <label className="text-white" htmlFor="usernameLastName">
                                Last Name:
                            <FontAwesomeIcon icon={faCheck} className={validNameLn ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validNameLn || !userLn ? "hide" : "invalid"} />
                            </label>
                            <input
                                type="text"
                                id="usernameLastName"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setUserLn(e.target.value)}
                                value={userLn}
                                required
                                aria-invalid={validNameLn ? "false" : "true"}
                                aria-describedby="uidnote"
                                onFocus={() => setUserFocusLn(true)}
                                onBlur={() => setUserFocusLn(false)}
                            />
                            <p id="uidnote" className={userFocusLn && userLn && !validNameLn ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                4 to 24 characters.<br />
                                Must begin with a letter.<br />
                                Letters, numbers, underscores, hyphens allowed.
                            </p>


                            <label className="text-white" htmlFor="useremail">
                                Email:
                                <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validEmail || !userEmail ? "hide" : "invalid"} />
                            </label>
                            <input
                                type="text"
                                id="useremail"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setUserEmail(e.target.value)}
                                value={userEmail}
                                required
                                aria-invalid={validEmail ? "false" : "true"}
                                onFocus={() => setUserEmailFocus(true)}
                                onBlur={() => setUserEmailFocus(false)}
                            />


                            <label className="text-white" htmlFor="userphone">
                                Phone:
                                <FontAwesomeIcon icon={faCheck} className={validPhone ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validPhone || !userPhone ? "hide" : "invalid"} />
                            </label>
                            <input
                                type="text"
                                id="userphone"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setUserPhone(e.target.value)}
                                value={userPhone}
                                required
                                aria-invalid={validPhone ? "false" : "true"}
                                onFocus={() => setUserPhoneFocus(true)}
                                onBlur={() => setUserPhoneFocus(false)}
                            />


                            <label className="text-white" htmlFor="useravatar">
                                Avatar:
                                <FontAwesomeIcon icon={faCheck} className={validAvatar ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validAvatar || !userAvatar ? "hide" : "invalid"} />
                            </label>
                            <input
                                type="text"
                                id="useravatar"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setUserAvatar(e.target.value)}
                                value={userAvatar}
                                required
                                aria-invalid={validAvatar ? "false" : "true"}
                                onFocus={() => setUserAvatarFocus(true)}
                                onBlur={() => setUserAvatarFocus(false)}
                            />



                            <label className="text-white" htmlFor="password">
                                Password:
                            <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
                            </label>
                            <input
                                type="password"
                                id="password"
                                onChange={(e) => setPwd(e.target.value)}
                                value={pwd}
                                required
                                aria-invalid={validPwd ? "false" : "true"}
                                aria-describedby="pwdnote"
                                onFocus={() => setPwdFocus(true)}
                                onBlur={() => setPwdFocus(false)}
                            />
                            <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                            </p>


                            <label className="text-white" htmlFor="confirm_pwd">
                                Confirm Password:
                            <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                            </label>
                            <input
                                type="password"
                                id="confirm_pwd"
                                onChange={(e) => setMatchPwd(e.target.value)}
                                value={matchPwd}
                                required
                                aria-invalid={validMatch ? "false" : "true"}
                                aria-describedby="confirmnote"
                                onFocus={() => setMatchFocus(true)}
                                onBlur={() => setMatchFocus(false)}
                            />
                            <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the first password input field.
                        </p>

                            <button disabled={!validNameFn || !validNameLn || !validPwd || !validMatch ? true : false}>Sign Up</button>
                        </form>
                        <p className="">
                            Already registered?<br />
                            <span className="line"><Link to={"/LoginLogout"}>Sign In</Link></span>
                        </p>

                    </section>
                )}
        </>
    )
}

export default Register
