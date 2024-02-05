import "./header.css";
import excel_logo from "../../images/Group.png";
import usaFlag from "../../images/usaFlag.png";
import user_icon from "../../images/userIcon.png";
const Header = () => {
  return (
    <>
      <header className="header">
        <nav className="navbar navbar-expand-lg navbar-light bg-light navbar_mainHeader">
          <div className="container-fluid align-items-center">
            <img src={excel_logo} className="excel_logo" />
            <h2 className="costpoint_heading">Costpoint.pro</h2>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse main_navBar"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav  mb-2 mb-lg-0 navbar_header">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">
                    Support
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    About
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Products
                  </a>
                </li>
              </ul>
            </div>
             
          </div>
              <div className="user_info d-flex">
                <div class="dropdown">
                  <button
                    class="text-white dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                <img src={usaFlag} height="20" width="20"/>    English
                  </button>
                  <ul
                    class="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <li>
                      <a class="dropdown-item" href="#">
                        Actions
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">
                        Another action
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">
                        Something else here
                      </a>
                    </li>
                  </ul>
                </div>
                <div class="dropdown">
                  <button
                    class=""
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                  <img src={user_icon}/>
                  </button>
                  <ul
                    class="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li>
                      <a class="dropdown-item" href="#">
                        Action
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">
                        Another action
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">
                        Something else here
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
        </nav>
      </header>
    </>
  );
};
export default Header;
