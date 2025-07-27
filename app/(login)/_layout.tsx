import { Stack } from "expo-router";
const Layout = () => {
    return (
        <Stack>
            <Stack.Screen name="login" options={{ title: "login" }} />
            <Stack.Screen name="create" options={{ title: "create" }} />
            <Stack.Screen name="reset" options={{ title: "reset" }} />
        </Stack>
    );
};
export default Layout;
