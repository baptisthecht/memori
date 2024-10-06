// components/Header.tsx

const Header = () => {
    return (
        <header style={headerStyle}>
            <img src="/Logo_Memori.svg" alt="Logo Memori" style={logoStyle} />
        </header>
    );
};

const headerStyle = {
    height: '80px',
    width: '100%',
    backgroundColor: 'var(--surface-primary)', // Applique la couleur
    display: 'flex',
    alignItems: 'center',
    padding: '0 240px', // Ajoute le padding horizontal
};

const logoStyle = {
    height: '24px',
    width: 'auto',
};

export default Header;
