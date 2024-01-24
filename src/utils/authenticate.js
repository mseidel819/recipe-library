const bcrypt = require("bcryptjs");

// Function to hash a password
async function hashPassword(password) {
  const saltRounds = 12; // Adjust the rounds based on your Django configuration
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

// Function to compare a password with a hashed password
async function comparePasswords(inputPassword, hashedPassword) {
  const match = await bcrypt.compare(inputPassword, hashedPassword);
  return match;
}

// hashPassword(plaintextPassword)
//   .then((hashedPassword) => {
//     console.log("Hashed Password:", hashedPassword);

//     // In a real-world scenario, you would store hashedPassword in your database.

//     // Example: Check if a login password matches the stored hashed password
//     const loginPassword = "user_password";
//     comparePasswords(loginPassword, hashedPassword)
//       .then((passwordsMatch) => {
//         console.log("Passwords Match:", passwordsMatch);
//       })
//       .catch((error) => {
//         console.error("Error comparing passwords:", error);
//       });
//   })
//   .catch((error) => {
//     console.error("Error hashing password:", error);
//   });

export async function authenticateUser(email, password) {
  const hashedPassword = await hashPassword(password);
  try {
    const response = await fetch("YOUR_API_ENDPOINT", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: hashedPassword,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return data; // Return success response
    } else {
      console.error("Authentication failed:", response.statusText);
    }
  } catch (error) {
    console.error("Error during authentication:", error);
  }

  return undefined; // Return undefined in case of failure
}
