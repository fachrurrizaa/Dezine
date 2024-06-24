// import { MongoDBAdapter } from '@auth/mongodb-adapter'
// import NextAuth from 'next-auth'
// import GoogleProvider from 'next-auth/providers/google'
// import CredentialsProvider from 'next-auth/providers/credentials'
// import clientPromise from './../../../../../lib/mongodb';
// import mongooseConnect from '../../../../../lib/mongoose';
// import { User } from '../../../../../models/User';
// import { compare } from 'bcrypt';

// export const authOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_ID,
//       clientSecret: process.env.GOOGLE_SECRET,
//       checks: ['none']
//     }),
//     CredentialsProvider({
//       id: "credentials",
//       name: "Credentials",
//       credentials: {
//         email: { label: 'Email', type: 'email' },
//         password: { label: 'Password', type: 'password' }
//       },
//       async authorize(credentials) {
//         await mongooseConnect()
//         const user = await User.findOne({ 
//           email: credentials.email 
//         }).select('+password'); 
//         if (user) {
//           const isPasswordCorrect = await compare(
//             credentials.password,
//             user.password
//           );
//           if (isPasswordCorrect) {
//             return user;
//           }
//           if (!isPasswordCorrect) {
//             throw new Error("Invalid credentials")
//           }
//         }
//         if (!user) {
//           throw new Error("Invalid credentials")
//         }
//       }
//     })
//   ],
//   session: {
//     strategy: "jwt",
//   },
//   pages: {
//     signIn: '/login',
//   },
//   callbacks: {
//     async jwt({ token, account }) {
//       // Persist the OAuth access_token to the token right after signin
//       if (account) {
//         token.accessToken = account.access_token
//         token.id = account.userId
//       }
//       return token
//     },
//     async session({ session, token, user }) {
//       session.accessToken = token.accessToken
//       session.user._id = token.id
//       return session
//     }
//   },
//   adapter: MongoDBAdapter(clientPromise),
//   secret: process.env.NEXTAUTH_SECRET
// }

// const handler = NextAuth(authOptions)

// export { handler as GET, handler as POST }

import { MongoDBAdapter } from '@auth/mongodb-adapter';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import clientPromise from './../../../../../lib/mongodb';
import mongooseConnect from '../../../../../lib/mongoose';
import { User } from '../../../../../models/User';
import { compare } from 'bcrypt';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      checks: ['none'],
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        await mongooseConnect();
        const user = await User.findOne({ email: credentials.email }).select('+password +subscriptions');
        if (user) {
          const isPasswordCorrect = await compare(credentials.password, user.password);
          if (isPasswordCorrect) {
            return user;
          } else {
            throw new Error("Invalid credentials");
          }
        } else {
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account || user) {
        if (user) {
          token.userId = user._id;
          token.subscriptions = user.subscriptions;
        }
      } else {
        await mongooseConnect();
        const dbUser = await User.findById(token.userId);
        if (dbUser) {
          token.subscriptions = dbUser.subscriptions;
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user._id = token.userId;
      session.user.subscriptions = token.subscriptions;
      return session;
    },
  },
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
