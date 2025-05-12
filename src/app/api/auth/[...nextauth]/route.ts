// Placeholder per un handler di autenticazione
// Questo file verrà sostituito in futuro con una corretta implementazione di NextAuth

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Configurazione di NextAuth
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  pages: {
    signIn: "/signup", // Pagina di login personalizzata
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Reindirizza alla dashboard dopo l'autenticazione
      return url.startsWith(baseUrl) ? url : `${baseUrl}/dashboard`;
    },
    async session({ session }) {
      // Qui puoi modificare l'oggetto sessione se necessario
      return session;
    },
  },
};

// Gestore dell'autenticazione
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; 