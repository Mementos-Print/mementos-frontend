import { useState } from "react";
import {
  AuthGoogle,
  FormBody,
  FormFoot,
  Input,
  SubmitButton,
} from "../../components/ui/Auth";
import { signup } from "./auth";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// import { useSetSelected } from "../../hooks/useSetSelected";

const SignUp = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(Boolean);
  const navigate = useNavigate();
  // const setSelected = useSetSelected();

  const handleAuth = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !name || !password) return;
    setLoading(true);
    signup(email, name, password)
      .then(() => {
        navigate("/dashboard");
        // setSelected("isAuthenticated", true);
      })
      .catch((err) => {
        toast.error(err.response?.data.Error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <>
      <FormBody onSubmit={handleAuth}>
        <Input
          type="name"
          id="name"
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="email"
          id="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          id="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div>
          <input type="checkbox" className="mr-1" />
          <span className="mb-11 text-sm">
            Save my email and pasword on this website
          </span>
        </div>
        <SubmitButton type="Create Account" isLoading={loading} />
        <FormFoot
          ques="Have an account?"
          option="Login"
          linkTo="/auth/user/signin"
        />
        <AuthGoogle />
      </FormBody>
      <ToastContainer />
    </>
  );
};

export default SignUp;
