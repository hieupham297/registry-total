import "./user_info.css";

export const UserInfo = (props) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    fetch("http://localhost:5000/user/logout", {
      method: "GET",
      credentials: "same-origin",
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else throw new Error("Đăng xuất thất bại");
      })
      .then((data) => {
        localStorage.removeItem("user");
        window.location.href = "/login";
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="profile-page">
      {props.type === "cdk" ? (
        <>
          <div className="info">
            <div className="left">
              <div className="wrapper"></div>
              <p>{user.userName}</p>
            </div>
            <div className="right">
              <p>
                <label id="my-label">Tên: </label>
                {user.userName}
              </p>
              <p>
                <label id="my-label">Địa chỉ: </label> 18 Phạm Hùng, Mỹ Đình,
                Nam Từ Liêm, Hà Nội
              </p>
              <p>
                <label id="my-label">Email: </label> {user.email}
              </p>
              <p>
                <label id="my-label">Số điện thoại: </label> 024 3768 4715
              </p>
            </div>
          </div>
          <div style={{marginTop: "120px"}} className="others">
            <button className="log-out" onClick={handleLogout}>
              Đăng xuất
            </button>
            <button className="change-password">Đổi mật khẩu</button>
          </div>
        </>
      ) : (
        <>
          <div className="info">
            <div className="left">
              <div className="wrapper"></div>
              <p>Người đại diện</p>
            </div>
            <div className="right">
              <p>
                <label id="my-label">Tên: </label>
                {user.userName}
              </p>
              <p>
                <label id="my-label">Mã: </label> {user.code}
              </p>
              <p>
                <label id="my-label">Địa chỉ: </label> {user.address}
              </p>
              <p>
                <label id="my-label">Email: </label> {user.email}
              </p>
              <p>
                <label id="my-label">Số điện thoại: </label> {user.phoneNumber}
              </p>
            </div>
          </div>
          <div className="others">
            <button className="log-out" onClick={handleLogout}>
              Đăng xuất
            </button>
            <button className="change-password">Đổi mật khẩu</button>
          </div>
        </>
      )}
    </div>
  );
};
