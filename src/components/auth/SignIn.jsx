import { useState } from "react";
import styles from "./SignIn.module.css";
import { FaUserLock } from "react-icons/fa";
import { IoMailOpenOutline } from "react-icons/io5";
// import { BsFacebook, BsGoogle, BsTwitter } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/auth/auth-slice";
import { useNavigate } from "react-router-dom";
import Button from "../loader/Button";

export const SignIn = () => {
  const [user, setUser] = useState({
    email: "jantu@gmail.com",
    password: "123456",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {loginStatus:status, loginError} = useSelector((state) => state.auth);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login(user)).unwrap();
      navigate("/home/feed", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  const inputChangeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <form className={styles.signIn}>
      <div className={styles.inputBox}>
        <IoMailOpenOutline size={20} />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={user.email}
          onChange={inputChangeHandler}
        />
      </div>
      <div className={styles.inputBox}>
        <FaUserLock size={20} />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={user.password}
          onChange={inputChangeHandler}
        />
      </div>
      <Button
        clickHandler={handleLogin}
        btnStyle="btn btn-primary"
        text="Login"
        loading={status === "loading"}
        disabled={status === "loading"}
      />
      <p className={styles.error}>{loginError}</p>
      {/* <div className={styles.social}>
        <BsFacebook size={30} />
        <BsGoogle size={30} />
        <BsTwitter size={30} />
      </div> */}
    </form>
  );
};
