import React, { ReactElement } from 'react';

interface Props {
  onSubmit: (name: string) => void;
}

const AddUser: React.FC<Props> = ({ onSubmit }): ReactElement => {
  const [name, setName] = React.useState('');
  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    onSubmit(name);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="username"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <button type="submit">Entrar</button>
    </form>
  );
};

export default AddUser;
