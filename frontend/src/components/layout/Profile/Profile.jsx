import React, { useState } from 'react';
import styles from './Profile.module.css';

const Profile = () => {
  const [name, setName] = useState('João Silva');
  const [email, setEmail] = useState('joao@example.com');
  const [phone, setPhone] = useState('31999999999');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    alert('Informações atualizadas com sucesso!');
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      alert('Senha alterada com sucesso!');
    } else {
      alert('As senhas não coincidem!');
    }
  };

  return (
    <div className={styles.container}>
      <h1>Meu Perfil</h1>
      <form onSubmit={handleProfileSubmit} className={styles.profileForm}>
        <div className={styles.field}>
          <label>Nome:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Digite seu nome"
          />
        </div>
        <div className={styles.field}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu email"
          />
        </div>
        <div className={styles.field}>
          <label>Telefone:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Digite seu telefone"
          />
        </div>

        {/* Alteração de Senha */}
        <div className={styles.field}>
          <label>Nova Senha:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Digite sua nova senha"
          />
        </div>
        <div className={styles.field}>
          <label>Confirmar Senha:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirme sua nova senha"
          />
        </div>
        
        <button type="submit" className={styles.saveButton}>
          Salvar Alterações
        </button>
      </form>
    </div>
  );
};

export default Profile;
