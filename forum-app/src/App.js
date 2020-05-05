import React, { Component } from 'react';
import Layout from './layout/Layout';
import MainPage from './screen/MainPage';
import './App.css';

class App extends Component {
  render() {
    return (
      <Layout test-dataid="AppLayout">
        <MainPage />
      </Layout>
    );
  }
}

export default App;