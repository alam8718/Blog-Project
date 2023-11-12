import React, {useState} from "react";
import {login as authLogin} from "../store/authSlice";
import {Button, Input, Logo} from "./index";
import {useDispatch} from "react-redux";
import authService from "../appwrite/auth";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {register, handleSubmit} = useForm();
  const [error, setError] = useState("");

  return <div>Login</div>;
}

export default Login;
