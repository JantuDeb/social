import { Route, Routes } from "react-router-dom";
import { SignIn } from "./components/auth/SignIn";
import { SignUp } from "./components/auth/SignUp";
import { Feed } from "./components/feed/Feed";
import PrivateRoute from "./components/shared/PrivateRoute";
import { SidebarRight } from "./components/sidebar/SidebarRight";
import { Auth } from "./pages/auth/Auth";
import { Bookmark } from "./pages/bookmark/Bookmark";
import { Chats } from "./pages/chats/Chats";
import { Explore } from "./pages/explore/Explore";
import { Home } from "./pages/home/Home";
import { Profile } from "./pages/profile/Profile";
import { Theme } from "./pages/theme/Theme";

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Auth />}>
          <Route index element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
        </Route>
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        >
          <Route index path="feed" element={<Feed />} />
          <Route path="explore" element={<Explore />} />
          <Route path="discover" element={<SidebarRight />} />
          <Route path="bookmarks" element={<Bookmark />} />
          <Route path="chats" element={<Chats />} />
          <Route path="profile/:userId" element={<Profile />} />
          <Route path="theme" element={<Theme />} />
        </Route>
      </Routes>
    </>
  );
};
