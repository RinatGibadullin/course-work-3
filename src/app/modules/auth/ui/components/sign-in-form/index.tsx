import React from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import UDButton from "../../../../ud-ui/button/button";
import { AuthCredentials } from "app/modules/auth/domain/interfaces/AuthCredentials";
import UDInput from "app/modules/ud-forms/form-input/input";
import { requiredCreator } from "app/modules/validation/common-validator";
import { useSelector } from "react-redux";
import { isAuthCheckingSelector } from "app/modules/auth/store/current-user/selectors";
import UDLoader from "app/modules/ud-ui/loader/loader";

const emailRequired = requiredCreator("Введите email")
const passwordRequired = requiredCreator("Введите пароль")

const SignInForm: React.FC<InjectedFormProps<AuthCredentials>> = ({ handleSubmit, error, pristine, submitting, invalid }) => {
    const isLoading = useSelector(isAuthCheckingSelector)
    return <form className="d-flex flex-column"
        onSubmit={handleSubmit}>
        <div className="d-flex flex-column my-11">
            <div className="d-flex flex-column mb-9">
                <Field component={UDInput}
                    placeholder="E-mail"
                    validate={[emailRequired]}
                    disabled={isLoading}
                    name={"email"}
                    props={{ lg: true }} />
            </div>
            <div className="d-flex flex-column">
                <Field component={UDInput}
                    placeholder="Пароль"
                    validate={[passwordRequired]}
                    disabled={isLoading}
                    type="password"
                    name={"password"}
                    props={{ lg: true }} />
            </div>
        </div>
        {isLoading ? <UDLoader /> : ""}
        <UDButton size='lg' disabled={pristine || submitting || invalid || isLoading} label="Войти" />
    </form>
};

const SignInReduxForm = reduxForm<AuthCredentials>({ form: 'sign_in' })(SignInForm)

export default SignInReduxForm;
