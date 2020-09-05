import React from "react";
import { Formik, Form } from "formik";
import { Box, Button } from "@chakra-ui/core";
import { Wrapper } from "../components/wrapper";
import { InputField } from "../components/input";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/to-error-map";
import { useRouter } from "next/router";

interface registerProps {
  name: string;
}
const Register: React.FC<registerProps> = ({}) => {
  const [, register] = useRegisterMutation();
  const route = useRouter();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (userData, { setErrors }) => {
          const response = await register(userData);
          const errors = response.data?.register.errors;
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
              register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
