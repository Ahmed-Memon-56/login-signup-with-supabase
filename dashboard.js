 let logout=document.getElementById("logout")
 
 function logoutUser(){
      alert('Logged out successfully!');
      window.location.href = 'index.html';
    }
const supabaseUrl = `https://uegwqhqnbgtfiutytmcx.supabase.co`;
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlZ3dxaHFuYmd0Zml1dHl0bWN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwMTI0MjQsImV4cCI6MjA2ODU4ODQyNH0.Oyj5bbNmXbkwpi-lZsoPZxGZ-r9gYj9IR2PCNa3tRAA"; 
const client = supabase.createClient(supabaseUrl, supabaseKey);

