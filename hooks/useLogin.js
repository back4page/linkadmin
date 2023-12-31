import { toast } from "react-toastify";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

function useLogin() {
  const router = useRouter();

  // const { data } = useSession();
  // const { id, user_name, institution_name, role } = data ? data.user : "";

  // const loginUser = async (values, formik) => {
  //   if (values.username !== values.password) {
  //     toast.error("Username and Password do not match");
  //   } else {
  //     const res = await signIn("credentials", {
  //       ...values,
  //       // callbackUrl: `${window.location.origin}/`,
  //       redirect: false,
  //     });

  //     const { ok, error } = res;

  //     if (ok) {
  //       console.log(res);
  //       toast.success("Signed in Successfully");
  //       await router.push("/");
  //     }
  //     // else {
  //     //   toast.error("Something went wrong");
  //     // }
  //     if (error) {
  //       console.log(res);
  //       toast.error(error);
  //       // toast.error("Something went wrong");
  //     }
  //   }
  // };

  const loginUser = async (values) => {
    const res = await signIn("credentials", {
      ...values,
      callbackUrl: `${window.location.origin}`,
      redirect: false,
    });
    const { ok, error } = res;
    if (ok) {
      console.log(res);
      // toast.success("Signed in Successfully");
      // await router.push("/");
      router.reload();
    }
    if (error) {
      console.log(res);
      toast.error(error);
      // toast.error("Something went wrong");
    }

    // await signIn("credentials", {
    //   ...values,
    //   callbackUrl: `${window.location.origin}`,
    //   redirect: false,
    // }).then((callback) => {
    //   console.log(callback);

    //   if (callback?.ok) {
    //     console.log(callback);
    //     // router.reload();
    //     router.push("/");
    //   }

    //   if (callback?.error) {
    //     toast.error("Something went wrong");
    //   }
    // });
  };

  return { loginUser };
}

export default useLogin;
