const supabaseUrl = `https://uegwqhqnbgtfiutytmcx.supabase.co`;
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlZ3dxaHFuYmd0Zml1dHl0bWN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwMTI0MjQsImV4cCI6MjA2ODU4ODQyNH0.Oyj5bbNmXbkwpi-lZsoPZxGZ-r9gYj9IR2PCNa3tRAA"; 
const client = supabase.createClient(supabaseUrl, supabaseKey);


let showLoginBtn = document.getElementById("showLoginBtn");
let showSignupBtn = document.getElementById("showSignupBtn");

let loginModal = document.getElementById("loginModal");
let signupModal = document.getElementById("signupModal");


showLoginBtn.addEventListener("click", () => {
  loginModal.style.display = "flex";
  signupModal.style.display = "none";
});


showSignupBtn.addEventListener("click", () => {
  signupModal.style.display = "flex";
  loginModal.style.display = "none";
});


async function loginUser() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginpassword").value;

  
  const { data, error } = await client
    .from("login/signin")
    .select("*")
    .eq("email", email)
    .eq("password", password)  

  if (error) {
    alert("Login failed: " + error.message);
  } else if (data.length === 0) {
    alert("Invalid email or password.");
  } else {
    alert("Login successful!");
    loginModal.style.display = "none";
    window.location.href = 'dashboard.html';
  }
}



async function signupUser() {
  const name = document.getElementById("signupName");
  const email = document.getElementById("signupEmail");
  const password = document.getElementById("signuppassword");

  const { data, error } = await client.auth.signUp({
    email: email.value,
    password: password.value,
    options: {
      data: {
        full_name: name.value,
      },
    },
  });

  if (error) {
    alert("Signup failed: " + error.message);
  } else {
   
    const { error: insertError } = await client.from("login/signin").insert([
      {
        name: name.value,
        email: email.value,
        password: password.value, 
      },
    ]);

    if (insertError) {
      alert("User signed up, but failed to save to database: " + insertError.message);
    } else {
      alert("Signup successful! Data stored in Supabase table.");
    }

    signupModal.style.display = "none";
  }
}

    async function check(){
    const { data } = await client.auth.getSession()
    if(!data.session){
        window.location.href='index.html'
    }else{
        window.location.href = 'dashboard.html'
    }

}


if(window.location.pathname != '/index.html'){
    check()
}


let google =document.getElementsByClassName("google-btn")
let facebook =document.getElementsByClassName("facebook-btn")