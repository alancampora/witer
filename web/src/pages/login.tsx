import React from "react";
import { Formik, Form } from "formik";
import { Box, Button } from "@chakra-ui/core";
import { Wrapper } from "../components/wrapper";
import { InputField } from "../components/input";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/to-error-map";
import { useRouter } from "next/router";

const Login: React.FC<> = ({}) => {
  const [, login] = useLoginMutation();
  const route = useRouter();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (userData, { setErrors }) => {
          const response = await login({ options: userData });
          const errors = response.data?.login.errors;
          if (errors) {
            setErrors(toErrorMap(errors));
          } else {
            //success
            route.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="username"
              placeholder="username"
              label="Username"
            />
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
              />
            </Box>
            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              variantColor="teal"
            >
              login
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Login;
