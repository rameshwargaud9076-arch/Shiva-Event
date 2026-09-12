/* =========================================================
   SHIVA EVENT - SUPABASE ADMIN LOGIN
   ========================================================= */
"use strict";

const ADMIN_AUTH_KEY = "shivaEventAdminAuth";
const ADMIN_EMAIL = "admin@shivaevent.com";

const form = document.getElementById("adminLoginForm");
const error = document.getElementById("loginError");

async function checkExistingAdminSession() {
    try {
        const { data } = await shivaSupabase.auth.getSession();
        if (!data.session) return;

        const { data: profile } = await shivaSupabase
            .from("profiles")
            .select("role")
            .eq("id", data.session.user.id)
            .single();

        if (profile?.role === "admin") {
            sessionStorage.setItem(ADMIN_AUTH_KEY, "true");
            window.location.replace("admin.html");
        } else {
            await shivaSupabase.auth.signOut();
        }
    } catch (e) {
        console.warn(e);
    }
}

checkExistingAdminSession();

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = document.getElementById("adminUsername").value.trim();
    const password = document.getElementById("adminPassword").value;

    error.textContent = "";

    const email = username.includes("@")
        ? username
        : ADMIN_EMAIL;

    try {
        const { data, error: loginError } =
            await shivaSupabase.auth.signInWithPassword({
                email,
                password
            });

        if (loginError) throw loginError;

        const { data: profile, error: profileError } =
            await shivaSupabase
                .from("profiles")
                .select("role")
                .eq("id", data.user.id)
                .single();

        if (profileError || profile?.role !== "admin") {
            await shivaSupabase.auth.signOut();
            throw new Error("This account is not an admin account.");
        }

        sessionStorage.setItem(ADMIN_AUTH_KEY, "true");
        window.location.replace("admin.html");

    } catch (e) {
        console.error(e);
        error.textContent =
            "Invalid admin login or admin account is not configured.";
    }
});
