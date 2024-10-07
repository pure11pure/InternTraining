function UserForm() {
  return (
    <div className="grid mx-auto">
      <div>userForm</div>
      <div>
        <input type="text" name="name" className="border-2" />
      </div>
      <div>
        <input type="email" name="email" className="border-2" />
      </div>
    </div>
  );
}

export default UserForm;
