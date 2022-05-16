import styles from "./EditProfileForm.module.css";
import { MdOutlineCameraEnhance } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../features/auth/auth-slice";
import Button from "../loader/Button";
export const EditProfileForm = ({ user, setShowModal }) => {
  const [userData, setUserData] = useState({
    name: user?.name || "",
    bio: user?.bio || "",
    location: user?.location || "",
    website: user?.website || "",
    photo: "",
    banner: "",
  });

  const [imgUrl, setImgUrl] = useState({
    photoUrl: user?.photo?.secure_url || "",
    bannerUrl: user?.banner?.secure_url || "",
  });

  const status = useSelector((state) => state.auth.updateProfileStatus);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const key = e.target.id;
    const val = e.target.value;
    console.log(key, val);
    setUserData({ ...userData, [key]: val });
  };

  const bannerHandler = (e) => {
    setUserData({ ...userData, banner: e.target.files[0] });
    const fileReader = new FileReader();
    fileReader.onload = function (ev) {
      setImgUrl({ ...imgUrl, bannerUrl: ev.target.result });
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  const photoHandler = (e) => {
    setUserData({ ...userData, photo: e.target.files[0] });
    const fileReader = new FileReader();
    fileReader.onload = function (ev) {
      setImgUrl({ ...imgUrl, photoUrl: ev.target.result });
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = async () => {
    try {
      if (userData.photo || userData.banner) {
        const formData = new FormData();
        Object.entries(userData).forEach(([key, value]) => {
          if (value) formData.append(key, value);
        });

        await dispatch(updateProfile(formData)).unwrap();
      } else {
        await dispatch(updateProfile(userData)).unwrap();
      }
      setShowModal(false)
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.modalHeader}>
        <div className={styles.headerLeft}>
          <button
            className={styles.btnClose}
            onClick={() => setShowModal(false)}
          >
            <IoCloseSharp size={25} />
          </button>
          <h2>Edit Profile</h2>
        </div>
        <Button
          loading={status === "loading"}
          text="Save"
          clickHandler={handleSubmit}
          disabled={status === "loading"}
        />
      </div>
      <section className={styles.editProfile}>
        <div className={styles.header}>
          <div className={styles.banner}>
            <img src={imgUrl.bannerUrl} alt="profile banner " />
            <div className={styles.fileInputBox}>
              <input
                type="file"
                id="banner"
                name="bannerUrl"
                className={styles.file}
                onChange={bannerHandler}
              />
              <label htmlFor="banner">
                <MdOutlineCameraEnhance size={25} />
              </label>
            </div>
          </div>
          <div className={styles.userInfo}>
            <div className={styles.profileImg}>
              <img src={imgUrl.photoUrl} alt="profile" />
              <div className={styles.fileInputBox}>
                <input
                  type="file"
                  id="photo"
                  name="photoUrl"
                  className={styles.file}
                  onChange={photoHandler}
                />
                <label htmlFor="photo">
                  <MdOutlineCameraEnhance size={25} />
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.inputBox}>
          <div className={styles.inputGroup}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className={styles.input}
              id="name"
              value={userData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="bio">Bio</label>
            <input
              type="text"
              className={styles.input}
              id="bio"
              value={userData.bio}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="location">Location</label>
            <input
              type="text"
              className={styles.input}
              id="location"
              value={userData.location}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="website">Website</label>
            <input
              type="text"
              className={styles.input}
              id="website"
              value={userData.website}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </section>
    </div>
  );
};
