/**
 * Get html selector from event target
 */
export default (target) => {
  const className = target.className !== '' ? `.${target.className}` : '';
  const targetId = target.id !== '' ? `#${target.id}` : '';

  return [target.nodeName, className, targetId].join(' ');
}
