import "./globals.css";
import { StateProvider } from "../context/StateContext";
import reducer, { initialState } from "../context/StateReducers";
import Head from "next/head";

export default function App ({ Component, pageProps}) {
    return (
        <StateProvider initialState={initialState} reducer={reducer}>
            <Head>
                <title>JiffyChat</title>
                <link rel = "shortcut icon" href='/imgs/icon.png'/>
            </Head>
            <Component {...pageProps}/>;
        </StateProvider>
    )
}