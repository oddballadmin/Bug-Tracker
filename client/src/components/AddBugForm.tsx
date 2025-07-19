import './../styles/form.css';

export const AddBugForm = () => {
  return (
    <form>
      <h2>Add New Bug</h2>
      <label>
        Title:
        <input type="text" name="title" required />
      </label>
      <label>
        Description:
        <textarea name="description" required />
      </label>
      <button type="submit">Submit</button>
    </form>
  )
}
export default AddBugForm
