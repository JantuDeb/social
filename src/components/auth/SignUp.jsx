import styles from "./SignUp.module.css";
import { FaUser, FaUserLock } from "react-icons/fa";
import { IoMailOpenOutline } from "react-icons/io5";
import { BsFacebook, BsGoogle, BsTwitter } from "react-icons/bs";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../features/auth/auth-slice";
import { useNavigate } from "react-router-dom";
import Button from "../loader/Button";
export const SignUp = () => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    email: "",
    username: "",
    name: "",
    password: "",
  });

  const status = useSelector((state) => state.auth.signUpStatus);

  const inputChangeHandler = (e) => {
    setUserData((data) => ({ ...data, [e.target.name]: e.target.value }));
  };
  const navigate = useNavigate();
  const signupHandler = async (e) => {
    e.preventDefault();
    try {
      await dispatch(signup(userData)).unwrap();
      navigate("/home/feed", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form className={styles.signUp}>
      <div className={styles.inputBox}>
        <FaUser />
        <input
          name="username"
          value={userData.username}
          onChange={inputChangeHandler}
          type="text"
          placeholder="Username"
        />
      </div>

      <div className={styles.inputBox}>
        <IoMailOpenOutline />
        <input
          name="email"
          value={userData.email}
          onChange={inputChangeHandler}
          type="email"
          placeholder="email"
        />
      </div>
      <div className={styles.inputBox}>
        <FaUser />
        <input
          name="name"
          value={userData.name}
          onChange={inputChangeHandler}
          type="text"
          placeholder="Name"
        />
      </div>
      <div className={styles.inputBox}>
        <FaUserLock />
        <input
          name="password"
          value={userData.password}
          onChange={inputChangeHandler}
          type="password"
          placeholder="Password"
        />
      </div>
      <Button
        clickHandler={signupHandler}
        btnStyle="btn btn-primary"
        text="Sign up"
        loading={status === "loading"}
        disabled={status === "loading"}
      />

      <p className={styles.socialText}>Or Sign in with social platforms</p>
      <div className={styles.social}>
        <BsFacebook size={30} />
        <BsGoogle size={30} />
        <BsTwitter size={30} />
      </div>
    </form>
  );
};
