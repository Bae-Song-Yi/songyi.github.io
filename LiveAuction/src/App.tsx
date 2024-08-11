import React from 'react';
import { Route, Routes, useParams, useSearchParams } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import enUsMsg from './lang/en.json';
import koMsg from './lang/ko.json';
import Home from './pages/Home';
import 'antd/dist/antd.css';
import 'antd/dist/antd.less';
import './App.css';
import './rem.css';

const App = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const locale = searchParams.get('lang_cd') === 'en' ? 'en' : 'ko';
    const messages = { en: enUsMsg, ko: koMsg }[locale];

  return (
    <>
      <IntlProvider locale={locale} messages={messages}>
        <Routes>
          <Route path="/live/major/auction" element={<Home />} />
        </Routes>
      </IntlProvider>
    </>
  );
};

export default App;
