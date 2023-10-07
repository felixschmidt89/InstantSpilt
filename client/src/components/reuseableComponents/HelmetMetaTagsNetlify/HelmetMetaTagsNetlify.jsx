// DONE adding only meaningful necessary comments
// TODO: Check

import React from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

/**
 * HelmetMetaTags component for SPA hosted on Netlify
 * Long explanation as component might be useful for others to reuse and adapt for their needs.
 *
 * Generates meta tags and supports dynamic setting of title, description, image, path, and author meta tags based on provided props. It has default values for each, so none must be added, but the component must be added to each page, as otherwise there won't be meta tags on the page.
 *
 * Requires prerender beta to be set to activate in Netlify account, which again requires meta name='fragment' content='!' on each page (accomplished by calling this component). Be sure to use react-helmet-async and properly add it to the project.
 *
 *
 * @param {string} props.title -
 * @param {string} props.description
 * @param {string} props.image - Meta tags image absolute URL
 * @param {string} props.path - Additional path segments to append to the default URL.
 * @param {string} props.author
 *
 * @returns {JSX.Element} The HelmetMetaTags component.
 */
function HelmetMetaTagsNetlify({ title, description, image, path, author }) {
  // Define default values
  const defaultDescription =
    "Effortlessly settle group expenses with InstantSplit, a hassle-free solution that requires no registration or app downloads. Share minimal data and split bills with ease.";
  const defaultTitle =
    "InstantSplit - simplified group expense sharing and settlement";
  const defaultImage = "https://instantsplit.netlify.app/metaTagDefaultImg.png";
  const defaultUrl = "https://instantsplit.netlify.app/";
  const defaultAuthor = "Felix Schmidt";

  // Retrieve params
  const { groupCode, groupName } = useParams();

  //TODO: Check if really necessary, might be overachieving
  // URL-Encode groupCode and groupName params if they exist in the path
  const encodedGroupName = groupCode
    ? encodeURIComponent(groupName)
    : groupName;
  const encodedGroupCode = groupName
    ? encodeURIComponent(groupCode)
    : groupCode;

  // Append the provided path to defaultUrl if it's provided
  const encodedParams =
    (encodedGroupName ? `${encodeURIComponent(encodedGroupName)}/` : "") +
    (encodedGroupCode ? `${encodeURIComponent(encodedGroupCode)}/` : "");
  const pageUrl = path ? `${defaultUrl}${path}${encodedParams}` : defaultUrl;

  // Use default values if the corresponding props are not provided
  const pageTitle = title || defaultTitle;
  const pageDescription = description || defaultDescription;
  const pageImage = image || defaultImage;
  const pageAuthor = author || defaultAuthor;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name='description' content={pageDescription} />
      <meta property='og:title' content={pageTitle} />
      <meta property='og:description' content={pageDescription} />
      <meta property='og:image' content={pageImage} />
      <meta property='og:url' content={pageUrl} />
      <meta property='og:type' content='website' />
      <meta name='twitter:title' content={pageTitle} />
      <meta name='twitter:description' content={pageDescription} />
      <meta name='twitter:image' content={pageImage} />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='author' content={pageAuthor} />
      <meta name='fragment' content='!' />
    </Helmet>
  );
}

export default HelmetMetaTagsNetlify;
