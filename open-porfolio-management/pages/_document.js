import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html>
            <meta
                name="viewport"
                content="initial-scale=1, width=device-width"
            />
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
            />
            <body>
                <Head />
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
