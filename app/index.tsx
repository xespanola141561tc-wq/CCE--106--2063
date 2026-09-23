import { Redirect, type Href } from "expo-router";

export default function IndexScreen() {
  // The app always begins at Sign In. A portal session starts only after login.
  return <Redirect href={"/login" as Href} />;
}
