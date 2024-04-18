import React from "react";
import "@styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";

//use nav, in the layout page, since it will be used across all the pages

export const metadata = {
  title: "PatronusPrompt-Land of Prompts",
  description:
    "Unlock Creativity with PatronusPrompt: Your AI-Powered Magical Muse for Inspiring, Creating, and Sharing Enchanting Prompts in the Modern World",
  author: "Vedansh Bisht",
  icons: {
    icon: '/favicon.ico',
  },
};

const RootLayout = ({children}) => {
  return (
    <html lang="en">  
  
   
      <body>
        <Provider>
          <div className="main">
            <div className="gradient"></div>
          </div>

          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
