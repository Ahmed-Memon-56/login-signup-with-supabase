const supabaseUrl = "https://uegwqhqnbgtfiutytmcx.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlZ3dxaHFuYmd0Zml1dHl0bWN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwMTI0MjQsImV4cCI6MjA2ODU4ODQyNH0.Oyj5bbNmXbkwpi-lZsoPZxGZ-r9gYj9IR2PCNa3tRAA";
const client =
  window.supabase && typeof window.supabase.createClient === "function"
    ? window.supabase.createClient(supabaseUrl, supabaseKey)
    : null;

const showLoginBtn = document.getElementById("showLoginBtn");
const showSignupBtn = document.getElementById("showSignupBtn");
const loginModal = document.getElementById("loginModal");
const signupModal = document.getElementById("signupModal");

if (showLoginBtn && loginModal && signupModal) {
  showLoginBtn.addEventListener("click", () => {
    loginModal.style.display = "flex";
    signupModal.style.display = "none";
  });
}

if (showSignupBtn && loginModal && signupModal) {
  showSignupBtn.addEventListener("click", () => {
    signupModal.style.display = "flex";
    loginModal.style.display = "none";
  });
}

async function loginUser() {
  if (!client) {
    alert("Supabase is not loaded on this page.");
    return;
  }

  const email = document.getElementById("loginEmail")?.value;
  const password = document.getElementById("loginpassword")?.value;
  const loader = document.getElementById("loader");

  if (loader) loader.style.display = "flex";

  const { data, error } = await client.auth.signInWithPassword({ email, password });

  if (loader) loader.style.display = "none";

  if (error) {
    console.error("Error logging in:", error);
    alert("Login failed. Please check your credentials.");
    return;
  }

  console.log("Login successful:", data);
  alert("Login Successful");
  window.location.href = "dashboard.html";
}

async function signupUser() {
  if (!client) {
    alert("Supabase is not loaded on this page.");
    return;
  }

  const name = document.getElementById("signupName")?.value;
  const email = document.getElementById("signupEmail")?.value;
  const password = document.getElementById("signuppassword")?.value;
  const loader = document.getElementById("loader");

  if (loader) loader.style.display = "flex";

  const { data, error } = await client.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
      },
    },
  });

  if (loader) loader.style.display = "none";

  if (error) {
    console.error("Error signing up:", error);
    alert("Sign Up failed.");
    return;
  }

  console.log("Data inserted successfully:", data);
  alert("Sign Up Successful");
}

async function check() {
  if (!client) return;

  const { data } = await client.auth.getSession();
  if (!data.session) {
    window.location.href = "index.html";
  } else {
    window.location.href = "dashboard.html";
  }
}

async function logoutUser() {
  if (client) {
    const { error } = await client.auth.signOut();
    if (error) {
      console.error("Logout error:", error);
      alert("Logout failed. Try again.");
      return;
    }
  }

  alert("Logged out successfully!");
  window.location.href = "index.html";
}

const googleButtons = document.querySelectorAll(".google-btn");
googleButtons.forEach((button) => {
  button.addEventListener("click", async (e) => {
    e.preventDefault();

    if (!client) {
      alert("Supabase is not loaded on this page.");
      return;
    }

    const { data, error } = await client.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      console.error("Error signing in with Google:", error);
      alert("Google sign-in failed. Please try again.");
      return;
    }

    console.log("Google sign-in successful:", data);
  });
});

async function reset(e) {
  if (e) e.preventDefault();

  if (!client) {
    alert("Supabase is not loaded on this page.");
    return;
  }

  const email = document.getElementById("loginEmail")?.value;
  if (!email) {
    alert("Please enter your email first.");
    return;
  }

  const { error } = await client.auth.resetPasswordForEmail(email, {
    redirectTo: window.location.origin,
  });

  if (error) {
    console.error("Reset password error:", error);
    alert("Reset password failed.");
    return;
  }

  alert("Password reset email sent.");
}

window.loginUser = loginUser;
window.signupUser = signupUser;
window.logoutUser = logoutUser;
window.reset = reset;
window.check = check;
