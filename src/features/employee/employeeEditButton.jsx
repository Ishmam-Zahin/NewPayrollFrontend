export default function EmployeeEditButton({ setVisible }) {
  return (
    <button
      className="btn btn-green btn-small"
      onClick={() => setVisible(true)}
    >
      Edit
    </button>
  );
}
