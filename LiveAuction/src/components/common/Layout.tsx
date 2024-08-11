import React from 'react';
import Footer from './Footer';
import Header from './Header';

interface Props {
  children: React.ReactNode;
  showWishPop: () => void
}

const Layout = ({ children, showWishPop }: Props) => {
  return (
    <>
      <Header showWishPop={showWishPop} />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
