export default function ConfirmDialog({
  open,
  postTitle,
  onCancel,
  onConfirm,
}) {
  return (
    <dialog open={open}>
      <header>
        <h3>Delete post?</h3>
        <p>Are you sure you want to delete this post?</p>
      </header>
      <div>
        <strong>"{postTitle}"</strong> will be permanently deleted. This action
        cannot be undone.
      </div>
      <footer>
        <button className="outline" onClick={onCancel}>
          Cancel
        </button>
        <button className="outline" data-variant="danger" onClick={onConfirm}>
          Delete
        </button>
      </footer>
    </dialog>
  );
}
