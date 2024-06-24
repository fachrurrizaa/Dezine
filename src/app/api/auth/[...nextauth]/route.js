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
      checks: ['none']
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        await mongooseConnect();
        const user = await User.findOne({ email: credentials.email }).select('+password');
        if (user) {
          const isPasswordCorrect = await compare(credentials.password, user.password);
          if (isPasswordCorrect) {
            return user;
          }
          throw new Error("Invalid credentials");
        }
        throw new Error("Invalid credentials");
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;

        await mongooseConnect();
        const updateData = {
          email: profile.email,
          subscriptions: false, // Ensure default value is set
        };

        // Update the user if exists, otherwise create a new user
        const user = await User.findOneAndUpdate(
          { email: profile.email },
          { $set: updateData },
          { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        token.id = user._id;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user._id = token.id;
      return session;
    }
  },
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXTAUTH_SECRET
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
