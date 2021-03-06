import React from "react";
import { StyledNavBar } from "./styles";
import logo from 'assets/png/logo.png';
import UDMaterialButton from "app/modules/ud-ui/material-button/button";
import { useSelector } from "react-redux";
import { isLoggedSelector } from "app/modules/auth/store/current-user/selectors";
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import DnsIcon from '@material-ui/icons/DnsTwoTone';
import ContactsOutlinedIcon from '@material-ui/icons/ContactsOutlined';
import AppsIcon from '@material-ui/icons/Apps';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useHistory } from "react-router-dom";


const NavBar = () => {
    const userIsLogged = useSelector(isLoggedSelector)
    const history = useHistory()
    return (
        <StyledNavBar>
            <img src={logo} style={{ height: "100%" }} />
            <UDMaterialButton
                label="Главная"
                icon={<AppsIcon />}
                onClick={() => history.push("/products")}
            />
            <UDMaterialButton
                label="Каталог"
                icon={<DnsIcon />}
                onClick={() => history.push("/products")}
            />
            <UDMaterialButton
                label="Доставка и оплата"
                icon={<LocalShippingIcon />}
                onClick={() => history.push("/products")}
            />
            {userIsLogged ? (
                <div>
                    <UDMaterialButton label="Профиль" icon={<AccountBoxIcon />} />
                    <UDMaterialButton label="Выход" icon={<ExitToAppIcon />} />
                </div>
            ) : (
                    <div>
                        <UDMaterialButton label="Вход" icon={<LockOpenIcon />} />
                        <UDMaterialButton label="Регистрация" icon={<ContactsOutlinedIcon />} />
                    </div>
                )
            }
        </StyledNavBar>
    )
};

export default NavBar;
