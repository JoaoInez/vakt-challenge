import {
  useState,
  FormEvent,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import useSessionContext from "hooks/useSessionContext";
import { signUpAPI } from "api";
import { getErrorMessage } from "helpers";
import { ErrorMessageT } from "types";
import styles from "../../styles/Auth.module.scss"; // Need relative path for CSS Modules autocompletion

const SignUp = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<ErrorMessageT>(null);
  const [_, setSession] = useSessionContext();
  const router = useRouter();

  const onSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = await signUpAPI(username, password);

    if (data.error === 400)
      setError({
        error: "USER_ALREADY_EXISTS",
        message: getErrorMessage("USER_ALREADY_EXISTS"),
      });
    else if (data.error === 500)
      setError({
        error: "INTERNAL_SERVER_ERROR",
        message: getErrorMessage("INTERNAL_SERVER_ERROR"),
      });
    else {
      setSession((_session) => ({
        user: data.user,
        loading: _session.loading,
      }));
      router.replace("/listings");
    }
  };

  const onChange = (setFunction: Dispatch<SetStateAction<string>>) => (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setError(null);
    setFunction(e.currentTarget.value);
  };

  const checkPassword = () => {
    if (password !== confirmPassword)
      setError({
        error: "PASSWORDS_DONT_MATCH",
        message: getErrorMessage("PASSWORDS_DONT_MATCH"),
      });
  };

  return (
    <section className={styles.section}>
      <h1>Sign up to VAKT Trading</h1>
      <form onSubmit={onSignUp}>
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={onChange(setUsername)}
          placeholder="username"
          className={error?.error === "USER_ALREADY_EXISTS" ? styles.error : ""}
          required={true}
        />
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={onChange(setPassword)}
          placeholder="password"
          required={true}
        />
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          value={confirmPassword}
          onChange={onChange(setConfirmPassword)}
          onBlur={checkPassword}
          placeholder="confirm password"
          className={
            error?.error === "PASSWORDS_DONT_MATCH" ? styles.error : ""
          }
          required={true}
        />
        <hr />
        <input
          type="submit"
          value="Sign Up"
          className="btn-primary"
          disabled={
            !username ||
            !password ||
            !confirmPassword ||
            password !== confirmPassword
          }
        />
      </form>
      {error && <p className={styles.errorMessage}>{error.message}</p>}
      <p>
        Already have an account?{" "}
        <Link href="/login">
          <a>Login</a>
        </Link>
      </p>
    </section>
  );
};

export default SignUp;
