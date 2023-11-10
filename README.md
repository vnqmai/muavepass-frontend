### Đây là bản hướng dẫn cho cổng thanh toán Payos

Để chạy được bản này bạn vui lòng làm theo các bước sau:
### Bước 1: Cài đặt thư viện
```
    npm install 
```

### Bước 2: Thêm biến môi trường trong file .env
```
    REACT_APP_ORDER_URL = {Your URL server} //Điền ở đây

    REACT_APP_LISTS_BANK_URL = https://api.vietqr.io/v2/banks

    REACT_APP_PAYOS_SCRIPT = https://cdn.payos.vn/payos-checkout/v1/stable/payos-initialize.js

```

### Bước 3: Chạy dự án

```
    npm start
```