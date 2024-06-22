"use client";

import { signIn } from "@/actions/auth";
import { useFormState } from "react-dom";

export default function Page() {
  const [state, formAction] = useFormState(signIn, {
    message: "",
  });
  return (
    <div>
      {state?.message && <p>{state.message}</p>}
      <form action={formAction}>
        <label>
          Email
          <input name="email" type="email" />
        </label>
        <label>
          Password
          <input name="password" type="password" />
        </label>
        <button>Sign In</button>
      </form>
    </div>
  );
}
