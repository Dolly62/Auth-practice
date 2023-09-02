import { Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import { useContext, useEffect, useRef } from "react";
import AuthContext from "../../store/context";
import { useHistory } from "react-router-dom";
// mainNav
const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const timerRef = useRef(null);

  const isLoggedIn = authCtx.isLoggedIn;

  const logOutHandler = () => {
    authCtx.logout();
    clearTimeout(timerRef.current);
    history.replace("/auth");
  };
  //Auto Logout
  useEffect(() => {
    if (isLoggedIn) {
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        logOutHandler();
      }, 6000);

      localStorage.setItem("timer", timerRef.current.toString());
    } else {
      clearTimeout(timerRef.current);

      const storedTimer = localStorage.getItem("timer");
      if (storedTimer) {
        clearTimeout(parseInt(storedTimer));
        localStorage.removeItem("timer");
      }
    }
  }, [isLoggedIn, history]);

  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button onClick={logOutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
