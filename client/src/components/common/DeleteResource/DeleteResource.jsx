// React and Third-Party Libraries
import React from "react";

// Hooks

import useDeleteResource from "../../../hooks/useDeleteResource";
// Components
import ErrorDisplay from "../ErrorDisplay/ErrorDisplay";

// Styles
import styles from "./DeleteResource.module.css";

/**
 * Component for rendering a button or span to delete a resource and navigate to a route upon deletion.
 *
 * @param {string} props.resourceId - The unique identifier of the resource.
 * @param {string} props.resourceTypePlural - The plural form of the resource type (e.g., "expenses", "payments").
 * @param {string} props.route - The route to navigate to after successful deletion (default: "/instant-split").
 * @param {boolean} props.isButton - If true, render a button; if false, render a span (default: true).
 */
const DeleteResource = ({
  resourceId,
  resourceType,
  route = "/instant-split",
  isButton = true,
}) => {
  const { deleteResource, resourceTypeSingular, error } = useDeleteResource(
    resourceType,
    resourceId,
    route
  );

  return (
    <div>
      {isButton ? (
        <button className={styles.button} onClick={deleteResource}>
          delete {resourceTypeSingular}
        </button>
      ) : (
        <span className={styles.link} onClick={deleteResource} role='button'>
          delete {resourceTypeSingular}
        </span>
      )}

      <ErrorDisplay error={error} />
    </div>
  );
};

export default DeleteResource;
