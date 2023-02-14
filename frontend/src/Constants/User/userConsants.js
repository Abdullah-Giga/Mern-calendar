

export const serverAddress = "http://localhost:5000/api";

export const SIGNIN =  serverAddress + "/user/signIn";

export const SIGNUP = serverAddress + "/user/signUp";


// signUp checker
export const PasswordInstructions = {
    minLength: "Password must be minimum 8 characters",
    specialChar: "Passwprd must contain 1 special character",
    number: "Passwprd must contain 1 number",
    capital: "Passwprd must contain 1 capital letter",
    match: "Passwords do not match",
  }
  