import { Formik, Form } from "formik";
import { PasswordField, TextField } from "../components/common/InputField";
import { getSession } from "next-auth/react";
import usePostData from "../hooks/usePostData";

function ForgotPasswordPage() {
  const initialvalues = {
    username: "",
    password: "",
  };

  const { postData } = usePostData("/change/password");

  const handleSubmit = (values, formik) => {
    // console.log(values);
    const goto = "/sign-in";
    postData(values, goto, formik);
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        {/* {loading && <FullPageLoader />} */}

        <div className="bg-white px-5 lg:px-10 py-14 shadow-lg rounded">
          <h1 className="text-2xl font-semibold text-center">
            Change Password
          </h1>
          <div className="mt-8">
            <Formik
              initialValues={initialvalues}
              // validationSchema={validate}
              onSubmit={handleSubmit}
            >
              {(formik) => (
                <Form>
                  <div className="text-sm gap-y-5 md:gap-y-7">
                    <div className="min-w-[300px] lg:min-w-[350px] space-y-4">
                      <TextField
                        label="Admin Username *"
                        name="username"
                        type="text"
                      />

                      <PasswordField label="New Password *" name="password" />
                    </div>
                    <button
                      type="submit"
                      className="mt-8 w-full py-3 bg-custom-blue2 rounded  hover:bg-custom-blue4 text-white font-bold active:scale-95 transition duration-300"
                    >
                      Submit
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default ForgotPasswordPage;
