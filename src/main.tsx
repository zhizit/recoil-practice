import React from 'react'
import ReactDOM from 'react-dom/client'
import { RecoilRoot } from 'recoil'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* ①セットアップ：RecoilRootを実装する */}
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>
)
