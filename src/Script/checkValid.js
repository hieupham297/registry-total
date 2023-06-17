// Kiểm tra nhập tên trung tâm
export const validateUserName = (userName) => {
    if (!userName) {
        return "Vui lòng nhập tên trung tâm"
    }
    return null;
}

// Kiểm tra nhập tên hiển thị
export const validateDisplayName = (displayName) => {
    if (!displayName) {
        return "Vui lòng nhập tên hiển thị"
    }
    return null;
}

// Kiểm tra nhập mail
export const validateEmail = (email) => {
    if (!email) {
        return "Vui lòng nhập tài khoản"
    }
    return null;
}

// Kiểm tra nhập mật khẩu
export const validatePassword = (password) => {
    if (!password) {
        return "Vui lòng nhập mật khẩu"
    }
    return null;
}

// Kiểm tra nhập địa chỉ
export const validateAddress = (address) => {
    if (!address) {
        return "Vui lòng nhập địa chỉ"
    }
    return null;
}

// Kiểm tra nhập khu vực
export const validateRegion = (region) => {
    if (!region) {
        return "Vui lòng nhập khu vực"
    }
    return null;
}

// Kiểm tra nhập mật khẩu
export const validatePhoneNumber = (phoneNumber) => {
    if (!phoneNumber) {
        return "Vui lòng nhập số điện thoại"
    }
    return null;
}

// Kiểm tra nhập đại diện
export const validateRepresent = (represent) => {
    if (!represent) {
        return "Vui lòng nhập người đại diện"
    }
    return null;
}

// Kiểm tra nhập chức danh
export const validatePosition = (position) => {
    if (!position) {
        return "Vui lòng nhập chức danh"
    }
    return null;
}