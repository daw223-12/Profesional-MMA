function Profile({ user }) {

  return (
    <>
      {
        !user ? (
          <div id="nav-login" >
            <a href="/login">Login</a>
            <a href="/signup">Sign up</a>
          </div>) : (
          <div id="nav-login">
            <img src="/assets/profile.png" alt="Profile" />
          </div>
        )
      }
    </>
  );
}

export default Profile