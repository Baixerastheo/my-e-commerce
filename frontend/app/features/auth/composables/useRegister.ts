import { ref } from "vue";
import { useAuthStore } from "../stores/useAuthStore";
import * as yup from "yup";
import { defineRule } from "vee-validate";

export const useRegister = () => {
  const showPassword = ref(false);
  const showPasswordConfirmation = ref(false);
  const loading = ref(false);
  const errorMessage = ref<string | null>(null);
  const authStore = useAuthStore();

  const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
  };

  const togglePasswordConfirmationVisibility = () => {
    showPasswordConfirmation.value = !showPasswordConfirmation.value;
  };

  const handleRegister = async (
    username: string,
    email: string,
    password: string
  ) => {
    try {
      loading.value = true;
      errorMessage.value = null;
      await authStore.register(username, email, password);
      navigateTo("/");
    } catch (error: any) {
      console.error("Register failed:", error);
      errorMessage.value =
        error?.response?.data?.message ||
        error?.message ||
        "Une erreur est survenue lors de l'inscription";
    } finally {
      loading.value = false;
    }
  };

  const schema = yup.object({
    username: yup
      .string()
      .min(3, "Le nom d'utilisateur doit contenir au moins 3 caractères")
      .required("Le nom d'utilisateur est requis"),
    email: yup
      .string()
      .email("Veuillez entrer un email valide")
      .required("L'email est requis"),
    password: yup
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères")
      .required("Le mot de passe est requis"),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref('password')], "Les mots de passe doivent correspondre")
      .required("La confirmation du mot de passe est requise"),
  });

  function onSubmit(values: any) {
    handleRegister(values.username, values.email, values.password);
  }

  defineRule(
    "confirmed",
    (value: string | undefined, [target]: string, ctx): boolean | string => {
      if (!target) {
        return "no target";
      }

      if (value === ctx.form[target]) {
        return true;
      }
      return "Passwords must match";
    }
  );

  return {
    showPassword,
    showPasswordConfirmation,
    errorMessage,
    authStore,
    togglePasswordVisibility,
    togglePasswordConfirmationVisibility,
    handleRegister,
    schema,
    onSubmit,
    loading
  };
};
