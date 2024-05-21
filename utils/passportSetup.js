import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import user from "../database/models/user";

const  setupPassport = ()=> {
  passport.use(
    new GoogleStrategy(
      {
        clientID:
         "",
        clientSecret:"",
        callbackURL: "/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let existingUser = await user.findOne({ googleId: profile.id });

          if (existingUser) {
            done(null, existingUser);
          } else {
            let newUser = new user({
              googleId: profile.id,
              displayName: profile.displayName,
            });

            await newUser.save();
            done(null, newUser);
          }
        } catch (error) {
          done(error, false);
        }
      }
    )
  );
}

export default setupPassport;
