import React from "react";
import SignInReduxForm from "../../components/sign-in-form";
import { AuthCredentials } from "app/modules/auth/domain/interfaces/AuthCredentials";
import { useDispatch, useSelector } from "react-redux";
import { login } from "app/modules/auth/store/current-user/actions";
import { isLoggedSelector } from "app/modules/auth/store/current-user/selectors";
import { Redirect } from "react-router-dom";
import { StyledSignInPage, StyledCard } from "./styles";

type SignInProps = {}

const SignIn = (props: SignInProps) => {
    const dispatch = useDispatch();
    const userIsLogged = useSelector(isLoggedSelector)
    const onSubmit = (formData: AuthCredentials) => {
        debugger
        dispatch(login(formData))
    }

    if (!userIsLogged) {
        return <StyledSignInPage>
            <StyledCard>
                <p className="bold-text fs36 m-0 text-center">Авторизация</p>
                <SignInReduxForm onSubmit={onSubmit} />
            </StyledCard>
        </StyledSignInPage>
    } else return <Redirect to="/" />
};

export default SignIn;
