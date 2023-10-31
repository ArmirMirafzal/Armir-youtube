import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "@mantine/core";
import queryString from "query-string";

import { emailVerify } from "modules/auth/service";

import ResetPassword from "./auth/reset-password";

interface ActionProps {}

interface IAction {
  mode: "verifyEmail" | "resetPassword";
  oobCode: string;
}

const Action = (props: ActionProps) => {
  const navigate = useNavigate();
  const { mode, oobCode } = queryString.parse(window.location.search) as unknown as IAction;
  const [isResetPassword, setIsResetPassword] = useState(false);

  useEffect(() => {
    const handleAction = async () => {
      switch (mode) {
        case "verifyEmail":
          await emailVerify(oobCode);
          window.location.href = "/";
          break;
        case "resetPassword":
          setIsResetPassword(true);
          break;
        default:
          navigate("/");
      }
    };

    handleAction();
  }, [mode, navigate, oobCode]);

  if (isResetPassword) return <ResetPassword oobCode={oobCode} />;

  return <Loader className="lazy-loader1" color="red" size="xl" variant="dots" />;
};

export default Action;
