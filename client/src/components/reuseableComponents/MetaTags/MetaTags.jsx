import React from "react";
import { Helmet } from "react-helmet";
import metaTagDefaultImg from "../../../../public/metaTagDefaultImg";

/**
 * MetaTags reusable component
 *
 * Provides a convenient way to set meta tags for SEO and social sharing
 * as well as default meta tags for consistency across the web application.
 *
 * @param {string} title - The title of the page.
 * @param {string} description - A brief description of the page's content.
 * @param {string} image - The URL of an image to be used for social sharing.
 * @param {string} url - The URL of the page.
 * @param {string} author - The author of the document (default is "Felix Schmidt").
 *
 * @returns {React.JSX} - The MetaTags component.
 */
function MetaTags({
  title = "Instant Split",
  description = "The hassle-free way to settle group expenses with no user registration or app download while sharing minimal data.",
  image = metaTagDefaultImg,
  url = "https://instant-split.netlify.app",
  author = "Felix Schmidt",
}) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />

      {/* FACEBOOK OPEN GRAPH META TAGS */}
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={image} />
      <meta property='og:url' content={url} />

      {/* // TWITTER CARD META TAGS */}
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={image} />
      <meta name='twitter:card' content='summary_large_image' />

      {/* // DEFAULT META TAGS // */}
      {/* Specifies the author of the document or webpage. */}
      <meta name='author' content={author} />

      {/* Sets the viewport settings for responsive web design.
   It instructs the browser to render the page's width based on the device's screen width,
   and it sets the initial zoom level to 1.0. */}
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />

      {/* Specifies the character encoding for the document.
   UTF-8 is a widely used character encoding that supports a vast range of characters. */}
      <meta charset='UTF-8' />

      {/* Specifies the document's compatibility with Internet Explorer.
   It sets the document to use the latest rendering engine available in IE. */}
      <meta http-equiv='X-UA-Compatible' content='IE=edge' />

      {/* Another X-UA-Compatible meta tag with additional settings.
   This version is specifically targeting Chrome to use the IE rendering engine. */}
      <meta http-equiv='X-UA-Compatible' content='IE=edge,chrome=1' />

      {/* Defines a Content Security Policy (CSP) for the website.
   This policy specifies that content should only be loaded from the same origin ('self'). */}
      <meta http-equiv='Content-Security-Policy' content="default-src 'self'" />

      {/* Specifies that the browser should not perform MIME type sniffing.
   This helps prevent browsers from interpreting certain responses as HTML or JavaScript
   when they shouldn't be, enhancing security. */}
      <meta http-equiv='X-Content-Type-Options' content='nosniff' />

      {/* Sets the X-Frame-Options to 'deny'.
   This prevents the webpage from being displayed in an iframe,
   adding an extra layer of security to prevent clickjacking attacks. */}
      <meta http-equiv='X-Frame-Options' content='deny' />

      {/* Specifies the referrer policy for requests made from this page.
   'no-referrer' indicates that no referrer information should be included
   in requests made from this page. */}
      <meta name='referrer' content='no-referrer' />

      {/* Defines an Apple Touch Icon for iOS devices.
   The icon is used when users add the website to their home screen. */}
      <link
        rel='apple-touch-icon'
        sizes='180x180'
        href='/apple-touch-icon.png'
      />
    </Helmet>
  );
}

export default MetaTags;
