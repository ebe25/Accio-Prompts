// localhost:300/api/auth/[dynamic next auth]/route
//it is a backend endpoint

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import {connectDB} from "@utils/database";
import User from "@models/user";

const handler = NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    // ...add more providers here
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({session}) {
      //getting the details of the online user
      const sessionUser = await User.findOne({
        email: session.user.email,
      });
      //update the current session's id-> sessionUser
      session.user.id = sessionUser._id.toString();
      return session;
    },

    async signIn({profile}) {
      try {
        await connectDB();
        //if user already exists
        //achieve that, by using findOne() on User model, returns a promise->use await
        const userExist = await User.findOne({
          email: profile.email,
        });

        //if not create user
        if (!userExist) {
          const newUser = await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },

   
  },
});

export {handler as GET, handler as POST};
