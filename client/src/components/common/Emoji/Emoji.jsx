/**
 * Emoji component for rendering emojis with ARIA attributes.
 *
 * @component
 * @param {string} label - ARIA label for the emoji.
 * @param {string} emoji - The emoji to be displayed.
 * @returns {JSX.Element} - React component.
 */
const Emoji = ({ label, emoji }) => (
  <span role='img' aria-label={label}>
    {emoji}
  </span>
);

export default Emoji;
