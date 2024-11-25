export default function ConditionRow({ condition, no }) {
  return (
    <tr>
      <td>0{no}</td>
      <td>{condition.min_money}</td>
      <td>{condition.max_money}</td>
      <td>{condition.gender}</td>
      <td>{condition.amount}</td>
      <td>{condition.min_amount}</td>
    </tr>
  );
}
