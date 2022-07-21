import { FC } from "react";
import { Link } from "react-router-dom";

import styles from "./styles/not-found.module.scss";

const NotFound: FC = () => {
  return (
    <section className={styles.page404}>
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="col-sm-offset-1 text-center">
              <div className={styles.fourZeroFourBg}>
                <h1 className="text-center">404</h1>
              </div>
              <div className={styles.contantBox404}>
                <h3 className="h2">Look like you`re lost</h3>
                <p>the page you are looking for not avaible!</p>
                <Link to="/" className={styles.link404}>
                  Go to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
