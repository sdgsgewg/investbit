// import { RegisterInput } from "@/types/auth/register";
// import { createClient } from "@/utils/supabase/server";

// export async function registerRepo(payload: RegisterInput) {
//   try {
//     const supabase = createClient();
//     const emailRedirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`;

//     const { error, data } = await supabase.auth.signUp({
//       email,
//       password,
//       options: {
//         emailRedirectTo,
//       },
//     });

//     if (error) {
//       setErrorMsg(error.message);
//     } else {
//       // If Supabase is configured to auto-confirm users (or not), data.user will exist.
//       // If email confirmation is required, we tell the user.
//       if (data.session) {
//         setSuccessMsg(t("loginSuccess"));
//         window.location.href = next;
//       } else {
//         setSuccessMsg(t("registerSuccess"));
//         setEmail("");
//         setPassword("");
//         setConfirmPassword("");
//       }
//     }
//   } catch {
//     setErrorMsg(t("errorOccurred"));
//   } finally {
//     setLoading(false);
//   }
// }
