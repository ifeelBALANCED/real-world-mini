import { EditOutlined, MenuOutlined } from "@ant-design/icons";
import { Avatar, Button, Drawer } from "antd";
import classNames from "classnames";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";
import { usePathname } from "@/hooks/usePathname";
import routes from "@/navigation/routes";
import {
  profileLoadingSelector,
  profileUserStateSelector,
} from "@/store/selectors/profile.selectors";
import { reset } from "@/store/slices/auth.slice";
import { useTypedDispatch, useTypedSelector } from "@/store/store";
import { logout } from "@/store/thunks/auth.thunk";
import { getUsersSettings } from "@/store/thunks/profile.thunks";

import logo from "../../../../assets/logo.svg";
import styles from "./assets/navbar.module.scss";

type NavBarProps = {
  menu: JSX.Element;
};

const NavBar = ({ menu }: NavBarProps) => {
  const [visible, setVisible] = useState<boolean>(false);
  const navigate = useNavigate();
  const pathname = usePathname();
  const dispatch = useTypedDispatch();
  const { user } = useAuth();
  const isLoggedIn = !!user;
  const onLogout = useCallback(() => {
    dispatch(logout());
    dispatch(reset());
    navigate(routes.LOGIN);
  }, [dispatch, navigate]);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const userInfo = useTypedSelector(profileUserStateSelector);
  const isLoading = useTypedSelector(profileLoadingSelector);

  useEffect(() => {
    dispatch(getUsersSettings());
  }, [dispatch]);

  return (
    <nav className={styles.navbar}>
      <Button
        className={styles.menu}
        type="primary"
        icon={<MenuOutlined />}
        onClick={showDrawer}
      />
      <Link to={routes.HOME}>
        <img src={logo} className={styles.logo} alt="logo" />
      </Link>
      <Drawer
        closable
        title="Nestjs Admin"
        placement="left"
        visible={visible}
        onClose={onClose}
      >
        {menu}
      </Drawer>
      {isLoading ? (
        <span className={classNames("spinner-border spinner-border-sm")} />
      ) : (
        <div className={styles.headerWrapper}>
          {isLoggedIn ? (
            <div
              className={classNames(
                "site-layout-background",
                styles.headerContent
              )}
            >
              <div className={classNames(styles.headerContentText)}>
                <Link to={routes.EDITOR} className={styles.newArticleButton}>
                  <EditOutlined />
                  New article
                </Link>
                <Link to={`/${userInfo?.username}`}>
                  <span>Hi, {userInfo?.username}</span>
                  <Avatar src="https://joeschmoe.io/api/v1/random" />
                </Link>
              </div>
              <div>
                {pathname === routes.DOGS && (
                  <Button
                    type="primary"
                    className={classNames(styles.createDogButton)}
                    onClick={() => navigate(routes.CREATE_DOG)}
                  >
                    Create
                  </Button>
                )}
                <Button onClick={onLogout}>Log out</Button>
              </div>
            </div>
          ) : null}
        </div>
      )}
    </nav>
  );
};
export default NavBar;
