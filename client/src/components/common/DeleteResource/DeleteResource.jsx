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
 * @param {string} props.resourceType - The plural form of the resource type (e.g., "expenses", "payments").
 * @param {string} props.route - The route to navigate to after successful deletion (default: "/instant-split").
 * @param {boolean} props.isButton - If true, render a button; if false, render a span (default: true).
 * @param {boolean} props.navigateOnDelete - If true, navigate to the specified route on deletion; if false, no navigation (default: true).
 * @param {boolean} props.showResourceType - If true, display the resourceType in the button/span; if false, hide it (default: true).
 * @param {function} props.onDeleteResource - Optional callback function to trigger rerender in parent component.
 */
const DeleteResource = ({
  resourceId,
  resourceType,
  route = "/instant-split",
  isButton = true,
  navigateOnDelete = true,
  showResourceType = true,
  onDeleteResource,
}) => {
  const { deleteResource, resourceTypeSingular, error } = useDeleteResource(
    resourceType,
    resourceId,
    navigateOnDelete ? route : null
  );

  const handleDelete = () => {
    deleteResource();
    // Execute additional onDeleteResource logic if provided
    onDeleteResource && onDeleteResource(resourceId);
  };

  return (
    <div>
      {isButton ? (
        <button className={styles.button} onClick={handleDelete}>
          delete {showResourceType && resourceTypeSingular}
        </button>
      ) : (
        <span className={styles.link} onClick={handleDelete} role='button'>
          delete {showResourceType && resourceTypeSingular}
        </span>
      )}

      <ErrorDisplay error={error} />
    </div>
  );
};

export default DeleteResource;
