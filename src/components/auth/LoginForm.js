import React, { useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useFormik } from "formik";
import * as Yup from "yup";
import { user, userDetails } from "../../utils/userDB";
import useAuth from "../../hooks/useAuth";
import UserData from "./UserData";

const LoginForm = () => {
  const [error, setError] = useState("");
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: initialvalues(),
    validationSchema: Yup.object(validationShema()),
    validateOnChange: false,
    onSubmit: (formValue) => {
      console.log("Formulario Enviado ...");
      const { username, password } = formValue;

      if (username !== user.username || password !== user.password) {
        setError("Usuario o contraseña incorrectos");
      } else {
        login(userDetails);
      }
    },
  });

  return (
    <View>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput
        placeholder="Nombre de usuario"
        style={styles.input}
        autoCapitalize="none"
        value={formik.values.username}
        onChangeText={(text) => formik.setFieldValue("username", text)}
      />
      <TextInput
        placeholder="Contraseña"
        style={styles.input}
        autoCapitalize="none"
        secureTextEntry={true}
        value={formik.values.password}
        onChangeText={(text) => formik.setFieldValue("password", text)}
      />
      <Button title="Entrar" onPress={formik.handleSubmit} />
      <Text style={styles.error}>{formik.errors.username}</Text>
      <Text style={styles.error}>{formik.errors.password}</Text>
      <Text style={styles.error}>{error}</Text>
    </View>
  );
};

const validationShema = () => {
  return {
    username: Yup.string().required("El Usuario es Obligatorio"),
    password: Yup.string().required("La Contraseña es Obligatoria"),
  };
};

const initialvalues = () => {
  return {
    username: "",
    password: "",
  };
};

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 15,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 12,
  },
  error: {
    textAlign: "center",
    color: "#f00",
    marginTop: 20,
  },
});

export default LoginForm;
