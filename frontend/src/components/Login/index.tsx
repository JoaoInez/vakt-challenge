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
import { loginAPI } from "api";
import { getErrorMessage } from "helpers";
import { ErrorMessageT } from "types";
import styles from "../../styles/Auth.module.scss"; // Need relative path for CSS Modules autocompletion

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<ErrorMessageT>(null);
  const [_, setSession] = useSessionContext();
  const router = useRouter();

  const onLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = await loginAPI(username, password);

    if (data.error === 400) {
      setError({
        error: "INVALID_CREDENTIALS",
        message: getErrorMessage("INVALID_CREDENTIALS"),
      });
    } else if (data.error === 500)
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

  return (
    <section className={styles.section}>
      <h1>Log in to VAKT Trading</h1>
      <form onSubmit={onLogin}>
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={onChange(setUsername)}
          placeholder="username"
          className={error?.error === "INVALID_CREDENTIALS" ? styles.error : ""}
          required={true}
        />
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={onChange(setPassword)}
          placeholder="password"
          className={error?.error === "INVALID_CREDENTIALS" ? styles.error : ""}
          required={true}
        />
        <hr />
        <input
          type="submit"
          value="Login"
          className="btn-primary"
          disabled={!username || !password}
        />
      </form>
      {error && <p className={styles.errorMessage}>{error.message}</p>}
      <p>
        Don't have an account?{" "}
        <Link href="/signup">
          <a>Sign up</a>
        </Link>
      </p>
    </section>
  );
};

export default Login;
