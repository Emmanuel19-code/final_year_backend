import passport from "passport";

export function googleAuth(req, res, next) {
  passport.authenticate("google", { scope: ["profile"] })
}

export function googleAuthCallback(req, res, next) {
  passport.authenticate("google", { failureRedirect: "/" })
}

export function googleAuthCallbackHandler(req, res) {
  res.redirect("/");
}
