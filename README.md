# Deploy Frontend (Angular)

## Chuẩn bị môi trường

Cập nhật nodejs v10 nếu hệ điều hành trên vps không hỗ trợ:

```bash
sudo npm cache clean -f
sudo npm install -g n
sudo n stable
```

## Clone - Cài đặt

```bash
$ git clone ...
$ cd ./frontend
$ npm i # cài đặt các package cần thiết cho frontend
```

## Build dự án 

```bash
$ git pull
$ node --max_old_space_size=512 ./node_modules/@angular/cli/bin/ng build --prod --aot
$ sudo cp -rf ./dist/cglib/* /var/www/html/ # copy file build vào thư mục chạy
```

## Lỗi và cách khắc phục

Với VPS có bộ nhớ thấp (RAM bé hơn 1G) và sử dụng các hệ điều hành nhân Linux, quá trình build có thể gặp lỗi **Killed**.
(Lỗi nêu ở đây: https://stackoverflow.com/questions/30747314/webpack-uglify-plugin-returns-killed-on-ubuntu)

<u>**Nguyên nhân**</u>: process đang thực hiện build (angular/webpack) sử dụng quá nhiều bộ nhớ, gây ra lỗi "out of memory" và hệ điều hành sẽ Killed process này.

**<u>Cách khắc phục</u>**: *Bổ sung Swap bằng cách lệnh dưới đây (Tham khảo: https://www.digitalocean.com/community/tutorials/how-to-add-swap-on-ubuntu-14-04)*

```bash
# 1. Kiểm tra

# Kiểm tra swap đã bật chưa
sudo swapon -s
# Kiểm tra bộ nhớ hiện tại
free -m
# Kiểm tra có còn khoảng trống đủ để tạo swap trên ổ đĩa
df -h

# 2. Tạo file swap

# Xóa cũ (nếu cần)
sudo rm /swapfile
# Tạo swap 2Gb
sudo fallocate -l 2G /swapfile
ls -lh /swapfile
# Kết quả đúng: # -rw-r--r-- 1 root root 2.0G Apr 28 17:19 /swapfile

# Cho phép sử dụng swap
sudo chmod 600 /swapfile
ls -lh /swapfile
# Kết quả đúng: # -rw------- 1 root root 2.0G Apr 28 17:19 /swapfile

sudo mkswap /swapfile

# 3. Kích hoạt swap

sudo swapon /swapfile

# Kiểm tra lại
sudo swapon -s
free -m
```


