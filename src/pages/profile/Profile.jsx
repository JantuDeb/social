import React, { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BsLink45Deg } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import { Post } from "../../components/post/Post";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserPosts } from "../../features/post/post-slice";
import { Modal } from "../../components/shared/Modal";
import { EditProfileForm } from "../../components/forms/EditProfileForm";
import { follow, unFollow } from "../../features/followers/followers-slice";
import { getUser } from "../../features/auth/auth-slice";

export const Profile = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { userId } = useParams();

  useEffect(() => {
    dispatch(fetchUserPosts(userId));
    dispatch(getUser(userId));
  }, [dispatch, userId]);

  const currentUser = useSelector((state) => state.auth.user);
  const userPosts = useSelector((state) => state.post.userPosts);
  const followings = useSelector((state) => state.follow.followings);
  const isFollowing = followings.some((user) => user._id === userId);
  const profile = useSelector((state) => state.auth.userProfileData);

  const userToShow = userId === currentUser._id ? currentUser : profile;

  const handleFollowUnfollow = () => {
    if (isFollowing) dispatch(unFollow(userId));
    else dispatch(follow(userId));
  };
  
  return (
    <>
      <div className={styles.profile}>
        <div className={styles.header}>
          <div className={styles.banner}>
            <img src={userToShow?.banner?.secure_url} alt="profile banner " />
          </div>
          <div className={styles.userInfo}>
            <div className={styles.profileImg}>
              <img src={userToShow?.photo?.secure_url} alt="profile" />
            </div>
            <div className={styles.editProfile}>
              {userId === currentUser._id ? (
                <button
                  className="btn btn-seconady"
                  onClick={() => setShowModal(true)}
                >
                  Edit Profile
                </button>
              ) : (
                <button
                  className="btn btn-seconady"
                  onClick={handleFollowUnfollow}
                >
                  {isFollowing ? "Unfollow" : "Follow"}
                </button>
              )}
            </div>
            <div className={styles.profileHandle}>
              <h4>{userToShow?.name}</h4>
              <p className="text-gray">@{userToShow?.username}</p>
            </div>
            <p>{userToShow?.bio}</p>

            <div className={styles.location}>
              <span>
                <HiOutlineLocationMarker size={20} />
                {userToShow?.location}
              </span>
              <span>
                <BsLink45Deg size={20} />
                <a
                  href={userToShow?.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {userToShow?.website}
                </a>
              </span>
            </div>

            <div className={styles.follow}>
              <Link to="/followers">
                {userToShow?.followers?.length}
                <span className="text-gray">Followers</span>
              </Link>
              <Link to="/following">
                {userToShow?.followings?.length}
                <span className="text-gray">Following</span>
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.posts}>
          {userPosts.map((post) => {
            return <Post key={post._id} post={post} />;
          })}
        </div>
      </div>

      {showModal && (
        <Modal>
          <EditProfileForm user={currentUser} setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
};
