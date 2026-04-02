function Home() {
  return (
    <div style={styles.container}>
      <h1>Mini Social App</h1>
      <p>Connect, share, and interact with others</p>
      <h1 style={{ fontSize: 36 }}>Welcome 👋</h1>

      <div style={styles.buttons}>
        <button onClick={() => (window.location.href = "/login")}>
          Login
        </button>

        <button onClick={() => (window.location.href = "/signup")}>
          Signup
        </button>
      </div>
    </div>
  );
}

export default Home;

const styles = {
  container: {
    textAlign: "center",
    marginTop: "100px",
  },
  buttons: {
    marginTop: 20,
    display: "flex",
    justifyContent: "center",
    gap: 10,
  },
};